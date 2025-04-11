
import { supabase } from '@/integrations/supabase/client';

/**
 * Core search functionality using vector search
 */
export const SearchServiceCore = {
  /**
   * Perform vector search using Supabase
   * @param query The search query
   * @param categories Optional categories from Cloud Natural Language API
   */
  async vectorSearch(query: string, categories?: string[]): Promise<{results: string, categories: string[]} | string | null> {
    try {
      console.log('Performing vector search with:', query);
      if (categories && categories.length > 0) {
        console.log('With NLP categories:', categories);
      }
      
      // Call vector search edge function
      const { data, error } = await supabase.functions.invoke('vector-search', {
        body: { 
          query,
          categories: categories || [] // Pass categories to the edge function
        }
      });
      
      if (error) {
        console.error('Vector search function error:', error);
        return null;
      }
      
      if (data && data.content) {
        // Return results with categories if available
        if (data.categories) {
          return {
            results: data.content,
            categories: data.categories
          };
        }
        return data.content;
      }
      
      return null;
    } catch (error) {
      console.error('Error in vector search:', error);
      return null;
    }
  }
};
