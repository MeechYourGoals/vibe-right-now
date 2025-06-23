
import { SimpleSearchService } from '../SimpleSearchService';
import { SwirlSearchService } from '@/services/SwirlSearchService';
import { PerplexityService } from '@/services/PerplexityService';
import {
  OpenAISearchProvider,
  GoogleSearchProvider,
  DuckDuckGoSearchProvider,
  WikipediaSearchProvider,
  DeepseekSearchProvider,
  FallbackResponseGenerator
} from './';
import { SearchServiceCore } from '../core/SearchServiceCore';

/**
 * Provides integrated search functionality by attempting multiple search providers
 */
export const IntegratedSearchProvider = {
  /**
   * Attempt to search using vector search
   * @param query The search query
   * @param categories Optional categories from Cloud Natural Language API
   */
  async attemptVectorSearch(query: string, categories?: string[]): Promise<string | null> {
    try {
      console.log('Attempting vector search with AI');
      if (categories && categories.length > 0) {
        console.log('With NLP categories:', categories);
      }
      
      const vectorResult = await SearchServiceCore.vectorSearch(query, categories);
      
      if (typeof vectorResult === 'object' && vectorResult !== null) {
        if (vectorResult.results && vectorResult.results.length > 100) {
          console.log('Vector search successful, response length:', vectorResult.results.length);
          return vectorResult.results;
        }
      } else if (typeof vectorResult === 'string' && vectorResult.length > 100) {
        console.log('Vector search successful, response length:', vectorResult.length);
        return vectorResult;
      }
      
      console.log('Vector search returned insufficient results, trying alternatives');
      return null;
    } catch (vectorError) {
      console.log('Vector search failed, trying alternative methods:', vectorError);
      return null;
    }
  },

  /**
   * Attempt to search using direct AI service
   * @param query The search query
   * @param categories Optional categories from Cloud Natural Language API
   */
  async attemptDirectAISearch(query: string, categories?: string[]): Promise<string | null> {
    try {
      console.log('Attempting direct Perplexity AI search');

      const effectiveQuery =
        categories && categories.length > 0
          ? this.enhanceQueryWithCategories(query, categories)
          : query;

      const aiResult = await PerplexityService.searchPerplexity(effectiveQuery);

      if (aiResult && aiResult.length > 100) {
        console.log('Perplexity direct search successful, response length:', aiResult.length);
        return aiResult;
      }

      return null;
    } catch (error) {
      console.log('Perplexity AI search failed, trying alternative methods:', error);
      return null;
    }
  },

  /**
   * Attempt to search using Swirl service
   */
  async attemptSwirlSearch(query: string): Promise<string | null> {
    try {
      // Check if Swirl is available
      const isSwirlAvailable = await SwirlSearchService.isAvailable();
      
      if (isSwirlAvailable) {
        console.log('Swirl is available, using it for search');
        const swirlResult = await SwirlSearchService.search(query);
        if (swirlResult && swirlResult.length > 100) {
          return swirlResult;
        }
      }
      return null;
    } catch (error) {
      console.log('Swirl search failed, trying alternative methods:', error);
      return null;
    }
  },

  /**
   * Attempt to search using all available search provider services
   */
  async attemptAllProviders(query: string): Promise<string | null> {
    try {
      const perplexityResult = await PerplexityService.searchPerplexity(query);
      if (perplexityResult && perplexityResult.length > 100) {
        return perplexityResult;
      }
    } catch (error) {
      console.log('Perplexity search failed, trying alternative methods:', error);
    }

    try {
      const openAIResult = await OpenAISearchProvider.search(query);
      if (openAIResult && openAIResult.length > 100) {
        return openAIResult;
      }
    } catch (error) {
      console.log('OpenAI search failed, trying alternative methods:', error);
    }
    
    try {
      const googleResult = await GoogleSearchProvider.search(query);
      if (googleResult && googleResult.length > 100) {
        return googleResult;
      }
    } catch (error) {
      console.log('Google search failed, trying next service:', error);
    }
    
    try {
      const duckDuckGoResult = await DuckDuckGoSearchProvider.search(query);
      if (duckDuckGoResult && duckDuckGoResult.length > 100) {
        return duckDuckGoResult;
      }
    } catch (error) {
      console.log('DuckDuckGo search failed, trying alternative method:', error);
    }
    
    try {
      const wikiResult = await WikipediaSearchProvider.search(query);
      if (wikiResult && wikiResult.length > 100) {
        return wikiResult;
      }
    } catch (error) {
      console.log('Wikipedia search failed, trying fallback service:', error);
    }
    
    try {
      const deepseekResult = await DeepseekSearchProvider.search(query);
      if (deepseekResult && deepseekResult.length > 100) {
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
  },
  
  /**
   * Helper method to enhance a query with NLP categories
   * Makes search more effective by providing context
   */
  enhanceQueryWithCategories(query: string, categories: string[]): string {
    if (!categories || categories.length === 0) {
      return query;
    }
    
    // Add category context to the query
    const categoryContext = categories
      .filter(cat => cat && cat.trim().length > 0)
      .join(', ');
      
    if (categoryContext) {
      return `${query} (Categories: ${categoryContext})`;
    }
    
    return query;
  }
};
