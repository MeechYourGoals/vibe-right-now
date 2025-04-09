
import { useCallback } from 'react';

interface TranscriptProcessorProps {
  transcript: string;
  setIsProcessing: (value: boolean) => void;
  setTranscript: (value: string) => void;
  setInterimTranscript: (value: string) => void;
}

export const useTranscriptProcessor = ({
  transcript,
  setIsProcessing,
  setTranscript,
  setInterimTranscript
}: TranscriptProcessorProps) => {
  
  // Get the current complete transcript for processing
  const processTranscript = useCallback(() => {
    if (transcript.trim()) {
      setIsProcessing(true);
      
      // Return the transcript for further processing
      const currentTranscript = transcript.trim();
      setTranscript('');
      setInterimTranscript('');
      
      return currentTranscript;
    }
    return '';
  }, [transcript, setIsProcessing, setTranscript, setInterimTranscript]);
  
  return { processTranscript };
};
