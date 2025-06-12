
import { useState, useCallback } from 'react';
import { useElevenLabsVoice } from './useElevenLabsVoice';
import { useSpeechSynthesis } from './useSpeechSynthesis';

export const useEnhancedSpeechSynthesis = () => {
  const [currentlySpeaking, setCurrentlySpeaking] = useState(false);
  
  // ElevenLabs voice hook
  const { 
    isSpeaking: isElevenLabsSpeaking, 
    speakWithElevenLabs, 
    cancelSpeech: cancelElevenLabs 
  } = useElevenLabsVoice();
  
  // Browser speech synthesis fallback
  const { 
    speak: speakWithBrowser, 
    cancel: cancelBrowser, 
    isSpeaking: isBrowserSpeaking 
  } = useSpeechSynthesis();
  
  // Main speak function that tries ElevenLabs first, then fallback
  const speakResponse = useCallback(async (text: string) => {
    if (!text || text.trim() === '') return;
    
    // Don't interrupt if already speaking the same content
    if (currentlySpeaking) {
      console.log('Already speaking, canceling previous speech');
      cancelSpeech();
    }
    
    setCurrentlySpeaking(true);
    
    try {
      console.log('Attempting ElevenLabs speech with Brian voice');
      
      // Try ElevenLabs first
      const elevenLabsSuccess = await speakWithElevenLabs(text);
      
      if (elevenLabsSuccess) {
        console.log('ElevenLabs speech successful');
        return;
      }
      
      // Fallback to browser speech synthesis
      console.log('Falling back to browser speech synthesis');
      speakWithBrowser(text);
      
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      
      // Final fallback to browser speech
      console.log('Using browser speech as final fallback');
      speakWithBrowser(text);
    }
  }, [currentlySpeaking, speakWithElevenLabs, speakWithBrowser]);
  
  // Cancel any ongoing speech
  const cancelSpeech = useCallback(() => {
    console.log('Canceling all speech');
    cancelElevenLabs();
    cancelBrowser();
    setCurrentlySpeaking(false);
  }, [cancelElevenLabs, cancelBrowser]);
  
  // Update speaking state based on both services
  const isSpeaking = isElevenLabsSpeaking || isBrowserSpeaking || currentlySpeaking;
  
  // Auto-update currently speaking state
  useState(() => {
    if (!isElevenLabsSpeaking && !isBrowserSpeaking) {
      setCurrentlySpeaking(false);
    }
  });
  
  return {
    speakResponse,
    cancelSpeech,
    isSpeaking
  };
};
