
import { useState, useCallback, useRef, useEffect } from 'react';
import { useSpeechSynthesisVoices } from './useSpeechSynthesisVoices';
import { useElevenLabsVoice } from './useElevenLabsVoice';
import { useBrowserSpeechSynthesis } from './useBrowserSpeechSynthesis';
import { ElevenLabsService } from '@/services/ElevenLabs';
import { useSpeechSynthesisCore } from './useSpeechSynthesisCore';
import { useSpeakResponse } from './useSpeakResponse';
import { useElevenLabsKeyManager } from './useElevenLabsKeyManager';

// Main hook for speech synthesis
export { useSpeechSynthesis } from '../useSpeechSynthesis';

// Component hooks
export {
  useSpeechSynthesisCore,
  useSpeakResponse,
  useElevenLabsKeyManager,
  useSpeechSynthesisVoices,
  useElevenLabsVoice,
  useBrowserSpeechSynthesis,
  useElevenLabsSpeech
} from './';

// Utility functions
export { createAudioElement, speakSentenceBySequence, setupSpeechSynthesis } from './speechSynthesisUtils';
