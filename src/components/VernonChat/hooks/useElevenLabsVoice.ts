
import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useElevenLabsVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  
  // Function to speak using ElevenLabs Brian voice
  const speakWithElevenLabs = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    
    // Cancel any previous speech
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    
    try {
      console.log('Requesting ElevenLabs TTS with Brian voice:', text.substring(0, 50) + '...');
      setIsSpeaking(true);
      
      // Call our edge function for ElevenLabs TTS
      const { data, error } = await supabase.functions.invoke('eleven-labs-tts', {
        body: { 
          text: text,
          voice_id: 'nPczCjzI2devNBz1zQrb', // Brian voice ID
          model_id: 'eleven_multilingual_v2'
        }
      });
      
      if (error) {
        console.error('ElevenLabs TTS error:', error);
        throw new Error(error.message);
      }
      
      if (data?.audioContent) {
        // Create audio element and play
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        currentAudio.current = audio;
        
        // Add event listeners
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudio.current = null;
        };
        
        audio.onerror = () => {
          console.error('Audio playback error');
          setIsSpeaking(false);
          currentAudio.current = null;
        };
        
        // Play the audio
        await audio.play();
        console.log('Successfully playing ElevenLabs audio with Brian voice');
        return true;
      } else {
        console.warn('No audio content received from ElevenLabs');
        setIsSpeaking(false);
        return false;
      }
    } catch (error) {
      console.error('Error in ElevenLabs speech synthesis:', error);
      setIsSpeaking(false);
      
      // Check if it's a quota error
      if (error.message?.includes('quota') || error.message?.includes('429')) {
        toast.info('ElevenLabs quota reached, using browser voice instead');
        return false; // Will trigger fallback
      }
      
      toast.error('Error generating voice, falling back to browser speech');
      return false;
    }
  }, []);
  
  // Function to cancel speech
  const cancelSpeech = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    setIsSpeaking(false);
  }, []);
  
  return {
    isSpeaking,
    speakWithElevenLabs,
    cancelSpeech
  };
};
