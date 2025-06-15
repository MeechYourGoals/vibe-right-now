
import { toast } from 'sonner';
import { VertexAIHub, DEFAULT_MALE_VOICE } from "@/services/VertexAI";

// Speech Recognition utilities
export const initializeSpeechRecognition = (): SpeechRecognition | null => {
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    try {
      console.log('Initializing speech recognition...');
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
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
  
  if (error !== 'aborted') {
    let errorMessage = 'Microphone error';
    
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

// Speech Synthesis utilities
export const initializeSpeechSynthesis = (): SpeechSynthesis | null => {
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

export const getGoogleTTS = async (text: string): Promise<string | null> => {
  try {
    console.log('Requesting Google TTS for text:', text.substring(0, 50) + '...');
    
    return await VertexAIHub.textToSpeech(text, {
      voice: DEFAULT_MALE_VOICE,
      speakingRate: 1.0,
      pitch: 0
    });
  } catch (error) {
    console.error('Error calling Google TTS:', error);
    toast.error('Error generating speech, falling back to browser TTS');
    return null;
  }
};

export const playAudioBase64 = (audioBase64: string): HTMLAudioElement | null => {
  if (!audioBase64) {
    console.error('Empty audio base64 string provided');
    return null;
  }
  
  try {
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    
    audio.onloadeddata = () => console.log('Audio loaded successfully');
    audio.onerror = (err) => console.error('Audio loading error:', err);
    
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      toast.error('Error playing audio');
    });
    
    return audio;
  } catch (error) {
    console.error('Error creating audio element:', error);
    toast.error('Error processing audio');
    return null;
  }
};

// Text processing utilities
export const processTextForNaturalSpeech = (text: string): string => {
  if (!text) return '';
  
  let processedText = text
    .replace(/\.\s+/g, '. <break time="500ms"/> ')
    .replace(/\!\s+/g, '! <break time="500ms"/> ')
    .replace(/\?\s+/g, '? <break time="500ms"/> ')
    .replace(/,\s+/g, ', <break time="200ms"/> ');
  
  const emphasizeWords = ['important', 'note', 'warning', 'critical', 'remember'];
  
  emphasizeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    processedText = processedText.replace(regex, `<emphasis>${word}</emphasis>`);
  });
  
  return processedText;
};

export const breakTextIntoSentences = (text: string): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
  
  return sentences
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);
};

export const getPreferredVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) {
    return null;
  }
  
  let preferredVoice = voices.find(voice => 
    voice.lang === 'en-US' && (
      voice.name.includes('Google') || 
      voice.name.includes('Premium') || 
      voice.name.includes('Natural')
    )
  );
  
  if (!preferredVoice) {
    preferredVoice = voices.find(voice => voice.lang === 'en-US');
  }
  
  if (!preferredVoice) {
    preferredVoice = voices.find(voice => voice.lang.startsWith('en'));
  }
  
  if (!preferredVoice) {
    preferredVoice = voices[0];
  }
  
  return preferredVoice;
};

export const configureUtteranceForNaturalSpeech = (
  utterance: SpeechSynthesisUtterance, 
  text: string
): void => {
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  if (text.includes('?')) {
    utterance.pitch = 1.1;
  }
  
  if (text.includes('!')) {
    utterance.rate = 1.1;
    utterance.volume = 1.0;
  }
  
  if (text.length > 100) {
    utterance.rate = 0.95;
  }
  
  if (/^(hi|hello|hey|greetings|welcome)/i.test(text)) {
    utterance.pitch = 1.05;
    utterance.rate = 0.95;
  }
};
