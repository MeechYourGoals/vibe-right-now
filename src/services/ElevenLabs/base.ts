
// Base configuration and common utilities for Eleven Labs API

export interface ElevenLabsOptions {
  voice_id?: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
  };
}

export interface ScribeTranscriptionOptions {
  prompt?: string;
  language?: string;
  expected_format?: string;
  chunk_size?: number;
}

export class ElevenLabsBase {
  private static apiKey: string | null = null;
  private static defaultApiKey: string = 'sk_236c24971a353bfa897b2c150b2d256ae65e352b405e3e4f';
  // Explicitly set to Adam voice ID for consistent male voice
  private static defaultVoiceId: string = 'pNInz6obpgDQGcFmaJgB'; // Adam voice - consistent male voice
  
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

  // Get default voice ID
  public static getDefaultVoiceId(): string {
    return this.defaultVoiceId;
  }
}
