
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  initializeSpeechRecognition,
  handleSpeechRecognitionError 
} from '../utils/speechUtils';

export const useSpeechRecognition = () => {
  // Default to listening when component mounts
  const [isListening, setIsListening] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState(''); // Real-time transcript
  
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTime = useRef<number>(0);
  
  // Initialize speech recognition
  useEffect(() => {
    speechRecognition.current = initializeSpeechRecognition();
    
    if (speechRecognition.current) {
      speechRecognition.current.onresult = (event) => {
        // Get both interim and final results
        let finalTranscript = '';
        let currentInterimTranscript = '';
        
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterimTranscript += event.results[i][0].transcript;
          }
        }
        
        // Set interim transcript for real-time display
        setInterimTranscript(currentInterimTranscript);
        
        // If we have final transcript, add it to the complete transcript
        if (finalTranscript) {
          setTranscript(prevTranscript => prevTranscript + ' ' + finalTranscript);
        }
        
        lastSpeechTime.current = Date.now();
        
        // Reset silence timer on new speech
        if (silenceTimer.current) {
          clearTimeout(silenceTimer.current);
        }
        
        // Set new silence timer for 1 second - automatically process after 1 second of silence
        silenceTimer.current = setTimeout(() => {
          if (isListening && (finalTranscript.trim() || transcript.trim())) {
            // Only process if we have a valid transcript and we were listening
            stopListening();
            setIsProcessing(true);
          }
        }, 1000); // Reduced to 1 second for more responsive experience
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
      
      // Start listening by default
      try {
        speechRecognition.current.start();
        toast.success('Voice mode activated. Start speaking...');
      } catch (error) {
        console.error('Error starting speech recognition on mount:', error);
      }
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
      setInterimTranscript('');
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
      setInterimTranscript('');
      
      return currentTranscript;
    }
    return '';
  }, [transcript]);
  
  return {
    isListening,
    isProcessing,
    setIsProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    processTranscript
  };
};
