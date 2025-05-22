
// Re-export all functionality from the Vertex AI service
export * from './text';
export * from './speech';
export * from './safety';
export * from './analysis';
export * from './types';

// Create a hub to simplify imports
export const VertexAIHub = {
  // Text generation with Gemini
  generateText: (await import('./text')).generateText,
  searchWithAI: (await import('./text')).searchWithAI,
  
  // Speech services
  textToSpeech: (await import('./speech')).textToSpeech,
  speechToText: (await import('./speech')).speechToText,
  
  // Content safety
  checkContentSafety: (await import('./safety')).checkContentSafety,
  
  // Analysis with Notebook LM
  analyzeText: (await import('./analysis')).analyzeText,
  extractEntities: (await import('./analysis')).extractEntities,
  extractCategories: (await import('./analysis')).extractCategories,
  
  // Project Mariner integration for agentic booking
  bookWithMariner: async (details: any) => {
    // This would integrate with Project Mariner for agentic bookings
    console.log("Booking with Project Mariner:", details);
    return { success: true, message: "Booked with Project Mariner" };
  },
  
  // Veo API for video generation
  generateVideo: async (prompt: string, options: any = {}) => {
    // This would integrate with Veo API
    console.log("Generating video with Veo:", prompt);
    return null;
  },
  
  // Imagen API for image generation
  generateImage: async (prompt: string, options: any = {}) => {
    // This would integrate with Imagen API
    console.log("Generating image with Imagen:", prompt);
    return null;
  }
};
