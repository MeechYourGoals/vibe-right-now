
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  initializeSpeechRecognition,
  handleSpeechRecognitionError 
} from '../utils/speechUtils';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTime = useRef<number>(0);
  
  // Initialize speech recognition
  useEffect(() => {
    speechRecognition.current = initializeSpeechRecognition();
    
    if (speechRecognition.current) {
      speechRecognition.current.onresult = (event) => {
        const newTranscript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(newTranscript);
        lastSpeechTime.current = Date.now();
        
        // Reset silence timer on new speech
        if (silenceTimer.current) {
          clearTimeout(silenceTimer.current);
        }
        
        // Set new silence timer for 2 seconds
        silenceTimer.current = setTimeout(() => {
          if (isListening && newTranscript.trim()) {
            // Only process if we have a valid transcript
            setIsListening(false);
            setIsProcessing(true);
          }
        }, 2000);
      };
      
      speechRecognition.current.onend = () => {
        if (isListening) {
          try {
            speechRecognition.current?.start();
          } catch (error) {
            console.error('Error restarting speech recognition:', error);
          }
        }
      };
      
      speechRecognition.current.onerror = (event) => {
        handleSpeechRecognitionError(event.error);
        setIsListening(false);
      };
    }
    
    // Clean up
    return () => {
      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }
      
      stopListening();
    };
  }, []);
  
  // Effect to maintain listening state
  useEffect(() => {
    if (isListening && speechRecognition.current) {
      try {
        speechRecognition.current.start();
      } catch (error) {
        console.error('Error restarting speech recognition:', error);
      }
    }
  }, [isListening]);
  
  const startListening = useCallback(() => {
    try {
      speechRecognition.current?.start();
      setIsListening(true);
      setTranscript('');
      lastSpeechTime.current = Date.now();
      toast.success('Voice mode activated. Start speaking...');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start voice recognition');
    }
  }, []);
  
  const stopListening = useCallback(() => {
    if (speechRecognition.current) {
      try {
        speechRecognition.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
    setIsListening(false);
    
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
      silenceTimer.current = null;
    }
  }, []);
  
  const processTranscript = useCallback(() => {
    if (transcript.trim()) {
      setIsProcessing(true);
      
      // Return the transcript for further processing
      const currentTranscript = transcript;
      setTranscript('');
      
      return currentTranscript;
    }
    return '';
  }, [transcript]);
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    startListening,
    stopListening,
    processTranscript
  };
};
