
import { supabase } from '@/integrations/supabase/client';

export class GoogleSpeechService {
  /**
   * Send speech to text request to Google's Speech-to-Text API
   */
  static async speechToText(audioBase64: string): Promise<string> {
    try {
      // Call our edge function to handle the API request
      const { data, error } = await supabase.functions.invoke('google-speech-to-text', {
        body: {
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
   * Convert text to speech using Google's Text-to-Speech API
   */
  static async textToSpeech(text: string, voice = 'en-US-Standard-D'): Promise<string> {
    try {
      // Call our edge function to handle the API request
      const { data, error } = await supabase.functions.invoke('google-text-to-speech', {
        body: {
          text,
          voice
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
