
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Unified Search Service using Google Vertex AI
 * Replaces multiple search providers with single Google solution
 */
export class SearchService {
  /**
   * Search using Google Vertex AI with search capabilities
   */
  static async search(
    query: string,
    options: {
      categories?: string[];
      location?: string;
      type?: 'general' | 'places' | 'events' | 'comedy';
    } = {}
  ): Promise<string> {
    try {
      console.log('SearchService: Using Vertex AI for query:', query);
      
      // Enhanced query for better results
      let enhancedQuery = query;
      if (options.location) {
        enhancedQuery += ` in ${options.location}`;
      }
      if (options.categories && options.categories.length > 0) {
        enhancedQuery += ` focusing on ${options.categories.join(', ')}`;
      }
      
      return await VertexAIService.searchWithVertex(enhancedQuery, options.categories);
    } catch (error) {
      console.error('Error in SearchService:', error);
      return `I couldn't find specific information about "${query}". Please try a different search.`;
    }
  }

  /**
   * Search for comedy shows and events
   */
  static async searchComedy(query: string, location?: string): Promise<string> {
    return this.search(query, {
      categories: ['comedy', 'entertainment', 'shows'],
      location,
      type: 'comedy'
    });
  }

  /**
   * Search for places and venues
   */
  static async searchPlaces(query: string, location?: string): Promise<string> {
    return this.search(query, {
      categories: ['restaurants', 'bars', 'venues', 'attractions'],
      location,
      type: 'places'
    });
  }

  /**
   * Search for events
   */
  static async searchEvents(query: string, location?: string): Promise<string> {
    return this.search(query, {
      categories: ['events', 'concerts', 'shows', 'festivals'],
      location,
      type: 'events'
    });
  }
}
