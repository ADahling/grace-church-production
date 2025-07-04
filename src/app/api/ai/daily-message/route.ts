import {
  CATHOLIC_SYSTEM_PROMPTS,
  ensureOpenAIKey,
  getCurrentLiturgicalSeason,
  getSaintOfTheDay,
  openai,
} from "@/lib/openai";
import { getScriptureReferencesForTheme } from "@/lib/openscripture";
import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

interface DailyMessage {
  id: string;
  message_date: string;
  saint_name: string;
  message_content: string;
  theme: string;
  liturgical_season: string;
  scripture_reference: string;
  reflection_prompt: string;
  created_at: string;
}

export async function GET(request: NextRequest) {
  try {
    ensureOpenAIKey();

    // Get user authentication (optional for daily messages)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en";

    // Get current liturgical context
    const liturgicalSeason = getCurrentLiturgicalSeason();
    const saintOfTheDay = getSaintOfTheDay();
    const today = new Date().toISOString().split("T")[0];

    // Check if we already have a daily message for today
    const { data: existingMessage } = await (supabase as any)
      .from("daily_spiritual_messages")
      .select("*")
      .eq("message_date", today)
      .single();

    if (existingMessage) {
      const message = existingMessage as unknown as DailyMessage;
      return NextResponse.json({
        message: message.message_content,
        saint: message.saint_name,
        theme: message.theme,
        liturgicalSeason: message.liturgical_season,
        scriptureReference: message.scripture_reference,
        reflectionPrompt: message.reflection_prompt,
        cached: true,
        timestamp: message.created_at,
      });
    }

    // Generate new daily message
    const messagePrompt = buildDailyMessagePrompt(
      liturgicalSeason,
      saintOfTheDay,
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: CATHOLIC_SYSTEM_PROMPTS.DAILY_MESSAGE,
        },
        {
          role: "user",
          content: messagePrompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json(
        { error: "Failed to generate daily message" },
        { status: 500 },
      );
    }

    // Parse the generated content
    const parsedMessage = parseDailyMessage(generatedContent, saintOfTheDay);

    const enhancedScriptureReferences = await generateScriptureReferences(
      parsedMessage.theme,
      liturgicalSeason,
      language,
    );
    if (enhancedScriptureReferences.length > 0) {
      parsedMessage.scriptureReference = enhancedScriptureReferences[0];
    }

    // Save the daily message to database
    const { data: savedMessage, error: saveError } = await (supabase as any)
      .from("daily_spiritual_messages")
      .insert({
        message_date: today,
        saint_name: parsedMessage.saint,
        message_content: parsedMessage.message,
        theme: parsedMessage.theme,
        liturgical_season: liturgicalSeason,
        scripture_reference: parsedMessage.scriptureReference,
        reflection_prompt: parsedMessage.reflectionPrompt,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      console.error("Error saving daily message:", saveError);
      // Continue even if saving fails
    }

    // Track user engagement if user is authenticated
    if (user && savedMessage) {
      const { error: viewError } = await (supabase as any)
        .from("user_daily_message_views")
        .insert({
          user_id: user.id,
          daily_message_id: (savedMessage as unknown as DailyMessage).id,
          viewed_at: new Date().toISOString(),
        });

      if (viewError) {
        console.error("Error tracking message view:", viewError);
      }
    }

    return NextResponse.json({
      message: parsedMessage.message,
      saint: parsedMessage.saint,
      theme: parsedMessage.theme,
      liturgicalSeason: liturgicalSeason,
      scriptureReference: parsedMessage.scriptureReference,
      reflectionPrompt: parsedMessage.reflectionPrompt,
      cached: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating daily message:", error);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    ensureOpenAIKey();

    // Allow users to request personalized daily messages
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      preferredSaints = [],
      spiritualFocus = null,
      currentStruggles = null,
      language = "en",
    } = body;

    // Get user's spiritual context - temporarily disabled due to missing database columns
    // const { data: userProfile } = await supabase
    //   .from('user_profiles')
    //   .select('spiritual_background, preferred_devotions')
    //   .eq('id', user.id)
    //   .single();

    const liturgicalSeason = getCurrentLiturgicalSeason();

    // Generate personalized message
    const personalizedPrompt = buildPersonalizedMessagePrompt({
      liturgicalSeason,
      preferredSaints,
      spiritualFocus,
      currentStruggles,
      userProfile: null,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: CATHOLIC_SYSTEM_PROMPTS.DAILY_MESSAGE,
        },
        {
          role: "user",
          content: personalizedPrompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return NextResponse.json(
        { error: "Failed to generate personalized message" },
        { status: 500 },
      );
    }

    const parsedMessage = parseDailyMessage(generatedContent);

    const enhancedScriptureReferences = await generateScriptureReferences(
      parsedMessage.theme,
      liturgicalSeason,
      language,
    );
    if (enhancedScriptureReferences.length > 0) {
      parsedMessage.scriptureReference = enhancedScriptureReferences[0];
    }

    // Save personalized message - temporarily disabled due to missing database tables
    // const { error: saveError } = await supabase
    //   .from('user_personalized_messages')
    //   .insert({
    //     user_id: user.id,
    //     message_content: parsedMessage.message,
    //     saint_name: parsedMessage.saint,
    //     theme: parsedMessage.theme,
    //     liturgical_season: liturgicalSeason,
    //     scripture_reference: parsedMessage.scriptureReference,
    //     reflection_prompt: parsedMessage.reflectionPrompt,
    //     created_at: new Date().toISOString()
    //   });

    // if (saveError) {
    //   // Error handling for saving personalized message
    // }

    return NextResponse.json({
      message: parsedMessage.message,
      saint: parsedMessage.saint,
      theme: parsedMessage.theme,
      liturgicalSeason: liturgicalSeason,
      scriptureReference: parsedMessage.scriptureReference,
      reflectionPrompt: parsedMessage.reflectionPrompt,
      personalized: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating personalized message:", error);
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 },
    );
  }
}

function buildDailyMessagePrompt(
  liturgicalSeason: string,
  saintOfTheDay: { name: string; description: string; feast: string },
): string {
  return `Create an inspiring daily spiritual message for today's Catholic faithful.

CONTEXT:
- Liturgical Season: ${liturgicalSeason}
- Featured Saint: ${saintOfTheDay.name} - ${saintOfTheDay.description}
- Feast Day: ${saintOfTheDay.feast}

Please create a message that includes:

1. INSPIRATIONAL MESSAGE (2-3 sentences):
   - Draw from ${saintOfTheDay.name}'s life, teachings, or spiritual wisdom
   - Make it relevant to modern daily living
   - Connect to the ${liturgicalSeason} season themes
   - Be encouraging and hope-filled

2. THEME: One word or short phrase capturing the message's essence

3. SCRIPTURE REFERENCE: A relevant Bible verse that complements the message

4. REFLECTION PROMPT: A brief question or thought for personal meditation

Format your response as:
MESSAGE: [Your inspirational message here]
THEME: [Theme word/phrase]
SCRIPTURE: [Bible verse reference]
REFLECTION: [Brief reflection question or prompt]

Keep the tone warm, accessible, and spiritually nourishing for Catholics of all backgrounds.`;
}

function buildPersonalizedMessagePrompt({
  liturgicalSeason,
  preferredSaints,
  spiritualFocus,
  currentStruggles,
  userProfile,
}: {
  liturgicalSeason: string;
  preferredSaints: string[];
  spiritualFocus: string | null;
  currentStruggles: string | null;
  userProfile: { spiritual_background?: string } | null;
}): string {
  let prompt = `Create a personalized spiritual message for a Catholic seeking guidance.

LITURGICAL SEASON: ${liturgicalSeason}`;

  if (preferredSaints.length > 0) {
    prompt += `\nPREFERRED SAINTS: ${preferredSaints.join(", ")}`;
  }

  if (spiritualFocus) {
    prompt += `\nSPIRITUAL FOCUS: ${spiritualFocus}`;
  }

  if (currentStruggles) {
    prompt += `\nCURRENT STRUGGLES: ${currentStruggles}`;
  }

  if (userProfile?.spiritual_background) {
    prompt += `\nSPIRITUAL BACKGROUND: ${userProfile.spiritual_background}`;
  }

  prompt += `

Please create a personalized message that:
1. Addresses their specific spiritual focus and struggles with compassion
2. References appropriate saints from their preferences or suggests relevant ones
3. Connects to the current liturgical season
4. Offers practical spiritual guidance
5. Includes hope and encouragement

Format as:
MESSAGE: [Personalized inspirational message]
THEME: [Theme word/phrase]
SCRIPTURE: [Relevant Bible verse]
REFLECTION: [Personal reflection prompt]`;

  return prompt;
}

function parseDailyMessage(
  content: string,
  saintOfTheDay?: { name: string },
): {
  message: string;
  saint: string;
  theme: string;
  scriptureReference: string;
  reflectionPrompt: string;
} {
  const lines = content.split("\n");
  let message = "";
  let theme = "";
  let scriptureReference = "";
  let reflectionPrompt = "";

  for (const line of lines) {
    if (line.startsWith("MESSAGE:")) {
      message = line.replace("MESSAGE:", "").trim();
    } else if (line.startsWith("THEME:")) {
      theme = line.replace("THEME:", "").trim();
    } else if (line.startsWith("SCRIPTURE:")) {
      scriptureReference = line.replace("SCRIPTURE:", "").trim();
    } else if (line.startsWith("REFLECTION:")) {
      reflectionPrompt = line.replace("REFLECTION:", "").trim();
    }
  }

  // Fallbacks if parsing fails
  if (!message) {
    message = `${content.substring(0, 200)}...`;
  }
  if (!theme) {
    theme = "Daily Inspiration";
  }
  if (!scriptureReference) {
    scriptureReference = "Philippians 4:13";
  }
  if (!reflectionPrompt) {
    reflectionPrompt = "How can I grow closer to God today?";
  }

  return {
    message,
    saint: saintOfTheDay?.name || "Saints of Today",
    theme,
    scriptureReference,
    reflectionPrompt,
  };
}

async function generateScriptureReferences(
  theme: string,
  liturgicalSeason: string,
  language = "en",
): Promise<string[]> {
  try {
    const scriptureData = await getScriptureReferencesForTheme(
      theme,
      liturgicalSeason,
      language,
    );

    return scriptureData
      .map((scripture) =>
        scripture.text
          ? `${scripture.reference}: "${scripture.text}"`
          : scripture.reference,
      )
      .slice(0, 1);
  } catch (error) {
    console.error(
      "Error generating scripture references for daily message:",
      error,
    );

    // Fallback to basic references based on theme keywords with language support
    const fallbackReferences: string[] = [];
    const themeLower = theme.toLowerCase();

    if (
      themeLower.includes("peace") ||
      themeLower.includes("calm") ||
      themeLower.includes("paz") ||
      themeLower.includes("calma")
    ) {
      fallbackReferences.push(language === "es" ? "Juan 14:27" : "John 14:27");
    } else if (
      themeLower.includes("strength") ||
      themeLower.includes("courage") ||
      themeLower.includes("fuerza") ||
      themeLower.includes("valor")
    ) {
      fallbackReferences.push(
        language === "es" ? "Filipenses 4:13" : "Philippians 4:13",
      );
    } else if (
      themeLower.includes("love") ||
      themeLower.includes("compassion") ||
      themeLower.includes("amor") ||
      themeLower.includes("compasión")
    ) {
      fallbackReferences.push(
        language === "es" ? "1 Juan 4:19" : "1 John 4:19",
      );
    } else if (
      themeLower.includes("hope") ||
      themeLower.includes("trust") ||
      themeLower.includes("esperanza") ||
      themeLower.includes("confianza")
    ) {
      fallbackReferences.push(
        language === "es" ? "Romanos 15:13" : "Romans 15:13",
      );
    } else {
      fallbackReferences.push(
        language === "es" ? "Filipenses 4:13" : "Philippians 4:13",
      );
    }

    return fallbackReferences.slice(0, 1);
  }
}
