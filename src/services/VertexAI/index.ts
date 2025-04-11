
// Re-export all functionality from the Vertex AI service
export * from './text';
export * from './types';

// Create a hub to simplify imports
export const VertexAIHub = {
  generateText: (await import('./text')).generateText,
  searchWithAI: (await import('./text')).searchWithAI
};
