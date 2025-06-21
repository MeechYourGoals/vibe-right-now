
import { useState, useRef, useCallback, useEffect } from 'react';
import { DeepgramService } from '@/services/DeepgramService';

interface UseOptimizedSpeechRecognitionProps {
  continuous?: boolean;
  interimResults?: boolean;
  onTranscriptComplete?: (transcript: string) => void;
}

export const useOptimizedSpeechRecognition = ({
  continuous = false,
  interimResults = true,
  onTranscriptComplete
}: UseOptimizedSpeechRecognitionProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize speech recognition with browser fallback
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Browser speech recognition started');
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interim = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interim += transcriptPart;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          if (onTranscriptComplete) {
            onTranscriptComplete(finalTranscript);
          }
        }
        
        setInterimTranscript(interim);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [continuous, interimResults, onTranscriptComplete]);
  
  // Enhanced speech recognition using Deepgram for better accuracy
  const startDeepgramRecognition = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          setIsProcessing(true);
          
          try {
            const transcriptResult = await DeepgramService.speechToText(audioBlob);
            if (transcriptResult) {
              setTranscript(transcriptResult);
              if (onTranscriptComplete) {
                onTranscriptComplete(transcriptResult);
              }
            }
          } catch (error) {
            console.error('Deepgram transcription error:', error);
          } finally {
            setIsProcessing(false);
          }
        }
      };
      
      mediaRecorder.start();
      setIsListening(true);
      
      // Auto-stop after silence or max duration
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 10000); // 10 second max recording
      
      return true;
    } catch (error) {
      console.error('Error starting Deepgram recognition:', error);
      return false;
    }
  }, [onTranscriptComplete]);
  
  const startListening = useCallback(async () => {
    if (isListening) return;
    
    // Clear previous transcripts
    setTranscript('');
    setInterimTranscript('');
    
    // Try Deepgram first if available, fallback to browser
    if (DeepgramService.hasApiKey()) {
      const success = await startDeepgramRecognition();
      if (success) return;
      
      console.log('Deepgram recognition failed, falling back to browser');
    }
    
    // Fallback to browser speech recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting browser speech recognition:', error);
      }
    }
  }, [isListening, startDeepgramRecognition]);
  
  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors
      }
    }
    
    setIsListening(false);
    setIsProcessing(false);
  }, []);
  
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);
  
  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);
  
  return {
    isListening,
    isProcessing,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript
  };
};
