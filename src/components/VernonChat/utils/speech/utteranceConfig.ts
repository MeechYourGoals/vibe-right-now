
// Configure utterance for more natural sounding speech
export const configureUtteranceForNaturalSpeech = (
  utterance: SpeechSynthesisUtterance, 
  text: string
): void => {
  // Optimize for more natural sounding speech
  utterance.rate = 0.92; // Slightly slower for more natural cadence
  utterance.pitch = 1.05; // Slightly higher pitch for more energetic sound
  utterance.volume = 1.0;
  
  // Add more expression with pitch and rate variations for different sentence types
  if (text.includes('?')) {
    utterance.pitch = 1.15; // Higher pitch for questions
    utterance.rate = 0.85; // Slightly slower for questions
  } else if (text.includes('!')) {
    utterance.pitch = 1.25; // Higher pitch for exclamations
    utterance.rate = 0.88; // Slightly slower for emphasis
  }
  
  // For longer texts, use a slightly faster rate to maintain engagement
  if (text.length > 200) {
    utterance.rate = Math.min(utterance.rate + 0.05, 1.0);
  }
};
