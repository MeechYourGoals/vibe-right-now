
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { initializeSpeechRecognition, handleSpeechRecognitionError } from '../../utils/speechUtils';

export const useRecognitionSetup = () => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    const speechRecognition = initializeSpeechRecognition();
    
    if (speechRecognition) {
      setRecognition(speechRecognition);
      setIsSupported(true);
    } else {
      setIsSupported(false);
      toast.error('Speech recognition is not supported in this browser');
    }
  }, []);

  const handleError = (error: string) => {
    handleSpeechRecognitionError(error);
  };

  return {
    recognition,
    isSupported,
    handleError
  };
};
