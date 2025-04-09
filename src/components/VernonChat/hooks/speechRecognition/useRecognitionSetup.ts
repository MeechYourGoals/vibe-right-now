
import { useRef, useEffect, useState } from 'react';
import { initializeSpeechRecognition } from '../../utils/speech';
import { ElevenLabsService } from '@/services/ElevenLabsService';

export const useRecognitionSetup = () => {
  const [initialized, setInitialized] = useState(false);
  const [useElevenLabsASR, setUseElevenLabsASR] = useState(false);
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const restartAttempts = useRef<number>(0);
  const previousInterims = useRef<string[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  // Check if Eleven Labs API key is available
  useEffect(() => {
    const hasElevenLabsKey = ElevenLabsService.hasApiKey();
    // Prefer Eleven Labs ASR if API key is available
    setUseElevenLabsASR(hasElevenLabsKey);
    
    // Log for debugging
    console.log('Eleven Labs API key available:', hasElevenLabsKey);
  }, []);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!initialized) {
      if (useElevenLabsASR) {
        // Set up audio recording for Eleven Labs Scribe
        setupAudioRecording();
        console.log('Setting up Eleven Labs Scribe audio recording');
      } else {
        // Fall back to browser's speech recognition
        speechRecognition.current = initializeSpeechRecognition();
        
        if (speechRecognition.current) {
          // Configure recognition
          speechRecognition.current.continuous = true;
          speechRecognition.current.interimResults = true;
          setInitialized(true);
          console.log('Browser speech recognition initialized');
        } else {
          console.error('Failed to initialize browser speech recognition');
        }
      }
    }
  }, [initialized, useElevenLabsASR]);
  
  // Setup audio recording for Eleven Labs Scribe
  const setupAudioRecording = async () => {
    try {
      console.log('Requesting microphone access for Eleven Labs Scribe');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm' // Using webm for better compatibility
      });
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      
      mediaRecorder.current.onstop = async () => {
        console.log('Audio recording stopped, processing with Eleven Labs Scribe');
        // Process audio with Eleven Labs Scribe
        if (audioChunks.current.length === 0) {
          console.warn('No audio chunks collected');
          return;
        }
        
        // Combine all chunks into a single blob
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        console.log('Audio blob created, size:', audioBlob.size);
        
        // Use Eleven Labs Scribe for transcription
        try {
          const transcription = await ElevenLabsService.speechToText(audioBlob, {
            language: 'en', // Default to English
          });
          
          console.log('Received transcription from Eleven Labs Scribe:', transcription);
          
          if (transcription) {
            // Dispatch custom event with transcription
            const event = new CustomEvent('elevenLabsTranscription', {
              detail: { transcription }
            });
            window.dispatchEvent(event);
          } else {
            console.warn('Empty transcription received from Eleven Labs Scribe');
          }
        } catch (error) {
          console.error('Error with Eleven Labs transcription:', error);
        }
        
        // Reset chunks for next recording
        audioChunks.current = [];
      };
      
      setInitialized(true);
      console.log('Eleven Labs Scribe audio recording setup complete');
    } catch (error) {
      console.error('Error setting up audio recording for Eleven Labs Scribe:', error);
      // Fall back to browser's speech recognition
      console.log('Falling back to browser speech recognition');
      speechRecognition.current = initializeSpeechRecognition();
      
      if (speechRecognition.current) {
        speechRecognition.current.continuous = true;
        speechRecognition.current.interimResults = true;
        setInitialized(true);
      }
    }
  };
  
  return {
    speechRecognition,
    initialized,
    restartAttempts,
    previousInterims,
    useElevenLabsASR,
    mediaRecorder,
    audioChunks
  };
};
