
import { useEffect } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { toast } from 'sonner';

export const useSpeechInteraction = () => {
  const {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript
  } = useSpeechRecognition();
  
  const {
    isSpeaking,
    speakResponse,
    stopSpeaking
  } = useSpeechSynthesis();
  
  const toggleListening = () => {
    if (!navigator.mediaDevices) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      // If currently listening, stop
      stopListening();
      stopSpeaking(); // Also stop any ongoing speech
    } else {
      // If not listening, start
      startListening();
    }
  };
  
  // Effect to clean up resources
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    isSpeaking,
    toggleListening,
    stopListening,
    stopSpeaking,
    speakResponse,
    processTranscript
  };
};
