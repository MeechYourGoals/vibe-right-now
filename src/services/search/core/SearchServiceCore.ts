import { supabase } from '@/integrations/supabase/client';

/**
 * Core search functionality used by the search service
 */
export const SearchServiceCore = {
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
