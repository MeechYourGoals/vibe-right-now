
import { toast } from 'sonner';

// Voice selection utilities
export const getPreferredVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
  // Try to find a good male English voice with natural sounding characteristics
  const preferredVoices = [
    'Google UK English Male',
    'Microsoft David - English (United States)',
    'Microsoft Mark - English (United States)',
    'Alex',  // macOS voice
  ];
  
  // Look for one of our preferred voices first
  const naturalVoice = voices.find(voice => 
    preferredVoices.some(preferred => voice.name.includes(preferred))
  );
  
  // Try to find a good male English voice as fallback
  const maleVoice = voices.find(
    voice => voice.lang.includes('en') && 
             (voice.name.includes('Male') || 
              voice.name.includes('Daniel') || 
              voice.name.includes('David') || 
              voice.name.includes('James') || 
              voice.name.includes('George'))
  );
  
  // If no specific male voice found, fallback to any English voice
  const englishVoice = voices.find(
    voice => voice.lang.includes('en')
  );
  
  return naturalVoice || maleVoice || englishVoice;
};

// Process text to make it sound more natural
export const processTextForNaturalSpeech = (text: string): string => {
  return text
    .replace(/\./g, '. ')
    .replace(/\,/g, ', ')
    .replace(/\!/g, '! ')
    .replace(/\?/g, '? ')
    // Add SSML-like breathing pauses for more natural sound
    .replace(/([.!?])\s+/g, '$1 <break time="500ms"/> ')
    .replace(/(,|;)\s+/g, '$1 <break time="300ms"/> ')
    // Remove the SSML-like tags before actual synthesis
    .replace(/<break time="(\d+)ms"\/>/g, '');
};

// Configure utterance for more natural sounding speech
export const configureUtteranceForNaturalSpeech = (
  utterance: SpeechSynthesisUtterance, 
  text: string
): void => {
  // Optimize for more natural sounding speech
  utterance.rate = 0.92; // Slightly slower than default
  utterance.pitch = 1.0; // Natural pitch
  utterance.volume = 1.0;
  
  // Add more expression with pitch variations for questions and exclamations
  if (text.includes('?')) {
    utterance.pitch = 1.1; // Slightly higher pitch for questions
  } else if (text.includes('!')) {
    utterance.pitch = 1.2; // Higher pitch for exclamations
  }
};

// Speech Recognition helpers
export const initializeSpeechRecognition = (): SpeechRecognition | null => {
  // Check if browser supports speech recognition
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    return recognition;
  }
  
  console.error('Speech recognition not supported');
  return null;
};

export const initializeSpeechSynthesis = (): SpeechSynthesis | null => {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis;
  }
  
  console.error('Speech synthesis not supported');
  return null;
};

export const handleSpeechRecognitionError = (error: string): void => {
  console.error('Speech recognition error', error);
  toast.error(`Microphone error: ${error}`);
};
