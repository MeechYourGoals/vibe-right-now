
import { supabase } from '@/integrations/supabase/client';

export class OpenAIService {
  /**
   * Send a chat request to the OpenAI API
   */
  static async sendChatRequest(
    messages: { role: string; content: string }[],
    options: { 
      model?: string; 
      context?: string;
      stream?: boolean;
      maxTokens?: number;
    } = {}
  ) {
    try {
      const {
        model = 'gpt-4o-mini',
        context = 'user',
        stream = false,
        maxTokens = 1000
      } = options;

      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages,
          model,
          context,
          stream
        }
      });

      if (error) {
        console.error('Error calling OpenAI chat function:', error);
        throw new Error(`Failed to call OpenAI chat function: ${error.message}`);
      }

      return stream ? data : data?.response?.choices?.[0]?.message?.content || '';
    } catch (error) {
      console.error('Error in OpenAI chat service:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text using OpenAI's Whisper API
   */
  static async speechToText(audioBase64: string) {
    try {
      const { data, error } = await supabase.functions.invoke('openai-speech', {
        body: {
          action: 'speech-to-text',
          audio: audioBase64
        }
      });

      if (error) {
        console.error('Error calling speech-to-text function:', error);
        throw new Error(`Failed to convert speech to text: ${error.message}`);
      }

      return data?.text || '';
    } catch (error) {
      console.error('Error in speech-to-text service:', error);
      throw error;
    }
  }

  /**
   * Convert text to speech using OpenAI's TTS API
   */
  static async textToSpeech(text: string) {
    try {
      const { data, error } = await supabase.functions.invoke('openai-speech', {
        body: {
          action: 'text-to-speech',
          text
        }
      });

      if (error) {
        console.error('Error calling text-to-speech function:', error);
        throw new Error(`Failed to convert text to speech: ${error.message}`);
      }

      return data?.audio || '';
    } catch (error) {
      console.error('Error in text-to-speech service:', error);
      throw error;
    }
  }
}
