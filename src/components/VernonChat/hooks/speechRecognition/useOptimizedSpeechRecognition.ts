
import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface SpeechRecognitionConfig {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
  maxAlternatives?: number;
}

export const useOptimizedSpeechRecognition = (config: SpeechRecognitionConfig = {}) => {
  // State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');
  
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.continuous = config.continuous ?? true;
      recognition.interimResults = config.interimResults ?? true;
      recognition.lang = config.language ?? 'en-US';
      recognition.maxAlternatives = config.maxAlternatives ?? 1;
      
      // Event handlers
      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };
      
      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please allow microphone access.');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected, continuing...');
        } else {
          toast.error(`Speech recognition error: ${event.error}`);
        }
      };
      
      recognition.onresult = (event) => {
        let interim = '';
        let final = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          
          if (result.isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }
        
        if (final) {
          finalTranscriptRef.current += final;
          setTranscript(finalTranscriptRef.current);
          setInterimTranscript('');
        } else {
          setInterimTranscript(interim);
        }
      };
      
      recognitionRef.current = recognition;
      setIsSupported(true);
    } else {
      console.warn('Speech recognition not supported');
      setIsSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [config.continuous, config.interimResults, config.language, config.maxAlternatives]);
  
  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    
    try {
      finalTranscriptRef.current = '';
      setTranscript('');
      setInterimTranscript('');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start speech recognition');
    }
  }, [isListening]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    
    try {
      recognitionRef.current.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }, [isListening]);
  
  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);
  
  // Clear transcript
  const clearTranscript = useCallback(() => {
    finalTranscriptRef.current = '';
    setTranscript('');
    setInterimTranscript('');
  }, []);
  
  return {
    // State
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    
    // Actions
    startListening,
    stopListening,
    toggleListening,
    clearTranscript
  };
};
