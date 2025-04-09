
import { useEffect, useState } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { toast } from 'sonner';
import { ElevenLabsService } from '@/services/ElevenLabsService';

export const useSpeechInteraction = () => {
  const [voiceSetupComplete, setVoiceSetupComplete] = useState(false);
  
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
    stopSpeaking,
    useElevenLabs,
    promptForElevenLabsKey
  } = useSpeechSynthesis();
  
  // Initialize voice with default API key
  useEffect(() => {
    if (!voiceSetupComplete) {
      // Check if API key exists, if not, use the default one
      if (!ElevenLabsService.hasApiKey()) {
        // This will use the default API key from the service
        ElevenLabsService.getApiKey();
        console.log('Using default Eleven Labs API key');
      }
      
      setVoiceSetupComplete(true);
    }
  }, [voiceSetupComplete]);
  
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
      // Request microphone permission first
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // If permission granted, start listening
          startListening();
          toast.success('Voice mode activated. Start speaking...');
        })
        .catch(error => {
          console.error('Microphone permission denied:', error);
          toast.error('Microphone access required for voice mode');
        });
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
    processTranscript,
    useElevenLabs,
    promptForElevenLabsKey
  };
};
