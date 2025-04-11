
/**
 * Comprehensive service to coordinate all Vertex AI capabilities
 * This service acts as a central hub for all interactions with Google's Vertex AI
 */
import { generateText, searchWithAI } from './text';
import { textToSpeech, speechToText } from './speech';
import { analyzeText } from './analysis';
import { checkContentSafety } from './safety';
import { 
  VertexAIModel, 
  VertexAIVisionModel, 
  VertexVoiceModel,
  GenerateTextOptions,
  GenerateImageOptions,
  TextToSpeechOptions,
  DEFAULT_MALE_VOICE
} from './types';

/**
 * Central service for interacting with Google Vertex AI
 */
export const VertexAIHub = {
  // Re-export types
  DEFAULT_MALE_VOICE,
  
  // Text generation
  generateText,
  searchWithAI,
  
  // Speech services
  textToSpeech,
  speechToText,
  
  // Analysis services
  analyzeText,
  
  // Safety services
  checkContentSafety
};

// Re-export types
export type {
  VertexAIModel,
  VertexAIVisionModel, 
  VertexVoiceModel,
  GenerateTextOptions,
  GenerateImageOptions,
  TextToSpeechOptions
};
