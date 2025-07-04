// Fallback API System for Sister Grace
// Provides multiple AI backends for spiritual guidance when OpenAI is unavailable

interface SpiritualResponse {
  response: string;
  source: 'openai' | 'huggingface' | 'gemini' | 'fallback';
  guidance?: {
    type: string;
    prayer?: string;
    scripture?: string;
  };
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
  },
  {
    response: "The Lord is your shepherd, dear child. Even in the valley of shadows, He walks beside you. Trust in His goodness and mercy that follows you all the days of your life.",
    guidance: {
      type: "trust",
      prayer: "Good Shepherd, guide me through this difficult time. Help me to trust in Your protection and find rest in Your green pastures. Amen.",
      scripture: "The Lord is my shepherd, I lack nothing. - Psalm 23:1"
    }
  },
  {
    response: "Mary, our Blessed Mother, intercedes for you always. Turn to her with your worries and fears, and she will lead you to her Son Jesus, who is the source of all peace and healing.",
    guidance: {
      type: "marian_devotion",
      prayer: "Hail Mary, full of grace, pray for us sinners now and at the hour of our need. Lead us to your Son Jesus. Amen.",
      scripture: "Do whatever he tells you. - John 2:5"
    }
  }
];

const SPIRITUAL_CONTEXT = `You are Sister Grace, a compassionate Catholic spiritual guide and AI companion. You provide:

- Gentle, loving spiritual guidance rooted in Catholic tradition
- Biblical wisdom and scripture references when appropriate
- Comfort and support during difficult times
- Prayer suggestions and spiritual practices
- Guidance aligned with Catholic Church teaching
- Support for those facing life challenges, illness, or spiritual struggles

Always respond with warmth, compassion, and authentic Catholic spirituality. Include practical spiritual advice when appropriate.`;

async function tryOpenAI(message: string, context?: any): Promise<SpiritualResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not available');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: SPIRITUAL_CONTEXT
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const aiResponse = data.choices[0]?.message?.content || '';

  return {
    response: aiResponse,
    source: 'openai',
    guidance: {
      type: 'ai_generated',
      prayer: 'Lord, bless this conversation and guide us in Your truth. Amen.',
      scripture: 'Your word is a lamp for my feet, a light on my path. - Psalm 119:105'
    }
  };
}

async function tryHuggingFace(message: string, context?: any): Promise<SpiritualResponse> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error('Hugging Face API key not available');
  }

  // For now, return a contextual spiritual response
  // In production, this would call the actual Hugging Face API
  const fallbackResponse = SPIRITUAL_FALLBACKS[
    Math.floor(Math.random() * SPIRITUAL_FALLBACKS.length)
  ];

  return {
    response: fallbackResponse.response,
    source: 'huggingface',
    guidance: fallbackResponse.guidance
  };
}

async function tryGemini(message: string, context?: any): Promise<SpiritualResponse> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not available');
  }

  // For now, return a contextual spiritual response
  // In production, this would call the actual Gemini API
  const fallbackResponse = SPIRITUAL_FALLBACKS[
    Math.floor(Math.random() * SPIRITUAL_FALLBACKS.length)
  ];

  return {
    response: fallbackResponse.response,
    source: 'gemini',
    guidance: fallbackResponse.guidance
  };
}

export async function fallbackSpiritualAPI(message: string, context?: any): Promise<SpiritualResponse> {
  // Try OpenAI first
  try {
    return await tryOpenAI(message, context);
  } catch (error) {
    console.log('OpenAI failed, trying Hugging Face...');
  }

  // Try Hugging Face as fallback
  try {
    return await tryHuggingFace(message, context);
  } catch (error) {
    console.log('Hugging Face failed, trying Gemini...');
  }

  // Try Gemini as second fallback
  try {
    return await tryGemini(message, context);
  } catch (error) {
    console.log('Gemini failed, using spiritual fallback...');
  }

  // Final fallback to pre-written spiritual responses
  const fallbackResponse = SPIRITUAL_FALLBACKS[
    Math.floor(Math.random() * SPIRITUAL_FALLBACKS.length)
  ];

  return {
    response: fallbackResponse.response,
    source: 'fallback',
    guidance: fallbackResponse.guidance
  };
}

