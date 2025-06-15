
import { SearchStrategyFactory } from './SearchStrategyFactory';
import { SearchOptions } from './types';

/**
 * Coordinates search strategies using the factory pattern
 */
export class SearchCoordinator {
  /**
   * Performs a search using the most appropriate strategy
   * @param query The search query
   * @param options Optional search options
   * @returns The search result as text
   */
  static async search(query: string, options: SearchOptions = {}): Promise<string> {
    console.log(`SearchCoordinator searching for: "${query}"`);
    
    try {
      return await SearchStrategyFactory.executeSearch(query, options);
    } catch (error) {
      console.error('SearchCoordinator error:', error);
      return `I couldn't find specific information about "${query}". Please try asking in a different way.`;
    }
  }
}
