
// Re-export all speech utilities for easier imports
export * from './textProcessing';
export * from './utteranceConfig';
export * from './recognition';
// To avoid duplicate exports, selectively export from these files
export { getPreferredVoice } from './voiceSelection';
// Explicitly re-export speech synthesis initialization from synthesis.ts only
export { initializeSpeechSynthesis } from './synthesis';
