
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  initializeSpeechRecognition,
  handleSpeechRecognitionError 
} from '../utils/speechUtils';

export const useSpeechRecognition = () => {
  // Default to not listening when component mounts
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState(''); // Real-time transcript
  
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTime = useRef<number>(0);
  const isInitialized = useRef<boolean>(false);
  const restartAttempts = useRef<number>(0);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!isInitialized.current) {
      speechRecognition.current = initializeSpeechRecognition();
      
      if (speechRecognition.current) {
        // Configure recognition
        speechRecognition.current.continuous = true;
        speechRecognition.current.interimResults = true;
        
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
          
          // Reset restart attempts since we're getting results
          restartAttempts.current = 0;
          
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
          
          // Set new silence timer for 2 seconds - automatically process after 2 seconds of silence
          silenceTimer.current = setTimeout(() => {
            if (isListening && (finalTranscript.trim() || transcript.trim())) {
              // Only process if we have a valid transcript and we were listening
              stopListening();
              setIsProcessing(true);
            }
          }, 2000); // 2 seconds of silence detection
        };
        
        speechRecognition.current.onend = () => {
          console.log('Speech recognition ended');
          if (isListening) {
            // Only try to restart if we're supposed to be listening
            try {
              // Limit restart attempts to prevent infinite loops
              if (restartAttempts.current < 3) {
                restartAttempts.current += 1;
                speechRecognition.current?.start();
                console.log('Restarted speech recognition, attempt:', restartAttempts.current);
              } else {
                console.log('Max restart attempts reached, stopping recognition');
                setIsListening(false);
                toast.error('Voice recognition stopped due to repeated failures. Please try again.');
              }
            } catch (error) {
              console.error('Error restarting speech recognition:', error);
              setIsListening(false);
            }
          }
        };
        
        speechRecognition.current.onerror = (event) => {
          console.error('Speech recognition error:', event);
          handleSpeechRecognitionError(event.error);
          
          // Don't set isListening to false for "no-speech" errors to allow continued listening
          if (event.error !== 'no-speech') {
            setIsListening(false);
          }
        };
        
        isInitialized.current = true;
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
      console.error('Speech recognition not available');
      
      // Reinitialize if needed
      speechRecognition.current = initializeSpeechRecognition();
      if (!speechRecognition.current) {
        toast.error('Speech recognition not available on your browser');
        return;
      }
    }
    
    // Make sure we're not already listening before trying to start
    if (isListening) {
      return; // Already listening, no need to start again
    }
    
    try {
      // Reset transcript when starting fresh
      setTranscript('');
      setInterimTranscript('');
      restartAttempts.current = 0;
      
      // Set state before actually starting recognition
      setIsListening(true);
      lastSpeechTime.current = Date.now();
      
      // Start speech recognition
      speechRecognition.current.start();
      console.log('Started speech recognition successfully');
      
      // Set a timeout to detect if no speech is being captured
      setTimeout(() => {
        // If still listening but no interim or final transcript after 5 seconds, something might be wrong
        if (isListening && !transcript && !interimTranscript) {
          console.log('No speech detected after 5 seconds, checking microphone...');
          // Don't automatically stop - just notify the user
          toast.info('No speech detected. Please make sure your microphone is working.');
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      toast.error('Failed to start voice recognition. Please try again.');
    }
  }, [isListening, transcript, interimTranscript]);
  
  const stopListening = useCallback(() => {
    if (speechRecognition.current) {
      try {
        // Only try to stop if we're actually listening to avoid errors
        speechRecognition.current.stop();
        console.log('Stopped speech recognition');
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
      const currentTranscript = transcript.trim();
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
