
import { 
  getPreferredVoice, 
  processTextForNaturalSpeech, 
  configureUtteranceForNaturalSpeech,
  initializeSpeechSynthesis 
} from '../../utils/speech';

export interface SpeechState {
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
  currentlyPlayingText: React.MutableRefObject<string | null>;
}

// Function to speak sentences one by one for more natural cadence
export const speakSentenceBySequence = (
  sentences: string[], 
  index: number,
  speechSynthesis: SpeechSynthesis,
  voices: SpeechSynthesisVoice[],
  speechState: SpeechState
): void => {
  if (!speechSynthesis || index >= sentences.length) {
    return;
  }
  
  const { isSpeaking, setIsSpeaking, currentlyPlayingText } = speechState;
  const sentence = sentences[index];
  const utterance = new SpeechSynthesisUtterance(sentence);
  
  // Select voice
  const preferredVoice = getPreferredVoice(voices.length > 0 ? voices : speechSynthesis.getVoices());
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  // Configure utterance properties
  configureUtteranceForNaturalSpeech(utterance, sentence);
  
  // Handle events
  utterance.onstart = () => {
    if (index === 0) {
      setIsSpeaking(true);
    }
  };
  
  utterance.onend = () => {
    // Move to next sentence
    if (index < sentences.length - 1) {
      speakSentenceBySequence(sentences, index + 1, speechSynthesis, voices, speechState);
    } else {
      setIsSpeaking(false);
      currentlyPlayingText.current = null;
    }
  };
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    setIsSpeaking(false);
    currentlyPlayingText.current = null;
  };
  
  // Speak the current sentence
  speechSynthesis.speak(utterance);
};

// Initialize audio element for playback
export const createAudioElement = (
  onPlay: () => void,
  onEnded: () => void,
  onError: () => void
): HTMLAudioElement => {
  const audio = new Audio();
  
  // Set up event handlers
  audio.onplay = onPlay;
  audio.onended = onEnded;
  audio.onerror = onError;
  
  return audio;
};

// Initialize speech synthesis
export const setupSpeechSynthesis = (): {
  speechSynthesis: SpeechSynthesis | null;
  audioElement: HTMLAudioElement;
} => {
  const speechSynthesis = initializeSpeechSynthesis();
  
  const audioElement = new Audio();
  
  return {
    speechSynthesis,
    audioElement
  };
};
