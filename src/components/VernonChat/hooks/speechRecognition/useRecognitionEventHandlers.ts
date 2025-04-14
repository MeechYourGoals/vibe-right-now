import { useEffect } from 'react';
import { handleSpeechRecognitionError } from '../../utils/speech/recognition';
import { UseRecognitionEventHandlersProps } from './types';

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
}: UseRecognitionEventHandlersProps) => {
  useEffect(() => {
    if (!speechRecognition || !isListening) return;
    
    // On speech recognition start
    speechRecognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
    };
    
    // On speech recognition end
    speechRecognition.onend = () => {
      console.log('Speech recognition ended');
      
      // If still supposed to be listening, restart
      if (isListening) {
        // If too many restart attempts, just give up to avoid infinite loops
        if (restartAttempts > 5) {
          console.error('Too many speech recognition restart attempts, stopping');
          setIsListening(false);
          return;
        }
        
        console.log(`Restarting speech recognition (attempt ${restartAttempts + 1})`);
        
        // Short delay before restarting
        setTimeout(() => {
          try {
            speechRecognition.start();
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
    speechRecognition.onerror = (event) => {
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
    speechRecognition.onresult = (event) => {
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
        const updatedPreviousInterims = new Map(previousInterims);
        updatedPreviousInterims.clear();
      }
      
      // Update state with interim transcript
      if (interimTranscript !== '') {
        console.log('Got interim transcript:', interimTranscript);
        
        // Update the interim transcript state
        setInterimTranscript(interimTranscript);

        // Track interim transcripts to detect "stuck" recognition
        const updatedPreviousInterims = new Map(previousInterims);
        updatedPreviousInterims.set(interimTranscript, Date.now());
        
        // Only keep recent interims
        for (const [key, timestamp] of updatedPreviousInterims.entries()) {
          if (Date.now() - timestamp > 10000) {
            updatedPreviousInterims.delete(key);
          }
        }
      } else {
        setInterimTranscript('');
      }
    };
    
    // Cleanup function
    return () => {
      speechRecognition.onstart = null;
      speechRecognition.onend = null;
      speechRecognition.onerror = null;
      speechRecognition.onresult = null;
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
