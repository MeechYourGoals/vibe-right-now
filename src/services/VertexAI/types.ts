
/**
 * Options for text generation with Vertex AI
 */
export interface GenerateTextOptions {
  /** The model to use for text generation */
  model?: string;
  
  /** The maximum number of tokens to generate */
  maxTokens?: number;
  
  /** Temperature controls randomness (0.0 to 1.0) */
  temperature?: number;
  
  /** Controls diversity via nucleus sampling (0.0 to 1.0) */
  topP?: number;
  
  /** Prevents the model from generating harmful content */
  safetySettings?: any[];
  
  /** Mode for conversation (default, venue, search) */
  mode?: 'default' | 'venue' | 'search';
}

/**
 * Response from Vertex AI text generation
 */
export interface GenerateTextResponse {
  text: string;
}

/**
 * Search options for Vertex AI
 */
export interface SearchOptions {
  /** Categories to focus the search on */
  categories?: string[];
  
  /** Location context for the search */
  location?: string;
  
  /** Maximum number of results to return */
  maxResults?: number;
}

/**
 * Options for text-to-speech with Google TTS
 */
export interface TextToSpeechOptions {
  /** Voice to use for synthesis */
  voice?: string;
  
  /** Speed rate of speech (0.25 to 4.0) */
  speakingRate?: number;
  
  /** Pitch of speech (-20.0 to 20.0) */
  pitch?: number;
}

/**
 * Content safety check response
 */
export interface ContentSafetyResponse {
  /** Whether the content is deemed safe */
  safe: boolean;
  
  /** Reasons why content might be unsafe */
  reasons?: string[];
}

/**
 * Default voices for Google Text-to-Speech
 */
export const DEFAULT_MALE_VOICE = "en-US-Neural2-D";
export const DEFAULT_FEMALE_VOICE = "en-US-Neural2-F";
