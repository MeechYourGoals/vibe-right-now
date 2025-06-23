
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramService } from '@/services';

interface SpeechSynthesisOptions {
  voice?: 'male' | 'female';
  pitch?: number;
  rate?: number;
}

export const useSpeechSynthesis = (options: SpeechSynthesisOptions = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    return () => {
      if (currentAudio.current) {
        currentAudio.current.pause();
        currentAudio.current = null;
      }
    };
  }, []);
  
  // Function to speak text using Google TTS
  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    
    // Cancel any previous speech
    cancel();
    
    try {
      console.log('Requesting speech for text:', text.substring(0, 50) + '...');
      setIsSpeaking(true);
      
      // Use Deepgram for text to speech
      const audioBuffer = await DeepgramService.textToSpeech(text);

      if (audioBuffer) {
        const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        currentAudio.current = audio;
        
        // Add event listeners
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentAudio.current = null;
        };

        audio.onerror = () => {
          URL.revokeObjectURL(url);
          console.error('Error playing audio');
          setIsSpeaking(false);
          currentAudio.current = null;
          return fallbackToSpeechSynthesis(text, true);
        };
        
        // Play the audio
        await audio.play();
        return true;
      } else {
        console.warn('No audio content received');
        setIsSpeaking(false);
        return fallbackToSpeechSynthesis(text, true);
      }
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsSpeaking(false);
      return fallbackToSpeechSynthesis(text, true);
    }
  }, [options.rate, options.pitch]);
  
  // Fallback to browser's speech synthesis
  const fallbackToSpeechSynthesis = (text: string, forceMale: boolean = false): boolean => {
    if (!window.speechSynthesis) return false;
    
    try {
      console.log('Falling back to browser speech synthesis with male voice');
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Force find a male voice
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => 
        v.name.includes('Male') || 
        v.name.includes('David') || 
        v.name.includes('John') ||
        v.name.includes('Daniel') ||
        v.name.includes('Google UK English Male')
      );
      
      if (maleVoice) {
        console.log('Using male voice:', maleVoice.name);
        utterance.voice = maleVoice;
      } else {
        console.warn('No male voice found, using default');
      }
      
      if (options.rate) utterance.rate = options.rate;
      if (options.pitch) utterance.pitch = options.pitch;
      
      // Add event listeners
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        console.error('Error with speech synthesis');
        setIsSpeaking(false);
      };
      
      // Speak the utterance
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      return true;
    } catch (error) {
      console.error('Error with fallback speech synthesis:', error);
      setIsSpeaking(false);
      return false;
    }
  };
  
  // Function to cancel speech
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
