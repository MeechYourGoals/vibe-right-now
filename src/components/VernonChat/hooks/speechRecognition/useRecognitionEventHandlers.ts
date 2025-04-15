import { useCallback, useEffect } from 'react';
import { SpeechRecognitionHookProps, UseRecognitionEventHandlersProps } from './types';

export const useRecognitionEventHandlers = ({
  recognition,
  status,
  setStatus,
  transcript,
  setTranscript,
  interimTranscript,
  setInterimTranscript,
  onFinalTranscript,
  setIsListening,
  confidenceThreshold,
  onNoMatch,
  onError
}: UseRecognitionEventHandlersProps) => {
  const handleStart = useCallback(() => {
    console.log('Speech recognition started');
    setStatus('listening');
    setIsListening(true);
  }, [setStatus, setIsListening]);

  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    let newInterimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        if (event.results[i][0].confidence >= confidenceThreshold) {
          const finalTranscriptItem = event.results[i][0].transcript.trim();
          setTranscript((prevTranscript) => prevTranscript + ' ' + finalTranscriptItem);
          onFinalTranscript(finalTranscriptItem);
        } else {
          console.log(`Low confidence: ${event.results[i][0].confidence}`);
          onNoMatch(event.results[i][0].transcript.trim());
        }
      } else {
        newInterimTranscript += event.results[i][0].transcript;
      }
    }
    setInterimTranscript(newInterimTranscript);
  }, [setTranscript, setInterimTranscript, onFinalTranscript, confidenceThreshold, onNoMatch]);

  const handleEnd = useCallback(() => {
    console.log('Speech recognition ended.');
    setStatus('inactive');
    setIsListening(false);
  }, [setStatus, setIsListening]);

  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
    onError(event.error);
    setStatus('error');
    setIsListening(false);
  }, [setStatus, setIsListening, onError]);

  const handleNoMatch = useCallback((event: SpeechRecognitionEvent) => {
    console.warn('No match found:', event);
    if (event.results && event.results[0] && event.results[0][0]) {
      onNoMatch(event.results[0][0].transcript.trim());
    }
  }, [onNoMatch]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onerror = handleError;
    recognition.onnomatch = handleNoMatch;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.onnomatch = null;
    };
  }, [recognition, handleStart, handleResult, handleEnd, handleError, handleNoMatch]);
};
