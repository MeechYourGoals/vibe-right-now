
// Utility functions for text processing

/**
 * Processes text to make it sound more natural when spoken
 * @param text The text to process
 * @returns Processed text
 */
export const processTextForNaturalSpeech = (text: string): string => {
  if (!text) return '';
  
  // Add pauses after punctuation
  let processedText = text
    .replace(/\.\s+/g, '. <break time="500ms"/> ')
    .replace(/\!\s+/g, '! <break time="500ms"/> ')
    .replace(/\?\s+/g, '? <break time="500ms"/> ')
    .replace(/,\s+/g, ', <break time="200ms"/> ');
  
  // Add emphasis to important words
  const emphasizeWords = ['important', 'note', 'warning', 'critical', 'remember'];
  
  emphasizeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    processedText = processedText.replace(regex, `<emphasis>${word}</emphasis>`);
  });
  
  return processedText;
};

/**
 * Breaks down text into sentences
 * @param text The text to break down
 * @returns Array of sentences
 */
export const breakTextIntoSentences = (text: string): string[] => {
  // Split by sentence-ending punctuation followed by space or end of string
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
  
  // Trim each sentence and filter out empty ones
  return sentences
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);
};
