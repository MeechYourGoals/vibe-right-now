
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
  // Adam voice ID - consistent male voice
  private static defaultVoiceId: string = 'pNInz6obpgDQGcFmaJgB';
  
  // Set API key
  public static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('elevenLabsApiKey', apiKey);
  }
  
  // Get API key from local storage if available.
  //
  // Never ship a default provider key in client code: browser bundles and
  // localStorage are user-readable, so any embedded key should be treated as
  // compromised. Production ElevenLabs calls should prefer Supabase Edge
  // Functions with server-side secrets.
  public static getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('elevenLabsApiKey');
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
