
import { useCallback, useRef } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTSService';

interface UseGoogleTTSSpeechProps {
  audioElement: React.MutableRefObject<HTMLAudioElement | null>;
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
}

// Migrated from ElevenLabs to Google TTS
export const useGoogleTTSSpeech = ({
  audioElement,
  isSpeaking,
  setIsSpeaking,
  currentlyPlayingText,
  stopSpeaking
}: UseGoogleTTSSpeechProps) => {
  
  const speakWithGoogleTTS = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (isSpeaking && currentlyPlayingText.current === text) {
        console.log('This text is already being spoken, skipping duplicate');
        return true;
      }
      
      stopSpeaking();
      setIsSpeaking(true);
      currentlyPlayingText.current = text;
      
      console.log('Requesting Google Cloud TTS');
      const audioContent = await GoogleTTSService.synthesizeSpeech(text);
      
      if (!audioContent || !audioElement.current) {
        console.error('Failed to get audio from Google TTS or audio element not available');
        setIsSpeaking(false);
        currentlyPlayingText.current = null;
        return false;
      }
      
      audioElement.current.src = `data:audio/mp3;base64,${audioContent}`;
      
      try {
        await audioElement.current.play();
        
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
