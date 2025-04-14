
import { UseTranscriptProcessorParams, UseTranscriptProcessorReturn } from './types';

export const useTranscriptProcessor = ({
  transcript,
  setTranscript,
  setIsProcessing,
  setInterimTranscript
}: UseTranscriptProcessorParams): UseTranscriptProcessorReturn => {
  
  // Process the full transcript when requested
  const processTranscript = async (): Promise<string> => {
    if (!transcript.trim()) {
      return Promise.resolve('');
    }
    
    console.log('Processing transcript:', transcript);
    setIsProcessing(true);
    
    try {
      // Here, we would typically send the transcript to a server for processing
      // For now, we'll just return the transcript as-is
      
      // Clear the interim and transcript state after processing
      setInterimTranscript('');
      
      // Return the final transcript
      const finalTranscript = transcript;
      setTranscript('');
      setIsProcessing(false);
      
      return Promise.resolve(finalTranscript);
    } catch (error) {
      console.error('Error processing transcript:', error);
      setIsProcessing(false);
      return Promise.resolve('');
    }
  };
  
  return {
    processTranscript
  };
};
