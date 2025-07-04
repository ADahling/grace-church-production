import { NextRequest, NextResponse } from 'next/server';
import { fallbackSpiritualAPI } from '../../../../lib/fallback-apis';
import { FALLBACK_SPIRITUAL_GUIDANCE } from '../../../../lib/fallback-data';

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          response: 'Peace, dear child. Please take a moment to reflect before continuing our conversation. Sister Grace will be here when you return.',
          source: 'rate_limit',
          timestamp: new Date().toISOString(),
          guidance: {
            type: 'rate_limit',
            context: 'spiritual_patience',
            tone: 'gentle',
          },
          retryAfter: 60,
        },
        { 
          status: 200, // Return 200 for better UX
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(Date.now() / 1000) + 60),
            'Retry-After': '60',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        {
          response: 'Peace be with you. Please share what\'s on your heart, and I\'ll do my best to help.',
          source: 'validation',
          timestamp: new Date().toISOString(),
          guidance: {
            type: 'welcome',
            context: 'spiritual_invitation',
            tone: 'welcoming',
          },
        },
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    // Validate message length
    if (message.length > 1000) {
      return NextResponse.json(
        {
          response: 'Dear child, your message is quite long. Please share your thoughts in smaller portions so I can give you my full attention.',
          source: 'validation',
          timestamp: new Date().toISOString(),
          guidance: {
            type: 'message_length',
            context: 'spiritual_guidance',
            tone: 'gentle',
          },
        },
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    // Get spiritual guidance using comprehensive fallback system
    const spiritualResponse = await fallbackSpiritualAPI.getSpiritualGuidance(message);

    // Enhanced response with spiritual context and saint recommendations
    const enhancedResponse = {
      response: spiritualResponse.message,
      source: spiritualResponse.source,
      timestamp: spiritualResponse.timestamp.toISOString(),
      guidance: {
        type: 'spiritual_support',
        context: 'catholic_tradition',
        tone: 'compassionate',
      },
      saintRecommendations: getSaintRecommendations(message),
      scriptureReferences: getScriptureReferences(message),
      liturgicalSeason: getCurrentLiturgicalSeason(),
      saintOfTheDay: getSaintOfTheDay(),
    };

    return NextResponse.json(enhancedResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-Spiritual-Source': spiritualResponse.source,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Sister Grace API Error:', error);

    // Graceful error with spiritual comfort
    const fallbackMessage = FALLBACK_SPIRITUAL_GUIDANCE.guidance;

    return NextResponse.json(
      {
        response: fallbackMessage,
        source: 'fallback',
        timestamp: new Date().toISOString(),
        guidance: {
          type: 'spiritual_comfort',
          context: 'error_recovery',
          tone: 'peaceful',
        },
        saintRecommendations: ['St. Thérèse of Lisieux (the Little Way)', 'St. Joseph (patron of families)'],
        scriptureReferences: ['Psalm 46:10 - "Be still and know that I am God"'],
        liturgicalSeason: getCurrentLiturgicalSeason(),
        saintOfTheDay: getSaintOfTheDay(),
      },
      { 
        status: 200, // Return 200 to avoid frontend errors
        headers: {
          'Content-Type': 'application/json',
          'X-Spiritual-Source': 'fallback',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Health check endpoint
export async function GET(request: NextRequest) {
  try {
    const apiStatus = fallbackSpiritualAPI.getAPIStatus();
    const healthCheck = await fallbackSpiritualAPI.checkAPIHealth();

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      apis: {
        configured: apiStatus.configured,
        available: apiStatus.available,
        health: healthCheck,
      },
      message: 'Sister Grace is ready to provide spiritual guidance with multiple AI backends',
      fallbackChain: ['OpenAI GPT-4', 'Hugging Face', 'Google Gemini', 'Pre-written Responses'],
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        message: 'Sister Grace is experiencing some difficulties but fallback guidance is available',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

// Helper functions for enhanced spiritual context
function getSaintRecommendations(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('stress')) {
    return ['St. Dymphna (patron of anxiety)', 'St. Padre Pio (comfort in suffering)'];
  }
  
  if (lowerMessage.includes('prayer') || lowerMessage.includes('pray')) {
    return ['St. Teresa of Avila (mystical prayer)', 'St. Thérèse of Lisieux (simple prayer)'];
  }
  
  if (lowerMessage.includes('work') || lowerMessage.includes('job')) {
    return ['St. Joseph the Worker', 'St. Thomas More (integrity in work)'];
  }
  
  if (lowerMessage.includes('family') || lowerMessage.includes('marriage')) {
    return ['St. Joseph (protector of families)', 'Sts. Louis and Zelie Martin (holy marriage)'];
  }
  
  if (lowerMessage.includes('healing') || lowerMessage.includes('sick')) {
    return ['St. Raphael the Archangel (divine healer)', 'Our Lady of Lourdes (miraculous healing)'];
  }
  
  // Default recommendations
  return ['St. Thérèse of Lisieux (the Little Way)', 'St. Joseph (patron of families)'];
}

function getScriptureReferences(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('peace') || lowerMessage.includes('calm')) {
    return ['John 14:27 - "Peace I leave with you"', 'Philippians 4:6-7 - "Do not be anxious"'];
  }
  
  if (lowerMessage.includes('strength') || lowerMessage.includes('courage')) {
    return ['Joshua 1:9 - "Be strong and courageous"', 'Philippians 4:13 - "I can do all things through Christ"'];
  }
  
  if (lowerMessage.includes('fear') || lowerMessage.includes('afraid')) {
    return ['Isaiah 41:10 - "Fear not, for I am with you"', '1 John 4:18 - "Perfect love drives out fear"'];
  }
  
  if (lowerMessage.includes('forgiveness') || lowerMessage.includes('sin')) {
    return ['1 John 1:9 - "If we confess our sins"', 'Psalm 51:10 - "Create in me a pure heart"'];
  }
  
  if (lowerMessage.includes('love')) {
    return ['1 John 4:19 - "We love because he first loved us"', 'Romans 8:38-39 - "Nothing can separate us from God\'s love"'];
  }
  
  // Default references
  return ['Psalm 23:1 - "The Lord is my shepherd"', 'Matthew 11:28 - "Come to me, all who are weary"'];
}

function getCurrentLiturgicalSeason(): string {
  const now = new Date();
  const month = now.getMonth() + 1; // JavaScript months are 0-indexed
  const day = now.getDate();
  
  // Simple liturgical season calculation
  if ((month === 12 && day >= 1) || (month === 1 && day <= 6)) {
    return 'Advent/Christmas';
  } else if (month >= 2 && month <= 4) {
    return 'Lent/Easter';
  } else if (month >= 5 && month <= 6) {
    return 'Easter Season';
  } else {
    return 'Ordinary Time';
  }
}

function getSaintOfTheDay(): { name: string; description: string } {
  const saints = [
    { name: 'St. Thérèse of Lisieux', description: 'The Little Flower, patron of missions' },
    { name: 'St. Joseph', description: 'Foster father of Jesus, patron of workers' },
    { name: 'St. Francis of Assisi', description: 'Patron of animals and ecology' },
    { name: 'St. Teresa of Avila', description: 'Mystic and Doctor of the Church' },
    { name: 'St. John Vianney', description: 'The Curé of Ars, patron of priests' },
    { name: 'St. Padre Pio', description: 'Mystic with the stigmata' },
    { name: 'St. Faustina', description: 'Apostle of Divine Mercy' },
  ];
  
  const today = new Date().getDate();
  return saints[today % saints.length];
}

