
import { useCallback, useEffect } from 'react';
import { handleSpeechRecognitionError } from '../../utils/speech';
import { toast } from 'sonner';

interface RecognitionEventHandlersProps {
  speechRecognition: React.MutableRefObject<SpeechRecognition | null>;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  setInterimTranscript: React.Dispatch<React.SetStateAction<string>>;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  isListening: boolean;
  restartAttempts: React.MutableRefObject<number>;
  previousInterims: React.MutableRefObject<string[]>;
  resetSilenceTimer: () => void;
  useElevenLabsASR?: boolean;
}

export const useRecognitionEventHandlers = ({
  speechRecognition,
  setTranscript,
  setInterimTranscript,
  setIsListening,
  isListening,
  restartAttempts,
  previousInterims,
  resetSilenceTimer,
  useElevenLabsASR = false
}: RecognitionEventHandlersProps) => {
  // Handle results from speech recognition
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    // Reset silence timer since we're getting input
    resetSilenceTimer();
    
    // Process interim results
    const interimTranscripts: string[] = [];
    const finalTranscripts: string[] = [];
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      
      if (event.results[i].isFinal) {
        finalTranscripts.push(transcript);
      } else {
        interimTranscripts.push(transcript);
      }
    }
    
    // Update previous interims for comparison
    if (interimTranscripts.length > 0) {
      previousInterims.current = interimTranscripts;
    }
    
    // Set interim transcript
    if (interimTranscripts.length > 0) {
      const formattedInterim = interimTranscripts.join(' ');
      setInterimTranscript(formattedInterim);
    }
    
    // Set final transcript if we have any
    if (finalTranscripts.length > 0) {
      const newTranscriptText = finalTranscripts.join(' ');
      setTranscript(prev => {
        // Only add if not empty or duplicate
        return prev.endsWith(newTranscriptText) ? prev : `${prev} ${newTranscriptText}`.trim();
      });
      setInterimTranscript('');
    }
  }, [setTranscript, setInterimTranscript, previousInterims, resetSilenceTimer]);
  
  // Handle errors from speech recognition
  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    // Fix: Pass event.error (string) instead of the whole event object
    handleSpeechRecognitionError(event.error);
    
    // If we've restarted too many times, stop trying
    if (restartAttempts.current >= 3) {
      toast.error("Voice recognition doesn't seem to be working. Please try again later.");
      setIsListening(false);
      return;
    }
    
    // Try to restart
    if (isListening && speechRecognition.current) {
      restartAttempts.current += 1;
      speechRecognition.current.abort();
      setTimeout(() => {
        if (isListening && speechRecognition.current) {
          speechRecognition.current.start();
        }
      }, 100);
    }
  }, [isListening, speechRecognition, setIsListening, restartAttempts]);
  
  // Set up event listeners
  useEffect(() => {
    if (!useElevenLabsASR && speechRecognition.current) {
      // Standard browser speech recognition event handlers
      speechRecognition.current.onresult = handleResult;
      speechRecognition.current.onerror = handleError;
      
      speechRecognition.current.onend = () => {
        // Auto-restart if still in listening mode
        if (isListening) {
          speechRecognition.current?.start();
        }
      };
    }
    
    // For Eleven Labs Scribe
    if (useElevenLabsASR) {
      // Set up custom event listener for Eleven Labs transcription
      const handleElevenLabsTranscription = (event: CustomEvent) => {
        const { transcription } = event.detail;
        // Reset silence timer since we're getting input
        resetSilenceTimer();
        
        // Set transcript
        setTranscript(prev => {
          const newText = transcription.trim();
          // Only add if not empty or duplicate
          return prev.endsWith(newText) ? prev : `${prev} ${newText}`.trim();
        });
        setInterimTranscript('');
      };
      
      // Add event listener for Eleven Labs transcription
      window.addEventListener('elevenLabsTranscription', handleElevenLabsTranscription as EventListener);
      
      // Cleanup
      return () => {
        window.removeEventListener('elevenLabsTranscription', handleElevenLabsTranscription as EventListener);
      };
    } else {
      // Cleanup for browser speech recognition
      return () => {
        if (speechRecognition.current) {
          speechRecognition.current.onresult = null;
          speechRecognition.current.onerror = null;
          speechRecognition.current.onend = null;
        }
      };
    }
  }, [
    speechRecognition,
    handleResult,
    handleError,
    isListening,
    useElevenLabsASR,
    setTranscript,
    setInterimTranscript,
    resetSilenceTimer
  ]);
};
