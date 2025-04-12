
/**
 * Service for interacting with the Swirl search engine
 */
export class SwirlSearchService {
  private static baseUrl: string = 'http://localhost:8000';
  private static apiKey: string | null = null;

  /**
   * Configure the Swirl search service
   * @param config Configuration object with baseUrl and optional apiKey
   */
  static configure(config: { baseUrl: string; apiKey?: string }): void {
    this.baseUrl = config.baseUrl;
    if (config.apiKey) {
      this.apiKey = config.apiKey;
    }
    console.log('Swirl search service configured with base URL:', this.baseUrl);
  }

  /**
   * Check if the Swirl search engine is available
   * @returns True if the service is available, false otherwise
   */
  static async isAvailable(): Promise<boolean> {
    try {
      // For now, we'll simulate a server check
      // In a real implementation, we would ping the Swirl server
      await new Promise(resolve => setTimeout(resolve, 200));
      return true;
    } catch (error) {
      console.error('Error checking Swirl availability:', error);
      return false;
    }
  }

  /**
   * Search for content using the Swirl search engine
   * @param query The search query
   * @returns The search results
   */
  static async search(query: string): Promise<string> {
    // For now, we'll delegate to OpenAI's search capability via our service
    try {
      return await OpenAISearchProvider.search(query) || 
        `I couldn't find specific information about "${query}". Please try refining your search.`;
    } catch (error) {
      console.error('Error searching with Swirl:', error);
      throw error;
    }
  }
}

// Import OpenAISearchProvider for delegating search until Swirl is properly implemented
import { OpenAISearchProvider } from './search/providers/OpenAISearchProvider';
