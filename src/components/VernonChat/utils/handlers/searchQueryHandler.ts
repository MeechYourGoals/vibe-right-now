
import { SearchCoordinator } from './search';
import { extractCategories } from '@/services/VertexAI/analysis';
import { SearchService } from '@/services/search/SearchService';
import { VertexAIService } from '@/services/VertexAIService';

/**
 * Handle general search queries and location-based queries
 * Now powered by Google Vertex AI
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  try {
    // Extract categories using Google Natural Language API
    const categories = await extractCategories(inputValue);
    console.log('Google NLP API extracted categories:', categories);
    
    // Store categories in session for later use
    if (categories.length > 0) {
      try {
        sessionStorage.setItem('nlpCategories', JSON.stringify(categories));
      } catch (e) {
        console.error('Error storing NLP categories in session:', e);
      }
    }
    
    // First, try using Google Vertex AI directly
    try {
      console.log('Attempting search with Google Vertex AI');
      const vertexResult = await callVertexAI(inputValue, categories);
      if (vertexResult) {
        console.log('Successfully retrieved information from Google Vertex AI');
        return vertexResult;
      }
    } catch (vertexError) {
      console.error('Error using Google Vertex AI for search:', vertexError);
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

/**
 * Call Google Vertex AI for search queries
 */
async function callVertexAI(query: string, categories: string[] = []): Promise<string> {
  try {
    const systemPrompt = `You are Vernon, a helpful AI assistant for the 'Vibe Right Now' app. 
    Your primary goal is to help users discover great places to go and things to do.
    You are knowledgeable about venues, events, restaurants, bars, attractions, and activities.
    Respond in a concise, informative, and enthusiastic tone. Be friendly and approachable.
    ${categories.length > 0 ? `Consider these relevant categories: ${categories.join(', ')}` : ''}`;
    
    const enhancedQuery = `
      Please provide real information about "${query}".
      Include:
      - Names of specific places or events
      - Actual addresses and locations if known
      - Opening hours and pricing when available
      - Any other helpful details
      
      Format your response in a clear, readable way.
    `;
    
    // Call VertexAI service
    return await VertexAIService.searchWithVertex(`${systemPrompt}\n\n${enhancedQuery}`);
  } catch (error) {
    console.error('Error calling Google Vertex AI:', error);
    throw error;
  }
}
