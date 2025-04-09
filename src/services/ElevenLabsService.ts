
// Eleven Labs API integration
// This service handles text-to-speech conversion using Eleven Labs API

interface ElevenLabsOptions {
  voice_id?: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
  };
}

export class ElevenLabsService {
  private static apiKey: string | null = null;
  private static defaultApiKey: string = 'sk_236c24971a353bfa897b2c150b2d256ae65e352b405e3e4f';
  
  // Set API key
  public static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('elevenLabsApiKey', apiKey);
  }
  
  // Get API key from local storage if available, or use default
  public static getApiKey(): string | null {
    if (!this.apiKey) {
      // Try to get from localStorage first
      this.apiKey = localStorage.getItem('elevenLabsApiKey') || this.defaultApiKey;
      
      // If still no key, save the default key
      if (this.apiKey === this.defaultApiKey && !localStorage.getItem('elevenLabsApiKey')) {
        localStorage.setItem('elevenLabsApiKey', this.defaultApiKey);
      }
    }
    return this.apiKey;
  }
  
  // Clear API key
  public static clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('elevenLabsApiKey');
  }
  
  // Check if API key is available
  public static hasApiKey(): boolean {
    return !!this.getApiKey();
  }
  
  // Text to speech conversion
  public static async textToSpeech(
    text: string, 
    options: ElevenLabsOptions = {}
  ): Promise<ArrayBuffer | null> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return null;
    }
    
    try {
      // Default options
      const defaultVoiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice (free tier)
      const defaultModel = 'eleven_monolingual_v1';
      
      const voiceId = options.voice_id || defaultVoiceId;
      const modelId = options.model_id || defaultModel;
      
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: options.voice_settings || {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Eleven Labs API error: ${errorData.detail || response.statusText}`);
      }
      
      // Return audio as ArrayBuffer
      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error in Eleven Labs text-to-speech:', error);
      return null;
    }
  }
  
  // Get available voices
  public static async getVoices(): Promise<any[]> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.error('Eleven Labs API key not set');
      return [];
    }
    
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`Eleven Labs API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching Eleven Labs voices:', error);
      return [];
    }
  }
}
