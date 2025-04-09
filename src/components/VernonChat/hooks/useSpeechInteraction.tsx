
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
  
  // Check if this is the first time using voice features
  useEffect(() => {
    if (!voiceSetupComplete) {
      const hasSeenVoicePrompt = localStorage.getItem('hasSeenVoicePrompt');
      
      if (!hasSeenVoicePrompt && !ElevenLabsService.hasApiKey()) {
        // Set a small delay to show the prompt after component mounts
        const promptTimer = setTimeout(() => {
          const useElevenLabsVoice = window.confirm(
            'Would you like to enable higher quality voice with Eleven Labs? ' +
            'You\'ll need an API key from elevenlabs.io (free tier available).'
          );
          
          if (useElevenLabsVoice) {
            promptForElevenLabsKey();
          }
          
          localStorage.setItem('hasSeenVoicePrompt', 'true');
        }, 2000);
        
        return () => clearTimeout(promptTimer);
      }
      
      setVoiceSetupComplete(true);
    }
  }, [voiceSetupComplete, promptForElevenLabsKey]);
  
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
    processTranscript,
    useElevenLabs,
    promptForElevenLabsKey
  };
};
