
import { supabase } from '@/integrations/supabase/client';

export class LegacyGoogleWrapperService {
  /**
   * Send a chat request using Google Vertex AI (replaces OpenAI)
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
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: {
          messages,
          context: options.context || 'user'
        }
      });

      if (error) {
        console.error('Error calling Vertex AI:', error);
        throw new Error(`Failed to call Vertex AI: ${error.message}`);
      }

      return data?.response || '';
    } catch (error) {
      console.error('Error in Vertex AI service:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text using Google Cloud STT
   */
  static async speechToText(audioBase64: string) {
    try {
      const { data, error } = await supabase.functions.invoke('google-stt', {
        body: { audio: audioBase64 }
      });

      if (error) {
        console.error('Error calling Google STT:', error);
        throw new Error(`Failed to convert speech to text: ${error.message}`);
      }

      return data?.transcript || '';
    } catch (error) {
      console.error('Error in Google STT service:', error);
      throw error;
    }
  }

  /**
   * Convert text to speech using Google Cloud TTS
   */
  static async textToSpeech(text: string) {
    try {
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: {
          text: text,
          voice: 'en-US-Neural2-D',
          speakingRate: 1.0,
          pitch: 0
        }
      });

      if (error) {
        console.error('Error calling Google TTS:', error);
        throw new Error(`Failed to convert text to speech: ${error.message}`);
      }

      return data?.audioContent || '';
    } catch (error) {
      console.error('Error in Google TTS service:', error);
      throw error;
    }
  }
}
