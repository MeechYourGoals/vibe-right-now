
import { useState, useEffect, useCallback } from 'react';
import { SpeechRecognitionHookReturn } from '../types';

interface UseSpeechRecognitionProps {
  onResult?: (finalTranscript: string) => void;
  continuous?: boolean;
  language?: string;
}

export const useSpeechRecognition = ({
  onResult,
  continuous = false,
  language = 'en-US'
}: UseSpeechRecognitionProps = {}): SpeechRecognitionHookReturn => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    // Browser compatibility check
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition is not supported in this browser');
      return;
    }
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = continuous;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language;
    
    recognitionInstance.onstart = () => {
      setListening(true);
    };
    
    recognitionInstance.onend = () => {
      setListening(false);
    };
    
    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      setTranscript(finalTranscript || interimTranscript);
      
      if (finalTranscript && onResult) {
        onResult(finalTranscript);
      }
    };
    
    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (e) {
          // Ignore errors
        }
      }
    };
  }, [continuous, language, onResult]);
  
  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        console.error('Could not start speech recognition', e);
      }
    }
  }, [recognition]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error('Could not stop speech recognition', e);
      }
    }
  }, [recognition]);
  
  const toggleListening = useCallback(() => {
    if (listening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  }, [listening, stopListening, startListening]);
  
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  return {
    transcript,
    resetTranscript,
    listening,
    toggleListening,
    startListening,
    stopListening
  };
};
