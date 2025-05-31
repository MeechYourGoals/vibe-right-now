
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for text-to-speech synthesis functionality using browser's built-in TTS
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
  
  // Function to speak a response
  const speakResponse = useCallback(async (text: string) => {
    if (!text.trim() || isSpeaking) {
      return;
    }
    
    try {
      setIsSpeaking(true);
      
      // Try browser's built-in TTS
      if ('speechSynthesis' in window) {
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a good voice
        const preferredVoice = voices.find(voice => 
          voice.lang === 'en-US' && voice.name.includes('Google')
        ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = preferredVoice;
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Add event listeners
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          setIsSpeaking(false);
          toast.error('Speech synthesis error');
        };
        
        // Use the browser's speech synthesis
        window.speechSynthesis.speak(utterance);
        return;
      }
      
      toast.error('Speech synthesis not supported in this browser');
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error speaking response:', error);
      setIsSpeaking(false);
      toast.error('Error generating speech');
    }
  }, [isSpeaking, audio]);
  
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
    togglePause,
    useElevenLabs: false,
    promptForElevenLabsKey: () => {
      toast.info("Using browser's built-in speech services");
    }
  };
};
