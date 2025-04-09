
import { useCallback } from 'react';
import { handleSpeechRecognitionError } from '../../utils/speechUtils';
import { toast } from 'sonner';

interface RecognitionEventHandlersProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  restartAttempts: React.MutableRefObject<number>;
  setTranscript: (value: string | ((prev: string) => string)) => void;
  setInterimTranscript: (value: string) => void;
  previousInterims: React.MutableRefObject<string[]>;
  resetSilenceTimer: () => void;
}

export const useRecognitionEventHandlers = ({
  speechRecognition,
  isListening,
  setIsListening,
  restartAttempts,
  setTranscript,
  setInterimTranscript,
  previousInterims,
  resetSilenceTimer,
}: RecognitionEventHandlersProps) => {
  
  // Handle speech recognition results
  const setupResultHandler = useCallback(() => {
    if (!speechRecognition.current) return;
    
    speechRecognition.current.onresult = (event) => {
      // Get both interim and final results
      let finalTranscript = '';
      let currentInterimTranscript = '';
      
      // Look only at the most recent result
      const resultIndex = event.results.length - 1;
      if (resultIndex >= 0) {
        const result = event.results[resultIndex];
        
        if (result.isFinal) {
          finalTranscript = result[0].transcript;
          // Clear previous interims when we get a final result
          previousInterims.current = [];
        } else {
          currentInterimTranscript = result[0].transcript;
          
          // Store this interim result
          previousInterims.current = [currentInterimTranscript];
        }
      }
      
      // Reset restart attempts since we're getting results
      restartAttempts.current = 0;
      
      // Set interim transcript for real-time display - only show the current phrase
      setInterimTranscript(currentInterimTranscript);
      
      // If we have final transcript, add it to the complete transcript
      if (finalTranscript) {
        setTranscript(prevTranscript => {
          return (prevTranscript.trim() + ' ' + finalTranscript).trim();
        });
        
        // Clear interim transcript when we get a final result
        setInterimTranscript('');
      }
      
      // Reset silence timer on new speech
      resetSilenceTimer();
    };
  }, [setTranscript, setInterimTranscript, restartAttempts, previousInterims, resetSilenceTimer]);
  
  // Handle end event
  const setupEndHandler = useCallback(() => {
    if (!speechRecognition.current) return;
    
    speechRecognition.current.onend = () => {
      console.log('Speech recognition ended');
      if (isListening) {
        // Only try to restart if we're supposed to be listening
        try {
          // Limit restart attempts to prevent infinite loops
          if (restartAttempts.current < 3) {
            restartAttempts.current += 1;
            speechRecognition.current?.start();
            console.log('Restarted speech recognition, attempt:', restartAttempts.current);
          } else {
            console.log('Max restart attempts reached, stopping recognition');
            setIsListening(false);
            toast.error('Voice recognition stopped due to repeated failures. Please try again.');
          }
        } catch (error) {
          console.error('Error restarting speech recognition:', error);
          setIsListening(false);
        }
      }
    };
  }, [isListening, setIsListening, restartAttempts]);
  
  // Handle error event
  const setupErrorHandler = useCallback(() => {
    if (!speechRecognition.current) return;
    
    speechRecognition.current.onerror = (event) => {
      console.error('Speech recognition error:', event);
      handleSpeechRecognitionError(event.error);
      
      // Don't set isListening to false for "no-speech" errors to allow continued listening
      if (event.error !== 'no-speech') {
        setIsListening(false);
      }
    };
  }, [setIsListening]);
  
  // Setup all event handlers
  const setupEventHandlers = useCallback(() => {
    setupResultHandler();
    setupEndHandler();
    setupErrorHandler();
  }, [setupResultHandler, setupEndHandler, setupErrorHandler]);
  
  return { setupEventHandlers };
};
