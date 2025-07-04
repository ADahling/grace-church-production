import {
  CATHOLIC_SYSTEM_PROMPTS,
  ensureOpenAIKey,
  getCurrentLiturgicalSeason,
  moderateContent,
  openai,
} from "@/lib/openai";
import { getScriptureReferencesForTheme } from "@/lib/openscripture";
import { checkRateLimit, createRateLimitHeaders } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    ensureOpenAIKey();

    // Get user authentication
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const {
      intention,
      prayerType = "general",
      spiritualNeeds = [],
      saintDevotion = null,
      lifeCircumstance = null,
      language = "en",
    } = body;

    // Check rate limiting
    const rateLimitResult = await checkRateLimit(user.id, "prayer-generation");
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.message },
        { status: 429, headers: createRateLimitHeaders(rateLimitResult) },
      );
    }

    if (!intention) {
      return NextResponse.json(
        { error: "Prayer intention is required" },
        { status: 400 },
      );
    }

    // Content moderation
    const moderationResult = moderateContent(intention);
    if (!moderationResult.isAppropriate) {
      return NextResponse.json(
        {
          error: "Request contains inappropriate content",
          reason: moderationResult.reason,
        },
        { status: 400 },
      );
    }

    // Get current liturgical season
    const liturgicalSeason = getCurrentLiturgicalSeason();

    // Build prayer generation prompt
    const prayerPrompt = buildPrayerPrompt({
      intention,
      prayerType,
      spiritualNeeds,
      saintDevotion,
      lifeCircumstance,
      liturgicalSeason,
      userId: user.id,
    });

    // Generate prayer using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: CATHOLIC_SYSTEM_PROMPTS.PRAYER_GENERATOR,
        },
        {
          role: "user",
          content: prayerPrompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const generatedPrayer = completion.choices[0]?.message?.content;

    if (!generatedPrayer) {
      return NextResponse.json(
        { error: "Failed to generate prayer" },
        { status: 500 },
      );
    }

    // Final content moderation on generated prayer
    const prayerModerationResult = moderateContent(generatedPrayer);
    if (!prayerModerationResult.isAppropriate) {
      return NextResponse.json(
        {
          error: "Generated content did not meet guidelines, please try again",
        },
        { status: 500 },
      );
    }

    // Generate scripture references for the prayer intention
    const scriptureReferences = await generateScriptureReferences(
      intention,
      liturgicalSeason,
      language,
    );

    // Save prayer to database for user's prayer history
    const { error: saveError } = await (supabase as any)
      .from("ai_generated_prayers")
      .insert({
        user_id: user.id,
        intention: intention,
        prayer_type: prayerType,
        generated_prayer: generatedPrayer,
        spiritual_needs: spiritualNeeds,
        saint_devotion: saintDevotion,
        life_circumstance: lifeCircumstance,
        liturgical_season: liturgicalSeason,
        created_at: new Date().toISOString(),
      });

    if (saveError) {
      console.error("Error saving prayer:", saveError);
      // Don't fail the request if saving fails
    }

    return NextResponse.json({
      prayer: generatedPrayer,
      intention: intention,
      prayerType: prayerType,
      liturgicalSeason: liturgicalSeason,
      saintDevotion: saintDevotion,
      scriptureReferences: scriptureReferences,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating prayer:", error);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    );
  }
}

function buildPrayerPrompt({
  intention,
  prayerType,
  spiritualNeeds,
  saintDevotion,
  lifeCircumstance,
  liturgicalSeason,
  userId,
}: {
  intention: string;
  prayerType: string;
  spiritualNeeds: string[];
  saintDevotion: string | null;
  lifeCircumstance: string | null;
  liturgicalSeason: string;
  userId: string;
}): string {
  let prompt = `Please compose a Catholic prayer with the following details:

INTENTION: ${intention}
PRAYER TYPE: ${prayerType}
LITURGICAL SEASON: ${liturgicalSeason}`;

  if (spiritualNeeds.length > 0) {
    prompt += `\nSPIRITUAL NEEDS: ${spiritualNeeds.join(", ")}`;
  }

  if (saintDevotion) {
    prompt += `\nSAINT DEVOTION: ${saintDevotion}`;
  }

  if (lifeCircumstance) {
    prompt += `\nLIFE CIRCUMSTANCE: ${lifeCircumstance}`;
  }

  prompt += `

Please create a beautiful, reverent Catholic prayer that:
1. Addresses the specific intention with compassion and faith
2. Incorporates elements appropriate to the ${liturgicalSeason} season
3. Uses traditional Catholic prayer language and structure
4. ${saintDevotion ? `Includes intercession through ${saintDevotion}` : "May include appropriate saint intercession"}
5. Offers hope and draws the pray-er closer to God
6. Is suitable for personal devotional use
7. Maintains proper Catholic theology and doctrine

The prayer should be heartfelt, scripturally grounded, and spiritually nourishing.`;

  return prompt;
}

async function generateScriptureReferences(
  intention: string,
  liturgicalSeason: string,
  language = "en",
): Promise<string[]> {
  try {
    const scriptureData = await getScriptureReferencesForTheme(
      intention,
      liturgicalSeason,
      language,
    );

    return scriptureData
      .map((scripture) =>
        scripture.text
          ? `${scripture.reference}: "${scripture.text}"`
          : scripture.reference,
      )
      .slice(0, 2);
  } catch (error) {
    console.error("Error generating scripture references:", error);

    const fallbackReferences: string[] = [];
    const intentionLower = intention.toLowerCase();

    if (
      intentionLower.includes("peace") ||
      intentionLower.includes("calm") ||
      intentionLower.includes("paz") ||
      intentionLower.includes("calma")
    ) {
      fallbackReferences.push(
        language === "es" ? "Juan 14:27" : "John 14:27",
        language === "es" ? "Filipenses 4:6-7" : "Philippians 4:6-7",
      );
    }
    if (
      intentionLower.includes("strength") ||
      intentionLower.includes("courage") ||
      intentionLower.includes("fuerza") ||
      intentionLower.includes("valor")
    ) {
      fallbackReferences.push(
        language === "es" ? "Josué 1:9" : "Joshua 1:9",
        language === "es" ? "Filipenses 4:13" : "Philippians 4:13",
      );
    }
    if (
      intentionLower.includes("forgiveness") ||
      intentionLower.includes("healing") ||
      intentionLower.includes("perdón") ||
      intentionLower.includes("sanación")
    ) {
      fallbackReferences.push(
        language === "es" ? "1 Juan 1:9" : "1 John 1:9",
        language === "es" ? "Salmos 147:3" : "Psalm 147:3",
      );
    }

    return fallbackReferences.slice(0, 2);
  }
}
