
import { VertexAIService } from './VertexAIService';

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

  static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  static hasApiKey(): boolean {
    return !!this.apiKey;
  }

  static async textToSpeech(
    text: string,
    voiceId: string = 'en-US-Neural2-D',
    options: ElevenLabsOptions = {}
  ): Promise<string> {
    try {
      console.log('ElevenLabs proxy: using Google TTS for:', text.substring(0, 50) + '...');
      
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

  static async getVoices(): Promise<any[]> {
    return [
      { voice_id: 'en-US-Neural2-D', name: 'David (Male)', category: 'generated' },
      { voice_id: 'en-US-Neural2-F', name: 'Emma (Female)', category: 'generated' },
      { voice_id: 'en-US-Neural2-A', name: 'Alex (Male)', category: 'generated' },
      { voice_id: 'en-US-Neural2-C', name: 'Grace (Female)', category: 'generated' }
    ];
  }

  static async createAgentTask(request: any): Promise<any> {
    console.log('ElevenLabs proxy: createAgentTask not implemented, using mock response');
    return { conversation_id: 'mock-id', status: 'started' };
  }
}

export { ElevenLabsService as default };
