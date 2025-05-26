
import { useState, useRef, useCallback, useEffect } from 'react';
import { VoiceService } from '@/services/VoiceService';

interface SpeechSynthesisOptions {
  voice?: 'male' | 'female';
  pitch?: number;
  rate?: number;
}

export const useSpeechSynthesis = (options: SpeechSynthesisOptions = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    return () => {
      if (currentAudio.current) {
        currentAudio.current.pause();
        currentAudio.current = null;
      }
    };
  }, []);
  
  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    
    cancel();
    
    try {
      console.log('Requesting speech for text:', text.substring(0, 50) + '...');
      setIsSpeaking(true);
      
      // Call Google TTS via VoiceService
      const audioContent = await VoiceService.textToSpeech(text);
      
      if (audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        currentAudio.current = audio;
        
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudio.current = null;
        };
        
        audio.onerror = () => {
          console.error('Error playing audio');
          setIsSpeaking(false);
          currentAudio.current = null;
          return fallbackToSpeechSynthesis(text);
        };
        
        await audio.play();
        return true;
      } else {
        setIsSpeaking(false);
        return fallbackToSpeechSynthesis(text);
      }
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsSpeaking(false);
      return fallbackToSpeechSynthesis(text);
    }
  }, [options.rate, options.pitch]);
  
  const fallbackToSpeechSynthesis = (text: string): boolean => {
    if (!window.speechSynthesis) return false;
    
    try {
      console.log('Falling back to browser speech synthesis');
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (options.rate) utterance.rate = options.rate;
      if (options.pitch) utterance.pitch = options.pitch;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        console.error('Error with speech synthesis');
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      return true;
    } catch (error) {
      console.error('Error with fallback speech synthesis:', error);
      setIsSpeaking(false);
      return false;
    }
  };
  
  const cancel = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
  }, []);
  
  return {
    speak,
    cancel,
    isSpeaking
  };
};
