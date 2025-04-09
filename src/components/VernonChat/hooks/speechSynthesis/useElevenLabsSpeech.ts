
import { useCallback } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabsService';

interface UseElevenLabsSpeechProps {
  audioElement: React.MutableRefObject<HTMLAudioElement | null>;
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
}

export const useElevenLabsSpeech = ({
  audioElement,
  isSpeaking,
  setIsSpeaking,
  currentlyPlayingText,
  stopSpeaking
}: UseElevenLabsSpeechProps) => {
  
  const speakWithElevenLabs = useCallback(async (text: string): Promise<boolean> => {
    try {
      // Don't repeat the same text if it's already playing
      if (isSpeaking && currentlyPlayingText.current === text) {
        console.log('This text is already being spoken, skipping duplicate');
        return true;
      }
      
      // Stop any currently playing speech first
      stopSpeaking();
      
      // Set state to speaking and track current text
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      // Request to convert text to speech
      console.log('Requesting Eleven Labs text-to-speech with Adam voice');
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
  }, [audioElement, isSpeaking, currentlyPlayingText, setIsSpeaking, stopSpeaking]);
  
  return { speakWithElevenLabs };
};
