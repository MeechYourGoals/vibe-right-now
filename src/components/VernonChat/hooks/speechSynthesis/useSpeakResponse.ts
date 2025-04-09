
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
    
    let speechSuccess = false;
    
    // Try to use Eleven Labs if available
    if (useElevenLabs) {
      try {
        speechSuccess = await speakWithElevenLabs(text);
        if (speechSuccess) {
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
    
    // If ElevenLabs failed or is not enabled, fall back to browser's speech synthesis
    try {
      speechSuccess = await speakWithBrowser(text, voices);
      
      // Mark intro as played if this is the first message (even if using browser speech)
      if (speechSuccess && !introHasPlayed.current && text.includes("I'm VeRNon")) {
        introHasPlayed.current = true;
      }
    } catch (error) {
      console.error('Browser speech synthesis failed:', error);
      // Even if speech fails completely, we continue with the app's functionality
      // This ensures web searches still work even if speech fails
    }
    
    // The function completes regardless of speech success to ensure conversation flow continues
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
