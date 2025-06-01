
import { VertexAIService } from './VertexAIService';

/**
 * ElevenLabs Service that proxies through Google Vertex AI
 * Maintains backward compatibility while using Google ecosystem
 */

export interface ElevenLabsOptions {
  voice?: string;
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
  optimize_streaming_latency?: number;
  output_format?: string;
}

export interface ScribeTranscriptionOptions {
  model?: string;
  language?: string;
  timestamps?: boolean;
}

export class ElevenLabsService {
  private static apiKey: string | null = null;

  /**
   * Set API key (for backward compatibility)
   */
  static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Check if API key is available (for backward compatibility)
   */
  static hasApiKey(): boolean {
    return !!this.apiKey;
  }

  /**
   * Convert text to speech (proxied to Google TTS)
   */
  static async textToSpeech(
    text: string,
    voiceId: string = 'en-US-Neural2-D',
    options: ElevenLabsOptions = {}
  ): Promise<string> {
    try {
      console.log('ElevenLabs proxy: using Google TTS for:', text.substring(0, 50) + '...');
      
      // Map ElevenLabs options to Google TTS options
      const googleOptions = {
        voice: voiceId,
        speakingRate: 1.0,
        pitch: 0
      };
      
      return await VertexAIService.textToSpeech(text, googleOptions);
    } catch (error) {
      console.error('Error in ElevenLabs proxy service:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text (proxied to Google STT)
   */
  static async speechToText(
    audioBase64: string,
    options: ScribeTranscriptionOptions = {}
  ): Promise<string | null> {
    try {
      console.log('ElevenLabs proxy: using Google STT');
      return await VertexAIService.speechToText(audioBase64);
    } catch (error) {
      console.error('Error in ElevenLabs STT proxy:', error);
      return null;
    }
  }

  /**
   * Get available voices (returning Google TTS voices)
   */
  static async getVoices(): Promise<any[]> {
    // Return a list of Google TTS voices in ElevenLabs format for compatibility
    return [
      { voice_id: 'en-US-Neural2-D', name: 'David (Male)', category: 'generated' },
      { voice_id: 'en-US-Neural2-F', name: 'Emma (Female)', category: 'generated' },
      { voice_id: 'en-US-Neural2-A', name: 'Alex (Male)', category: 'generated' },
      { voice_id: 'en-US-Neural2-C', name: 'Grace (Female)', category: 'generated' }
    ];
  }

  /**
   * Create agent task (mock implementation for compatibility)
   */
  static async createAgentTask(request: any): Promise<any> {
    console.log('ElevenLabs proxy: createAgentTask not implemented, using mock response');
    return { conversation_id: 'mock-id', status: 'started' };
  }
}

// Re-export for backward compatibility
export { ElevenLabsService as default };
