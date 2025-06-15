
import { ApiClient } from '../ApiClient';
import { supabase } from '@/integrations/supabase/client';
import { loggingInterceptor, errorHandlingInterceptor } from '../interceptors';

export class SupabaseApiClient extends ApiClient {
  constructor() {
    super({
      baseUrl: supabase.supabaseUrl,
      timeout: 30000,
      retries: 2,
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabase.supabaseKey
      }
    });

    // Add interceptors
    this.addInterceptor(loggingInterceptor);
    this.addInterceptor(errorHandlingInterceptor);
  }

  // Call Supabase Edge Function
  async callFunction<T = any>(functionName: string, body?: any, options?: any): Promise<T> {
    console.log(`Calling Supabase function: ${functionName}`);
    
    const response = await this.post(`/functions/v1/${functionName}`, body, {
      timeout: options?.timeout || 30000,
      retries: options?.retries || 2
    });

    if (!response.success) {
      throw new Error(response.error || `Failed to call function ${functionName}`);
    }

    return response.data;
  }

  // Specialized methods for common Supabase operations
  async callOpenAI(messages: any[], options: any = {}): Promise<any> {
    return this.callFunction('openai-chat', {
      messages,
      model: options.model || 'anthropic/claude-3-haiku',
      context: options.context || 'user',
      useOpenRouter: options.useOpenRouter !== false
    }, options);
  }

  async callVertexAI(prompt: string, mode: string = 'default', context: any[] = []): Promise<string> {
    const response = await this.callFunction('vertex-ai', {
      prompt,
      mode,
      context
    });
    return response.text || '';
  }

  async callGeminiAI(prompt: string, mode: string = 'default', history: any[] = []): Promise<string> {
    const response = await this.callFunction('gemini-ai', {
      prompt,
      mode,
      history
    });
    return response.text || '';
  }

  async callElevenLabsTTS(text: string, voiceId?: string): Promise<ArrayBuffer> {
    const response = await this.callFunction('eleven-labs-tts', {
      text,
      voiceId: voiceId || 'nPczCjzI2devNBz1zQrb',
      model: 'eleven_multilingual_v2'
    });
    return response;
  }

  async callPerplexitySearch(query: string): Promise<any> {
    return this.callFunction('perplexity-search', { query });
  }
}

// Export singleton instance
export const supabaseApiClient = new SupabaseApiClient();
