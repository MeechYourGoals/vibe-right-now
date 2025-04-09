
// Utility functions for utterance configuration

/**
 * Configures utterance properties for more natural speech
 * @param utterance The SpeechSynthesisUtterance to configure
 * @param text The original text being spoken
 */
export const configureUtteranceForNaturalSpeech = (
  utterance: SpeechSynthesisUtterance, 
  text: string
): void => {
  // Base configuration
  utterance.rate = 1.0;  // Normal speaking rate
  utterance.pitch = 1.0; // Normal pitch
  utterance.volume = 1.0; // Full volume
  
  // Adjust for question marks
  if (text.includes('?')) {
    utterance.pitch = 1.1; // Slightly higher pitch for questions
  }
  
  // Adjust for exclamations
  if (text.includes('!')) {
    utterance.rate = 1.1; // Slightly faster for exclamations
    utterance.volume = 1.0; // Louder for emphasis
  }
  
  // Adjust for longer text
  if (text.length > 100) {
    utterance.rate = 0.95; // Slightly slower for longer text
  }
  
  // Adjust for greeting patterns
  if (/^(hi|hello|hey|greetings|welcome)/i.test(text)) {
    utterance.pitch = 1.05; // Slightly higher pitch for greetings
    utterance.rate = 0.95;  // Slightly slower for greetings
  }
};

/**
 * Adds SSML (Speech Synthesis Markup Language) tags to text
 * @param text The text to add SSML to
 * @returns Text with SSML tags
 */
export const addSSMLTags = (text: string): string => {
  // Only add SSML if the platform supports it
  if (!text || typeof text !== 'string') return text;
  
  let ssmlText = text;
  
  // Add pause after periods
  ssmlText = ssmlText.replace(/\.\s+/g, '. <break time="500ms"/> ');
  
  // Add emphasis to important words
  ssmlText = ssmlText.replace(
    /\b(important|note|warning|critical|remember)\b/gi, 
    '<emphasis>$1</emphasis>'
  );
  
  return ssmlText;
};
