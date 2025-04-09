
import { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from '../speechSynthesis';

export const useVoiceInit = () => {
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [isAttemptingIntro, setIsAttemptingIntro] = useState(false);
  const { speakResponse, stopSpeaking } = useSpeechSynthesis();
  const introAttemptCount = useRef(0);
  
  // Clean up on first mount to prevent multiple intros
  useEffect(() => {
    // Stop any lingering speech
    stopSpeaking();
    
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);
  
  const markIntroAsSpoken = () => {
    setHasSpokenIntro(true);
  };
  
  // This function returns a Promise<boolean> to indicate success
  const speakIntroOnce = async (introMessage: string): Promise<boolean> => {
    // Return immediately if we've already spoken the intro
    if (hasSpokenIntro) {
      console.log('Intro already spoken, skipping');
      return true;
    }
    
    // Return if we're currently attempting to speak the intro
    if (isAttemptingIntro) {
      console.log('Already attempting to speak intro, skipping duplicate attempt');
      return false;
    }
    
    try {
      setIsAttemptingIntro(true);
      console.log('Speaking intro message:', introMessage);
      
      // First stop any ongoing speech to be safe
      stopSpeaking();
      
      // Wait a moment to ensure everything is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Wait for the speech synthesis to complete
      await speakResponse(introMessage);
      
      // Mark intro as spoken
      setHasSpokenIntro(true);
      setIsAttemptingIntro(false);
      return true;
    } catch (error) {
      console.error('Error speaking intro:', error);
      setIsAttemptingIntro(false);
      
      // If this is the first attempt, try one more time after a short delay
      if (introAttemptCount.current < 1) {
        introAttemptCount.current += 1;
        console.log(`Retrying intro speech, attempt ${introAttemptCount.current}`);
        
        // Wait a moment before retrying
        return new Promise(resolve => {
          setTimeout(async () => {
            try {
              await speakResponse(introMessage);
              setHasSpokenIntro(true);
              resolve(true);
            } catch (err) {
              console.error('Error in retry attempt for intro speech:', err);
              resolve(false);
            }
          }, 1000);
        });
      }
      
      return false;
    }
  };
  
  return {
    hasSpokenIntro,
    markIntroAsSpoken,
    isFirstInteraction,
    setIsFirstInteraction,
    isAttemptingIntro,
    speakIntroOnce
  };
};
