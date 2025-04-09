
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
  }, []);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!initialized) {
      if (useElevenLabsASR) {
        // Set up audio recording for Eleven Labs Scribe
        setupAudioRecording();
      } else {
        // Fall back to browser's speech recognition
        speechRecognition.current = initializeSpeechRecognition();
        
        if (speechRecognition.current) {
          // Configure recognition
          speechRecognition.current.continuous = true;
          speechRecognition.current.interimResults = true;
          setInitialized(true);
        }
      }
    }
  }, [initialized, useElevenLabsASR]);
  
  // Setup audio recording for Eleven Labs Scribe
  const setupAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      
      mediaRecorder.current.onstop = async () => {
        // Process audio with Eleven Labs Scribe
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        audioChunks.current = []; // Reset for next recording
        
        // Convert Blob to ArrayBuffer
        const arrayBuffer = await audioBlob.arrayBuffer();
        
        // Use Eleven Labs Scribe for transcription
        const transcription = await ElevenLabsService.speechToText(arrayBuffer, {
          language: 'en', // Default to English
        });
        
        if (transcription) {
          // Dispatch custom event with transcription
          const event = new CustomEvent('elevenLabsTranscription', {
            detail: { transcription }
          });
          window.dispatchEvent(event);
        }
      };
      
      setInitialized(true);
    } catch (error) {
      console.error('Error setting up audio recording:', error);
      // Fall back to browser's speech recognition
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
