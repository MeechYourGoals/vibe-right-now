
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramService } from '@/services';
import { configureSpeechSynthesis, createUtterance, handleSynthesisError } from './speechSynthesisUtils';
import { toast } from 'sonner';

export const useOptimizedSpeechSynthesis = () => {
  // Core state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isElevenLabsReady, setIsElevenLabsReady] = useState<boolean>(DeepgramService.hasApiKey());
  
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
  
  // ElevenLabs speech function
  interface SpeakOptions {
    model?: string;
    volume?: number;
    rate?: number;
  }

  const speakWithElevenLabs = useCallback(async (text: string, options: SpeakOptions = {}): Promise<boolean> => {
    try {
      console.log('Using Deepgram TTS for:', text.substring(0, 50) + '...');

      const audioData = await DeepgramService.textToSpeech(text, options.model ? { model: options.model } : {});
      
      if (!audioData) {
        console.warn('No audio data from ElevenLabs');
        return false;
      }
      
      // Create blob and audio element
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      if (options.volume !== undefined) audio.volume = options.volume;
      if (options.rate !== undefined) audio.playbackRate = options.rate;
      
      currentAudioRef.current = audio;
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      return new Promise((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
          currentAudioRef.current = null;
          resolve(true);
        };
        
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
          currentAudioRef.current = null;
          resolve(false);
        };
        
        audio.play().catch(() => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
          currentAudioRef.current = null;
          resolve(false);
        });
      });
    } catch (error) {
      console.error('Deepgram speech error:', error);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      currentAudioRef.current = null;
      return false;
    }
  }, []);
  
  // Browser speech fallback
  const speakWithBrowser = useCallback((text: string, options: SpeakOptions & { voiceName?: string } = {}) => {
    if (!synthRef.current) {
      handleSynthesisError('Speech synthesis not available');
      return;
    }

    const utterance = createUtterance(text);
    if (options.voiceName) {
      const found = voices.find(v => v.name === options.voiceName);
      if (found) utterance.voice = found;
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

    if (options.volume !== undefined) utterance.volume = options.volume;
    if (options.rate !== undefined) utterance.rate = options.rate;
    
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
  
  // Main speak function that tries ElevenLabs first, then falls back to browser
  const speak = useCallback(async (text: string, options: SpeakOptions = {}): Promise<void> => {
    if (!text.trim()) return;
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Stop any current speech
    stop();
    
    // Try ElevenLabs first if available
    if (isElevenLabsReady) {
      const success = await speakWithElevenLabs(text, options);
      if (success) return;
      
      console.log('Deepgram failed, falling back to browser speech');
    }
    
    // Fallback to browser speech synthesis
    speakWithBrowser(text, options);
  }, [isElevenLabsReady, isSpeaking, speakWithElevenLabs, speakWithBrowser]);
  
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
  
  // ElevenLabs key management
  const promptForElevenLabsKey = useCallback(() => {
    const apiKey = prompt('Enter your Deepgram API key for improved voice quality:');
    if (apiKey) {
      DeepgramService.setApiKey(apiKey);
      setIsElevenLabsReady(true);
      toast.success('ElevenLabs API key set successfully!');
    }
  }, []);
  
  return {
    // Main functions
    speak,
    stop,
    
    // State
    isSpeaking,
    isElevenLabsReady,
    voices,
    
    // Individual speech methods
    speakWithElevenLabs,
    speakWithBrowser,
    
    // Key management
    promptForElevenLabsKey,
    
    // Legacy compatibility
    speakResponse: speak,
    stopSpeaking: stop
  };
};
