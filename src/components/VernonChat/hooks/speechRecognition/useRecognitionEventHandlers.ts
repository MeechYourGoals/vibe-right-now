
import { useEffect } from 'react';
import { handleSpeechRecognitionError } from '../../utils/speech/recognition';

interface RecognitionEventHandlersProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  setInterimTranscript: React.Dispatch<React.SetStateAction<string>>;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  isListening: boolean;
  restartAttempts: React.MutableRefObject<number>;
  previousInterims: React.MutableRefObject<string[]>;
  resetSilenceTimer: () => void;
}

// Hook to set up event handlers for speech recognition
export const useRecognitionEventHandlers = ({
  speechRecognition,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  isListening,
  restartAttempts,
  previousInterims,
  resetSilenceTimer,
}: RecognitionEventHandlersProps) => {
  useEffect(() => {
    if (!speechRecognition.current || !isListening) return;
    
    const recognition = speechRecognition.current;
    
    // On speech recognition start
    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      // Reset the restart attempts counter when recognition starts successfully
      restartAttempts.current = 0;
    };
    
    // On speech recognition end
    recognition.onend = () => {
      console.log('Speech recognition ended');
      
      // If still supposed to be listening, restart
      if (isListening) {
        // If too many restart attempts, just give up to avoid infinite loops
        if (restartAttempts.current > 5) {
          console.error('Too many speech recognition restart attempts, stopping');
          setIsListening(false);
          return;
        }
        
        console.log(`Restarting speech recognition (attempt ${restartAttempts.current + 1})`);
        restartAttempts.current += 1;
        
        // Short delay before restarting
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.error('Error restarting speech recognition:', error);
            setIsListening(false);
          }
        }, 300);
      } else {
        setIsListening(false);
      }
    };
    
    // On speech recognition error
    recognition.onerror = (event) => {
      const errorEvent = event as SpeechRecognitionErrorEvent;
      handleSpeechRecognitionError(errorEvent.error);
      
      // Some errors are recoverable, like no-speech, but others indicate
      // a more serious issue that might require user action
      if (errorEvent.error === 'not-allowed' || 
          errorEvent.error === 'service-not-allowed') {
        console.error('Speech recognition permission denied or service not available');
        setIsListening(false);
      }
    };
    
    // On speech recognition results
    recognition.onresult = (event) => {
      resetSilenceTimer(); // Reset silence timer when we get results
      
      const resultEvent = event as SpeechRecognitionEvent;
      let interimTranscript = '';
      let finalTranscript = '';
      
      // Process results
      for (let i = resultEvent.resultIndex; i < resultEvent.results.length; i++) {
        const transcript = resultEvent.results[i][0].transcript;
        
        if (resultEvent.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Update state with any final transcript parts
      if (finalTranscript !== '') {
        console.log('Got final transcript:', finalTranscript);
        setTranscript(prev => {
          // If we already have text and the new text doesn't start with a space,
          // add a space to maintain proper spacing between sentences
          if (prev && !finalTranscript.startsWith(' ')) {
            return `${prev} ${finalTranscript}`;
          }
          return prev + finalTranscript;
        });
        
        // Reset any interim transcripts being tracked
        previousInterims.current = [];
      }
      
      // Update state with interim transcript
      if (interimTranscript !== '') {
        console.log('Got interim transcript:', interimTranscript);
        
        // Track interim transcripts to detect "stuck" recognition
        previousInterims.current.push(interimTranscript);
        
        // Only keep the last 5 interim transcripts
        if (previousInterims.current.length > 5) {
          previousInterims.current.shift();
        }
        
        setInterimTranscript(interimTranscript);
      } else {
        setInterimTranscript('');
      }
    };
    
    // Cleanup function
    return () => {
      recognition.onstart = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onresult = null;
    };
  }, [
    speechRecognition, 
    isListening, 
    setIsListening, 
    setTranscript, 
    setInterimTranscript, 
    restartAttempts,
    previousInterims,
    resetSilenceTimer
  ]);
};
