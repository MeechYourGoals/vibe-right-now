
import { useEffect } from 'react';
import { useSpeechSynthesisCore } from './speechSynthesis/useSpeechSynthesisCore';
import { useSpeakResponse } from './speechSynthesis/useSpeakResponse';
import { WhisperSpeechService } from '@/services/WhisperSpeechService';

export const useSpeechSynthesis = () => {
  // Get core speech synthesis functionality
  const {
    isSpeaking,
    setIsSpeaking,
    currentlyPlayingText,
    audioElement,
    introHasPlayed,
    voices,
    stopSpeaking,
    speakWithBrowser
  } = useSpeechSynthesisCore();
  
  // Get speak response functionality
  const { speakResponse } = useSpeakResponse({
    isSpeaking,
    currentlyPlayingText,
    stopSpeaking,
    speakWithBrowser,
    introHasPlayed,
    voices
  });
  
  // Preload the Whisper model when the hook is first used
  useEffect(() => {
    WhisperSpeechService.initSpeechRecognition()
      .then(() => console.log('Whisper model loaded successfully'))
      .catch(error => console.error('Error loading Whisper model:', error));
  }, []);
  
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
    stopSpeaking
  };
};
