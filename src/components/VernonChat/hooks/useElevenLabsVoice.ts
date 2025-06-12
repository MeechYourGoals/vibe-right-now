
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useElevenLabsVoice = () => {
  const [isElevenLabsReady, setIsElevenLabsReady] = useState<boolean>(true);
  
  // Function to speak using ElevenLabs
  const speakWithElevenLabs = useCallback(async (text: string): Promise<boolean> => {
    try {
      console.log('Using ElevenLabs TTS with Brian voice for:', text.substring(0, 50) + '...');
      
      const { data, error } = await supabase.functions.invoke('eleven-labs-tts', {
        body: { 
          text, 
          voiceId: 'nPczCjzI2devNBz1zQrb', // Brian voice
          model: 'eleven_multilingual_v2' 
        }
      });

      if (error) {
        console.error('Error calling ElevenLabs function:', error);
        return false;
      }

      if (!data) {
        console.error('No audio data received from ElevenLabs');
        return false;
      }

      // Create audio element and play
      const audio = new Audio();
      const blob = new Blob([data], { type: 'audio/mpeg' });
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
      console.error('Error with ElevenLabs speech:', error);
      return false;
    }
  }, []);
  
  return {
    isElevenLabsReady,
    speakWithElevenLabs
  };
};
