
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
      
      // Set voice preferences - prioritize male voices for consistency
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices for web:', voices.map(v => v.name));
      
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Male') || 
         voice.name.includes('David') || 
         voice.name.includes('Daniel') ||
         voice.name.includes('Google UK English Male'))
      );
      
      if (preferredVoice) {
        console.log('Using preferred voice for web:', preferredVoice.name);
        utterance.voice = preferredVoice;
      } else {
        console.log('No preferred male voice found, using default');
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      
      utterance.onend = () => {
        console.log('Speech ended on web');
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      
      utterance.onerror = (error) => {
        console.error('Speech synthesis error on web:', error);
        setIsSpeaking(false);
        currentUtterance.current = null;
      };
      
      console.log('Starting speech synthesis on web...');
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.error('Speech synthesis error on web:', error);
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
