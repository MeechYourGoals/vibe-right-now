
import { useRef, useCallback } from 'react';

interface UseSilenceDetectionProps {
  onSilenceDetected: () => void;
  silenceDuration?: number;
}

export const useSilenceDetection = ({
  onSilenceDetected,
  silenceDuration = 1200 // Default 1.2 seconds
}: UseSilenceDetectionProps) => {
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTime = useRef<number>(0);
  
  // Reset silence timer and set a new one
  const resetSilenceTimer = useCallback(() => {
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
    }
    
    lastSpeechTime.current = Date.now();
    
    // Set new silence timer
    silenceTimer.current = setTimeout(() => {
      onSilenceDetected();
    }, silenceDuration);
  }, [onSilenceDetected, silenceDuration]);
  
  // Clear timer when needed
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
  }, []);
  
  return {
    resetSilenceTimer,
    clearSilenceTimer,
    lastSpeechTime
  };
};
