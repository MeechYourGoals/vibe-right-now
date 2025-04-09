
import { useRef, useEffect, useState } from 'react';
import { initializeSpeechRecognition } from '../../utils/speechUtils';

export const useRecognitionSetup = () => {
  const [initialized, setInitialized] = useState(false);
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const restartAttempts = useRef<number>(0);
  const previousInterims = useRef<string[]>([]);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!initialized) {
      speechRecognition.current = initializeSpeechRecognition();
      
      if (speechRecognition.current) {
        // Configure recognition
        speechRecognition.current.continuous = true;
        speechRecognition.current.interimResults = true;
        setInitialized(true);
      }
    }
  }, [initialized]);
  
  return {
    speechRecognition,
    initialized,
    restartAttempts,
    previousInterims
  };
};
