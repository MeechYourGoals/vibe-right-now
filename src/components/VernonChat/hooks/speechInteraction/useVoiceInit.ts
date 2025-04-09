
import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '../speechSynthesis';

export const useVoiceInit = () => {
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const { speakResponse } = useSpeechSynthesis();
  
  // Force greet the user on first mount
  useEffect(() => {
    if (isFirstInteraction && !hasSpokenIntro) {
      console.log('Attempting auto-speak intro on first mount');
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
      await speakResponse(introMessage);
      setHasSpokenIntro(true);
      return true;
    } catch (error) {
      console.error('Error speaking intro:', error);
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
