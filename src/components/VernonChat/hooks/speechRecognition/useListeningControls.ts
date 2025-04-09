
import { MutableRefObject } from 'react';
import { toast } from 'sonner';

interface UseListeningControlsProps {
  speechRecognition: MutableRefObject<SpeechRecognition | null>;
  initialized: boolean;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  setIsProcessing: (value: boolean) => void;
  setTranscript: (value: string) => void;
  setInterimTranscript: (value: string) => void;
  restartAttempts: MutableRefObject<number>;
}

export const useListeningControls = ({
  speechRecognition,
  initialized,
  isListening,
  setIsListening,
  setIsProcessing,
  setTranscript,
  setInterimTranscript,
  restartAttempts
}: UseListeningControlsProps) => {
  
  // Start listening function
  const startListening = () => {
    if (!initialized || !speechRecognition.current) {
      toast.error('Speech recognition is not available');
      return;
    }
    
    try {
      speechRecognition.current.start();
      setIsListening(true);
      console.log('Started listening...');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      
      // If already started, try to restart
      if ((error as Error).message.includes('already started')) {
        try {
          speechRecognition.current.stop();
          setTimeout(() => {
            if (speechRecognition.current) {
              speechRecognition.current.start();
              setIsListening(true);
              console.log('Restarted listening...');
            }
          }, 100);
        } catch (restartError) {
          console.error('Error restarting recognition:', restartError);
          setIsListening(false);
        }
      } else {
        toast.error('Could not start speech recognition');
        setIsListening(false);
      }
    }
  };
  
  // Stop listening function
  const stopListening = () => {
    if (speechRecognition.current && isListening) {
      try {
        // Preserve current transcript when stopping
        speechRecognition.current.stop();
        
        // Set processing state if there's a transcript to process
        if (setTranscript && setInterimTranscript) {
          setIsProcessing(true);
        }
        
        setIsListening(false);
        restartAttempts.current = 0;
        console.log('Stopped listening...');
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };
  
  return {
    startListening,
    stopListening
  };
};
