
import { useState, useCallback } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTSService';

// Migrated from ElevenLabs to Google TTS voice management
export const useGoogleTTSVoice = () => {
  const [selectedVoice, setSelectedVoice] = useState('en-US-Neural2-D'); // Default Google voice
  const [availableVoices] = useState([
    { id: 'en-US-Neural2-D', name: 'Male Neural Voice (US)' },
    { id: 'en-US-Neural2-C', name: 'Female Neural Voice (US)' },
    { id: 'en-US-Neural2-A', name: 'Male Standard Voice (US)' },
    { id: 'en-US-Neural2-E', name: 'Female Standard Voice (US)' }
  ]);

  const changeVoice = useCallback((voiceId: string) => {
    setSelectedVoice(voiceId);
    console.log('Google TTS voice changed to:', voiceId);
  }, []);

  const testVoice = useCallback(async (voiceId: string) => {
    try {
      const audioContent = await GoogleTTSService.synthesizeSpeech(
        'Hello, this is a test of the Google Text-to-Speech voice.',
        { voice: voiceId }
      );
      
      if (audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        await audio.play();
      }
    } catch (error) {
      console.error('Error testing Google TTS voice:', error);
    }
  }, []);

  return {
    selectedVoice,
    availableVoices,
    changeVoice,
    testVoice
  };
};
