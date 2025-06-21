
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramService } from '@/services';
import { configureSpeechSynthesis, createUtterance, handleSynthesisError } from './speechSynthesisUtils';
import { useDeepgramSpeech } from './useDeepgramSpeech';
import { toast } from 'sonner';

export const useOptimizedSpeechSynthesis = () => {
  // Core state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isDeepgramReady, setIsDeepgramReady] = useState<boolean>(DeepgramService.hasApiKey());
  
  // Refs for tracking
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentlyPlayingText = useRef<string | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    const synth = configureSpeechSynthesis();
    synthRef.current = synth;
    
    if (synth) {
      const updateVoices = () => {
        const availableVoices = synth.getVoices();
        setVoices(availableVoices);
      };
      
      updateVoices();
      synth.onvoiceschanged = updateVoices;
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
    };
  }, []);
  

  // Deepgram speech hook
  const { speakWithDeepgram } = useDeepgramSpeech({
    audioElement: currentAudioRef,
    isSpeaking,
    setIsSpeaking,
    currentlyPlayingText,
    stopSpeaking: stop
  });
  
  // Browser speech fallback
  const speakWithBrowser = useCallback((text: string, voice?: SpeechSynthesisVoice) => {
    if (!synthRef.current) {
      handleSynthesisError('Speech synthesis not available');
      return;
    }
    
    const utterance = createUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
    } else {
      // Try to find a male voice
      const maleVoice = voices.find(v => 
        v.name.includes('Male') || 
        v.name.includes('David') || 
        v.name.includes('Daniel') ||
        v.name.includes('Google UK English Male')
      );
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      handleSynthesisError(event.error);
    };
    
    synthRef.current.speak(utterance);
  }, [voices]);
  
  // Main speak function that tries Deepgram first, then falls back to browser
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Stop any current speech
    stop();
    
    // Try Deepgram first if available
    if (isDeepgramReady) {
      const success = await speakWithDeepgram(text);
      if (success) return;
      
      console.log('Deepgram failed, falling back to browser speech');
    }
    
    // Fallback to browser speech synthesis
    speakWithBrowser(text);
  }, [isDeepgramReady, isSpeaking, speakWithDeepgram, speakWithBrowser]);
  
  // Stop function
  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    
    setIsSpeaking(false);
    currentlyPlayingText.current = null;
  }, []);
  
  // Deepgram key management
  const promptForDeepgramKey = useCallback(() => {
    const apiKey = prompt('Enter your Deepgram API key for improved voice quality:');
    if (apiKey) {
      DeepgramService.setApiKey(apiKey);
      setIsDeepgramReady(true);
      toast.success('Deepgram API key set successfully!');
    }
  }, []);
  
  return {
    // Main functions
    speak,
    stop,
    
    // State
    isSpeaking,
    isDeepgramReady,
    voices,
    
    // Individual speech methods
    speakWithDeepgram,
    speakWithBrowser,
    
    // Key management
    promptForDeepgramKey,
    
    // Legacy compatibility
    speakResponse: speak,
    stopSpeaking: stop
  };
};
