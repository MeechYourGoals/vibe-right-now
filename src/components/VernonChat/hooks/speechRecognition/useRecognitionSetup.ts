
import { useRef, useEffect, useState } from 'react';
import { initializeSpeechRecognition } from '../../utils/speech';
import { WhisperSpeechService } from '@/services/WhisperSpeechService';

export const useRecognitionSetup = () => {
  const [initialized, setInitialized] = useState(false);
  const [useLocalWhisper, setUseLocalWhisper] = useState(true);
  const speechRecognition = useRef<SpeechRecognition | null>(null);
  const restartAttempts = useRef<number>(0);
  const previousInterims = useRef<string[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  // Check if Whisper service is available in this browser
  useEffect(() => {
    const hasWhisperSupport = WhisperSpeechService.isAvailable();
    // Prefer Whisper if browser supports required APIs
    setUseLocalWhisper(hasWhisperSupport);
    
    // Log for debugging
    console.log('Local Whisper support available:', hasWhisperSupport);
  }, []);
  
  // Initialize speech recognition
  useEffect(() => {
    if (!initialized) {
      if (useLocalWhisper) {
        // Set up audio recording for Whisper
        setupAudioRecording();
        console.log('Setting up Whisper audio recording');
        
        // Pre-load the Whisper model in background
        WhisperSpeechService.initSpeechRecognition()
          .then(() => console.log('Whisper model preloaded successfully'))
          .catch(err => console.error('Error preloading Whisper model:', err));
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
  }, [initialized, useLocalWhisper]);
  
  // Setup audio recording for Whisper
  const setupAudioRecording = async () => {
    try {
      console.log('Requesting microphone access for Whisper');
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
        console.log('Audio recording stopped, processing with Whisper');
        // Process audio with Whisper
        if (audioChunks.current.length === 0) {
          console.warn('No audio chunks collected');
          return;
        }
        
        // Combine all chunks into a single blob
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        console.log('Audio blob created, size:', audioBlob.size);
        
        // Use Whisper for transcription
        try {
          const transcription = await WhisperSpeechService.speechToText(audioBlob);
          
          console.log('Received transcription from Whisper:', transcription);
          
          if (transcription) {
            // Dispatch custom event with transcription
            const event = new CustomEvent('whisperTranscription', {
              detail: { transcription }
            });
            window.dispatchEvent(event);
          } else {
            console.warn('Empty transcription received from Whisper');
          }
        } catch (error) {
          console.error('Error with Whisper transcription:', error);
        }
        
        // Reset chunks for next recording
        audioChunks.current = [];
      };
      
      setInitialized(true);
      console.log('Whisper audio recording setup complete');
    } catch (error) {
      console.error('Error setting up audio recording for Whisper:', error);
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
    useLocalWhisper,
    mediaRecorder,
    audioChunks
  };
};
