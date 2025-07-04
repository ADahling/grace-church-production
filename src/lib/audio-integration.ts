// Audio Integration System for Grace Church App
// Supports ElevenLabs TTS and browser speech synthesis

interface AudioConfig {
  elevenlabs?: {
    apiKey: string;
    voiceId: string;
  };
  browserTTS?: {
    enabled: boolean;
    voice?: string;
    rate?: number;
    pitch?: number;
  };
}

interface AudioRequest {
  text: string;
  type: 'prayer' | 'bible' | 'guidance' | 'meditation';
  voice?: 'male' | 'female' | 'neutral';
  language?: string;
}

interface AudioResponse {
  audioUrl?: string;
  audioBlob?: Blob;
  duration?: number;
  source: 'elevenlabs' | 'browser' | 'cached';
  error?: string;
}

class AudioIntegrationService {
  private config: AudioConfig;
  private audioCache: Map<string, AudioResponse> = new Map();

  constructor() {
    this.config = {
      elevenlabs: {
        apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '',
        voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL', // Default: Bella
      },
      browserTTS: {
        enabled: true,
        rate: 0.9,
        pitch: 1.0,
      },
    };
  }

  // Main method to generate audio with fallback
  public async generateAudio(request: AudioRequest): Promise<AudioResponse> {
    const cacheKey = this.getCacheKey(request);
    
    // Check cache first
    if (this.audioCache.has(cacheKey)) {
      const cached = this.audioCache.get(cacheKey)!;
      return { ...cached, source: 'cached' };
    }

    // Try ElevenLabs first (premium quality)
    if (this.config.elevenlabs?.apiKey && this.config.elevenlabs.apiKey.length > 10) {
      try {
        const elevenLabsResponse = await this.generateWithElevenLabs(request);
        if (elevenLabsResponse.audioUrl || elevenLabsResponse.audioBlob) {
          this.audioCache.set(cacheKey, elevenLabsResponse);
          return elevenLabsResponse;
        }
      } catch (error) {
        console.error('ElevenLabs TTS error:', error);
      }
    }

    // Fallback to browser TTS
    try {
      const browserResponse = await this.generateWithBrowserTTS(request);
      this.audioCache.set(cacheKey, browserResponse);
      return browserResponse;
    } catch (error) {
      console.error('Browser TTS error:', error);
      return {
        source: 'browser',
        error: 'Audio generation temporarily unavailable. Please try again later.',
      };
    }
  }

