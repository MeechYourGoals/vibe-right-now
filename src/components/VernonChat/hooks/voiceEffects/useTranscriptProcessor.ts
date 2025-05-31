
import { useEffect } from 'react';

interface UseTranscriptProcessorProps {
  isListening: boolean;
  isProcessing: boolean;
  isTyping: boolean;
  setIsProcessing: (value: boolean) => void;
  processTranscript: () => string;
  onSendMessage: (message: string) => void;
}

export const useTranscriptProcessor = ({
  isListening,
  isProcessing,
  isTyping,
  setIsProcessing,
  processTranscript,
  onSendMessage
}: UseTranscriptProcessorProps) => {
  // Handle sending voice transcript as a message
  useEffect(() => {
    if (!isListening && isProcessing && !isTyping) {
      const transcriptText = processTranscript();
      if (transcriptText) {
        // Small delay to show processing state
        setTimeout(() => {
          onSendMessage(transcriptText);
          setIsProcessing(false);
        }, 300);
      } else {
        setIsProcessing(false);
      }
    }
  }, [isListening, isProcessing, processTranscript, onSendMessage, setIsProcessing, isTyping]);
};
