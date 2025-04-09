
import { useState, useRef, useCallback } from 'react';
import { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
import { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
import { createAudioElement } from './speechSynthesisUtils';
import { CoquiTTSService } from '@/services/CoquiTTSService';

export const useSpeechSynthesisCore = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
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
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsSpeaking(false);
    currentlyPlayingText.current = null;
  }, []);
  
  // Get browser speech synthesis functionality
  const { speakWithBrowser } = useBrowserSpeechSynthesis();
  
  // Initialize Coqui TTS
  useCallback(() => {
    CoquiTTSService.init()
      .then(available => {
        if (available) {
          console.log('Coqui TTS service initialized successfully');
        } else {
          console.warn('Coqui TTS initialization failed, will use browser fallback');
        }
      })
      .catch(error => console.error('Error initializing Coqui TTS:', error));
  }, []);
  
  return {
    isSpeaking,
    setIsSpeaking,
    currentlyPlayingText,
    audioElement,
    introHasPlayed,
    voices,
    stopSpeaking,
    speakWithBrowser
  };
};
