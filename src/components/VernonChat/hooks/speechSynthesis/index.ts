
import { useState, useRef, useEffect } from 'react';
import { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
import { useElevenLabsSpeech } from './useElevenLabsSpeech';
import { toast } from 'sonner';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [useElevenLabs, setUseElevenLabs] = useState(false);
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const currentlyPlayingText = useRef<string | null>(null);
  
  // Initialize services
  useEffect(() => {
    // Initialize speech synthesis
    speechSynthesis.current = window.speechSynthesis;
    
    // Initialize audio element for Eleven Labs playback
    audioElement.current = new Audio();
    
    // Set up event handlers
    if (audioElement.current) {
      audioElement.current.onplay = () => setIsSpeaking(true);
      audioElement.current.onended = () => {
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
      };
      audioElement.current.onerror = () => {
        console.error('Audio playback error');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
      };
    }
    
    // Check if Eleven Labs API key is available
    const hasKey = localStorage.getItem('elevenLabsApiKey') !== null;
    setUseElevenLabs(hasKey);
    
    return () => {
      if (audioElement.current) {
        audioElement.current.onplay = null;
        audioElement.current.onended = null;
        audioElement.current.onerror = null;
      }
    };
  }, []);
  
  // Effect to load voices when available
  useEffect(() => {
    // Function to set available voices
    const setAvailableVoices = () => {
      if (speechSynthesis.current) {
        const availableVoices = speechSynthesis.current.getVoices();
        setVoices(availableVoices);
      }
    };
    
    // Set voices right away if already loaded
    setAvailableVoices();
    
    // Set up event listener for when voices are loaded asynchronously
    if (speechSynthesis.current) {
      speechSynthesis.current.onvoiceschanged = setAvailableVoices;
    }
    
    // Cleanup
    return () => {
      if (speechSynthesis.current) {
        speechSynthesis.current.onvoiceschanged = null;
      }
    };
  }, []);
  
  // Stop any ongoing speech
  const stopSpeaking = (): void => {
    if (useElevenLabs && audioElement.current) {
      audioElement.current.pause();
      audioElement.current.currentTime = 0;
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    } else if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
      if (currentUtterance.current) {
        currentUtterance.current = null;
      }
      currentlyPlayingText.current = null;
    }
  };
  
  // Browser speech synthesis
  const { speakWithBrowserSynthesis } = useBrowserSpeechSynthesis({
    speechSynthesis,
    voices,
    currentUtterance,
    isSpeaking,
    setIsSpeaking,
    currentlyPlayingText,
    stopSpeaking
  });
  
  // Eleven Labs speech synthesis
  const { 
    speakWithElevenLabs, 
    hasElevenLabsApiKey, 
    promptForElevenLabsKey 
  } = useElevenLabsSpeech({
    audioElement,
    setIsSpeaking,
    currentlyPlayingText,
    stopSpeaking
  });
  
  // Main function to speak a response, using Eleven Labs if available or fallback to browser
  const speakResponse = async (text: string): Promise<void> => {
    if (!text || text.trim() === '') {
      console.log('Empty text provided, not speaking');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Stop any ongoing speech first
    stopSpeaking();
    
    // Try to use Eleven Labs if available, fall back to browser synthesis
    if (useElevenLabs) {
      const success = await speakWithElevenLabs(text);
      if (success) return;
      
      // If Eleven Labs fails, fall back to browser synthesis
      console.log('Falling back to browser speech synthesis');
    }
    
    // Use browser's speech synthesis
    speakWithBrowserSynthesis(text);
    
    // Return a promise that resolves when speaking is done
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!isSpeaking) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  };
  
  // Function to prompt user for Eleven Labs API key
  const handlePromptForElevenLabsKey = (): void => {
    const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
    if (apiKey) {
      localStorage.setItem('elevenLabsApiKey', apiKey);
      setUseElevenLabs(true);
      toast.success('Eleven Labs API key saved. Voice quality will be improved.');
    }
  };
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    useElevenLabs,
    promptForElevenLabsKey: handlePromptForElevenLabsKey
  };
};
