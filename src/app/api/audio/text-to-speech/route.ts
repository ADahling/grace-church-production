import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { checkRateLimit } from "../../../../lib/rate-limit";

// Rate limiting for TTS
const TTS_RATE_LIMIT = {
  requests: 10, // requests per hour
  window: 60 * 60 * 1000, // 1 hour in milliseconds
};

interface TTSRequest {
  text: string;
  language: "en" | "es" | "fr" | "it" | "pt" | "la";
  voice: "male" | "female" | "child";
  speed: number; // 0.5 to 2.0
  prayerType: "traditional" | "meditation" | "chant";
}

// Supported voices by language
const VOICE_MAPPING = {
  en: {
    male: "en-US-AriaNeural",
    female: "en-US-JennyNeural",
    child: "en-US-GuyNeural",
  },
  es: {
    male: "es-ES-AlvaroNeural",
    female: "es-ES-ElviraNeural",
    child: "es-MX-DaliaNeural",
  },
  fr: {
    male: "fr-FR-HenriNeural",
    female: "fr-FR-DeniseNeural",
    child: "fr-FR-EloiseNeural",
  },
  it: {
    male: "it-IT-DiegoNeural",
    female: "it-IT-ElsaNeural",
    child: "it-IT-IsabellaNeural",
  },
  pt: {
    male: "pt-BR-AntonioNeural",
    female: "pt-BR-FranciscaNeural",
    child: "pt-PT-RaquelNeural",
  },
  la: {
    male: "en-US-AriaNeural", // Latin using English voice with slow speed
    female: "en-US-JennyNeural",
    child: "en-US-GuyNeural",
  },
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Parse request
    const body: TTSRequest = await request.json();
    const { text, language, voice, speed, prayerType } = body;

    // Validate input
    if (!text || text.length > 2000) {
      return NextResponse.json(
        {
          error: "Text is required and must be under 2000 characters",
        },
        { status: 400 },
      );
    }

    if (!VOICE_MAPPING[language]) {
      return NextResponse.json(
        {
          error: "Unsupported language",
        },
        { status: 400 },
      );
    }

    // Check rate limit
    const rateLimitCheck = await checkTTSRateLimit(user.id);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: rateLimitCheck.retryAfter,
        },
        { status: 429 },
      );
    }

    // Check cache first
    const cachedAudio = await getCachedAudio(text, language, voice, speed);
    if (cachedAudio) {
      return NextResponse.json({
        audioUrl: cachedAudio.url,
        duration: cachedAudio.duration,
        cached: true,
      });
    }

    const elevenlabsApiKey = process.env.ELEVENLABS_API_KEY;
    const azureSpeechKey = process.env.AZURE_SPEECH_KEY;

    if (!elevenlabsApiKey && !azureSpeechKey) {
      return NextResponse.json(
        {
          error:
            "Audio generation API keys not configured. Please contact support.",
          fallback: "web-speech-api",
        },
        { status: 503 },
      );
    }

    // Generate audio based on provider
    let audioResult: { url: string; duration: number };
    if (elevenlabsApiKey) {
      audioResult = await generateElevenLabsAudio(
        text,
        language,
        voice,
        speed,
        prayerType,
      );
    } else if (azureSpeechKey) {
      audioResult = await generateAzureSpeechAudio(
        text,
        language,
        voice,
        speed,
        prayerType,
      );
    } else {
      return NextResponse.json(
        {
          error: "Audio generation not configured",
          fallback: "web-speech-api",
        },
        { status: 503 },
      );
    }

    // Cache the result
    await cacheAudio(text, language, voice, speed, audioResult);

    // Log usage
    await logTTSUsage(user.id, text.length, language, prayerType);

    return NextResponse.json({
      audioUrl: audioResult.url,
      duration: audioResult.duration,
      cached: false,
    });
  } catch (error) {
    console.error("TTS generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate audio",
      },
      { status: 500 },
    );
  }
}

async function checkTTSRateLimit(
  userId: string,
): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    const rateLimitResult = await checkRateLimit(userId, "tts");
    return {
      allowed: rateLimitResult.allowed,
      retryAfter: rateLimitResult.resetTime
        ? Math.ceil((rateLimitResult.resetTime.getTime() - Date.now()) / 1000)
        : undefined,
    };
  } catch (error) {
    console.error("Exception in rate limit check:", error);
    return { allowed: true }; // Allow on exception to not block functionality
  }
}

async function getCachedAudio(
  text: string,
  language: string,
  voice: string,
  speed: number,
): Promise<{ url: string; duration: number } | null> {
  try {
    const supabase = await createClient();
    const cacheKey = generateCacheKey(text, language, voice, speed);

    const { data, error } = await (supabase as any)
      .from("tts_audio_cache")
      .select("audio_url, duration")
      .eq("cache_key", cacheKey)
      .gte("expires_at", new Date().toISOString())
      .single();

    if (error || !data) {
      return null;
    }

    return {
      url: data.audio_url,
      duration: data.duration,
    };
  } catch (error) {
    console.error("Exception retrieving cached audio:", error);
    return null; // Gracefully handle any exceptions
  }
}

