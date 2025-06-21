
import { useCallback } from 'react';
import { DeepgramService } from '@/services';
import { toast } from '@/hooks/use-toast';

interface UseDeepgramSpeechProps {
  audioElement: React.MutableRefObject<HTMLAudioElement | null>;
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
}

export const useDeepgramSpeech = ({
  audioElement,
  isSpeaking,
  setIsSpeaking,
  currentlyPlayingText,
  stopSpeaking
}: UseDeepgramSpeechProps) => {
  
  const speakWithDeepgram = useCallback(async (text: string): Promise<boolean> => {
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
      console.log('Requesting Deepgram text-to-speech');
      const audioData = await DeepgramService.textToSpeech(text);
      
      if (!audioData || !audioElement.current) {
        console.error('Failed to get audio from Deepgram or audio element not available');
        // If failed, don't show error toast as the browser speech synthesis will take over
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
      if (error instanceof Error && error.message.includes('quota_exceeded')) {
        console.warn('Deepgram quota exceeded, falling back to browser speech');
        // Show toast only once per session
        if (!localStorage.getItem('deepgram_quota_notified')) {
          toast({
            title: "Voice Synthesis Fallback",
            description: "Your Deepgram quota has been exceeded. Using browser voice instead.",
            duration: 5000,
          });
          localStorage.setItem('deepgram_quota_notified', 'true');
        }
      } else {
        console.error('Error with Deepgram speech synthesis:', error);
      }
      
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
      return false;
    }
  }, [audioElement, isSpeaking, currentlyPlayingText, setIsSpeaking, stopSpeaking]);
  
  return { speakWithDeepgram };
};
