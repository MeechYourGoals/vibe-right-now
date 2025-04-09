
import { useState, useCallback, useRef, useEffect } from 'react';
import { ElevenLabsService } from '@/services/ElevenLabsService';

// Export the speech synthesis hooks
export { useSpeechSynthesis } from '../useSpeechSynthesis';

// Export component hooks from their respective files
export { useSpeechSynthesisCore } from './useSpeechSynthesisCore';
export { useSpeakResponse } from './useSpeakResponse';
export { useElevenLabsKeyManager } from './useElevenLabsKeyManager';
export { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
export { useElevenLabsVoice } from './useElevenLabsVoice';
export { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
export { useElevenLabsSpeech } from './useElevenLabsSpeech';

// Export utility functions
export { createAudioElement, speakSentenceBySequence, setupSpeechSynthesis } from './speechSynthesisUtils';
