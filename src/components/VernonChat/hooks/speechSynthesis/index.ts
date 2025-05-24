
import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTSService';

// Export the speech synthesis hooks
export { useSpeechSynthesis } from '../useSpeechSynthesis';

// Export component hooks from their respective files
export { useSpeechSynthesisCore } from './useSpeechSynthesisCore';
export { useSpeakResponse } from './useSpeakResponse';
export { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
export { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';

// Google TTS integration
export const useGoogleTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakWithGoogle = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true);
      const audioContent = await GoogleTTSService.synthesizeSpeech(text);
      
      if (audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        audioRef.current = audio;
        
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => setIsSpeaking(false);
        
        await audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Google TTS error:', error);
      setIsSpeaking(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
  }, []);

  return { speakWithGoogle, stopSpeaking, isSpeaking };
};

// Export utility functions
export { createAudioElement, speakSentenceBySequence, setupSpeechSynthesis } from './speechSynthesisUtils';
