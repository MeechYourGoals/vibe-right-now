
import { useState, useRef, useEffect } from 'react';
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech,
  initializeSpeechSynthesis
} from '../utils/speechUtils';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(initializeSpeechSynthesis());
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Effect to load voices when available
  useEffect(() => {
    // Function to set available voices
    const setAvailableVoices = () => {
      if (speechSynthesis.current) {
        const availableVoices = speechSynthesis.current.getVoices();
        setVoices(availableVoices);
      }
    };
    
    // Set voices right away if already loaded
    setAvailableVoices();
    
    // Set up event listener for when voices are loaded asynchronously
    if (speechSynthesis.current) {
      speechSynthesis.current.onvoiceschanged = setAvailableVoices;
    }
    
    // Cleanup
    return () => {
      if (speechSynthesis.current) {
        speechSynthesis.current.onvoiceschanged = null;
      }
    };
  }, []);
  
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
    
    const utterance = new SpeechSynthesisUtterance();
    currentUtterance.current = utterance;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
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
      speakSentenceBySequence(sentences, 0);
    } else {
      // For short or very long responses, speak all at once
      utterance.text = processedText;
      configureUtteranceForNaturalSpeech(utterance, processedText);
      
      // Finally, speak the text
      speechSynthesis.current.speak(utterance);
    }
  };
  
  // Function to speak sentences one by one for more natural cadence
  const speakSentenceBySequence = (sentences: string[], index: number): void => {
    if (!speechSynthesis.current || index >= sentences.length) {
      return;
    }
    
    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    
    // Select voice
    const preferredVoice = getPreferredVoice(voices.length > 0 ? voices : speechSynthesis.current.getVoices());
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Configure utterance properties
    configureUtteranceForNaturalSpeech(utterance, sentence);
    
    // Handle events
    utterance.onstart = () => {
      if (index === 0) {
        setIsSpeaking(true);
      }
    };
    
    utterance.onend = () => {
      // Move to next sentence
      if (index < sentences.length - 1) {
        speakSentenceBySequence(sentences, index + 1);
      } else {
        setIsSpeaking(false);
      }
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    // Speak the current sentence
    speechSynthesis.current.speak(utterance);
  };
  
  return {
    isSpeaking,
    speakResponse,
    stopSpeaking
  };
};
