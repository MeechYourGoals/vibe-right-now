
import { useState, useEffect, useRef } from 'react';
import { VertexAIHub } from '@/services/VertexAI';

interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
}

export const useSpeechRecognition = (options: SpeechRecognitionOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Detect if browser supports native SpeechRecognition
  const SpeechRecognition = 
    window.SpeechRecognition || 
    (window as any).webkitSpeechRecognition || 
    null;
  
  const hasBrowserSupport = !!SpeechRecognition;
  
  // Initialize recognition
  useEffect(() => {
    if (hasBrowserSupport) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = options.continuous ?? true;
      recognitionRef.current.interimResults = options.interimResults ?? true;
      recognitionRef.current.lang = options.language ?? 'en-US';
      
      // Set up event listeners
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setInterimTranscript(interimTranscript);
        if (finalTranscript) {
          setTranscript(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Ignore no-speech errors
          return;
        }
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          // If we're still supposed to be listening, restart
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.error('Error restarting speech recognition:', e);
            setIsListening(false);
          }
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors from stopping
        }
      }
    };
  }, [options.continuous, options.interimResults, options.language, hasBrowserSupport]);
  
  // Function to start listening
  const startListening = () => {
    setTranscript('');
    setInterimTranscript('');
    
    if (hasBrowserSupport) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Error starting speech recognition:', e);
      }
    } else {
      // Fallback to Google Speech-to-Text via VertexAI
      startGoogleSpeechRecording();
    }
  };
  
  // Function to stop listening
  const stopListening = () => {
    if (hasBrowserSupport && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors from stopping
      }
    } else if (mediaRecorderRef.current) {
      // Stop Google Speech recording
      mediaRecorderRef.current.stop();
    }
    
    setIsListening(false);
  };
  
  // Fallback to Google Speech-to-Text via VertexAI
  const startGoogleSpeechRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        // Process recording with Google Speech-to-Text
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          
          try {
            const transcript = await VertexAIHub.speechToText(base64Audio);
            
            if (transcript) {
              setTranscript(transcript);
            }
          } catch (e) {
            console.error('Error calling Google speech-to-text:', e);
          }
        };
        
        reader.readAsDataURL(audioBlob);
        
        // Stop the media stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsListening(true);
    } catch (e) {
      console.error('Error starting recording:', e);
    }
  };
  
  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    hasBrowserSupport
  };
};
