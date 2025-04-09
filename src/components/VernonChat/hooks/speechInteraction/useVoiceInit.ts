
import { useState, useEffect, useRef } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabsService';

export const useVoiceInit = () => {
  const [voiceSetupComplete, setVoiceSetupComplete] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [introPlayed, setIntroPlayed] = useState(false);
  const introAttempted = useRef(false);
  
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
  const speakIntroOnce = async (introMessage: string): Promise<void> => {
    console.log('Attempting to speak intro:', introMessage);
    console.log('Intro state:', { introPlayed, isFirstInteraction, hasSpokenIntro, introAttempted: introAttempted.current });
    
    if (!introPlayed && isFirstInteraction && !hasSpokenIntro && !introAttempted.current) {
      // Mark as attempted to prevent multiple attempts
      introAttempted.current = true;
      
      try {
        // Generate intro speech
        const audioData = await ElevenLabsService.textToSpeech(introMessage);
        
        if (audioData) {
          // Create audio element
          const audio = new Audio();
          const blob = new Blob([audioData], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(blob);
          
          audio.src = url;
          
          // Play intro speech
          await audio.play();
          
          // Clean up on end
          audio.onended = () => {
            URL.revokeObjectURL(url);
            setIntroPlayed(true);
            setHasSpokenIntro(true);
          };
          
          // Set timeout as fallback
          setTimeout(() => {
            setIntroPlayed(true);
            setHasSpokenIntro(true);
          }, 10000); // 10 second fallback
        }
      } catch (error) {
        console.error('Error speaking intro:', error);
      }
    }
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
