
import { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ElevenLabsService } from '@/services/ElevenLabsService';

interface SpeechSynthesisOptions {
  voice?: 'male' | 'female';
  pitch?: number;
  rate?: number;
  useElevenLabs?: boolean;
}

export const useEnhancedSpeechSynthesis = (options: SpeechSynthesisOptions = {}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [speechMethod, setSpeechMethod] = useState<'browser' | 'elevenlabs'>('browser');
  const [lastSpokenMessage, setLastSpokenMessage] = useState('');
  
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Check if ElevenLabs is available
  const hasElevenLabsKey = ElevenLabsService.hasApiKey();

  useEffect(() => {
    if (hasElevenLabsKey && options.useElevenLabs !== false) {
      setSpeechMethod('elevenlabs');
    } else {
      setSpeechMethod('browser');
    }
  }, [hasElevenLabsKey, options.useElevenLabs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  // Function to speak using ElevenLabs
  const speakWithElevenLabs = useCallback(async (text: string): Promise<boolean> => {
    try {
      console.log('Speaking with ElevenLabs:', text.substring(0, 50) + '...');
      
      const audioContent = await ElevenLabsService.textToSpeech(text, {
        voice_id: 'TX3LPaxmHKxFdv7VOQHJ', // Liam - male voice
        model_id: 'eleven_turbo_v2_5'
      });
      
      if (audioContent) {
        // Create audio element and play
        const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
        currentAudio.current = audio;
        
        // Add event listeners
        audio.onplay = () => {
          setIsSpeaking(true);
          setIsPaused(false);
        };
        
        audio.onended = () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentText('');
          currentAudio.current = null;
        };
        
        audio.onerror = (error) => {
          console.error('ElevenLabs audio playback error:', error);
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentText('');
          currentAudio.current = null;
          toast({
            title: "Audio playback error",
            description: "Falling back to browser speech synthesis",
            variant: "destructive",
          });
          return speakWithBrowser(text);
        };
        
        // Play the audio
        setCurrentText(text);
        await audio.play();
        return true;
      } else {
        console.warn('No audio content received from ElevenLabs');
        return speakWithBrowser(text);
      }
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      toast({
        title: "ElevenLabs error", 
        description: "Falling back to browser speech synthesis",
        variant: "destructive",
      });
      return speakWithBrowser(text);
    }
  }, [toast]);

  // Function to speak using browser synthesis
  const speakWithBrowser = useCallback((text: string): boolean => {
    if (!window.speechSynthesis) {
      toast({
        title: "Speech synthesis not supported",
        description: "Your browser doesn't support speech synthesis",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log('Speaking with browser synthesis:', text.substring(0, 50) + '...');
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance.current = utterance;
      
      // Try to find a male voice
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => 
        v.name.includes('Male') || 
        v.name.includes('David') || 
        v.name.includes('John') ||
        v.name.includes('Daniel') ||
        v.name.includes('Google UK English Male')
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      if (options.rate) utterance.rate = options.rate;
      if (options.pitch) utterance.pitch = options.pitch;
      
      // Add event listeners
      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentText(text);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentText('');
        currentUtterance.current = null;
      };
      
      utterance.onerror = (error) => {
        console.error('Browser speech synthesis error:', error);
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentText('');
        currentUtterance.current = null;
        toast({
          title: "Speech synthesis error",
          description: "Could not play audio",
          variant: "destructive",
        });
      };
      
      // Speak the utterance
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      console.error('Error with browser speech synthesis:', error);
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentText('');
      toast({
        title: "Speech synthesis error",
        description: "Could not initialize speech synthesis",
        variant: "destructive",
      });
      return false;
    }
  }, [options.rate, options.pitch, toast]);

  // Main speak function
  const speak = useCallback(async (text: string): Promise<boolean> => {
    if (!text || text.trim() === '') return false;
    
    // Prevent speaking the same message repeatedly
    if (text === lastSpokenMessage && isSpeaking) {
      console.log('Preventing duplicate speech of same message');
      return false;
    }
    
    // Cancel any previous speech
    stop();
    
    setLastSpokenMessage(text);
    
    if (speechMethod === 'elevenlabs' && hasElevenLabsKey) {
      return await speakWithElevenLabs(text);
    } else {
      return speakWithBrowser(text);
    }
  }, [speechMethod, hasElevenLabsKey, speakWithElevenLabs, speakWithBrowser, lastSpokenMessage, isSpeaking]);

  // Function to stop speech
  const stop = useCallback(() => {
    console.log('Stopping speech synthesis');
    
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    
    if (currentUtterance.current) {
      window.speechSynthesis.cancel();
      currentUtterance.current = null;
    }
    
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentText('');
  }, []);

  // Function to pause/resume speech
  const togglePause = useCallback(() => {
    if (speechMethod === 'browser' && window.speechSynthesis) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else if (currentAudio.current) {
      if (isPaused) {
        currentAudio.current.play();
        setIsPaused(false);
      } else {
        currentAudio.current.pause();
        setIsPaused(true);
      }
    }
  }, [speechMethod, isPaused]);

  return {
    speak,
    stop,
    togglePause,
    isSpeaking,
    isPaused,
    currentText,
    speechMethod,
    hasElevenLabsKey,
    setSpeechMethod
  };
};
