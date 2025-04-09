
import { useState, useEffect } from 'react';

export const useSpeechSynthesisVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    // Function to get available voices
    const getVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
        }
      }
    };
    
    // Try to get voices immediately
    getVoices();
    
    // Set up an event listener for when voices change or become available
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
