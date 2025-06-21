
// Export the main optimized hook
export { useOptimizedSpeechSynthesis } from './useOptimizedSpeechSynthesis';

// Export legacy hooks for backward compatibility
export { useSpeechSynthesis } from '../useSpeechSynthesis';
export { useSpeechSynthesisCore } from './useSpeechSynthesisCore';
export { useSpeakResponse } from './useSpeakResponse';
export { useElevenLabsKeyManager } from './useElevenLabsKeyManager';
export { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
export { useDeepgramVoice } from './useDeepgramVoice';
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
