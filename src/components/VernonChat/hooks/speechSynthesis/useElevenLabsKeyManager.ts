
import { useCallback } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTSService';

// Migrated from ElevenLabs to Google TTS for key management
export const useGoogleTTSKeyManager = () => {
  const validateApiKey = useCallback((): boolean => {
    // Google TTS uses service account authentication via Supabase
    // No API key validation needed on frontend
    return true;
  }, []);

  const clearApiKey = useCallback((): void => {
    // No action needed for Google TTS
    console.log('Google TTS uses service account authentication');
  }, []);

  return {
    validateApiKey,
    clearApiKey,
    isValidated: true
  };
};
