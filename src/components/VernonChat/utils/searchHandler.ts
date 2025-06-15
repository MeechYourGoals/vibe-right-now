
import { SearchCoordinator } from './handlers/search';
import { extractCategories } from '@/services/VertexAI/analysis';

/**
 * Handle general search queries and location-based queries
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  try {
    const categories = await extractCategories(inputValue);
    console.log('Extracted categories from query:', categories);
    
    if (categories.length > 0) {
      try {
        sessionStorage.setItem('nlpCategories', JSON.stringify(categories));
      } catch (e) {
        console.error('Error storing NLP categories in session:', e);
      }
    }
    
    // Use the new SearchCoordinator with consolidated strategies
    const result = await SearchCoordinator.search(inputValue, {
      priorityStrategy: 'google',
      includeCategories: categories,
      paginationState
    });
    
    return result;
  } catch (error) {
    console.error('Error in search query handler:', error);
    return "I'm having trouble processing your search right now. Please try again.";
  }
};
