
// Re-export all functionality from the Vertex AI service
export * from './text';
export * from './speech';
export * from './safety';
export * from './analysis';
export * from './types';

// Create a hub to simplify imports
export const VertexAIHub = {
  // Text generation
  generateText: (await import('./text')).generateText,
  searchWithAI: (await import('./text')).searchWithAI,
  
  // Speech services
  textToSpeech: (await import('./speech')).textToSpeech,
  speechToText: (await import('./speech')).speechToText,
  
  // Content safety
  checkContentSafety: (await import('./safety')).checkContentSafety,
  
  // Analysis
  analyzeText: (await import('./analysis')).analyzeText,
  extractEntities: (await import('./analysis')).extractEntities,
  extractCategories: (await import('./analysis')).extractCategories
};
