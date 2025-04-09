
// Utility functions for voice selection

/**
 * Gets the preferred voice from available voices
 * @param voices Array of available voices
 * @returns The preferred voice or null if none found
 */
export const getPreferredVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) {
    return null;
  }
  
  // Try to find a US English voice
  let preferredVoice = voices.find(voice => 
    voice.lang === 'en-US' && (
      voice.name.includes('Google') || 
      voice.name.includes('Premium') || 
      voice.name.includes('Natural')
    )
  );
  
  // Fall back to any US English voice
  if (!preferredVoice) {
    preferredVoice = voices.find(voice => voice.lang === 'en-US');
  }
  
  // Fall back to any English voice
  if (!preferredVoice) {
    preferredVoice = voices.find(voice => voice.lang.startsWith('en'));
  }
  
  // Fall back to first available voice
  if (!preferredVoice) {
    preferredVoice = voices[0];
  }
  
  return preferredVoice;
};

/**
 * Initializes speech synthesis
 * @returns Speech synthesis or null if not available
 */
export const initializeSpeechSynthesis = (): SpeechSynthesis | null => {
  return typeof window !== 'undefined' ? window.speechSynthesis : null;
};
