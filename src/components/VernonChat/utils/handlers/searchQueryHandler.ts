
import { SearchCoordinator } from './search';
import { extractCategories } from '@/services/VertexAI/analysis';
import { SearchService } from '@/services/search/SearchService';
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Handle general search queries and location-based queries
 * Now powered by Vertex AI / Gemini
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  try {
    // Extract categories using Cloud Natural Language API
    const categories = await extractCategories(inputValue);
    console.log('Extracted categories from query:', categories);
    
    // Store categories in session for later use
    if (categories.length > 0) {
      try {
        sessionStorage.setItem('nlpCategories', JSON.stringify(categories));
      } catch (e) {
        console.error('Error storing NLP categories in session:', e);
      }
    }
    
    // Use the SearchCoordinator to manage different search strategies
    try {
      console.log('Using SearchCoordinator for intelligent search');
      const result = await SearchCoordinator.search(inputValue, {
        priorityStrategy: 'google', // Prefer Google's AI
        includeCategories: categories
      });
      
      if (result) {
        return result;
      }
    } catch (searchError) {
      console.error('Error using SearchCoordinator:', searchError);
    }
    
    // Direct fallback to Vertex AI
    try {
      console.log('Attempting direct search with Vertex AI');
      const vertexResult = await VertexAIService.searchWithVertex(inputValue, categories);
      if (vertexResult) {
        console.log('Successfully retrieved information from Vertex AI');
        return vertexResult;
      }
    } catch (vertexError) {
      console.error('Error using Vertex AI for search:', vertexError);
    }
    
    // Final fallback to SearchService
    console.log('All AI search methods failed, falling back to SearchService');
    try {
      return await SearchService.search(inputValue);
    } catch (error) {
      console.error('Error using SearchService with categories, falling back to standard search:', error);
      return await SearchService.search(inputValue);
    }
  } catch (error) {
    console.error('Error in search query handler with NLP:', error);
    // Ultimate fallback without any NLP categories
    return SearchService.search(inputValue);
  }
};
