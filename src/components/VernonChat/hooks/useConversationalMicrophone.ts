
import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface UseConversationalMicrophoneProps {
  onTranscriptComplete: (transcript: string) => void;
  isProcessing: boolean;
}

export const useConversationalMicrophone = ({
  onTranscriptComplete,
  isProcessing
}: UseConversationalMicrophoneProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSpokenRef = useRef(false);
  
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      console.log('Conversational listening started');
      setIsListening(true);
      hasSpokenRef.current = false;
    };
    
    recognition.onend = () => {
      console.log('Conversational listening ended');
      setIsListening(false);
      
      // Clear any pending silence timer
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };
    
    recognition.onresult = (event: any) => {
      let interimText = '';
      let finalText = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcript;
          hasSpokenRef.current = true;
        } else {
          interimText += transcript;
        }
      }
      
      setInterimTranscript(interimText);
      
      if (finalText) {
        setTranscript(prev => prev + finalText);
        
        // Clear existing silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        
        // Set new silence timer - wait for user to finish speaking
        silenceTimerRef.current = setTimeout(() => {
          if (hasSpokenRef.current) {
            const fullTranscript = transcript + finalText;
            if (fullTranscript.trim()) {
              console.log('User finished speaking, processing:', fullTranscript);
              onTranscriptComplete(fullTranscript.trim());
              setTranscript('');
              setInterimTranscript('');
              stopListening();
            }
          }
        }, 2000); // 2 second silence indicates user is done
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        toast.info('No speech detected, try speaking again');
      } else if (event.error === 'network') {
        toast.error('Network error with speech recognition');
      } else {
        toast.error('Speech recognition error');
      }
    };
    
    recognitionRef.current = recognition;
    
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [onTranscriptComplete, transcript]);
  
  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition not available');
      return;
    }
    
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setTranscript('');
      setInterimTranscript('');
      hasSpokenRef.current = false;
      
      recognitionRef.current.start();
      console.log('Started conversational listening mode');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Could not access microphone');
    }
  }, []);
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, [isListening]);
  
  const toggleListening = useCallback(() => {
    if (isProcessing) {
      toast.info('Please wait for Vernon to finish responding');
      return;
    }
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, isProcessing, startListening, stopListening]);
  
  return {
    isListening,
    transcript: transcript + interimTranscript,
    toggleListening,
    stopListening
  };
};
