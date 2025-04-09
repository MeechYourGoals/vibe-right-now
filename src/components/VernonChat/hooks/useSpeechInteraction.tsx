
import { useEffect, useState } from 'react';
import { useSpeechRecognition } from './speechRecognition';
import { useSpeechSynthesis } from './speechSynthesis';
import { toast } from 'sonner';
import { ElevenLabsService } from '@/services/ElevenLabsService';

export const useSpeechInteraction = () => {
  const [voiceSetupComplete, setVoiceSetupComplete] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [introPlayed, setIntroPlayed] = useState(false);
  
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
  
  // Initialize voice with Eleven Labs API key
  useEffect(() => {
    if (!voiceSetupComplete) {
      // Use the provided API key
      ElevenLabsService.setApiKey('sk_236c24971a353bfa897b2c150b2d256ae65e352b405e3e4f');
      console.log('Using Eleven Labs API key');
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
      stopSpeaking(); // Also stop any ongoing speech when user toggles off
    } else {
      // Request microphone permission first
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // If permission granted, start listening
          startListening();
          setIsFirstInteraction(false); // No longer the first interaction once user toggles listening
          toast.success('Voice mode activated. Start speaking...');
        })
        .catch(error => {
          console.error('Microphone permission denied:', error);
          toast.error('Microphone access required for voice mode');
        });
    }
  };
  
  // Mark intro as spoken and track it has been spoken
  const markIntroAsSpoken = () => {
    setHasSpokenIntro(true);
    setIntroPlayed(true);
  };

  // Function to speak the intro only once when toggling to listening mode for the first time
  const speakIntroOnce = (introMessage: string) => {
    if (!introPlayed && isFirstInteraction && isListening) {
      setIntroPlayed(true);
      return speakResponse(introMessage);
    }
    return Promise.resolve();
  };
  
  // Effect to handle user interruption
  useEffect(() => {
    if (isSpeaking && isListening && interimTranscript.trim().length > 3) {
      // If we're speaking but the user starts talking (with just a few words),
      // stop the current speech to listen to them
      console.log('User interrupted, stopping speech');
      stopSpeaking();
    }
  }, [isSpeaking, isListening, interimTranscript, stopSpeaking]);
  
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
    promptForElevenLabsKey,
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    speakIntroOnce
  };
};
