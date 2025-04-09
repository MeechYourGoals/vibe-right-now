
import { useState, useEffect } from 'react';

export const useSpeechSynthesisVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    // Function to get voices from speech synthesis
    const getVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      }
    };
    
    // Get voices immediately if they're already loaded
    getVoices();
    
    // Add event listener for when voices are loaded asynchronously
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = getVoices;
    }
    
    // Clean up
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);
  
  return { voices };
};
