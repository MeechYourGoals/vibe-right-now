
import { toast } from 'sonner';

// Speech Recognition helpers
export const initializeSpeechRecognition = (): SpeechRecognition | null => {
  // Check if browser supports speech recognition
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      console.log('Initializing speech recognition...');
      const recognition = new SpeechRecognition();
      
      // Configure recognition settings
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // Ensure English recognition for accuracy
      
      // Give some extra time for processing
      recognition.maxAlternatives = 1;
      
      return recognition;
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      return null;
    }
  }
  
  console.error('Speech recognition not supported');
  return null;
};

export const handleSpeechRecognitionError = (error: string): void => {
  console.error('Speech recognition error', error);
  
  // Don't show aborted errors to user as they happen when we stop listening intentionally
  if (error !== 'aborted') {
    let errorMessage = 'Microphone error';
    
    // Provide more specific error messages
    if (error === 'not-allowed') {
      errorMessage = 'Microphone access denied. Please enable microphone permissions.';
    } else if (error === 'network') {
      errorMessage = 'Network error occurred during voice recognition.';
    } else if (error === 'no-speech') {
      errorMessage = 'No speech detected. Please try again.';
    } else if (error === 'service-not-allowed') {
      errorMessage = 'Speech recognition service not allowed. Please check browser settings.';
    } else if (error === 'audio-capture') {
      errorMessage = 'Could not capture audio. Please check your microphone.';
    } else {
      errorMessage = `Microphone error: ${error}`;
    }
    
    toast.error(errorMessage);
  }
};
