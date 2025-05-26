
import { useCallback } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTSService';
import { toast } from '@/hooks/use-toast';

interface UseGoogleTTSSpeechProps {
  audioElement: React.MutableRefObject<HTMLAudioElement | null>;
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
}

export const useGoogleTTSSpeech = ({
  audioElement,
  isSpeaking,
  setIsSpeaking,
  currentlyPlayingText,
  stopSpeaking
}: UseGoogleTTSSpeechProps) => {
  
  const speakWithGoogleTTS = useCallback(async (text: string): Promise<boolean> => {
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
      
      // Request to convert text to speech using Google TTS
      console.log('Requesting Google Cloud TTS');
      const audioContent = await GoogleTTSService.synthesizeSpeech(text);
      
      if (!audioContent || !audioElement.current) {
        console.error('Failed to get audio from Google TTS or audio element not available');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
      
      // Set audio source and play
      audioElement.current.src = `data:audio/mp3;base64,${audioContent}`;
      
      try {
        await audioElement.current.play();
        
        // Clean up after playback
        audioElement.current.onended = () => {
          setIsSpeaking(false);
          currentlyPlayingText.current = null;
        };
        return true;
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
    } catch (error) {
      console.error('Error with Google TTS speech synthesis:', error);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      return false;
    }
  }, [audioElement, isSpeaking, currentlyPlayingText, setIsSpeaking, stopSpeaking]);
  
  return { speakWithGoogleTTS };
};
