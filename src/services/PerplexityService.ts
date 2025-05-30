
import { SearchService } from './search/SearchService';

/**
 * Service to interact with search APIs and AI-assisted search
 * This is kept for backward compatibility but delegates to the new SearchService
 */
export const PerplexityService = {
  /**
   * Search using multiple providers
   * @param query The search query
   * @returns The search results as text
   */
  async searchPerplexity(query: string): Promise<string> {
    return SearchService.search(query);
  }
};
