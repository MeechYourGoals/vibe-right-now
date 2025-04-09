
import { useEffect } from 'react';

export interface UseInterruptionHandlerProps {
  isSpeaking: boolean;
  isListening: boolean;
  interimTranscript: string;
  stopSpeaking: () => void;
}

export const useInterruptionHandler = ({
  isSpeaking,
  isListening,
  interimTranscript,
  stopSpeaking
}: UseInterruptionHandlerProps) => {
  // Effect to handle user interruption
  useEffect(() => {
    if (isSpeaking && isListening && interimTranscript.trim().length > 3) {
      // If we're speaking but the user starts talking (with just a few words),
      // stop the current speech to listen to them
      console.log('User interrupted, stopping speech');
      stopSpeaking();
    }
  }, [isSpeaking, isListening, interimTranscript, stopSpeaking]);
};
