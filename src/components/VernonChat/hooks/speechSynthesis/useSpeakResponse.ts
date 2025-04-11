
import { useCallback } from 'react';
import { CoquiTTSService } from '@/services/CoquiTTSService';
import { getGoogleTTS, playAudioBase64 } from '@/components/VernonChat/utils/speech/synthesis';

interface UseSpeakResponseProps {
  isSpeaking: boolean;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
  speakWithBrowser: (text: string, voices: SpeechSynthesisVoice[]) => Promise<boolean>;
  introHasPlayed: React.MutableRefObject<boolean>;
  voices: SpeechSynthesisVoice[];
}

export const useSpeakResponse = ({
  isSpeaking,
  currentlyPlayingText,
  stopSpeaking,
  speakWithBrowser,
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
    
    // Set the current text being spoken
    currentlyPlayingText.current = text;
    
    console.log('Speaking with Google TTS');
    
    let speechSuccess = false;
    
    // Try to use Google TTS first (via Cloud TTS API)
    try {
      console.log('Attempting to use Google TTS...');
      const audioBase64 = await getGoogleTTS(text);
      
      if (audioBase64) {
        console.log('Google TTS successful, playing audio');
        playAudioBase64(audioBase64);
        speechSuccess = true;
        
        // Mark intro as played if this is the first message
        if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
          introHasPlayed.current = true;
        }
        return;
      } else {
        console.warn('Google TTS returned null, falling back to Coqui TTS');
      }
    } catch (error) {
      console.error('Google TTS failed, falling back to Coqui TTS:', error);
    }
    
    // If Google TTS failed, try Coqui TTS
    try {
      if (!speechSuccess) {
        console.log('Attempting to use Coqui TTS...');
        speechSuccess = await CoquiTTSService.textToSpeech(text);
        
        if (speechSuccess) {
          console.log('Coqui TTS successful');
          // Mark intro as played if this is the first message
          if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
            introHasPlayed.current = true;
          }
          return;
        } else {
          console.warn('Coqui TTS returned false, falling back to browser synthesis');
        }
      }
    } catch (error) {
      console.error('Coqui TTS speech failed, falling back to browser synthesis:', error);
    }
    
    // If both TTS services failed, fall back to browser's speech synthesis
    try {
      if (!speechSuccess) {
        console.log('Attempting to use browser speech synthesis...');
        speechSuccess = await speakWithBrowser(text, voices);
        
        // Mark intro as played if this is the first message (even if using browser speech)
        if (speechSuccess && !introHasPlayed.current && text.includes("I'm VeRNon")) {
          introHasPlayed.current = true;
        }
      }
    } catch (error) {
      console.error('Browser speech synthesis failed:', error);
      // Even if speech fails completely, we continue with the app's functionality
    }
    
    // The function completes regardless of speech success to ensure conversation flow continues
  }, [
    isSpeaking, 
    currentlyPlayingText, 
    stopSpeaking, 
    speakWithBrowser,
    introHasPlayed,
    voices
  ]);

  return { speakResponse };
};
