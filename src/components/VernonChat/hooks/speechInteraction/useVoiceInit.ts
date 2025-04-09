
import { useState, useEffect } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabsService';

export const useVoiceInit = () => {
  const [voiceSetupComplete, setVoiceSetupComplete] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [introPlayed, setIntroPlayed] = useState(false);
  
  // Initialize voice with Eleven Labs API key
  useEffect(() => {
    if (!voiceSetupComplete) {
      // Use the provided API key
      ElevenLabsService.setApiKey('sk_236c24971a353bfa897b2c150b2d256ae65e352b405e3e4f');
      console.log('Using Eleven Labs API key');
      setVoiceSetupComplete(true);
    }
  }, [voiceSetupComplete]);
  
  // Mark intro as spoken and track it has been spoken
  const markIntroAsSpoken = () => {
    setHasSpokenIntro(true);
    setIntroPlayed(true);
  };

  // Function to speak the intro only once when toggling to listening mode for the first time
  const speakIntroOnce = (speakResponse: (text: string) => Promise<void>, introMessage: string) => {
    if (!introPlayed && isFirstInteraction && !hasSpokenIntro) {
      setIntroPlayed(true);
      return speakResponse(introMessage);
    }
    return Promise.resolve();
  };
  
  return {
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    setIsFirstInteraction,
    introPlayed,
    setIntroPlayed,
    speakIntroOnce
  };
};
