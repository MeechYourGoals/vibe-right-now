
import { SimpleSearchService } from './SimpleSearchService';
import { ComedySearchService } from './comedy/ComedySearchService';
import { IntegratedSearchProvider } from './providers/IntegratedSearchProvider';
import { FallbackResponseGenerator } from './providers';
import { SearchServiceCore } from './core/SearchServiceCore';

/**
 * Orchestrates multiple search providers to find the best result
 */
export const SearchService = {
  /**
   * Search using multiple providers, trying each one until a result is found
   * @param query The search query
   * @returns The search results as text
   */
  async search(query: string): Promise<string> {
    try {
      console.log('Searching for:', query);
      
      // First try vector search through AI API (most up-to-date info)
      const vectorResult = await IntegratedSearchProvider.attemptVectorSearch(query);
      if (vectorResult) return vectorResult;
      
      // Try using AI directly for a conversational response with current information
      const aiResult = await IntegratedSearchProvider.attemptDirectAISearch(query);
      if (aiResult) return aiResult;
      
      // Try using Swirl (local search engine)
      const swirlResult = await IntegratedSearchProvider.attemptSwirlSearch(query);
      if (swirlResult) return swirlResult;
      
      // Try other providers as fallbacks
      const providersResult = await IntegratedSearchProvider.attemptAllProviders(query);
      if (providersResult) return providersResult;
      
      // Ultimate fallback if all services fail
      return FallbackResponseGenerator.useFallbackLocalService(query);
    } catch (error) {
      console.error('Error in search services:', error);
      return FallbackResponseGenerator.useFallbackLocalService(query);
    }
  },
  
  /**
   * Specialized search for comedy shows and events
   * @param query The search query about comedy shows
   * @returns Information about comedy shows in the area
   */
  async comedySearch(query: string): Promise<string> {
    return ComedySearchService.comedySearch(query);
  },
  
  /**
   * Perform a vector search using Supabase vector search capabilities
   * This connects to our AI-powered search function
   * @returns Object with results and categories or string with results
   */
  async vectorSearch(query: string): Promise<{results: string, categories: string[]} | string | null> {
    return SearchServiceCore.vectorSearch(query);
  }
};
