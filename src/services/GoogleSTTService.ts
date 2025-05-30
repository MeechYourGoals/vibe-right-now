
import { supabase } from '@/integrations/supabase/client';

export class GoogleSTTService {
  static async transcribeAudio(audioBlob: Blob): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('google-stt', {
        body: {
          audio: await this.blobToBase64(audioBlob),
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'en-US'
          }
        }
      });

      if (error) {
        console.error('Error calling Google STT:', error);
        return '';
      }

      return data?.transcript || '';
    } catch (error) {
      console.error('Error in STT service:', error);
      return '';
    }
  }

  private static blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
