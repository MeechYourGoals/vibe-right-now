
import { useCallback, useState, useRef } from 'react';
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech 
} from '../../utils/speech';

export const useBrowserSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  
  // Function to speak using browser's speech synthesis
  const speakWithBrowser = useCallback(async (text: string, voices: SpeechSynthesisVoice[]): Promise<boolean> => {
    if (!synth) {
      console.error('Speech synthesis not available');
      return false;
    }
    
    // Cancel any ongoing speech
    synth.cancel();
    
    console.log('Speaking with browser speech synthesis:', text);
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance.current = utterance;
    
    return new Promise((resolve) => {
      // Select a preferred voice
      const preferredVoice = getPreferredVoice(voices);
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log('Using voice:', preferredVoice.name);
      } else {
        console.log('No preferred voice found, using default');
      }
      
      // Process text for more natural sound
      const processedText = processTextForNaturalSpeech(text);
      utterance.text = processedText;
      
      // Configure other utterance properties
      configureUtteranceForNaturalSpeech(utterance, processedText);
      
      // Set up event handlers
      utterance.onstart = () => {
        console.log('Browser speech started');
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        console.log('Browser speech ended');
        setIsSpeaking(false);
        resolve(true);
      };
      
      utterance.onerror = (event) => {
        console.error('Browser speech error:', event);
        setIsSpeaking(false);
        resolve(false);
      };
      
      // Speak the utterance
      synth.speak(utterance);
      
      // Workaround for Chrome issue where onend doesn't fire
      if (utterance.voice && utterance.voice.name.includes('Google')) {
        const estimatedDuration = text.length * 50; // Rough estimate: 50ms per character
        setTimeout(() => {
          if (isSpeaking) {
            setIsSpeaking(false);
            resolve(true);
          }
        }, estimatedDuration);
      }
    });
  }, [synth, isSpeaking]);
  
  // Cancel speech
  const cancelSpeech = useCallback(() => {
    if (synth) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, [synth]);
  
  return {
    isSpeaking,
    speakWithBrowser,
    cancelSpeech
  };
};
