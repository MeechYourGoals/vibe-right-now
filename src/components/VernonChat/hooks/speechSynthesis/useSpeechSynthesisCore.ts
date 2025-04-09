
import { useState, useRef, useCallback } from 'react';
import { useElevenLabsSpeech } from './useElevenLabsSpeech';
import { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
import { ElevenLabsService } from '@/services/ElevenLabsService';
import { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
import { createAudioElement } from './speechSynthesisUtils';

export const useSpeechSynthesisCore = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useElevenLabs, setUseElevenLabs] = useState(true); // Default to using ElevenLabs
  
  // References for tracking speech
  const currentlyPlayingText = useRef<string | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const introHasPlayed = useRef<boolean>(false);
  
  // Get available voices
  const { voices } = useSpeechSynthesisVoices();
  
  // Initialize audio element if it doesn't exist
  if (!audioElement.current) {
    audioElement.current = createAudioElement(
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
      },
      () => {
        console.error('Audio playback error');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
      }
    );
  }
  
  // Define the stop speaking function
  const stopSpeaking = useCallback((): void => {
    if (useElevenLabs && audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    }
  }, [useElevenLabs]);
  
  // Get browser speech synthesis functionality
  const { speakWithBrowser } = useBrowserSpeechSynthesis();
  
  // Get ElevenLabs speech functionality
  const { speakWithElevenLabs } = useElevenLabsSpeech({
    audioElement,
    isSpeaking,
    setIsSpeaking,
    currentlyPlayingText,
    stopSpeaking
  });
  
  // Check for ElevenLabs API key and set useElevenLabs state
  useCallback(() => {
    const hasElevenLabsKey = ElevenLabsService.hasApiKey();
    setUseElevenLabs(hasElevenLabsKey);
  }, []);
  
  return {
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
  };
};
