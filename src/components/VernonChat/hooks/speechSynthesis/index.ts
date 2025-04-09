
import { useState, useCallback, useRef, useEffect } from 'react';
import { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
import { useElevenLabsVoice } from './useElevenLabsVoice';
import { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
import { ElevenLabsService } from '@/services/ElevenLabs';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [useElevenLabs, setUseElevenLabs] = useState(true);  // Default to using ElevenLabs
  const currentlyPlayingText = useRef<string | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  
  // Initialize hooks
  const { voices } = useSpeechSynthesisVoices();
  const { 
    isElevenLabsReady,
    promptForElevenLabsKey,
    cancelElevenLabsSpeech
  } = useElevenLabsVoice();
  
  const {
    speakWithBrowser,
    cancelSpeech: cancelBrowserSpeech
  } = useBrowserSpeechSynthesis();
  
  // Initialize audio element for ElevenLabs playback
  useEffect(() => {
    if (!audioElement.current) {
      audioElement.current = new Audio();
      
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
    }
    
    return () => {
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
      }
    };
  }, []);
  
  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (useElevenLabs) {
      cancelElevenLabsSpeech();
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.currentTime = 0;
      }
    } else {
      cancelBrowserSpeech();
    }
    
    setIsSpeaking(false);
    currentlyPlayingText.current = null;
  }, [useElevenLabs, cancelElevenLabsSpeech, cancelBrowserSpeech]);
  
  // Speak with ElevenLabs
  const speakWithElevenLabs = useCallback(async (text: string): Promise<boolean> => {
    try {
      // Don't repeat the same text if it's already playing
      if (isSpeaking && currentlyPlayingText.current === text) {
        console.log('This text is already being spoken, skipping duplicate');
        return true;
      }
      
      // Stop any currently playing speech first
      stopSpeaking();
      
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      // Request to convert text to speech
      const audioData = await ElevenLabsService.textToSpeech(text);
      
      if (!audioData || !audioElement.current) {
        console.error('Failed to get audio from Eleven Labs or audio element not available');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
      
      // Create blob from array buffer
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Set audio source and play
      audioElement.current.src = url;
      
      try {
        await audioElement.current.play();
        
        // Clean up blob URL after playback
        audioElement.current.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
        };
        return true;
      } catch (error) {
        console.error('Error playing audio:', error);
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
    } catch (error) {
      console.error('Error with Eleven Labs speech synthesis:', error);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      return false;
    }
  }, [isSpeaking, stopSpeaking]);
  
  // Main speech function
  const speakResponse = useCallback(async (text: string): Promise<void> => {
    // Avoid speaking empty text
    if (!text || text.trim() === '') {
      console.log('Empty text provided, not speaking');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Always stop any ongoing speech first
    stopSpeaking();
    
    // Prioritize ElevenLabs for best voice quality
    if (useElevenLabs && isElevenLabsReady) {
      try {
        const success = await speakWithElevenLabs(text);
        if (success) return;
      } catch (error) {
        console.error('ElevenLabs speech failed, falling back to browser synthesis:', error);
      }
    }
    
    // Fallback to browser's speech synthesis
    await speakWithBrowser(text, voices);
  }, [
    isSpeaking, 
    stopSpeaking, 
    useElevenLabs, 
    isElevenLabsReady, 
    speakWithElevenLabs, 
    speakWithBrowser, 
    voices
  ]);
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking,
    useElevenLabs,
    promptForElevenLabsKey
  };
};

// Re-export all hooks for easier imports
export * from './useSpeechSynthesisVoices';
export * from './useElevenLabsVoice';
export * from './useBrowserSpeechSynthesis';
export * from './useElevenLabsSpeech';
