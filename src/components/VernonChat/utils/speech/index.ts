
// Re-export all speech utilities for easier imports
export * from './voiceSelection';
// Don't re-export initializeSpeechSynthesis from voiceSelection since we're explicitly exporting it from synthesis
export { getPreferredVoice } from './voiceSelection';
export * from './textProcessing';
export * from './utteranceConfig';
export * from './recognition';
// Explicitly re-export speech synthesis initialization to avoid duplicate export
export { initializeSpeechSynthesis } from './synthesis';
