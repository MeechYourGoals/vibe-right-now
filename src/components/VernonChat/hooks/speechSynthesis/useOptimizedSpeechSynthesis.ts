
import { useState, useRef, useCallback, useEffect } from 'react';

export const useOptimizedSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to stop current speech
  const stop = useCallback(() => {
    if (currentUtterance.current) {
      window.speechSynthesis.cancel();
      currentUtterance.current = null;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    setIsSpeaking(false);
  }, []);

  // Function to speak text
  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    
    // Stop any current speech
    stop();
    
    try {
      setIsSpeaking(true);
      
      // Use browser's speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utterance;
      
      // Set voice preferences
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Male') || voice.name.includes('David'))
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
      return false;
    }
  }, [stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    speak,
    stop,
    isSpeaking
  };
};
