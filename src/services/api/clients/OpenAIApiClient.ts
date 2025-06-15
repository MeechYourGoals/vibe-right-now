
import { ApiClient } from '../ApiClient';
import { loggingInterceptor, authInterceptor, errorHandlingInterceptor } from '../interceptors';

export class OpenAIApiClient extends ApiClient {
  constructor(apiKey?: string) {
    super({
      baseUrl: 'https://api.openai.com/v1',
      timeout: 60000,
      retries: 3,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
      }
    });

    // Add interceptors
    this.addInterceptor(loggingInterceptor);
    this.addInterceptor(errorHandlingInterceptor);
  }

  async chatCompletion(messages: any[], options: any = {}): Promise<any> {
    const response = await this.post('/chat/completions', {
      model: options.model || 'gpt-4.1-2025-04-14',
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 1000,
      stream: options.stream || false
    });

    if (!response.success) {
      throw new Error(response.error || 'OpenAI API request failed');
    }

    return response.data;
  }

  async textToSpeech(text: string, options: any = {}): Promise<ArrayBuffer> {
    const response = await this.post('/audio/speech', {
      model: options.model || 'tts-1',
      input: text,
      voice: options.voice || 'alloy',
      response_format: options.format || 'mp3'
    });

    if (!response.success) {
      throw new Error(response.error || 'OpenAI TTS request failed');
    }

    return response.data;
  }

  async speechToText(audioFile: File, options: any = {}): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', options.model || 'whisper-1');
    if (options.language) formData.append('language', options.language);

    const response = await this.request({
      url: '/audio/transcriptions',
      method: 'POST',
      data: formData
    }, {
      headers: {
        // Remove Content-Type to let browser set it with boundary
        ...this.getConfig().headers,
        'Content-Type': undefined
      } as any
    });

    if (!response.success) {
      throw new Error(response.error || 'OpenAI STT request failed');
    }

    return response.data.text;
  }

  async generateImage(prompt: string, options: any = {}): Promise<any> {
    const response = await this.post('/images/generations', {
      model: options.model || 'gpt-image-1',
      prompt,
      n: options.n || 1,
      size: options.size || '1024x1024',
      quality: options.quality || 'auto',
      response_format: options.responseFormat || 'url'
    });

    if (!response.success) {
      throw new Error(response.error || 'OpenAI image generation failed');
    }

    return response.data;
  }
}
