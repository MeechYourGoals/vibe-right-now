
import { functions } from './index';
import { httpsCallable } from 'firebase/functions';

/**
 * Firebase Cloud Functions service
 */
export class CloudFunctionsService {
  /**
   * Call a Firebase Cloud Function
   * @param functionName The function name
   * @param data The function parameters
   * @returns The function result
   */
  static async callFunction(functionName: string, data: any): Promise<any> {
    try {
      const functionRef = httpsCallable(functions, functionName);
      const result = await functionRef(data);
      return result.data;
    } catch (error) {
      console.error(`Error calling function ${functionName}:`, error);
      throw error;
    }
  }

  /**
   * Generate text with Vertex AI
   * @param prompt The prompt
   * @param options Options for text generation
   */
  static async generateText(prompt: string, options: any = {}): Promise<any> {
    return this.callFunction('vertexAI-generateText', { prompt, ...options });
  }

  /**
   * Search with Vertex AI
   * @param query The search query
   * @param options Search options
   */
  static async search(query: string, options: any = {}): Promise<any> {
    return this.callFunction('vertexAI-search', { query, ...options });
  }

  /**
   * Convert text to speech with Vertex AI
   * @param text The text to convert
   * @param options Text-to-speech options
   */
  static async textToSpeech(text: string, options: any = {}): Promise<any> {
    return this.callFunction('vertexAI-textToSpeech', { text, ...options });
  }

  /**
   * Analyze text with Google Natural Language API
   * @param text The text to analyze
   */
  static async analyzeText(text: string): Promise<any> {
    return this.callFunction('googleNLP-analyze', { text });
  }
}

// Export Firebase Cloud Functions service
export default CloudFunctionsService;
