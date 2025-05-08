
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for text-to-speech synthesis functionality
 */
export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Initialize
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audio) {
      const audioElement = new Audio();
      audioElement.onended = () => setIsSpeaking(false);
      audioElement.onerror = () => {
        console.error('Audio playback error');
        setIsSpeaking(false);
      };
      setAudio(audioElement);
    }
    
    return () => {
      if (audio) {
        audio.pause();
        setIsSpeaking(false);
      }
    };
  }, [audio]);
  
  // Initialize TTS service
  useEffect(() => {
    const initCoqui = async () => {
      try {
        // Initialize Coqui service without configure - we removed the improper call
        // CoquiTTSService.configure is defined in our updated service
      } catch (error) {
        console.error('Error initializing speech synthesis:', error);
      }
    };
    
    initCoqui();
  }, []);
  
  // Function to speak a response
  const speakResponse = useCallback(async (text: string) => {
    if (!text.trim() || isSpeaking) {
      return;
    }
    
    try {
      setIsSpeaking(true);
      
      // Get a synthesized voice response using browser's built-in TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Use the browser's speech synthesis
      window.speechSynthesis.speak(utterance);
      
      // Add event listeners
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        toast.error('Speech synthesis error');
      };
    } catch (error) {
      console.error('Error speaking response:', error);
      setIsSpeaking(false);
      toast.error('Error generating speech');
    }
  }, [isSpeaking]);
  
  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (isSpeaking) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [audio, isSpeaking]);
  
  // Control playback
  const togglePause = useCallback(() => {
    if (audio) {
      if (isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
      setIsPaused(!isPaused);
    } else {
      if (isPaused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
      setIsPaused(!isPaused);
    }
  }, [audio, isPaused]);
  
  return {
    isSpeaking,
    isPaused,
    speakResponse,
    stopSpeaking,
    togglePause
  };
};
