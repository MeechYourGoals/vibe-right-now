
import { useRef } from 'react';
import { toast } from 'sonner';

interface ListeningControlsProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  initialized: boolean;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  setInterimTranscript: React.Dispatch<React.SetStateAction<string>>;
  restartAttempts: React.MutableRefObject<number>;
  clearSilenceTimer: () => void;
  useElevenLabsASR?: boolean;
  mediaRecorder?: React.MutableRefObject<MediaRecorder | null>;
  audioChunks?: React.MutableRefObject<Blob[]>;
}

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
  useElevenLabsASR = false,
  mediaRecorder = { current: null },
  audioChunks = { current: [] }
}: ListeningControlsProps) => {
  
  // Recording interval for Eleven Labs Scribe
  const recordingInterval = useRef<number | null>(null);
  
  const startListening = () => {
    if (!initialized) {
      toast.error("Speech recognition isn't available. Please try again later.");
      return;
    }
    
    if (isListening) {
      console.log('Already listening, no need to start again');
      return;
    }
    
    // Reset state
    restartAttempts.current = 0;
    setIsListening(true);
    
    try {
      if (useElevenLabsASR && mediaRecorder.current) {
        // Start recording for Eleven Labs Scribe
        audioChunks.current = []; // Clear previous audio chunks
        mediaRecorder.current.start();
        console.log('Started recording for Eleven Labs Scribe');
        
        // Set up recording interval - record chunks every 5 seconds for better real-time transcription
        recordingInterval.current = window.setInterval(() => {
          if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            // Stop current recording and start a new one to process chunks
            mediaRecorder.current.stop();
            
            // Small delay to let the onstop event process
            setTimeout(() => {
              if (isListening && mediaRecorder.current) {
                mediaRecorder.current.start();
              }
            }, 100);
          }
        }, 5000); // Process every 5 seconds
      } else if (speechRecognition.current) {
        // Start browser's speech recognition
        speechRecognition.current.start();
        console.log('Started browser speech recognition');
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
      toast.error("Couldn't start voice recognition. Please try again.");
    }
  };
  
  const stopListening = () => {
    // Clear any silence detection timers
    clearSilenceTimer();
    
    // Clear recording interval if active
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
      recordingInterval.current = null;
    }
    
    if (!isListening) {
      return;
    }
    
    setIsListening(false);
    
    try {
      if (useElevenLabsASR && mediaRecorder.current) {
        // Stop recording for Eleven Labs Scribe
        if (mediaRecorder.current.state === 'recording') {
          mediaRecorder.current.stop();
          console.log('Stopped recording for Eleven Labs Scribe');
        }
      } else if (speechRecognition.current) {
        // Stop browser's speech recognition
        speechRecognition.current.stop();
        console.log('Stopped browser speech recognition');
      }
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };
  
  return {
    startListening,
    stopListening
  };
};
