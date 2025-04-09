
import { SimpleSearchService } from './SimpleSearchService';
import { SwirlSearchService } from '../SwirlSearchService';
import { 
  OpenAISearchProvider,
  GoogleSearchProvider,
  DuckDuckGoSearchProvider,
  WikipediaSearchProvider,
  DeepseekSearchProvider,
  FallbackResponseGenerator
} from './providers';

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
      
      // Try using Swirl first (local search engine)
      try {
        // Check if Swirl is available
        const isSwirlAvailable = await SwirlSearchService.isAvailable();
        
        if (isSwirlAvailable) {
          console.log('Swirl is available, using it for search');
          const swirlResult = await SwirlSearchService.search(query);
          if (swirlResult) {
            return swirlResult;
          }
        }
      } catch (error) {
        console.log('Swirl search failed, trying alternative methods:', error);
      }
      
      // Try using OpenAI's search capabilities (most comprehensive)
      try {
        const openAIResult = await OpenAISearchProvider.search(query);
        if (openAIResult) {
          return openAIResult;
        }
      } catch (error) {
        console.log('OpenAI search failed, trying alternative methods:', error);
      }
      
      // Try with Google's Search API if available
      try {
        const googleResult = await GoogleSearchProvider.search(query);
        if (googleResult) {
          return googleResult;
        }
      } catch (error) {
        console.log('Google search failed, trying next service:', error);
      }
      
      // Try DuckDuckGo JSONP API - most reliable free option
      try {
        const duckDuckGoResult = await DuckDuckGoSearchProvider.search(query);
        if (duckDuckGoResult) {
          return duckDuckGoResult;
        }
      } catch (error) {
        console.log('DuckDuckGo search failed, trying alternative method:', error);
      }
      
      // Try Wikipedia API directly - most widely accessible
      try {
        const wikiResult = await WikipediaSearchProvider.search(query);
        if (wikiResult) {
          return wikiResult;
        }
      } catch (error) {
        console.log('Wikipedia search failed, trying fallback service:', error);
      }
      
      // Try with Deepseek as fallback
      try {
        const deepseekResult = await DeepseekSearchProvider.search(query);
        if (deepseekResult) {
          return deepseekResult;
        }
      } catch (error) {
        console.log('Deepseek search failed, using final fallback:', error);
      }
      
      // Try SimpleSearchService as the final fallback
      const simpleFallbackResult = await SimpleSearchService.searchForCityInfo(query);
      if (simpleFallbackResult) {
        return simpleFallbackResult;
      }
      
      // Ultimate fallback if all services fail
      return FallbackResponseGenerator.generateFallbackResponse(query);
    } catch (error) {
      console.error('Error in search services:', error);
      return FallbackResponseGenerator.useFallbackLocalService(query);
    }
  }
};
