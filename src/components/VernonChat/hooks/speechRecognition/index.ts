
import { useState, useEffect, useCallback } from 'react';
import { useRecognitionSetup } from './useRecognitionSetup';
import { useSilenceDetection } from './useSilenceDetection';
import { useRecognitionEventHandlers } from './useRecognitionEventHandlers';
import { useListeningControls } from './useListeningControls';
import { useTranscriptProcessor } from './useTranscriptProcessor';
import { SpeechRecognitionHookReturn } from './types';

export const useSpeechRecognition = (): SpeechRecognitionHookReturn => {
  // State for speech recognition
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState(''); // Real-time transcript
  
  // Set up recognition
  const {
    speechRecognition,
    restartAttempts,
    previousInterims
  } = useRecognitionSetup();
  
  // Handle silence detection
  const handleSilenceDetected = useCallback(() => {
    if (isListening && (transcript.trim() || interimTranscript.trim())) {
      // Only process if we have a valid transcript and we were listening
      console.log('Silence detected, stopping listening');
      stopListening();
      setIsProcessing(true);
    }
  }, [isListening, transcript, interimTranscript]);
  
  const {
    resetSilenceTimer,
    clearSilenceTimer,
  } = useSilenceDetection({
    onSilenceDetected: handleSilenceDetected,
    silenceDuration: 1200 // 1.2 seconds of silence
  });
  
  // Set up event handlers
  const { setupEventHandlers } = useRecognitionEventHandlers({
    speechRecognition,
    isListening,
    setIsListening,
    restartAttempts,
    setTranscript,
    setInterimTranscript,
    previousInterims,
    resetSilenceTimer
  });
  
  // Initialize event handlers when recognition is set up
  useEffect(() => {
    if (speechRecognition.current) {
      setupEventHandlers();
    }
  }, [setupEventHandlers]);
  
  // Listening controls
  const {
    startListening,
    stopListening
  } = useListeningControls({
    speechRecognition,
    isListening,
    setIsListening,
    setTranscript,
    setInterimTranscript,
    restartAttempts,
    previousInterims,
    clearSilenceTimer
  });
  
  // Transcript processor
  const { processTranscript } = useTranscriptProcessor({
    transcript,
    setIsProcessing,
    setTranscript,
    setInterimTranscript
  });
  
  // Clean up
  useEffect(() => {
    return () => {
      if (speechRecognition.current) {
        try {
          speechRecognition.current.stop();
        } catch (error) {
          console.error('Error cleaning up speech recognition:', error);
        }
      }
      
      clearSilenceTimer();
    };
  }, [clearSilenceTimer]);
  
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

// Re-export for backward compatibility
export * from './types';
