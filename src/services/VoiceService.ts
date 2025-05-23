
import { supabase } from '@/integrations/supabase/client';

/**
 * Voice service using Google Cloud TTS/STT (replaces ElevenLabs)
 */
export class VoiceService {
  /**
   * Convert text to speech using Google Cloud TTS
   */
  static async textToSpeech(text: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: {
          text: text,
          voice: 'en-US-Neural2-D', // Male voice
          speakingRate: 1.0,
          pitch: 0
        }
      });

      if (error) {
        console.error('Error calling Google TTS:', error);
        return null;
      }

      return data?.audioContent || null;
    } catch (error) {
      console.error('Error in Google TTS service:', error);
      return null;
    }
  }

  /**
   * Convert speech to text using Google Cloud STT
   */
  static async speechToText(audioBase64: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('google-stt', {
        body: { audio: audioBase64 }
      });

      if (error) {
        console.error('Error calling Google STT:', error);
        return null;
      }

      return data?.transcript || null;
    } catch (error) {
      console.error('Error in Google STT service:', error);
      return null;
    }
  }
}
