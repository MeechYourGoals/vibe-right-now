
import { toast } from 'sonner';

export interface UseListeningToggleProps {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  stopSpeaking: () => void;
  setIsFirstInteraction: (value: boolean) => void;
}

export const useListeningToggle = ({
  isListening,
  startListening,
  stopListening,
  stopSpeaking,
  setIsFirstInteraction
}: UseListeningToggleProps) => {
  
  const toggleListening = () => {
    if (!navigator.mediaDevices) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      // If currently listening, stop
      stopListening();
      stopSpeaking(); // Also stop any ongoing speech when user toggles off
    } else {
      // Request microphone permission first
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // If permission granted, start listening
          startListening();
          setIsFirstInteraction(false); // No longer the first interaction once user toggles listening
          toast.success('Voice mode activated. Start speaking...');
        })
        .catch(error => {
          console.error('Microphone permission denied:', error);
          toast.error('Microphone access required for voice mode');
        });
    }
  };
  
  return { toggleListening };
};
