
import { useState, useRef, useCallback, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
  autoSend?: boolean;
  silenceTimeout?: number;
}

export const useEnhancedSpeechRecognition = (
  options: SpeechRecognitionOptions = {},
  onTranscriptComplete?: (transcript: string) => void
) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef('');
  const { toast } = useToast();
  
  // Detect if browser supports native SpeechRecognition
  const SpeechRecognition = 
    window.SpeechRecognition || 
    (window as any).webkitSpeechRecognition || 
    null;
  
  const hasBrowserSupport = !!SpeechRecognition;

  // Clear silence timer
  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  // Handle silence detection and auto-send
  const handleSilenceDetection = useCallback(() => {
    const silenceTimeout = options.silenceTimeout || 2000; // 2 seconds default
    
    clearSilenceTimer();
    
    if (finalTranscriptRef.current.trim() && options.autoSend && onTranscriptComplete) {
      silenceTimerRef.current = setTimeout(() => {
        console.log('Silence detected, auto-sending transcript:', finalTranscriptRef.current);
        setIsProcessing(true);
        onTranscriptComplete(finalTranscriptRef.current);
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');
        setIsProcessing(false);
      }, silenceTimeout);
    }
  }, [options.silenceTimeout, options.autoSend, onTranscriptComplete, clearSilenceTimer]);

  // Initialize recognition
  useEffect(() => {
    if (hasBrowserSupport) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = options.continuous ?? true;
      recognitionRef.current.interimResults = options.interimResults ?? true;
      recognitionRef.current.lang = options.language ?? 'en-US';
      recognitionRef.current.maxAlternatives = 1;
      
      // Set up event listeners
      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setIsProcessing(false);
        clearSilenceTimer();
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcript;
            finalTranscriptRef.current = finalText;
            setTranscript(finalText);
            console.log('Final transcript:', finalText);
            
            // Trigger silence detection for auto-send
            if (options.autoSend) {
              handleSilenceDetection();
            }
          } else {
            interimText += transcript;
            setInterimTranscript(interimText);
            console.log('Interim transcript:', interimText);
          }
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'no-speech') {
          // Handle no-speech gracefully
          if (finalTranscriptRef.current.trim() && options.autoSend && onTranscriptComplete) {
            console.log('No speech detected, sending existing transcript');
            onTranscriptComplete(finalTranscriptRef.current);
            finalTranscriptRef.current = '';
            setTranscript('');
          }
          return;
        }
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone access denied",
            description: "Please allow microphone access to use voice features",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Speech recognition error",
            description: `Error: ${event.error}`,
            variant: "destructive",
          });
        }
        
        setIsListening(false);
        setIsProcessing(false);
        clearSilenceTimer();
      };
      
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        clearSilenceTimer();
        
        // If we have a final transcript and auto-send is enabled, send it
        if (finalTranscriptRef.current.trim() && options.autoSend && onTranscriptComplete) {
          console.log('Recognition ended, sending final transcript');
          setIsProcessing(true);
          onTranscriptComplete(finalTranscriptRef.current);
          finalTranscriptRef.current = '';
          setTranscript('');
          setInterimTranscript('');
          setIsProcessing(false);
        }
      };
    }
    
    return () => {
      clearSilenceTimer();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors from stopping
        }
      }
    };
  }, [options.continuous, options.interimResults, options.language, options.autoSend, hasBrowserSupport, handleSilenceDetection, onTranscriptComplete, toast, clearSilenceTimer]);
  
  // Function to start listening
  const startListening = useCallback(() => {
    if (!hasBrowserSupport) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive",
      });
      return;
    }

    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    clearSilenceTimer();
    
    try {
      recognitionRef.current.start();
      console.log('Starting speech recognition...');
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      toast({
        title: "Could not start speech recognition",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [hasBrowserSupport, toast, clearSilenceTimer]);
  
  // Function to stop listening
  const stopListening = useCallback(() => {
    clearSilenceTimer();
    
    if (hasBrowserSupport && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors from stopping
      }
    }
    
    setIsListening(false);
  }, [hasBrowserSupport, clearSilenceTimer]);

  // Function to toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, stopListening, startListening]);

  // Function to clear transcript
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    clearSilenceTimer();
  }, [clearSilenceTimer]);
  
  return {
    isListening,
    transcript,
    interimTranscript,
    isProcessing,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
    hasBrowserSupport
  };
};
