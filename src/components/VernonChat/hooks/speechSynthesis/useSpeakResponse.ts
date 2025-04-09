
import { useCallback } from 'react';
import { WhisperSpeechService } from '@/services/WhisperSpeechService';
import { SimpleSearchService } from '@/services/SimpleSearchService';

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
    
    // Log that search is happening regardless of speech synthesis
    if (text.toLowerCase().includes('search') || 
        text.toLowerCase().includes('find') || 
        text.toLowerCase().includes('where') ||
        text.toLowerCase().includes('what') ||
        text.toLowerCase().includes('how')) {
      console.log('Search query detected, fetching information...');
      
      try {
        // Always attempt to search for information, even if speech fails
        SimpleSearchService.searchForCityInfo(text)
          .then(searchResult => {
            console.log('Search result:', searchResult);
            // If search was successful and yielded results, speak those instead
            if (searchResult && searchResult.trim() !== '') {
              // Speak the search result instead
              WhisperSpeechService.textToSpeech(searchResult)
                .then(success => {
                  if (success) {
                    console.log('Speaking search result response');
                  } else {
                    console.warn('Failed to speak search result, falling back to browser');
                    speakWithBrowser(searchResult, voices);
                  }
                });
            }
          })
          .catch(err => console.error('Error in search service:', err));
      } catch (error) {
        console.error('Error while processing search:', error);
      }
    }
    
    console.log('Speaking with built-in browser synthesis');
    
    let speechSuccess = false;
    
    // Try to use WhisperSpeechService's text-to-speech first
    try {
      speechSuccess = await WhisperSpeechService.textToSpeech(text);
      if (speechSuccess) {
        // Mark intro as played if this is the first message
        if (!introHasPlayed.current && text.includes("I'm VeRNon")) {
          introHasPlayed.current = true;
        }
        return;
      }
    } catch (error) {
      console.error('WhisperSpeechService speech failed, falling back to browser synthesis:', error);
    }
    
    // If WhisperSpeechService failed, fall back to browser's speech synthesis
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
    speakWithBrowser,
    introHasPlayed,
    voices
  ]);

  return { speakResponse };
};
