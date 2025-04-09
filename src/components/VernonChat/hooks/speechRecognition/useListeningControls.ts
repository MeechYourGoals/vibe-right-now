
import { useCallback } from 'react';

export interface ListeningControlsProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  initialized: boolean;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  setInterimTranscript: React.Dispatch<React.SetStateAction<string>>;
  restartAttempts: React.MutableRefObject<number>;
  clearSilenceTimer: () => void;
  useLocalWhisper: boolean;
  mediaRecorder: React.MutableRefObject<MediaRecorder | null>;
  audioChunks: React.MutableRefObject<Blob[]>;
}

// Hook for controlling the listening state
export const useListeningControls = ({
  speechRecognition,
  initialized,
  isListening,
  setIsListening,
  setIsProcessing,
  setTranscript,
  setInterimTranscript,
  restartAttempts,
  clearSilenceTimer,
  useLocalWhisper,
  mediaRecorder,
  audioChunks
}: ListeningControlsProps) => {
  // Start listening for speech
  const startListening = useCallback(() => {
    if (!initialized) {
      console.error('Speech recognition not initialized yet');
      return;
    }
    
    if (isListening) {
      console.log('Already listening');
      return;
    }
    
    try {
      // Clear any existing transcript
      setTranscript('');
      setInterimTranscript('');
      setIsListening(true);
      
      if (useLocalWhisper) {
        // Start recording for Whisper
        if (mediaRecorder.current && mediaRecorder.current.state !== 'recording') {
          // Clear any previous chunks
          audioChunks.current = [];
          console.log('Starting audio recording for Whisper');
          mediaRecorder.current.start(1000); // Collect data every second
        } else {
          console.error('Media recorder not initialized properly');
          setIsListening(false);
        }
      } else {
        // Use the browser's speech recognition
        if (speechRecognition.current) {
          console.log('Starting browser speech recognition');
          speechRecognition.current.start();
          restartAttempts.current = 0;
        } else {
          console.error('Speech recognition not available');
          setIsListening(false);
        }
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  }, [
    initialized,
    isListening,
    setIsListening,
    setTranscript,
    setInterimTranscript,
    speechRecognition,
    restartAttempts,
    useLocalWhisper,
    mediaRecorder,
    audioChunks
  ]);
  
  // Stop listening for speech
  const stopListening = useCallback(() => {
    clearSilenceTimer();
    
    if (!isListening) {
      return;
    }
    
    try {
      setIsListening(false);
      
      if (useLocalWhisper) {
        // Stop recording for Whisper
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
          console.log('Stopping audio recording for Whisper');
          mediaRecorder.current.stop();
          setIsProcessing(true);
        }
      } else {
        // Stop the browser's speech recognition
        if (speechRecognition.current) {
          console.log('Stopping browser speech recognition');
          try {
            speechRecognition.current.abort();
          } catch (error) {
            console.error('Error stopping speech recognition:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error in stopListening:', error);
    }
  }, [
    isListening,
    setIsListening,
    speechRecognition,
    clearSilenceTimer,
    useLocalWhisper,
    mediaRecorder,
    setIsProcessing
  ]);
  
  return {
    startListening,
    stopListening
  };
};
