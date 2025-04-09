
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  initializeSpeechRecognition,
  handleSpeechRecognitionError 
} from '../utils/speechUtils';

export const useSpeechRecognition = () => {
  // Default to listening when component mounts but don't start immediately
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState(''); // Real-time transcript
  
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTime = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!isInitialized.current) {
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
          }, 1000); // 1 second of silence detection
        };
        
        speechRecognition.current.onend = () => {
          if (isListening) {
            // Only try to restart if we're supposed to be listening
            try {
              speechRecognition.current?.start();
            } catch (error) {
              console.error('Error restarting speech recognition:', error);
              setIsListening(false);
            }
          }
        };
        
        speechRecognition.current.onerror = (event) => {
          handleSpeechRecognitionError(event.error);
          setIsListening(false);
        };
        
        isInitialized.current = true;
        
        // Start listening automatically after a small delay to ensure proper initialization
        setTimeout(() => {
          startListening();
        }, 500);
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
  
  // Start listening function with proper error handling
  const startListening = useCallback(() => {
    if (!speechRecognition.current) {
      toast.error('Speech recognition not available');
      return;
    }
    
    // Make sure we're not already listening before trying to start
    if (isListening) {
      return; // Already listening, no need to start again
    }
    
    try {
      // Reset transcript when starting fresh
      setTranscript('');
      setInterimTranscript('');
      
      // Set state before actually starting recognition
      setIsListening(true);
      lastSpeechTime.current = Date.now();
      
      // Only try to start if speechRecognition is available
      speechRecognition.current.start();
      toast.success('Voice mode activated. Start speaking...');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      toast.error('Failed to start voice recognition. Please try again.');
    }
  }, [isListening]);
  
  const stopListening = useCallback(() => {
    if (speechRecognition.current) {
      try {
        // Only try to stop if we're actually listening to avoid errors
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
