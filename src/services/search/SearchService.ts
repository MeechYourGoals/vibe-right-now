import { SimpleSearchService } from './SimpleSearchService';
import { SwirlSearchService } from '../SwirlSearchService';
import { GeminiService } from '../GeminiService';
import { VertexAIService } from '../VertexAIService';
import { supabase } from '@/integrations/supabase/client';
import { 
  OpenAISearchProvider,
  GoogleSearchProvider,
  DuckDuckGoSearchProvider,
  WikipediaSearchProvider,
  DeepseekSearchProvider,
  FallbackResponseGenerator
} from './providers';

// Flag to determine which AI service to use
const useVertexAI = false; // Default to Gemini, can be toggled in settings

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
      try {
        console.log('Attempting vector search with AI');
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
      
      // Try using AI directly for a conversational response with current information
      try {
        console.log(`Attempting direct ${useVertexAI ? 'Vertex AI' : 'Gemini'} search`);
        
        // Choose which AI service to use based on the flag
        let aiResult;
        if (useVertexAI) {
          aiResult = await VertexAIService.generateResponse(
            `Search the web for current information about: "${query}". 
             Provide specific, factual information about real places, events or attractions if applicable. 
             Include names, addresses, dates, times, and other relevant details.
             Focus on giving practical information that would help someone visit these places.`, 
            'user'
          );
        } else {
          aiResult = await GeminiService.generateResponse(
            `Search the web for current information about: "${query}". 
             Provide specific, factual information about real places, events or attractions if applicable. 
             Include names, addresses, dates, times, and other relevant details.
             Focus on giving practical information that would help someone visit these places.`, 
            'user'
          );
        }
        
        if (aiResult && aiResult.length > 100) {
          console.log(`${useVertexAI ? 'Vertex AI' : 'Gemini'} direct search successful, response length:`, aiResult.length);
          return aiResult;
        }
      } catch (error) {
        console.log(`${useVertexAI ? 'Vertex AI' : 'Gemini'} search failed, trying alternative methods:`, error);
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
   * Specialized search for comedy shows and events
   * @param query The search query about comedy shows
   * @returns Information about comedy shows in the area
   */
  async comedySearch(query: string): Promise<string> {
    try {
      console.log('Performing comedy-specific search for:', query);
      
      // Extract city information
      const cityMatch = query.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
      const city = cityMatch ? cityMatch[1] : '';
      
      // AI prompt specifically for comedy shows
      const comedyPrompt = `
        Find information about comedy shows, stand-up events, and comedy venues in ${city || 'the area mentioned'}. 
        Search the following sources:
        - PunchUp Live (https://punchup.live)
        - Funny Bone Comedy Club (https://funnybone.com)
        - The Improv (https://improv.com)
        - Live Nation Comedy (https://www.livenation.com/feature/comedy)
        - AEG Presents (https://www.aegpresents.com/tours/)
        - Icon Concerts (https://www.iconconcerts.com/events/)
        - Local comedy clubs in ${city || 'the mentioned area'}
        
        For each comedy show or venue, include:
        - Name of comedian or show
        - Venue name and address
        - Date and time
        - Ticket price range
        - Link to buy tickets
        - Brief description of the show or comedian
        
        Focus on upcoming shows within the next 2 weeks. Format your response in a clear, organized way.
      `;
      
      // Try using chosen AI service for comedy search first
      try {
        // Choose which AI service to use based on the flag
        let aiResult;
        if (useVertexAI) {
          aiResult = await VertexAIService.generateResponse(comedyPrompt, 'user');
        } else {
          aiResult = await GeminiService.generateResponse(comedyPrompt, 'user');
        }
        
        if (aiResult && aiResult.length > 100) {
          console.log(`${useVertexAI ? 'Vertex AI' : 'Gemini'} comedy search successful, response length:`, aiResult.length);
          return aiResult;
        }
      } catch (error) {
        console.log(`${useVertexAI ? 'Vertex AI' : 'Gemini'} comedy search failed, trying alternative methods:`, error);
      }
      
      // If AI fails, try extracting information from the vector search
      try {
        console.log('Attempting vector search for comedy shows');
        const enhancedQuery = `comedy shows stand-up events in ${city || 'this area'}`;
        const vectorResult = await this.vectorSearch(enhancedQuery);
        
        if (typeof vectorResult === 'object' && vectorResult !== null) {
          if (vectorResult.results && vectorResult.results.length > 100) {
            console.log('Vector search for comedy successful');
            return vectorResult.results;
          }
        } else if (typeof vectorResult === 'string' && vectorResult.length > 100) {
          return vectorResult;
        }
      } catch (vectorError) {
        console.log('Vector search for comedy failed:', vectorError);
      }
      
      // Fall back to general search with comedy-specific query
      return this.search(`upcoming comedy shows and stand-up events in ${city || 'this area'}`);
    } catch (error) {
      console.error('Error in comedy search:', error);
      return "I couldn't find specific information about comedy shows in that area. Please try searching for a specific city or comedy venue.";
    }
  },
  
  /**
   * Perform a vector search using Supabase vector search capabilities
   * This connects to our AI-powered search function
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
