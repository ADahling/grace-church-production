import { NextRequest, NextResponse } from 'next/server';
import { fallbackSpiritualAPI } from '../../../../lib/fallback-apis';

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

// Spiritual fallback responses for when all APIs fail
const SPIRITUAL_FALLBACKS = [
  {
    response: "Peace be with you, dear child. In times of uncertainty, remember that God's love surrounds you always. Take a moment to breathe deeply and feel His presence in your heart.",
    guidance: {
      type: "comfort",
      prayer: "Lord, grant me peace in this moment of need. Help me to trust in Your divine plan and find comfort in Your eternal love. Amen.",
      scripture: "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7"
    }
  },
  {
    response: "God sees your struggles and walks with you through every challenge. You are never alone in your spiritual journey. Trust in His timing and His perfect plan for your life.",
    guidance: {
      type: "encouragement",
      prayer: "Heavenly Father, strengthen my faith and help me to see Your hand at work in my life. Give me patience and trust in Your divine will. Amen.",
      scripture: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future. - Jeremiah 29:11"
    }
  },
  {
    response: "In moments of spiritual dryness, remember that even the saints experienced times of darkness. This is part of your spiritual growth. Continue to pray, even when it feels difficult.",
    guidance: {
      type: "spiritual_growth",
      prayer: "Jesus, help me to persevere in prayer even when I cannot feel Your presence. Increase my faith and draw me closer to Your Sacred Heart. Amen.",
      scripture: "Be still and know that I am God. - Psalm 46:10"
    }
  }
];

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
            prayer: 'Lord, grant me patience and help me to slow down in Your presence. Amen.',
            scripture: 'Be still and know that I am God. - Psalm 46:10'
          }
        },
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          response: 'I apologize, but I had trouble understanding your message. Please try rephrasing your spiritual question, and I will do my best to help you.',
          source: 'input_error',
          timestamp: new Date().toISOString(),
          guidance: {
            type: 'clarification',
            prayer: 'Holy Spirit, guide our communication and help us understand each other. Amen.',
            scripture: 'Let your speech always be gracious, seasoned with salt. - Colossians 4:6'
          }
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    }

    const { message, context } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        {
          response: 'Please share what is on your heart, dear child. I am here to listen and offer spiritual guidance.',
          source: 'validation_error',
          timestamp: new Date().toISOString(),
          guidance: {
            type: 'invitation',
            prayer: 'Lord, open my heart to share my thoughts and feelings with You. Amen.',
            scripture: 'Come to me, all you who are weary and burdened, and I will give you rest. - Matthew 11:28'
          }
        },
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    }

    // Try the fallback API system
    try {
      const response = await fallbackSpiritualAPI(message, context);
      
      return NextResponse.json(
        {
          response: response.response,
          source: response.source,
          timestamp: new Date().toISOString(),
          guidance: response.guidance || {
            type: 'general',
            prayer: 'Lord, bless this conversation and guide us in Your truth. Amen.',
            scripture: 'Your word is a lamp for my feet, a light on my path. - Psalm 119:105'
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    } catch (apiError) {
      console.error('Fallback API error:', apiError);
      
      // Final fallback to pre-written spiritual responses
      const fallbackResponse = SPIRITUAL_FALLBACKS[
        Math.floor(Math.random() * SPIRITUAL_FALLBACKS.length)
      ];

      return NextResponse.json(
        {
          response: fallbackResponse.response,
          source: 'spiritual_fallback',
          timestamp: new Date().toISOString(),
          guidance: fallbackResponse.guidance
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    }

  } catch (error) {
    console.error('Sister Grace API error:', error);
    
    // Emergency spiritual response
    return NextResponse.json(
      {
        response: 'My dear child, I am experiencing some technical difficulties, but please know that God is always with you. In times of trouble, turn to prayer and trust in His infinite love and mercy.',
        source: 'emergency_fallback',
        timestamp: new Date().toISOString(),
        guidance: {
          type: 'emergency',
          prayer: 'Lord Jesus, in this moment of technical difficulty, I trust in Your presence. Help me to remember that You are always near, even when technology fails. Amen.',
          scripture: 'The Lord your God is with you, the Mighty Warrior who saves. - Zephaniah 3:17'
        }
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
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

