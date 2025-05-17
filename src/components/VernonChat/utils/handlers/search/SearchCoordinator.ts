
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { LocalDataStrategy } from './localDataStrategy';
import { ComplexQueryStrategy } from './complexQueryStrategy';
import { ComedySearchStrategy } from './comedySearchStrategy';
import { LocationSearchStrategy } from './locationSearchStrategy';
import { supabase } from '@/integrations/supabase/client';

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

/**
 * Central coordinator for all search strategies
 * Now with Google Cloud NLP integration support
 */
export class SearchCoordinator {
  static async performWebSearch(query: string): Promise<SearchResult[]> {
    // Placeholder for actual web search implementation
    console.log('Performing web search for:', query);
    return [
      {
        title: 'Mock Result 1',
        link: 'https://example.com/result1',
        snippet: 'This is a mock search result for testing purposes.'
      },
      {
        title: 'Mock Result 2',
        link: 'https://example.com/result2',
        snippet: 'Another mock result to simulate web search output.'
      }
    ];
  }

  static async summarizeSearchResults(query: string, results: SearchResult[]): Promise<string> {
    // Placeholder for actual summarization implementation
    console.log('Summarizing search results for:', query);
    return `Summary of search results for "${query}":\n` +
           results.map(result => `- ${result.title}: ${result.snippet}`).join('\n');
  }

  /**
   * Process a search query and return results
   * @param inputValue The search query
   * @param paginationState Pagination state for paginated results
   * @param categories Optional categories from Google Cloud NLP API
   */
  static async processSearchQuery(
    inputValue: string, 
    paginationState: Record<string, number> = {}, 
    categories: string[] = []
  ): Promise<string> {
    try {
      console.log('Processing search query:', inputValue);
      
      // Try using the vertex-ai function directly for search
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: inputValue,
          mode: 'search',
          model: 'gemini-1.5-pro'
        }
      });
      
      if (error) {
        console.error("Error calling vertex-ai function for search:", error);
        throw error;
      }
      
      if (data && data.text) {
        return data.text;
      }
      
      throw new Error("No search results received");
    } catch (error) {
      console.error('Search coordinator error:', error);
      
      // Fall back to regular search strategies
      if (LocationSearchStrategy.isLocationQuery(inputValue)) {
        console.log('Using location search strategy');
        try {
          const locationResult = await LocationSearchStrategy.handleLocationSearch(inputValue);
          if (locationResult && locationResult.response && locationResult.response.length > 50) {
            return locationResult.response;
          }
        } catch (locationError) {
          console.error('Location search error:', locationError);
        }
      }
      
      // Final fallback
      return FallbackSearchStrategy.generateFallbackResponse(inputValue);
    }
  }

  /**
   * Search for information using Google services
   * @param query Search query text
   * @returns Search results formatted as a string
   */
  static async search(query: string): Promise<string> {
    try {
      return await this.processSearchQuery(query);
    } catch (error) {
      console.error('Error in search coordinator:', error);
      return `I couldn't find information about "${query}". Please try a different search or ask another question.`;
    }
  }
}

export default SearchCoordinator;
