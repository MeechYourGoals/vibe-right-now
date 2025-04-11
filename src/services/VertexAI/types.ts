
/**
 * Type definitions for Vertex AI service
 */

// Model types
export type VertexAIModel = 'gemini-1.5-pro' | 'gemini-1.5-flash';
export type VertexAIVisionModel = 'gemini-1.5-pro-vision';
export type VertexVoiceModel = 'en-US-Neural2-J' | 'en-US-Neural2-F' | 'en-US-Neural2-D';

// Options for different API calls
export interface GenerateTextOptions {
  model?: VertexAIModel;
  maxTokens?: number;
  temperature?: number;
}

export interface GenerateImageOptions {
  width?: number;
  height?: number;
  samples?: number;
}

export interface TextToSpeechOptions {
  voice?: VertexVoiceModel;
  pitch?: number;
  speakingRate?: number;
}

// Default settings
export const DEFAULT_MALE_VOICE: VertexVoiceModel = 'en-US-Neural2-D';
