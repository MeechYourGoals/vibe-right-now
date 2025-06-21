
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramService } from '@/services/DeepgramService';
import { toast } from 'sonner';

export const useOptimizedSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isDeepgramReady, setIsDeepgramReady] = useState<boolean>(DeepgramService.hasApiKey());
  
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentlyPlayingText = useRef<string | null>(null);
  const lastSpokenMessage = useRef<string | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
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
  
  // Deepgram speech function
  const speakWithDeepgram = useCallback(async (text: string): Promise<boolean> => {
    try {
      console.log('Using Deepgram TTS for:', text.substring(0, 50) + '...');
      
      const audioData = await DeepgramService.textToSpeech(text);
      
      if (!audioData) {
        console.warn('No audio data from Deepgram');
        return false;
      }
      
      // Create blob and audio element
      const blob = new Blob([audioData], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      currentAudioRef.current = audio;
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      return new Promise((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
          currentAudioRef.current = null;
          lastSpokenMessage.current = text;
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
  const speakWithBrowser = useCallback((text: string, voice?: SpeechSynthesisVoice) => {
    if (!synthRef.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
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
      lastSpokenMessage.current = text;
    };
    
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      console.error('Speech synthesis error:', event.error);
    };
    
    synthRef.current.speak(utterance);
  }, [voices]);
  
  // Main speak function
  const speak = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;
    
    // Prevent speaking the same message twice in a row
    if (lastSpokenMessage.current === text) {
      console.log('Skipping duplicate message:', text.substring(0, 50));
      return;
    }
    
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
    const apiKey = prompt('Enter your Deepgram API key for enhanced voice quality:');
    if (apiKey && apiKey.trim()) {
      DeepgramService.setApiKey(apiKey.trim());
      setIsDeepgramReady(true);
      toast.success('Deepgram API key set successfully! Enhanced voice quality is now active.');
    } else if (apiKey === '') {
      toast.error('Please enter a valid API key');
    }
  }, []);
  
  return {
    speak,
    stop,
    isSpeaking,
    isDeepgramReady,
    voices,
    speakWithDeepgram,
    speakWithBrowser,
    promptForDeepgramKey,
    
    // Legacy compatibility
    speakResponse: speak,
    stopSpeaking: stop,
    isElevenLabsReady: isDeepgramReady,
    promptForElevenLabsKey: promptForDeepgramKey
  };
};
