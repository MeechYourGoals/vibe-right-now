
// Export the main optimized hook
export { useOptimizedSpeechSynthesis } from './useOptimizedSpeechSynthesis';

// Export legacy hooks for backward compatibility
export { useSpeechSynthesis } from '../useSpeechSynthesis';
export { useSpeechSynthesisCore } from './useSpeechSynthesisCore';
export { useSpeakResponse } from './useSpeakResponse';
export { useElevenLabsKeyManager } from './useElevenLabsKeyManager';
export { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
export { useElevenLabsVoice } from './useElevenLabsVoice';
export { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
export { useElevenLabsSpeech } from './useElevenLabsSpeech';

// Export utility functions
export { 
  configureSpeechSynthesis,
  createUtterance,
  createAudioElement, 
  speakSentenceBySequence, 
  setupSpeechSynthesis,
  handleSynthesisError
} from './speechSynthesisUtils';
