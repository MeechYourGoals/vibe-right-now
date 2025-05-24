
import { useCallback } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTSService';
import { toast } from 'sonner';

export const useGoogleTTSManager = (setUseGoogleTTS: (value: boolean) => void) => {
  const initializeGoogleTTS = useCallback((): void => {
    // Google TTS is available through our Supabase functions
    setUseGoogleTTS(true);
    toast.success('Google TTS is ready for improved voice quality.');
  }, [setUseGoogleTTS]);

  return { initializeGoogleTTS };
};
