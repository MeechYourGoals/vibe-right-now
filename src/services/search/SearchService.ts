
import { VertexAIService } from '@/services/VertexAIService';

export class SearchService {
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

  static async searchComedy(query: string, location?: string): Promise<string> {
    return this.search(query, {
      categories: ['comedy', 'entertainment', 'shows'],
      location,
      type: 'comedy'
    });
  }

  static async searchPlaces(query: string, location?: string): Promise<string> {
    return this.search(query, {
      categories: ['restaurants', 'bars', 'venues', 'attractions'],
      location,
      type: 'places'
    });
  }

  static async searchEvents(query: string, location?: string): Promise<string> {
    return this.search(query, {
      categories: ['events', 'concerts', 'shows', 'festivals'],
      location,
      type: 'events'
    });
  }

  static async comedySearch(query: string, location?: string): Promise<string> {
    return this.searchComedy(query, location);
  }

  static async vectorSearch(query: string, options?: any): Promise<string> {
    return this.search(query, options);
  }
}
