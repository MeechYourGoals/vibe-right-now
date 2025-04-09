
import { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis } from '../speechSynthesis';

export const useVoiceInit = () => {
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const { speakResponse } = useSpeechSynthesis();
  const introAttemptCount = useRef(0);
  
  // Force greet the user on first mount
  useEffect(() => {
    if (isFirstInteraction && !hasSpokenIntro && introAttemptCount.current === 0) {
      console.log('Attempting auto-speak intro on first mount');
      introAttemptCount.current += 1;
    }
  }, [isFirstInteraction, hasSpokenIntro]);
  
  const markIntroAsSpoken = () => {
    setHasSpokenIntro(true);
  };
  
  // This function returns a Promise<boolean> to indicate success
  const speakIntroOnce = async (introMessage: string): Promise<boolean> => {
    if (hasSpokenIntro) {
      return true; // Already spoken, return success
    }
    
    try {
      console.log('Speaking intro message:', introMessage);
      
      // Wait for the speech synthesis to complete
      await speakResponse(introMessage);
      
      // Mark intro as spoken
      setHasSpokenIntro(true);
      return true;
    } catch (error) {
      console.error('Error speaking intro:', error);
      
      // If this is the first attempt, try one more time after a short delay
      if (introAttemptCount.current < 2) {
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
    speakIntroOnce
  };
};
