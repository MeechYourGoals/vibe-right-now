
import { SimpleSearchService } from './SimpleSearchService';
import { ComedySearchService } from './comedy/ComedySearchService';
import { IntegratedSearchProvider } from './providers/IntegratedSearchProvider';
import { FallbackResponseGenerator } from './providers';
import { SearchServiceCore } from './core/SearchServiceCore';
import { getPrimaryProvider, getFallbackProviders } from '@/services/MultiProviderSystem';

/**
 * Orchestrates multiple search providers to find the best result
 * Enhanced with MCP (Multiple Chat Providers) support
 */
export const SearchService = {
  /**
   * Search using multiple providers, trying each one until a result is found
   * Uses the MCP system to determine provider priority
   * @param query The search query
   * @param categories Optional categories from Cloud Natural Language API
   * @returns The search results as text
   */
  async search(query: string, categories?: string[]): Promise<string> {
    try {
      console.log('MCP: Searching for:', query);
      if (categories && categories.length > 0) {
        console.log('MCP: With NLP categories:', categories);
      }
      
      // Get primary search provider based on MCP priorities
      const primaryProvider = getPrimaryProvider('search');
      console.log('MCP: Using primary provider:', primaryProvider?.name);
      
      // First try the primary provider
      if (primaryProvider) {
        let result = null;
        
        switch (primaryProvider.id) {
          case 'vertex-ai':
            result = await IntegratedSearchProvider.attemptDirectAISearch(query, categories);
            break;
          case 'vector-search':
            result = await SearchServiceCore.vectorSearch(query, categories);
            if (typeof result === 'object' && result !== null) {
              result = result.results;
            }
            break;
          case 'swirl':
            result = await IntegratedSearchProvider.attemptSwirlSearch(query);
            break;
          default:
            break;
        }
        
        if (result) {
          console.log(`MCP: Primary provider ${primaryProvider.name} returned result`);
          return typeof result === 'string' ? result : JSON.stringify(result);
        }
      }
      
      // If primary provider fails, try fallbacks in priority order
      const fallbackProviders = getFallbackProviders('search');
      console.log('MCP: Using fallback providers:', fallbackProviders.map(p => p.name).join(', '));
      
      for (const provider of fallbackProviders) {
        let result = null;
        
        switch (provider.id) {
          case 'vertex-ai':
            result = await IntegratedSearchProvider.attemptDirectAISearch(query, categories);
            break;
          case 'vector-search':
            result = await SearchServiceCore.vectorSearch(query, categories);
            if (typeof result === 'object' && result !== null) {
              result = result.results;
            }
            break;
          case 'swirl':
            result = await IntegratedSearchProvider.attemptSwirlSearch(query);
            break;
          case 'google-search':
            result = await IntegratedSearchProvider.attemptAllProviders(query);
            break;
          default:
            break;
        }
        
        if (result) {
          console.log(`MCP: Fallback provider ${provider.name} returned result`);
          return typeof result === 'string' ? result : JSON.stringify(result);
        }
      }
      
      // Ultimate fallback if all services fail
      return FallbackResponseGenerator.useFallbackLocalService(query);
    } catch (error) {
      console.error('MCP: Error in search services:', error);
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
   * @param query The search query
   * @param categories Optional categories from Cloud Natural Language API
   * @returns Object with results and categories or string with results
   */
  async vectorSearch(query: string, categories?: string[]): Promise<{results: string, categories: string[]} | string | null> {
    return SearchServiceCore.vectorSearch(query, categories);
  },
  
  /**
   * Get a list of all available search providers and their status
   */
  getAvailableSearchProviders() {
    return getPrimaryProvider('search');
  },
};
