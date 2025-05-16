
import { useState, useRef, useEffect, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthesis = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentlyPlayingText = useRef<string | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthesis.current = window.speechSynthesis;
      
      // Get available voices
      const updateVoices = () => {
        const availableVoices = synthesis.current?.getVoices() || [];
        setVoices(availableVoices);
      };
      
      // Chrome loads voices asynchronously
      if (synthesis.current.onvoiceschanged !== undefined) {
        synthesis.current.onvoiceschanged = updateVoices;
      }
      
      // Initial voice loading attempt
      updateVoices();
    }
    
    // Cleanup on unmount
    return () => {
      if (synthesis.current) {
        synthesis.current.cancel();
      }
    };
  }, []);
  
  // Function to speak text
  const speak = useCallback((text: string) => {
    if (!text || !synthesis.current) return;
    
    // Don't repeat the same text if it's already playing
    if (isSpeaking && currentlyPlayingText.current === text) return;
    
    // Cancel any ongoing speech first
    cancel();
    
    setIsSpeaking(true);
    currentlyPlayingText.current = text;
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a male English voice
    const preferredVoice = voices.find(
      voice => voice.lang.startsWith('en') && (
        voice.name.includes('Male') || 
        voice.name.includes('David') || 
        voice.name.includes('James') || 
        voice.name.includes('Thomas')
      )
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set speech parameters
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Set callbacks
    utterance.onend = () => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    };
    
    // Store reference to current utterance for cancellation
    utteranceRef.current = utterance;
    
    // Start speaking
    synthesis.current.speak(utterance);
  }, [voices, isSpeaking]);
  
  // Function to cancel speech
  const cancel = useCallback(() => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    }
  }, []);
  
  return {
    speak,
    cancel,
    isSpeaking,
    voices
  };
};
