
import { toast } from 'sonner';

// Local speech synthesis utilities specific to hooks
export const configureSpeechSynthesis = (): SpeechSynthesis | null => {
  if ('speechSynthesis' in window) {
    const synth = window.speechSynthesis;
    synth.getVoices();
    
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const silentUtterance = new SpeechSynthesisUtterance('');
      silentUtterance.volume = 0;
      synth.speak(silentUtterance);
    }
    
    return synth;
  }
  
  console.error('Speech synthesis not supported');
  return null;
};

export const createUtterance = (text: string): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  return utterance;
};

export const handleSynthesisError = (error: string): void => {
  console.error('Speech synthesis error:', error);
  toast.error('Error with speech synthesis');
};
