
import { SearchCoordinator } from './search';
import { extractCategories } from '@/services/VertexAI/analysis';
import { SearchService } from '@/services/search/SearchService';
import { getPrimaryProvider } from '@/services/MultiProviderSystem';

/**
 * Handle general search queries and location-based queries
 * Now powered by Cloud Natural Language API and MCP (Multiple Chat Providers)
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  try {
    // Check which provider is primary for search
    const primaryProvider = getPrimaryProvider('search');
    console.log('MCP: Using primary search provider:', primaryProvider?.name || 'None available');
    
    // Extract categories using Cloud Natural Language API
    const categories = await extractCategories(inputValue);
    console.log('MCP: Cloud Natural Language API extracted categories:', categories);
    
    // Store categories in session for later use
    if (categories.length > 0) {
      try {
        sessionStorage.setItem('nlpCategories', JSON.stringify(categories));
      } catch (e) {
        console.error('Error storing NLP categories in session:', e);
      }
    }
    
    // Process the search query with the categories using our MCP-enabled SearchService
    try {
      console.log('MCP: Searching with categories using MCP system');
      return await SearchService.search(inputValue, categories);
    } catch (error) {
      console.error('MCP: Error in SearchService with categories, falling back:', error);
      // Use the fallback coordinator we already have
      return await SearchCoordinator.processSearchQuery(inputValue, paginationState);
    }
  } catch (error) {
    console.error('MCP: Error in search query handler with NLP:', error);
    // Fall back to regular search without NLP categories
    return SearchCoordinator.processSearchQuery(inputValue, paginationState);
  }
};