async function cacheAudio(
  text: string,
  language: string,
  voice: string,
  speed: number,
  audioResult: { url: string; duration: number },
) {
  try {
    const supabase = await createClient();
    const cacheKey = generateCacheKey(text, language, voice, speed);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Cache for 24 hours

    const { error } = await (supabase as any).from("tts_audio_cache").upsert({
      cache_key: cacheKey,
      text_content: text,
      language: language,
      voice: voice,
      speed: speed,
      audio_url: audioResult.url,
      duration: audioResult.duration,
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error caching audio:", error);
    }
  } catch (error) {
    console.error("Exception caching audio:", error);
  }
}

async function logTTSUsage(
  userId: string,
  textLength: number,
  language: string,
  prayerType: string,
) {
  try {
    const supabase = await createClient();

    const { error } = await (supabase as any).from("user_api_costs").insert({
      user_id: userId,
      api_type: "tts",
      tokens_used: textLength,
      cost_usd: textLength * 0.000015, // Estimated cost per character
      metadata: {
        language: language,
        prayer_type: prayerType,
        service: "text-to-speech",
      },
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error logging TTS usage:", error);
    }
  } catch (error) {
    console.error("Exception logging TTS usage:", error);
  }
}

function generateCacheKey(
  text: string,
  language: string,
  voice: string,
  speed: number,
): string {
  const content = `${text}-${language}-${voice}-${speed}`;
  // Simple hash function for cache key
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

async function generateElevenLabsAudio(
  text: string,
  language: string,
  voice: string,
  speed: number,
  prayerType: string,
) {
  // ElevenLabs API integration
  const voiceId = getElevenLabsVoiceId(language, voice);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: prayerType === "chant" ? 0.8 : 0.5,
          similarity_boost: 0.75,
          style: prayerType === "meditation" ? 0.3 : 0.5,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("ElevenLabs API error");
  }

  const audioBuffer = await response.arrayBuffer();

  // Upload to Supabase Storage
  const supabase = await createClient();
  const fileName = `tts-${Date.now()}-${generateCacheKey(text, language, voice, speed)}.mp3`;

  const { data: uploadData, error } = await supabase.storage
    .from("audio-files")
    .upload(`generated/${fileName}`, audioBuffer, {
      contentType: "audio/mpeg",
    });

  if (error) {
    throw new Error("Storage upload failed");
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("audio-files")
    .getPublicUrl(`generated/${fileName}`);

  return {
    url: publicUrl,
    duration: estimateAudioDuration(text, speed),
  };
}

async function generateAzureSpeechAudio(
  text: string,
  language: string,
  voice: string,
  speed: number,
  prayerType: string,
) {
  // Azure Cognitive Services Speech API integration
  const voiceName =
    VOICE_MAPPING[language as keyof typeof VOICE_MAPPING][
      voice as keyof (typeof VOICE_MAPPING)[keyof typeof VOICE_MAPPING]
    ];

  const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">
      <voice name="${voiceName}">
        <prosody rate="${speed === 1 ? "medium" : speed < 1 ? "slow" : "fast"}"
                 pitch="${prayerType === "chant" ? "low" : "medium"}">
          ${text}
        </prosody>
      </voice>
    </speak>
  `;

  const response = await fetch(
    `https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_KEY || "",
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    },
  );

  if (!response.ok) {
    throw new Error("Azure Speech API error");
  }

  const audioBuffer = await response.arrayBuffer();

  // Upload to Supabase Storage
  const supabase = await createClient();
  const fileName = `tts-${Date.now()}-${generateCacheKey(text, language, voice, speed)}.mp3`;

  const { data: uploadData, error } = await supabase.storage
    .from("audio-files")
    .upload(`generated/${fileName}`, audioBuffer, {
      contentType: "audio/mpeg",
    });

  if (error) {
    throw new Error("Storage upload failed");
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("audio-files")
    .getPublicUrl(`generated/${fileName}`);

  return {
    url: publicUrl,
    duration: estimateAudioDuration(text, speed),
  };
}

function getElevenLabsVoiceId(language: string, voice: string): string {
  // Map to ElevenLabs voice IDs
  const voiceIds = {
    "en-male": "EXAVITQu4vr4xnSDxMaL",
    "en-female": "ThT5KcBeYPX3keUQqHPh",
    "es-male": "GBv7mTt0atIp3Br8iCZE",
    "es-female": "YwVfvSFrU8PgOGrM7QJx",
    "fr-male": "TxGEqnHWrfWFTfGW9XjX",
    "fr-female": "VR6AewLTigWG4xSOukaG",
  };

  return (
    voiceIds[`${language}-${voice}` as keyof typeof voiceIds] ||
    voiceIds["en-female"]
  );
}

function estimateAudioDuration(text: string, speed: number): number {
  // Rough estimation: 150 words per minute for normal speech
  const words = text.split(" ").length;
  const baseMinutes = words / 150;
  const adjustedMinutes = baseMinutes / speed;
  return Math.ceil(adjustedMinutes * 60); // Convert to seconds
}
