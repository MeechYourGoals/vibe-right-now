
import { useEffect } from 'react';
import { useSpeechSynthesisCore } from './speechSynthesis/useSpeechSynthesisCore';
import { useSpeakResponse } from './speechSynthesis/useSpeakResponse';
import { useElevenLabsKeyManager } from './speechSynthesis/useElevenLabsKeyManager';
import { ElevenLabsService } from '@/services/ElevenLabsService';

export const useSpeechSynthesis = () => {
  // Get core speech synthesis functionality
  const {
    isSpeaking,
    setIsSpeaking,
    useElevenLabs,
    setUseElevenLabs,
    currentlyPlayingText,
    audioElement,
    introHasPlayed,
    voices,
    stopSpeaking,
    speakWithBrowser,
    speakWithElevenLabs
  } = useSpeechSynthesisCore();
  
  // Get speak response functionality
  const { speakResponse } = useSpeakResponse({
    isSpeaking,
    currentlyPlayingText,
    stopSpeaking,
    speakWithElevenLabs,
    speakWithBrowser,
    useElevenLabs,
    introHasPlayed,
    voices
  });
  
  // Get ElevenLabs key management functionality
  const { promptForElevenLabsKey } = useElevenLabsKeyManager(setUseElevenLabs);
  
  // Check if Eleven Labs API key is available and set useElevenLabs
  useEffect(() => {
    const hasElevenLabsKey = ElevenLabsService.hasApiKey();
    setUseElevenLabs(hasElevenLabsKey);
  }, [setUseElevenLabs]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
        audioElement.current.onplay = null;
        audioElement.current.onended = null;
        audioElement.current.onerror = null;
      }
    };
  }, []);
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    useElevenLabs,
    promptForElevenLabsKey
  };
};
