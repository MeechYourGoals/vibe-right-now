
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Hook for text-to-speech synthesis functionality
 */
export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [useElevenLabs, setUseElevenLabs] = useState(false);
  
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
      
      // Use Google's TTS API through Vertex AI
      try {
        const audioData = await VertexAIService.textToSpeech(text);
        
        if (audioData && audio) {
          // Create a blob from the audio data
          const blob = new Blob([audioData], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(blob);
          
          // Set the audio source and play
          audio.src = url;
          await audio.play();
          
          // Clean up blob URL after playback
          audio.onended = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
          };
          
          return;
        }
      } catch (error) {
        console.error('Error with Google TTS:', error);
      }
      
      // Fall back to browser's built-in TTS
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
  
  // Function to prompt for ElevenLabs key (now just a stub since we're not using it)
  const promptForElevenLabsKey = useCallback(() => {
    toast.info("We now use Google's speech services instead");
  }, []);
  
  return {
    isSpeaking,
    isPaused,
    speakResponse,
    stopSpeaking,
    togglePause,
    useElevenLabs,
    promptForElevenLabsKey
  };
};

// Import the VertexAIService
import { VertexAIService } from '@/services/VertexAIService';
