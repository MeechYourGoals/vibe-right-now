
import { useCallback } from 'react';
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech
} from '../../utils/speech';
import { speakSentenceBySequence } from './speechSynthesisUtils';

interface UseBrowserSpeechSynthesisProps {
  speechSynthesis: React.MutableRefObject<SpeechSynthesis | null>;
  voices: SpeechSynthesisVoice[];
  currentUtterance: React.MutableRefObject<SpeechSynthesisUtterance | null>;
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
  stopSpeaking: () => void;
}

export const useBrowserSpeechSynthesis = ({
  speechSynthesis,
  voices,
  currentUtterance,
  isSpeaking,
  setIsSpeaking,
  currentlyPlayingText,
  stopSpeaking
}: UseBrowserSpeechSynthesisProps) => {
  
  const speakWithBrowserSynthesis = useCallback((text: string): void => {
    if (!speechSynthesis.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) {
      console.log('This text is already being spoken, skipping duplicate');
      return;
    }
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance();
    currentUtterance.current = utterance;
    currentlyPlayingText.current = text;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    // Select a preferred voice
    const preferredVoice = getPreferredVoice(voices.length > 0 ? voices : speechSynthesis.current.getVoices());
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log('Using voice:', preferredVoice.name);
    } else {
      console.log('No preferred voice found, using default');
    }
    
    // Process text for more natural sound
    const processedText = processTextForNaturalSpeech(text);
    
    // Split long responses into sentences for more natural pauses
    const sentences = processedText.match(/[^.!?]+[.!?]+/g) || [processedText];
    
    if (sentences.length > 1 && sentences.length < 20) {
      // For medium-length responses, speak sentence by sentence with pauses
      const speechState = {
        isSpeaking,
        setIsSpeaking,
        currentlyPlayingText
      };
      speakSentenceBySequence(sentences, 0, speechSynthesis.current, voices, speechState);
    } else {
      // For short or very long responses, speak all at once
      utterance.text = processedText;
      configureUtteranceForNaturalSpeech(utterance, processedText);
      
      // Finally, speak the text
      speechSynthesis.current.speak(utterance);
    }
  }, [speechSynthesis, voices, currentUtterance, isSpeaking, currentlyPlayingText, stopSpeaking, setIsSpeaking]);
  
  return { speakWithBrowserSynthesis };
};
