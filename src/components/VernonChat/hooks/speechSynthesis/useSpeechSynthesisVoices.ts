
import { useState, useEffect } from 'react';

export const useSpeechSynthesisVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    // Function to set available voices
    const setAvailableVoices = () => {
      if ('speechSynthesis' in window) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      }
    };
    
    // Set voices right away if already loaded
    setAvailableVoices();
    
    // Set up event listener for when voices are loaded asynchronously
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = setAvailableVoices;
    }
    
    // Cleanup
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);
  
  return { voices };
};
