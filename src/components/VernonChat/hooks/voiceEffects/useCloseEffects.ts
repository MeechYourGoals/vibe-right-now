
import { useEffect } from 'react';

interface UseCloseEffectsProps {
  isOpen: boolean;
  stopSpeaking: () => void;
  stopListening: () => void;
}

export const useCloseEffects = ({
  isOpen,
  stopSpeaking,
  stopListening
}: UseCloseEffectsProps) => {
  // Effect to stop speaking when chat is closed
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      stopListening();
    }
  }, [isOpen, stopSpeaking, stopListening]);
};
