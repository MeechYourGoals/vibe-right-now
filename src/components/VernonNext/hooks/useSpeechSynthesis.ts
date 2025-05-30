
import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SpeechSynthesisOptions {
  voice?: 'male' | 'female';
  pitch?: number;
  rate?: number;
}

// Set a fixed male voice by default
const DEFAULT_MALE_VOICE = "en-US-Neural2-D";
const DEFAULT_FEMALE_VOICE = "en-US-Neural2-F";

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
  
  // Function to speak text
  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    
    // Cancel any previous speech
    cancel();
    
    try {
      console.log('Requesting speech for text:', text.substring(0, 50) + '...');
      setIsSpeaking(true);
      
      // Force 'male' voice regardless of options to ensure consistency
      const voice = DEFAULT_MALE_VOICE;
      
      // Call Google TTS via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('google-tts', {
        body: {
          text: text,
          voice: voice,
          speakingRate: options.rate || 1.0,
          pitch: options.pitch || 0
        }
      });
      
      if (error) {
        console.error('Error calling TTS service:', error);
        setIsSpeaking(false);
        return fallbackToSpeechSynthesis(text, true); // Force male voice in fallback
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
          console.error('Error playing audio');
          setIsSpeaking(false);
          currentAudio.current = null;
          return fallbackToSpeechSynthesis(text, true); // Force male voice in fallback
        };
        
        // Play the audio
        await audio.play();
        return true;
      } else {
        console.warn('No audio content received');
        setIsSpeaking(false);
        return fallbackToSpeechSynthesis(text, true); // Force male voice in fallback
      }
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsSpeaking(false);
      return fallbackToSpeechSynthesis(text, true); // Force male voice in fallback
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
