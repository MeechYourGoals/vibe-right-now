
import { useCallback } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabsService';

interface UseElevenLabsSpeechProps {
  audioElement: React.MutableRefObject<HTMLAudioElement | null>;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
}

export const useElevenLabsSpeech = ({
  audioElement,
  setIsSpeaking,
  currentlyPlayingText,
  stopSpeaking
}: UseElevenLabsSpeechProps) => {
  
  const speakWithElevenLabs = useCallback(async (text: string): Promise<boolean> => {
    try {
      // Don't repeat the same text if it's already playing
      if (currentlyPlayingText.current === text) {
        console.log('This text is already being spoken, skipping duplicate');
        return true;
      }
      
      // Stop any currently playing speech first
      stopSpeaking();
      
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      // Request to convert text to speech
      const audioData = await ElevenLabsService.textToSpeech(text);
      
      if (!audioData) {
        console.error('Failed to get audio from Eleven Labs');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
      
      // Create blob from array buffer
      const blob = new Blob([audioData], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      
      // Set audio source and play
      if (audioElement.current) {
        audioElement.current.src = url;
        await audioElement.current.play();
        
        // Clean up blob URL after playback
        audioElement.current.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
        };
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error with Eleven Labs speech synthesis:', error);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      return false;
    }
  }, [audioElement, setIsSpeaking, currentlyPlayingText, stopSpeaking]);
  
  const hasElevenLabsApiKey = useCallback(() => {
    return ElevenLabsService.hasApiKey();
  }, []);
  
  const promptForElevenLabsKey = useCallback((): void => {
    const apiKey = prompt('Enter your Eleven Labs API key for improved voice quality:');
    if (apiKey) {
      ElevenLabsService.setApiKey(apiKey);
    }
  }, []);
  
  return {
    speakWithElevenLabs,
    hasElevenLabsApiKey,
    promptForElevenLabsKey
  };
};
