import { useState, useCallback } from 'react';
import { DeepgramService } from '@/services';

export const useDeepgramVoice = () => {
  const [isDeepgramReady, setIsDeepgramReady] = useState<boolean>(DeepgramService.hasApiKey());

  const speakWithDeepgram = useCallback(async (text: string): Promise<boolean> => {
    try {
      console.log('Using Deepgram TTS for:', text.substring(0, 50) + '...');
      const audioData = await DeepgramService.textToSpeech(text);

      if (!audioData) {
        console.error('No audio data received from Deepgram');
        return false;
      }

      const audio = new Audio();
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      audio.src = url;

      return new Promise((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          resolve(true);
        };

        audio.onerror = () => {
          URL.revokeObjectURL(url);
          console.error('Audio playback error');
          resolve(false);
        };

        audio.play().catch(() => {
          URL.revokeObjectURL(url);
          resolve(false);
        });
      });
    } catch (error) {
      console.error('Error with Deepgram speech:', error);
      return false;
    }
  }, []);

  return {
    isDeepgramReady,
    speakWithDeepgram
  };
};
