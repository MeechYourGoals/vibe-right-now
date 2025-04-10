import { SimpleSearchService } from './SimpleSearchService';
import { SwirlSearchService } from '../SwirlSearchService';
import { GeminiService } from '../GeminiService';
import { supabase } from '@/integrations/supabase/client';
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
      
      // First try vector search through Gemini API (most up-to-date info)
      try {
        console.log('Attempting vector search with Gemini');
        const vectorResult = await this.vectorSearch(query);
        
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
      } catch (vectorError) {
        console.log('Vector search failed, trying alternative methods:', vectorError);
      }
      
      // Try using Gemini directly for a conversational response with current information
      try {
        console.log('Attempting direct Gemini search');
        const geminiResult = await GeminiService.generateResponse(
          `Search the web for current information about: "${query}". 
           Provide specific, factual information about real places, events or attractions if applicable. 
           Include names, addresses, dates, times, and other relevant details.
           Focus on giving practical information that would help someone visit these places.`, 
          'user'
        );
        if (geminiResult && geminiResult.length > 100) {
          console.log('Gemini direct search successful, response length:', geminiResult.length);
          return geminiResult;
        }
      } catch (error) {
        console.log('Gemini search failed, trying alternative methods:', error);
      }
      
      // Try using Swirl (local search engine)
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
      } catch (error) {
        console.log('Swirl search failed, trying alternative methods:', error);
      }
      
      // Try other providers as fallbacks
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
    } catch (error) {
      console.error('Error in search services:', error);
      return FallbackResponseGenerator.useFallbackLocalService(query);
    }
  },
  
  /**
   * Perform a vector search using Supabase vector search capabilities
   * This connects to our Gemini-powered search function
   * @returns Object with results and categories or string with results
   */
  async vectorSearch(query: string): Promise<{results: string, categories: string[]} | string | null> {
    try {
      console.log('Invoking vector-search function with query:', query);
      // Call the vector-search edge function
      const { data, error } = await supabase.functions.invoke('vector-search', {
        body: { query }
      });
      
      if (error) {
        console.error('Error calling vector-search function:', error);
        return null;
      }
      
      if (!data) {
        console.log('No data from vector search');
        return null;
      }
      
      if (data.results) {
        console.log('Vector search returned results of length:', data.results.length);
        
        // If we have categories, return both results and categories
        if (data.categories) {
          console.log('Vector search returned categories:', data.categories);
          return {
            results: data.results,
            categories: data.categories
          };
        }
        
        // Otherwise just return the results string
        return data.results;
      }
      
      return null;
    } catch (error) {
      console.error('Error with vector search:', error);
      return null;
    }
  }
};
