
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
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (!isVoiceEnabled) return;

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        let interim = '';
        let final = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i].transcript;
          if (event.results[i].isFinal) {
            final += transcriptPart;
          } else {
            interim += transcriptPart;
          }
        }
        
        if (final) {
          setTranscript(prev => prev + final);
          setInterimTranscript('');
          resetSilenceTimer();
        } else {
          setInterimTranscript(interim);
          resetSilenceTimer();
        }
      };
      
      recognition.onend = () => {
        if (isListening) {
          // Auto-restart if we're still supposed to be listening
          try {
            recognition.start();
          } catch (error) {
            console.log('Recognition restart failed:', error);
            setIsListening(false);
          }
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setIsListening(false);
        }
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
    
    // Stop listening after 3 seconds of silence
    silenceTimerRef.current = setTimeout(() => {
      if (transcript.trim()) {
        stopListening();
        onTranscriptComplete(transcript.trim());
        setTranscript('');
      }
    }, 3000);
  }, [transcript, onTranscriptComplete]);

  const startListening = useCallback(() => {
    if (!isVoiceEnabled || !recognitionRef.current) return;
    
    setTranscript('');
    setInterimTranscript('');
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
    setInterimTranscript('');
    
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
    transcript: transcript + interimTranscript,
    startListening,
    stopListening,
    toggleListening
  };
};
