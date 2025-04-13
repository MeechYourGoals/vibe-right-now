
import { SearchCoordinator } from './search';
import { extractCategories } from '@/services/VertexAI/analysis';
import { SearchService } from '@/services/search/SearchService';
import { OpenAIService } from '@/services/OpenAIService';
import { EventTrackingService } from '@/services/EventTrackingService';

/**
 * Handle general search queries and location-based queries
 * Now powered by OpenAI and tracked in Palantir
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  try {
    // Extract categories using Cloud Natural Language API
    const categories = await extractCategories(inputValue);
    console.log('Cloud Natural Language API extracted categories:', categories);
    
    // Store categories in session for later use
    if (categories.length > 0) {
      try {
        sessionStorage.setItem('nlpCategories', JSON.stringify(categories));
      } catch (e) {
        console.error('Error storing NLP categories in session:', e);
      }
    }
    
    // Track the search in Palantir Foundry
    try {
      await EventTrackingService.trackSearch({
        // In a real app, get from auth
        userId: sessionStorage.getItem('userId') || undefined,
        query: inputValue,
        categories,
        platform: 'web',
        provider: 'openai',
        // Add more context if available
        city: sessionStorage.getItem('selectedCity') || undefined
      });
    } catch (trackingError) {
      console.error('Error tracking search:', trackingError);
      // Continue with search even if tracking fails
    }
    
    // First, try using OpenAI directly
    try {
      console.log('Attempting search with OpenAI');
      const openAIResult = await SearchService.searchWithOpenAI(inputValue, categories);
      if (openAIResult) {
        console.log('Successfully retrieved information from OpenAI');
        
        // Update tracking with results count (approximate based on content)
        try {
          const resultsCount = Math.ceil(openAIResult.split('\n').filter(line => line.trim().length > 0).length / 2);
          await EventTrackingService.trackSearch({
            userId: sessionStorage.getItem('userId') || undefined,
            query: inputValue,
            categories,
            resultsCount,
            provider: 'openai',
          });
        } catch (error) {
          console.error('Error updating search tracking:', error);
        }
        
        return openAIResult;
      }
    } catch (openAIError) {
      console.error('Error using OpenAI for search:', openAIError);
    }
    
    // Fall back to our existing search coordinator
    try {
      const results = await SearchCoordinator.processSearchQuery(inputValue, paginationState, categories);
      
      // Track the results
      try {
        const resultsCount = results.split('\n').filter(line => line.trim().length > 0).length;
        await EventTrackingService.trackSearch({
          userId: sessionStorage.getItem('userId') || undefined,
          query: inputValue,
          categories,
          resultsCount,
          provider: 'fallback',
        });
      } catch (error) {
        console.error('Error updating search tracking:', error);
      }
      
      return results;
    } catch (error) {
      console.error('Error using processSearchQuery with categories, falling back to standard search:', error);
      return await SearchCoordinator.processSearchQuery(inputValue, paginationState);
    }
  } catch (error) {
    console.error('Error in search query handler with NLP:', error);
    // Fall back to regular search without NLP categories
    return SearchCoordinator.processSearchQuery(inputValue, paginationState);
  }
};
