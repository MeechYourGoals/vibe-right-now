
import { useState } from 'react';
import { useRecognitionSetup } from './useRecognitionSetup';
import { useRecognitionEventHandlers } from './useRecognitionEventHandlers';
import { useListeningControls } from './useListeningControls';
import { useTranscriptProcessor } from './useTranscriptProcessor';
import { useSilenceDetection } from './useSilenceDetection';
import { SpeechRecognitionHookReturn } from './types';

// Main hook that composes other hooks for speech recognition functionality
export const useSpeechRecognition = (): SpeechRecognitionHookReturn => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  // Setup speech recognition
  const { 
    speechRecognition, 
    initialized,
    restartAttempts,
    previousInterims
  } = useRecognitionSetup();

  // Set up silence detection for auto-stopping
  const { resetSilenceTimer, clearSilenceTimer } = useSilenceDetection({
    onSilenceDetected: () => {
      if (isListening && speechRecognition.current) {
        console.log('Silence detected, stopping listening');
        stopListening();
      }
    }
  });
  
  // Set up event handlers for speech recognition
  useRecognitionEventHandlers({
    speechRecognition,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    isListening,
    restartAttempts,
    previousInterims,
    resetSilenceTimer
  });
  
  // Listening controls (start/stop)
  const { 
    startListening, 
    stopListening 
  } = useListeningControls({
    speechRecognition,
    initialized,
    isListening,
    setIsListening,
    setIsProcessing,
    setTranscript,
    setInterimTranscript,
    restartAttempts,
    clearSilenceTimer
  });
  
  // Process the transcript
  const { processTranscript } = useTranscriptProcessor({
    transcript,
    setTranscript,
    setIsProcessing,
    setInterimTranscript
  });
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript
  };
};
