
// Re-export all functionality from the Vertex AI service
export * from './text';
export * from './speech';
export * from './safety';
export * from './analysis';
export * from './types';

// Simplified hub exports - remove async imports which can cause issues
export const VertexAIHub = {
  // Re-export functions directly
  generateText: require('./text').generateText,
  searchWithAI: require('./text').searchWithAI,
  textToSpeech: require('./speech').textToSpeech,
  speechToText: require('./speech').speechToText,
  checkContentSafety: require('./safety').checkContentSafety,
  analyzeText: require('./analysis').analyzeText,
  extractEntities: require('./analysis').extractEntities,
  extractCategories: require('./analysis').extractCategories
};
