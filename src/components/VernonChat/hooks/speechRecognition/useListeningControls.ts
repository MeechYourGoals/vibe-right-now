
import { useCallback } from 'react';

interface ListeningControlsProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  initialized: boolean;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  setIsProcessing: (value: boolean) => void;
  setTranscript: (value: string) => void;
  setInterimTranscript: (value: string) => void;
  restartAttempts: React.MutableRefObject<number>;
  clearSilenceTimer?: () => void;
}

export const useListeningControls = ({
  speechRecognition,
  initialized,
  isListening,
  setIsListening,
  setIsProcessing,
  setTranscript,
  setInterimTranscript,
  restartAttempts,
  clearSilenceTimer
}: ListeningControlsProps) => {
  
  // Start listening for speech
  const startListening = useCallback(() => {
    if (!initialized || !speechRecognition.current) {
      console.error('Speech recognition not initialized');
      return;
    }
    
    if (isListening) {
      console.log('Already listening, no need to start again');
      return;
    }
    
    try {
      speechRecognition.current.start();
      setIsListening(true);
      restartAttempts.current = 0;
      console.log('Started listening');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, [initialized, isListening, setIsListening, speechRecognition, restartAttempts]);
  
  // Stop listening and process the transcript
  const stopListening = useCallback(() => {
    if (!speechRecognition.current) return;
    
    try {
      // Clear any silence detection timers
      if (clearSilenceTimer) {
        clearSilenceTimer();
      }
      
      // Stop recognition
      speechRecognition.current.stop();
      console.log('Stopped listening');
      
      // Update state based on if there is a transcript to process
      if (isListening) {
        setIsListening(false);
        
        // Only set processing if we have some text to process
        if (speechRecognition.current) {
          setIsProcessing(true);
        }
      }
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
      setIsListening(false);
    }
  }, [speechRecognition, isListening, setIsListening, setIsProcessing, clearSilenceTimer]);
  
  return {
    startListening,
    stopListening
  };
};
