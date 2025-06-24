
// Re-export all functionality from the Vertex AI service
export * from './text';
export * from './speech';
export * from './safety';
export * from './analysis';
export * from './types';

// Import functions directly
import { generateText, searchWithAI } from './text';
import { textToSpeech, speechToText } from './speech';
import { checkContentSafety } from './safety';
import { analyzeText, extractEntities, extractCategories } from './analysis';

// Simplified hub exports with proper ES module imports
export const VertexAIHub = {
  generateText,
  searchWithAI,
  textToSpeech,
  speechToText,
  checkContentSafety,
  analyzeText,
  extractEntities,
  extractCategories
};
