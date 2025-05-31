
import { OpenAISearchProvider } from './openAISearchStrategy';
import { GoogleVertexProvider } from './googleVertexStrategy';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';

/**
 * Coordinates search strategies to get the best possible result
 */
export class SearchCoordinator {
  /**
   * Performs a search using all available search strategies
   * @param query The search query
   * @param options Optional search options
   * @returns The search result as text
   */
  static async search(query: string, options: { 
    priorityStrategy?: 'google' | 'openai' | 'auto',
    includeCategories?: string[]
  } = {}): Promise<string> {
    const { priorityStrategy = 'google', includeCategories = [] } = options;
    
    console.log(`SearchCoordinator searching for: "${query}" using ${priorityStrategy} priority`);
    
    try {
      // Try primary strategy first based on priority
      if (priorityStrategy === 'google' || priorityStrategy === 'auto') {
        try {
          console.log('Attempting Google Vertex search first');
          const result = await GoogleVertexProvider.search(query, includeCategories);
          if (result && result.length > 50) {
            console.log('Google Vertex search successful');
            return result;
          }
        } catch (err) {
          console.error('Google Vertex search failed, trying alternative:', err);
        }
      }
      
      // Try OpenAI if Google failed or if OpenAI was specified as priority
      if (priorityStrategy === 'openai' || priorityStrategy === 'auto') {
        try {
          console.log('Attempting OpenAI search');
          const result = await OpenAISearchProvider.search(query);
          if (result && result.length > 50) {
            console.log('OpenAI search successful');
            return result;
          }
        } catch (err) {
          console.error('OpenAI search failed, using fallback:', err);
        }
      }
      
      // If all else fails, use the fallback strategy
      console.log('Using fallback search strategy');
      return await FallbackSearchStrategy.search(query);
    } catch (error) {
      console.error('All search strategies failed:', error);
      return `I couldn't find specific information about "${query}". Please try asking in a different way.`;
    }
  }
}
