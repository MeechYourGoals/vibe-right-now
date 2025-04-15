
import { useCallback } from 'react';
import { UseRecognitionEventHandlersProps, UseRecognitionEventHandlersReturn } from './types';

export const useRecognitionEventHandlers = ({
  recognition,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  setResultsAvailable,
  silenceCallback,
  stopListening,
}: UseRecognitionEventHandlersProps): UseRecognitionEventHandlersReturn => {
  
  const handleRecognitionResult = useCallback((event: SpeechRecognitionEvent) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    if (finalTranscript) {
      setTranscript(prev => `${prev} ${finalTranscript}`.trim());
    }
    
    setInterimTranscript(interimTranscript);
    setResultsAvailable(true);
  }, [setTranscript, setInterimTranscript, setResultsAvailable]);

  const handleRecognitionEnd = useCallback(() => {
    setIsListening(false);
    if (recognition) {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    }
  }, [recognition, setIsListening]);

  const handleRecognitionError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
    if (event.error === 'no-speech') {
      silenceCallback();
    }
    stopListening();
  }, [silenceCallback, stopListening]);

  const handleSilence = useCallback(() => {
    console.log('Silence detected');
    stopListening();
  }, [stopListening]);

  const handleAudioProcess = useCallback(() => {
    // Handle audio processing here
  }, []);

  const handleAudioEnd = useCallback(() => {
    // Handle audio end here
  }, []);

  const handleNoMatch = useCallback(() => {
    console.log('No speech was recognized');
  }, []);

  const handleUpdateTranscript = useCallback((text: string) => {
    // Changed from function to string parameter to fix the error
    setTranscript(text);
  }, [setTranscript]);

  return {
    handleRecognitionResult,
    handleRecognitionEnd,
    handleRecognitionError,
    handleSilence,
    handleAudioProcess,
    handleAudioEnd,
    handleNoMatch,
    handleUpdateTranscript,
  };
};
