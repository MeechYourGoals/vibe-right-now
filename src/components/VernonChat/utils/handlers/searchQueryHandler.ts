
import { SearchCoordinator } from './search';
import { extractCategories } from '@/services/VertexAI/analysis';
import { SearchService } from '@/services/search/SearchService';
import { OpenAIService } from '@/services/OpenAIService';

/**
 * Handle general search queries and location-based queries
 * Now powered by OpenAI
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
    
    // First, try using OpenAI directly
    try {
      console.log('Attempting search with OpenAI');
      const openAIResult = await SearchService.searchWithOpenAI(inputValue, categories);
      if (openAIResult) {
        console.log('Successfully retrieved information from OpenAI');
        return openAIResult;
      }
    } catch (openAIError) {
      console.error('Error using OpenAI for search:', openAIError);
    }
    
    // Fall back to our existing search coordinator
    try {
      return await SearchCoordinator.processSearchQuery(inputValue, paginationState, categories);
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
