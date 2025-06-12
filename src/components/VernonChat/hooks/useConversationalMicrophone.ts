
import { useState, useCallback, useRef, useEffect } from 'react';

interface UseConversationalMicrophoneProps {
  onTranscriptComplete: (transcript: string) => void;
  isVoiceEnabled?: boolean;
}

export const useConversationalMicrophone = ({ 
  onTranscriptComplete, 
  isVoiceEnabled = true 
}: UseConversationalMicrophoneProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef<string>('');

  useEffect(() => {
    if (!isVoiceEnabled) return;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }
        
        if (finalTranscript) {
          finalTranscriptRef.current += finalTranscript;
          setTranscript(finalTranscriptRef.current + interimTranscript);
          resetSilenceTimer();
        } else {
          setTranscript(finalTranscriptRef.current + interimTranscript);
          resetSilenceTimer();
        }
      };
      
      recognition.onend = () => {
        if (isListening) {
          if (finalTranscriptRef.current.trim()) {
            handleTranscriptComplete();
          }
        }
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [isVoiceEnabled, isListening]);

  const resetSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    
    silenceTimerRef.current = setTimeout(() => {
      if (finalTranscriptRef.current.trim()) {
        handleTranscriptComplete();
      }
    }, 2000);
  }, []);

  const handleTranscriptComplete = () => {
    const finalText = finalTranscriptRef.current.trim();
    if (finalText) {
      onTranscriptComplete(finalText);
      finalTranscriptRef.current = '';
      setTranscript('');
    }
    stopListening();
  };

  const startListening = useCallback(() => {
    if (!isVoiceEnabled || !recognitionRef.current) return;
    
    finalTranscriptRef.current = '';
    setTranscript('');
    setIsListening(true);
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      setIsListening(false);
    }
  }, [isVoiceEnabled]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening
  };
};
