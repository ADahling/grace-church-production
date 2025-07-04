// Fallback API System for Sister Grace
// Provides multiple AI backends for spiritual guidance when OpenAI is unavailable

interface SpiritualResponse {
  message: string;
  source: 'openai' | 'huggingface' | 'gemini' | 'fallback';
  timestamp: Date;
}

interface APIConfig {
  openai?: {
    apiKey: string;
    model: string;
  };
  huggingface?: {
    apiKey: string;
    model: string;
  };
  gemini?: {
    apiKey: string;
    model: string;
  };
}

class FallbackSpiritualAPI {
  private config: APIConfig;
  private spiritualContext: string;

  constructor() {
    this.config = {
      openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4',
      },
      huggingface: {
        apiKey: process.env.HUGGINGFACE_API_KEY || '',
        model: 'microsoft/DialoGPT-large',
      },
      gemini: {
        apiKey: process.env.GEMINI_API_KEY || '',
        model: 'gemini-pro',
      },
    };

    this.spiritualContext = `You are Sister Grace, a compassionate Catholic spiritual guide and AI companion. You provide:

- Gentle, loving spiritual guidance rooted in Catholic tradition
- Biblical wisdom and scripture references when appropriate
- Comfort and support during difficult times
- Prayer suggestions and spiritual practices
- Encouragement for spiritual growth
- Always respond with warmth, empathy, and faith-based wisdom
- Keep responses concise but meaningful (2-3 sentences)
- Include relevant Bible verses when helpful
- Maintain a tone of peace, hope, and divine love

Remember: You are here to walk alongside people in their spiritual journey with the love of Christ.`;
  }

  // Primary: OpenAI GPT-4 (existing implementation)
  private async callOpenAI(message: string): Promise<SpiritualResponse | null> {
    if (!this.config.openai?.apiKey) {
      console.log('OpenAI API key not available');
      return null;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openai.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.openai.model,
          messages: [
            {
              role: 'system',
              content: this.spiritualContext,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        return {
          message: data.choices[0].message.content.trim(),
          source: 'openai',
          timestamp: new Date(),
        };
      }

      return null;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return null;
    }
  }

  // Fallback 1: Hugging Face (Free tier available)
  private async callHuggingFace(message: string): Promise<SpiritualResponse | null> {
    if (!this.config.huggingface?.apiKey) {
      console.log('Hugging Face API key not available');
      return null;
    }

    try {
      // Use a more suitable model for conversation
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.huggingface.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `${this.spiritualContext}\n\nUser: ${message}\nSister Grace:`,
            parameters: {
              max_length: 200,
              temperature: 0.7,
              do_sample: true,
              top_p: 0.9,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data[0]?.generated_text) {
        // Extract the response after "Sister Grace:"
        const fullText = data[0].generated_text;
        const responseStart = fullText.indexOf('Sister Grace:') + 'Sister Grace:'.length;
        const spiritualResponse = fullText.substring(responseStart).trim();
        
        return {
          message: spiritualResponse || this.getDefaultSpiritualResponse(message),
          source: 'huggingface',
          timestamp: new Date(),
        };
      }

      return null;
    } catch (error) {
      console.error('Hugging Face API error:', error);
      return null;
    }
  }

  // Fallback 2: Google Gemini (Free tier available)
  private async callGemini(message: string): Promise<SpiritualResponse | null> {
    if (!this.config.gemini?.apiKey) {
      console.log('Gemini API key not available');
      return null;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.config.gemini.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${this.spiritualContext}\n\nUser message: ${message}\n\nPlease respond as Sister Grace with spiritual guidance:`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 300,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return {
          message: data.candidates[0].content.parts[0].text.trim(),
          source: 'gemini',
          timestamp: new Date(),
        };
      }

      return null;
    } catch (error) {
      console.error('Gemini API error:', error);
      return null;
    }
  }

  // Ultimate fallback: Pre-written spiritual responses
  private getDefaultSpiritualResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Categorize the message and provide appropriate response
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worry') || lowerMessage.includes('fear')) {
      return "Peace be with you, dear child. In times of anxiety, remember Jesus' words: 'Do not let your hearts be troubled. Trust in God; trust also in me.' (John 14:1) Take a moment to breathe deeply and know that God holds you in His loving hands. Would you like to pray together?";
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('grief')) {
      return "My heart goes out to you in this difficult time. Remember that 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' (Psalm 34:18) Your pain is real, and God sees every tear. You are deeply loved and never alone in your suffering.";
    }
    
    if (lowerMessage.includes('prayer') || lowerMessage.includes('pray')) {
      return "How beautiful that you seek prayer! 'The prayer of a righteous person is powerful and effective.' (James 5:16) Let us turn our hearts to God together. What would you like to pray about today? I'm here to guide you in conversation with our loving Father.";
    }
    
    if (lowerMessage.includes('forgive') || lowerMessage.includes('guilt') || lowerMessage.includes('sin')) {
      return "God's mercy is infinite, dear one. 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.' (1 John 1:9) Your desire for forgiveness shows a heart open to God's grace. He loves you unconditionally.";
    }
    
    if (lowerMessage.includes('purpose') || lowerMessage.includes('meaning') || lowerMessage.includes('direction')) {
      return "God has a beautiful plan for your life! 'For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, to give you hope and a future.' (Jeremiah 29:11) Trust in His timing and guidance as you seek His will for your path.";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('grateful')) {
      return "What a joy to hear your grateful heart! 'Give thanks to the Lord, for he is good; his love endures forever.' (Psalm 107:1) Gratitude opens our hearts to receive even more of God's blessings. May your thankful spirit continue to draw you closer to Him.";
    }
    
    // Default response for general spiritual guidance
    return "Peace be with you, my dear child. I'm here to walk with you on your spiritual journey. Whether you need prayer, guidance, or simply someone to listen, know that you are deeply loved by God. 'Cast all your anxiety on him because he cares for you.' (1 Peter 5:7) How may I help you grow closer to our Lord today?";
  }

  // Main public method with complete fallback chain
  public async getSpiritualGuidance(message: string): Promise<SpiritualResponse> {
    // Try OpenAI first (primary)
    let response = await this.callOpenAI(message);
    if (response) {
      return response;
    }

    // Try Hugging Face (fallback 1)
    response = await this.callHuggingFace(message);
    if (response) {
      return response;
    }

    // Try Gemini (fallback 2)
    response = await this.callGemini(message);
    if (response) {
      return response;
    }

    // Ultimate fallback: pre-written responses
    return {
      message: this.getDefaultSpiritualResponse(message),
      source: 'fallback',
      timestamp: new Date(),
    };
  }

  // Health check for all APIs
  public async checkAPIHealth(): Promise<{
    openai: boolean;
    huggingface: boolean;
    gemini: boolean;
  }> {
    const testMessage = "Hello";
    
    const [openaiResult, hfResult, geminiResult] = await Promise.allSettled([
      this.callOpenAI(testMessage),
      this.callHuggingFace(testMessage),
      this.callGemini(testMessage),
    ]);

    return {
      openai: openaiResult.status === 'fulfilled' && openaiResult.value !== null,
      huggingface: hfResult.status === 'fulfilled' && hfResult.value !== null,
      gemini: geminiResult.status === 'fulfilled' && geminiResult.value !== null,
    };
  }

  // Get API status for monitoring
  public getAPIStatus(): {
    configured: string[];
    available: string[];
  } {
    const configured = [];
    const available = [];

    if (this.config.openai?.apiKey) {
      configured.push('openai');
      available.push('openai');
    }
    
    if (this.config.huggingface?.apiKey) {
      configured.push('huggingface');
      available.push('huggingface');
    }
    
    if (this.config.gemini?.apiKey) {
      configured.push('gemini');
      available.push('gemini');
    }

    // Fallback is always available
    available.push('fallback');

    return { configured, available };
  }
}

// Export singleton instance
export const fallbackSpiritualAPI = new FallbackSpiritualAPI();

// Export types
export type { SpiritualResponse };

