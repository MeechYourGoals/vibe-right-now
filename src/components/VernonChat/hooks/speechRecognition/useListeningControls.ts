
import { useCallback } from 'react';
import { toast } from 'sonner';

interface ListeningControlsProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  setTranscript: (value: string) => void;
  setInterimTranscript: (value: string) => void;
  restartAttempts: React.MutableRefObject<number>;
  previousInterims: React.MutableRefObject<string[]>;
  clearSilenceTimer: () => void;
}

export const useListeningControls = ({
  speechRecognition,
  isListening,
  setIsListening,
  setTranscript,
  setInterimTranscript,
  restartAttempts,
  previousInterims,
  clearSilenceTimer
}: ListeningControlsProps) => {
  
  // Start listening function with proper error handling
  const startListening = useCallback(() => {
    if (!speechRecognition.current) {
      console.error('Speech recognition not available');
      toast.error('Speech recognition not available on your browser');
      return;
    }
    
    // Make sure we're not already listening before trying to start
    if (isListening) {
      return; // Already listening, no need to start again
    }
    
    try {
      // Reset transcript when starting fresh
      setTranscript('');
      setInterimTranscript('');
      previousInterims.current = [];
      restartAttempts.current = 0;
      
      // Set state before actually starting recognition
      setIsListening(true);
      
      // Start speech recognition
      speechRecognition.current.start();
      console.log('Started speech recognition successfully');
      
      // Set a timeout to detect if no speech is being captured
      setTimeout(() => {
        // If still listening but no interim or final transcript after 5 seconds, something might be wrong
        if (isListening && !speechRecognition.current?.transcript && !speechRecognition.current?.interimTranscript) {
          console.log('No speech detected after 5 seconds, checking microphone...');
          // Don't automatically stop - just notify the user
          toast.info('No speech detected. Please make sure your microphone is working.');
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      toast.error('Failed to start voice recognition. Please try again.');
    }
  }, [isListening, setIsListening, setTranscript, setInterimTranscript, speechRecognition, previousInterims, restartAttempts]);
  
  const stopListening = useCallback(() => {
    if (speechRecognition.current) {
      try {
        // Only try to stop if we're actually listening to avoid errors
        speechRecognition.current.stop();
        console.log('Stopped speech recognition');
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    
    setIsListening(false);
    clearSilenceTimer();
  }, [setIsListening, speechRecognition, clearSilenceTimer]);
  
  return {
    startListening,
    stopListening
  };
};