  // ElevenLabs TTS integration
  private async generateWithElevenLabs(request: AudioRequest): Promise<AudioResponse> {
    if (!this.config.elevenlabs?.apiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    // Select appropriate voice based on request
    const voiceId = this.selectElevenLabsVoice(request.voice, request.type);
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.config.elevenlabs.apiKey,
      },
      body: JSON.stringify({
        text: this.prepareTextForTTS(request.text, request.type),
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      audioUrl,
      audioBlob,
      source: 'elevenlabs',
      duration: await this.estimateAudioDuration(request.text),
    };
  }

  // Browser Speech Synthesis fallback
  private async generateWithBrowserTTS(request: AudioRequest): Promise<AudioResponse> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(
        this.prepareTextForTTS(request.text, request.type)
      );

      // Configure voice settings
      const voice = this.selectBrowserVoice(request.voice, request.language);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = this.config.browserTTS?.rate || 0.9;
      utterance.pitch = this.config.browserTTS?.pitch || 1.0;
      utterance.volume = 1.0;

      // Handle events
      utterance.onend = () => {
        resolve({
          source: 'browser',
          duration: this.estimateAudioDuration(request.text),
        });
      };

      utterance.onerror = (event) => {
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      // Start speaking
      speechSynthesis.speak(utterance);
    });
  }

  // Select appropriate ElevenLabs voice
  private selectElevenLabsVoice(voicePreference?: string, type?: string): string {
    // Voice IDs for different types and preferences
    const voices = {
      female: {
        prayer: 'EXAVITQu4vr4xnSDxMaL', // Bella - warm, gentle
        bible: 'ThT5KcBeYPX3keUQqHPh', // Dorothy - clear, reverent
        guidance: 'EXAVITQu4vr4xnSDxMaL', // Bella - compassionate
        meditation: 'oWAxZDx7w5VEj9dCyTzz', // Grace - peaceful
      },
      male: {
        prayer: 'VR6AewLTigWG4xSOukaG', // Josh - warm, deep
        bible: 'pNInz6obpgDQGcFmaJgB', // Adam - authoritative
        guidance: 'VR6AewLTigWG4xSOukaG', // Josh - comforting
        meditation: 'pNInz6obpgDQGcFmaJgB', // Adam - grounding
      },
      neutral: {
        prayer: 'EXAVITQu4vr4xnSDxMaL', // Bella - default
        bible: 'EXAVITQu4vr4xnSDxMaL', // Bella - default
        guidance: 'EXAVITQu4vr4xnSDxMaL', // Bella - default
        meditation: 'EXAVITQu4vr4xnSDxMaL', // Bella - default
      },
    };

    const voiceCategory = voicePreference || 'female';
    const audioType = type || 'prayer';
    
    return voices[voiceCategory as keyof typeof voices]?.[audioType as keyof typeof voices.female] || 
           this.config.elevenlabs?.voiceId || 
           'EXAVITQu4vr4xnSDxMaL';
  }

  // Select appropriate browser voice
  private selectBrowserVoice(voicePreference?: string, language?: string): SpeechSynthesisVoice | null {
    const voices = speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      return null;
    }

    // Filter by language first
    const languageCode = language || 'en';
    const languageVoices = voices.filter(voice => 
      voice.lang.startsWith(languageCode)
    );

    const targetVoices = languageVoices.length > 0 ? languageVoices : voices;

    // Select by gender preference
    if (voicePreference === 'male') {
      const maleVoice = targetVoices.find(voice => 
        voice.name.toLowerCase().includes('male') ||
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('mark') ||
        voice.name.toLowerCase().includes('daniel')
      );
      if (maleVoice) return maleVoice;
    }

    if (voicePreference === 'female') {
      const femaleVoice = targetVoices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('susan') ||
        voice.name.toLowerCase().includes('karen')
      );
      if (femaleVoice) return femaleVoice;
    }

    // Return first available voice
    return targetVoices[0] || null;
  }

  // Prepare text for TTS with appropriate formatting
  private prepareTextForTTS(text: string, type?: string): string {
    let processedText = text;

    // Remove markdown formatting
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '$1'); // Bold
    processedText = processedText.replace(/\*(.*?)\*/g, '$1'); // Italic
    processedText = processedText.replace(/`(.*?)`/g, '$1'); // Code

    // Add pauses for better speech flow
    if (type === 'prayer' || type === 'meditation') {
      // Add longer pauses after sentences for contemplative content
      processedText = processedText.replace(/\./g, '... ');
      processedText = processedText.replace(/\?/g, '?... ');
      processedText = processedText.replace(/!/g, '!... ');
    }

    if (type === 'bible') {
      // Add verse number pauses
      processedText = processedText.replace(/(\d+)\./g, 'Verse $1. ');
    }

    // Clean up extra spaces
    processedText = processedText.replace(/\s+/g, ' ').trim();

    return processedText;
  }

  // Estimate audio duration based on text length
  private estimateAudioDuration(text: string): number {
    // Average speaking rate: ~150 words per minute
    const words = text.split(/\s+/).length;
    const estimatedMinutes = words / 150;
    return Math.ceil(estimatedMinutes * 60); // Return seconds
  }

  // Generate cache key for audio requests
  private getCacheKey(request: AudioRequest): string {
    return `${request.type}_${request.voice || 'default'}_${request.language || 'en'}_${this.hashText(request.text)}`;
  }

  // Simple hash function for text
  private hashText(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Clear audio cache
  public clearCache(): void {
    // Revoke object URLs to prevent memory leaks
    this.audioCache.forEach(response => {
      if (response.audioUrl) {
        URL.revokeObjectURL(response.audioUrl);
      }
    });
    this.audioCache.clear();
  }

  // Get available voices for UI
  public getAvailableVoices(): { elevenlabs: boolean; browser: SpeechSynthesisVoice[] } {
    return {
      elevenlabs: !!(this.config.elevenlabs?.apiKey && this.config.elevenlabs.apiKey.length > 10),
      browser: speechSynthesis.getVoices(),
    };
  }

  // Check if audio features are available
  public isAudioAvailable(): boolean {
    return !!(
      (this.config.elevenlabs?.apiKey && this.config.elevenlabs.apiKey.length > 10) ||
      ('speechSynthesis' in window)
    );
  }
}

// Export singleton instance
export const audioIntegration = new AudioIntegrationService();

// Export types
export type { AudioRequest, AudioResponse };

