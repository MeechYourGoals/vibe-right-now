
import { supabase } from '@/integrations/supabase/client';

export class GoogleTTSService {
  static async synthesizeSpeech(text: string, voiceConfig?: any): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: {
          text,
          voiceConfig: voiceConfig || {
            languageCode: 'en-US',
            name: 'en-US-Casual-K',
            ssmlGender: 'FEMALE'
          }
        }
      });

      if (error) {
        console.error('Error calling Google TTS:', error);
        return '';
      }

      return data?.audioContent || '';
    } catch (error) {
      console.error('Error in TTS service:', error);
      return '';
    }
  }
}
