
import { useCallback, useEffect } from 'react';
import { SpeechRecognitionHookProps } from './types';

export const useRecognitionEventHandlers = ({
  recognition,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  isListening,
  restartAttempts,
  previousInterims,
  resetSilenceTimer
}) => {
  const handleStart = useCallback(() => {
    console.log('Speech recognition started');
    setIsListening(true);
  }, [setIsListening]);

  const handleResult = useCallback((event) => {
    let newInterimTranscript = '';
    let finalTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
        console.log('Final transcript:', finalTranscript);
      } else {
        newInterimTranscript += event.results[i][0].transcript;
      }
    }
    
    if (finalTranscript) {
      setTranscript(prev => {
        const newValue = prev ? `${prev} ${finalTranscript}` : finalTranscript;
        console.log('Setting final transcript:', newValue);
        return newValue;
      });
    }
    
    setInterimTranscript(newInterimTranscript);
    
    // Reset the silence timer whenever we get new speech
    if (newInterimTranscript || finalTranscript) {
      resetSilenceTimer();
    }
    
    // Track interim results to detect repetition
    if (newInterimTranscript) {
      previousInterims.set(newInterimTranscript, Date.now());
      
      // Clean up old interims (older than 10 seconds)
      const now = Date.now();
      previousInterims.forEach((timestamp, text) => {
        if (now - timestamp > 10000) {
          previousInterims.delete(text);
        }
      });
    }
  }, [setTranscript, setInterimTranscript, previousInterims, resetSilenceTimer]);

  const handleEnd = useCallback(() => {
    console.log('Speech recognition ended');
    setIsListening(false);
  }, [setIsListening]);

  const handleError = useCallback((event) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
  }, [setIsListening]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    };
  }, [recognition, handleStart, handleResult, handleEnd, handleError]);
};
