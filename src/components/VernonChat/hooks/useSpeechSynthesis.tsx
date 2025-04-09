
import { useEffect } from 'react';
import { useSpeechSynthesisCore } from './speechSynthesis/useSpeechSynthesisCore';
import { useSpeakResponse } from './speechSynthesis/useSpeakResponse';
import { CoquiTTSService } from '@/services/CoquiTTSService';
import { SwirlSearchService } from '@/services/SwirlSearchService';

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
  
  // Initialize Coqui TTS and Swirl search when the hook is first used
  useEffect(() => {
    // Configure Coqui TTS with the server URL
    // You can change this to your actual server URL as needed
    CoquiTTSService.configure('http://localhost:5002');
    
    // Initialize the Coqui TTS service
    CoquiTTSService.init()
      .then((available) => {
        if (available) {
          console.log('Coqui TTS server connected successfully');
        } else {
          console.warn('Coqui TTS server not available, will use browser fallback');
        }
      })
      .catch(error => console.error('Error initializing Coqui TTS:', error));
    
    // Configure Swirl Search service
    SwirlSearchService.configure({
      baseUrl: 'http://localhost:8000'
    });
    
    // Check if Swirl is available
    SwirlSearchService.isAvailable()
      .then(available => {
        if (available) {
          console.log('Swirl search engine connected successfully');
        } else {
          console.warn('Swirl search engine not available, will use alternative search methods');
        }
      })
      .catch(error => console.error('Error connecting to Swirl search engine:', error));
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
  
  // Add dummy implementations for properties needed by other components
  const useElevenLabs = false;
  const promptForElevenLabsKey = () => Promise.resolve(false);
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    // Include these properties to prevent TypeScript errors
    useElevenLabs,
    promptForElevenLabsKey
  };
};
