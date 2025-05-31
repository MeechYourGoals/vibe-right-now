
import { useState, useCallback, useEffect } from 'react';
import { 
  SpeechRecognitionHookReturn,
  UseRecognitionSetupReturn,
  UseListeningControlsProps,
  UseTranscriptProcessorParams,
  UseTranscriptProcessorReturn
} from './types';
import { useRecognitionEventHandlers } from './useRecognitionEventHandlers';

// Main hook for speech recognition
export const useSpeechRecognition = (): SpeechRecognitionHookReturn => {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPushToTalkActive, setIsPushToTalkActive] = useState(false);
  
  // Setup recognition
  const { 
    speechRecognition,
    initialized,
    restartAttempts,
    previousInterims,
    useLocalWhisper,
    mediaRecorder,
    audioChunks
  } = useRecognitionSetup();
  
  // Reset silence timer
  const resetSilenceTimer = useCallback(() => {
    if (silenceTimer) {
      clearTimeout(silenceTimer);
    }
    
    // Auto-stop after 3 seconds of silence
    const newTimer = setTimeout(() => {
      if (isListening && !isProcessing) {
        console.log("Stopping due to silence");
        stopListening();
      }
    }, 3000);
    
    setSilenceTimer(newTimer);
  }, [isListening, isProcessing, silenceTimer]);
  
  // Clear silence timer
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
  }, [silenceTimer]);
  
  // Setup event handlers
  useRecognitionEventHandlers({
    recognition: speechRecognition,
    setTranscript,
    setInterimTranscript,
    setIsListening,
    isListening,
    restartAttempts,
    previousInterims,
    resetSilenceTimer
  });
  
  // Configure listening controls
  const { startListening, stopListening } = useListeningControls({
    speechRecognition,
    initialized,
    isListening,
    setIsListening,
    setIsProcessing,
    setTranscript,
    setInterimTranscript,
    restartAttempts,
    clearSilenceTimer,
    useLocalWhisper,
    mediaRecorder,
    audioChunks
  });
  
  // Configure transcript processor
  const { processTranscript } = useTranscriptProcessor({
    transcript,
    isProcessing,
    setIsProcessing,
    setTranscript,
    setInterimTranscript
  });
  
  // Handle push-to-talk
  const handlePushToTalkStart = useCallback(() => {
    setIsPushToTalkActive(true);
    startListening();
  }, [startListening]);
  
  const handlePushToTalkEnd = useCallback(() => {
    setIsPushToTalkActive(false);
    stopListening();
  }, [stopListening]);
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript,
    isPushToTalkActive,
    handlePushToTalkStart,
    handlePushToTalkEnd
  };
};

// Set up recognition
const useRecognitionSetup = (): UseRecognitionSetupReturn => {
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [restartAttempts] = useState(0);
  const [previousInterims] = useState(new Map<string, number>());
  const [useLocalWhisper] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks] = useState<Blob[]>([]);
  
  useEffect(() => {
    try {
      // Check if browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        setSpeechRecognition(recognition);
        setInitialized(true);
        console.log("Speech recognition initialized");
      } else {
        console.warn("Speech recognition not supported in this browser");
        setInitialized(false);
      }
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      setInitialized(false);
    }
    
    return () => {
      if (speechRecognition) {
        speechRecognition.abort();
      }
    };
  }, []);
  
  return {
    speechRecognition,
    initialized,
    restartAttempts,
    previousInterims,
    useLocalWhisper,
    mediaRecorder,
    audioChunks
  };
};

// Controls for starting and stopping listening
const useListeningControls = ({
  speechRecognition,
  initialized,
  isListening,
  setIsListening,
  setIsProcessing,
  setTranscript,
  setInterimTranscript,
  restartAttempts,
  clearSilenceTimer,
  useLocalWhisper,
  mediaRecorder,
  audioChunks
}: UseListeningControlsProps) => {
  const startListening = useCallback(() => {
    if (!initialized || !speechRecognition) {
      console.warn("Speech recognition not initialized");
      return;
    }
    
    if (isListening) {
      console.log("Already listening");
      return;
    }
    
    try {
      speechRecognition.start();
      setIsListening(true);
      console.log("Started listening");
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsListening(false);
    }
  }, [initialized, speechRecognition, isListening, setIsListening]);
  
  const stopListening = useCallback(() => {
    if (!initialized || !speechRecognition) {
      return;
    }
    
    if (!isListening) {
      return;
    }
    
    try {
      speechRecognition.stop();
      setIsListening(false);
      clearSilenceTimer();
      console.log("Stopped listening");
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  }, [initialized, speechRecognition, isListening, setIsListening, clearSilenceTimer]);
  
  return { startListening, stopListening };
};

// Process transcript
const useTranscriptProcessor = ({
  transcript,
  isProcessing,
  setIsProcessing,
  setTranscript,
  setInterimTranscript
}: UseTranscriptProcessorParams): UseTranscriptProcessorReturn => {
  const processTranscript = useCallback(async () => {
    if (!transcript.trim() || isProcessing) {
      return '';
    }
    
    setIsProcessing(true);
    console.log("Processing transcript:", transcript);
    
    try {
      // Here you would typically send the transcript to your backend for processing
      // For now, we'll just return the transcript after a simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear the transcript and interim transcript
      const finalTranscript = transcript;
      setTranscript('');
      setInterimTranscript('');
      setIsProcessing(false);
      
      return finalTranscript;
    } catch (error) {
      console.error("Error processing transcript:", error);
      setIsProcessing(false);
      return '';
    }
  }, [transcript, isProcessing, setIsProcessing, setTranscript, setInterimTranscript]);
  
  return { processTranscript };
};
