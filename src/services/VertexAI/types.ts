
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
