
// Export the unified Deepgram-based hook
export { useDeepgramSpeechSynthesis } from './useDeepgramSpeechSynthesis';

// Export legacy hooks for backward compatibility
export { useSpeechSynthesis } from '../useSpeechSynthesis';
export { useSpeechSynthesisCore } from './useSpeechSynthesisCore';
export { useSpeakResponse } from './useSpeakResponse';
export { useElevenLabsKeyManager } from './useElevenLabsKeyManager';
export { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
export { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
export { useDeepgramSpeech } from './useDeepgramSpeech';

// Export utility functions
export { 
  configureSpeechSynthesis,
  createUtterance,
  createAudioElement, 
  speakSentenceBySequence, 
  setupSpeechSynthesis,
  handleSynthesisError
} from './speechSynthesisUtils';
