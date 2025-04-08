
import { useState, useRef } from 'react';
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech,
  initializeSpeechSynthesis
} from '../utils/speechUtils';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(initializeSpeechSynthesis());
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  const stopSpeaking = (): void => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
      setIsSpeaking(false);
      if (currentUtterance.current) {
        currentUtterance.current = null;
      }
    }
  };
  
  const speakResponse = (text: string): void => {
    if (!speechSynthesis.current) {
      console.error('Speech synthesis not available');
      return;
    }
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance.current = utterance;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    // Get available voices
    const voices = speechSynthesis.current.getVoices();
    
    // Select a preferred voice
    const preferredVoice = getPreferredVoice(voices);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Process text for more natural sound
    const processedText = processTextForNaturalSpeech(text);
    utterance.text = processedText;
    
    // Configure the utterance
    configureUtteranceForNaturalSpeech(utterance, text);
    
    // Finally, speak the text
    speechSynthesis.current.speak(utterance);
  };
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking
  };
};
