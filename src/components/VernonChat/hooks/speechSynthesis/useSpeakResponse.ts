
import { useCallback } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabsService';

interface UseSpeakResponseProps {
  isSpeaking: boolean;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
  speakWithElevenLabs: (text: string) => Promise<boolean>;
  speakWithBrowser: (text: string, voices: SpeechSynthesisVoice[]) => Promise<boolean>;
  useElevenLabs: boolean;
  introHasPlayed: React.MutableRefObject<boolean>;
  voices: SpeechSynthesisVoice[];
}

export const useSpeakResponse = ({
  isSpeaking,
  currentlyPlayingText,
  stopSpeaking,
  speakWithElevenLabs,
  speakWithBrowser,
  useElevenLabs,
  introHasPlayed,
  voices
}: UseSpeakResponseProps) => {
  
  const speakResponse = useCallback(async (text: string): Promise<void> => {
    // Avoid speaking empty text
    if (!text || text.trim() === '') {
      console.log('Empty text provided, not speaking');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Always stop any ongoing speech first to prevent overlapping voices
    stopSpeaking();
    
    console.log('Speaking with ElevenLabs:', useElevenLabs);
    
    // Try to use Eleven Labs if available
    if (useElevenLabs) {
      try {
        const success = await speakWithElevenLabs(text);
        if (success) {
          // Mark intro as played if this is the first message
          if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
            introHasPlayed.current = true;
          }
          return;
        }
      } catch (error) {
        console.error('ElevenLabs speech failed, falling back to browser synthesis:', error);
      }
    }
    
    // Fallback to browser's speech synthesis
    await speakWithBrowser(text, voices);
  }, [
    isSpeaking, 
    currentlyPlayingText, 
    stopSpeaking, 
    useElevenLabs, 
    speakWithElevenLabs,
    speakWithBrowser,
    introHasPlayed,
    voices
  ]);

  return { speakResponse };
};
