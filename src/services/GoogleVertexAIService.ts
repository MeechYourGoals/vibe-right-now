
import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

/**
 * Service for interacting with Google Vertex AI via Firebase Functions
 */
export class GoogleVertexAIService {
  // Text-to-speech voice configuration
  static DEFAULT_MALE_VOICE = "en-US-Neural2-D";
  static DEFAULT_FEMALE_VOICE = "en-US-Neural2-F";

  /**
   * Generate a response using Vertex AI API
   * @param prompt The prompt to send to the model
   * @param mode The mode to use (default, search, venue)
   * @param context Optional context for the conversation
   * @returns The generated response
   */
  static async generateResponse(
    prompt: string, 
    mode: 'default' | 'search' | 'venue' = 'default', 
    context: any[] = []
  ): Promise<string> {
    try {
      const generateTextFn = httpsCallable(functions, 'vertexAI-generateText');
      
      // Prepare the request
      const response = await generateTextFn({
        prompt,
        mode,
        context: context.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
      });
      
      // @ts-ignore - Firebase functions return type
      return response.data.text || "I couldn't generate a response.";
    } catch (error) {
      console.error('Error generating response with Vertex AI:', error);
      return "I'm having trouble connecting to my AI services. Please try again later.";
    }
  }

  /**
   * Search for information using Vertex AI
   * @param query The search query
   * @param categories Optional categories to filter the search
   * @returns The search results as text
   */
  static async searchWithVertex(
    query: string,
    categories?: string[]
  ): Promise<string> {
    try {
      console.log('Searching with Vertex AI:', query);
      if (categories && categories.length > 0) {
        console.log('With categories:', categories);
      }
      
      const searchFn = httpsCallable(functions, 'vertexAI-search');
      
      // Prepare the request
      const response = await searchFn({
        query,
        categories
      });
      
      // @ts-ignore - Firebase functions return type
      return response.data.text || `No results found for "${query}".`;
    } catch (error) {
      console.error('Error in Vertex AI search:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }

  /**
   * Convert text to speech using Vertex AI API
   * @param text The text to convert to speech
   * @param options Options for the text-to-speech conversion
   * @returns The audio data as a base64 string
   */
  static async textToSpeech(
    text: string, 
    options: { voice?: string; speakingRate?: number; pitch?: number } = {}
  ): Promise<string> {
    try {
      const ttsFn = httpsCallable(functions, 'vertexAI-textToSpeech');
      
      const response = await ttsFn({
        text,
        voice: options.voice || this.DEFAULT_MALE_VOICE,
        speakingRate: options.speakingRate || 1.0,
        pitch: options.pitch || 0
      });
      
      // @ts-ignore - Firebase functions return type
      return response.data.audioContent || "";
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      return "";
    }
  }

  /**
   * Analyze text with Google Natural Language API
   */
  static async analyzeText(text: string): Promise<any> {
    try {
      const nlpFn = httpsCallable(functions, 'googleNLP-analyze');
      
      const response = await nlpFn({
        text
      });
      
      // @ts-ignore - Firebase functions return type
      return response.data;
    } catch (error) {
      console.error('Error in text analysis:', error);
      return null;
    }
  }

  /**
   * Extract entities from text using Google Natural Language API
   */
  static async extractEntities(text: string): Promise<any[]> {
    const analysisData = await this.analyzeText(text);
    if (!analysisData || !analysisData.entities) {
      return [];
    }
    return analysisData.entities;
  }

  /**
   * Extract categories from text based on entity types
   */
  static async extractCategories(text: string): Promise<string[]> {
    const entities = await this.extractEntities(text);
    
    // Map of entity types to categories
    const categoryMap: Record<string, string> = {
      'LOCATION': 'location',
      'ADDRESS': 'location',
      'CONSUMER_GOOD': 'product',
      'WORK_OF_ART': 'entertainment',
      'EVENT': 'event',
      'ORGANIZATION': 'organization',
      'PERSON': 'person',
      'OTHER': 'other'
    };
    
    const categories = new Set<string>();
    
    entities.forEach((entity: any) => {
      const type = entity.type;
      if (categoryMap[type]) {
        categories.add(categoryMap[type]);
      }
      
      // Extract subcategories from entity metadata
      if (entity.metadata) {
        Object.entries(entity.metadata).forEach(([key, value]: [string, any]) => {
          if (typeof value === 'string' && value.length > 0) {
            categories.add(value.toLowerCase());
          }
        });
      }
    });
    
    return Array.from(categories);
  }
}

// For backward compatibility with existing VertexAIService
export const VertexAIService = GoogleVertexAIService;
