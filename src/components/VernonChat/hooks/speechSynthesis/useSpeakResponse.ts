
import { useCallback } from 'react';
import { playAudioBase64 } from '@/components/VernonChat/utils/speech/synthesis';
import { toast } from "sonner";
import { VertexAIHub, DEFAULT_MALE_VOICE } from '@/services/VertexAI';
import { GoogleAIService } from '@/services/GoogleAIService'; // Added GoogleAIService

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
    
    // Try GoogleAIService TTS first
    let speechSuccess = false;
    
    try {
      console.log('Attempting to use GoogleAIService for TTS...');
      
      // Using a default voice, similar to the old OpenRouter call.
      // GoogleAIService.textToSpeech options can be expanded later if needed.
      const audioBase64 = await GoogleAIService.textToSpeech(text, { voice: 'en-US-Neural2-D' }); 
      
      if (audioBase64) {
        console.log('GoogleAIService TTS successful, playing audio');
        const audioElement = playAudioBase64(audioBase64);
        if (audioElement) {
          speechSuccess = true;
          
          // Mark intro as played if this is the first message
          if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
            introHasPlayed.current = true;
          }
          return;
        } else {
          console.warn('Audio element creation failed, falling back');
        }
      } else {
        console.warn('GoogleAIService TTS returned null, falling back');
      }
    } catch (error) {
      console.error('GoogleAIService TTS failed, falling back:', error);
    }
    
    // If GoogleAIService failed, try Vertex AI TTS (existing fallback)
    if (!speechSuccess) {
      try {
        console.log('Attempting to use Google Vertex AI TTS (fallback)...');
        console.log(`Using voice: ${DEFAULT_MALE_VOICE}`);
        
        const audioBase64 = await VertexAIHub.textToSpeech(text, { // Assuming VertexAIHub is another Google TTS
          voice: DEFAULT_MALE_VOICE,
          speakingRate: 1.0,
          pitch: 0
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
    }
    
    // If both failed, fall back to browser's speech synthesis
    try {
      if (!speechSuccess) {
        console.log('Attempting to use browser speech synthesis...');
        
        // Try to find a male voice in the browser
        const maleVoice = voices.find(voice => 
          voice.name.includes('Male') || 
          voice.name.includes('David') || 
          voice.name.includes('James') ||
          voice.name.includes('Thomas')
        );
        
        // If we found a male voice, use it specifically
        if (maleVoice) {
          console.log('Using browser male voice:', maleVoice.name);
          // Create a speech synthesis utterance with the selected voice
          speechSuccess = await speakWithBrowser(text, [maleVoice]);
        } else {
          // Otherwise use default browser voice selection
          speechSuccess = await speakWithBrowser(text, voices);
        }
        
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
