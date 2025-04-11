
import { useCallback } from 'react';
import { playAudioBase64 } from '@/components/VernonChat/utils/speech/synthesis';
import { toast } from "sonner";
import { VertexAIHub } from '@/services/VertexAIHub';

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
    
    console.log('Speaking with Google TTS via Vertex AI Hub');
    
    let speechSuccess = false;
    
    // Try to use Google TTS via our Vertex AI Hub
    try {
      console.log('Attempting to use Google TTS via Vertex AI Hub...');
      const audioBase64 = await VertexAIHub.textToSpeech(text, {
        voice: 'en-US-Neural2-J',  // Use a natural-sounding voice
        speakingRate: 1.0,         // Normal speaking rate
        pitch: 0                   // Natural pitch
      });
      
      if (audioBase64) {
        console.log('Google TTS successful, playing audio');
        const audioElement = playAudioBase64(audioBase64);
        if (audioElement) {
          speechSuccess = true;
          
          // Mark intro as played if this is the first message
          if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
            introHasPlayed.current = true;
          }
          return;
        } else {
          console.warn('Audio element creation failed, falling back to browser TTS');
        }
      } else {
        console.warn('Google TTS returned null, falling back to browser TTS');
      }
    } catch (error) {
      console.error('Google TTS failed, falling back to browser TTS:', error);
    }
    
    // If Google TTS failed, fall back to browser's speech synthesis
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
      toast.error("Voice synthesis unavailable. Please try again later.");
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
