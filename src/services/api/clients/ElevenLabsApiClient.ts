
import { ApiClient } from '../ApiClient';
import { loggingInterceptor, authInterceptor, errorHandlingInterceptor } from '../interceptors';

export class ElevenLabsApiClient extends ApiClient {
  constructor(apiKey?: string) {
    super({
      baseUrl: 'https://api.elevenlabs.io/v1',
      timeout: 30000,
      retries: 2,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'xi-api-key': apiKey })
      }
    });

    // Add interceptors
    this.addInterceptor(loggingInterceptor);
    this.addInterceptor(errorHandlingInterceptor);
  }

  async textToSpeech(text: string, voiceId: string = 'nPczCjzI2devNBz1zQrb', options: any = {}): Promise<ArrayBuffer> {
    const response = await this.post(`/text-to-speech/${voiceId}`, {
      text,
      model_id: options.model || 'eleven_multilingual_v2',
      voice_settings: {
        stability: options.stability || 0.75,
        similarity_boost: options.similarityBoost || 0.85,
        style: options.style || 0.2,
        use_speaker_boost: options.useSpeakerBoost !== false
      }
    });

    if (!response.success) {
      throw new Error(response.error || 'ElevenLabs TTS request failed');
    }

    return response.data;
  }

  async getVoices(): Promise<any> {
    const response = await this.get('/voices');

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch voices');
    }

    return response.data;
  }

  async getVoice(voiceId: string): Promise<any> {
    const response = await this.get(`/voices/${voiceId}`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch voice');
    }

    return response.data;
  }

  async speechToText(audioBase64: string): Promise<string> {
    // ElevenLabs doesn't have native STT, so this would use their scribe feature
    // or integrate with their conversational AI
    const response = await this.post('/speech-to-text', {
      audio: audioBase64
    });

    if (!response.success) {
      throw new Error(response.error || 'ElevenLabs STT request failed');
    }

    return response.data.transcript;
  }
}
