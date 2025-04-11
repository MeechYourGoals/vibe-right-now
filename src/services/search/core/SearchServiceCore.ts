
import { supabase } from '@/integrations/supabase/client';

/**
 * Core search functionality using vector search and NLP
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
      
      // Store categories in session for later use in the explore page
      if (categories && categories.length > 0) {
        try {
          sessionStorage.setItem('lastSearchCategories', JSON.stringify(categories));
          sessionStorage.setItem('lastSearchQuery', query);
          sessionStorage.setItem('lastSearchTimestamp', new Date().toISOString());
        } catch (e) {
          console.error('Error storing NLP categories in session:', e);
        }
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
        // Return results with categories and keywords if available
        if (data.categories || data.keywords) {
          // Store any additional keywords in session for explore page
          if (data.keywords && data.keywords.length > 0) {
            try {
              sessionStorage.setItem('lastSearchKeywords', JSON.stringify(data.keywords));
            } catch (e) {
              console.error('Error storing keywords in session:', e);
            }
          }
          
          return {
            results: data.content,
            categories: data.categories || []
          };
        }
        return data.content;
      }
      
      return null;
    } catch (error) {
      console.error('Error in vector search:', error);
      return null;
    }
  },
  
  /**
   * Extract categories from search query using Google Cloud NLP
   * @param query The search query
   * @returns Array of categories
   */
  async extractCategories(query: string): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-nlp', {
        body: { text: query }
      });
      
      if (error) {
        console.error('Error calling Google NLP function:', error);
        return [];
      }
      
      if (data && data.categories && Array.isArray(data.categories)) {
        console.log('Extracted categories from Cloud NLP:', data.categories);
        return data.categories;
      }
      
      return [];
    } catch (error) {
      console.error('Error extracting categories with NLP:', error);
      return [];
    }
  },
  
  /**
   * Enhanced search that integrates NLP, vector search, and direct AI
   * @param query The search query
   * @returns Search results as formatted text
   */
  async enhancedSearch(query: string): Promise<string> {
    try {
      // First extract categories using Google Cloud NLP
      const categories = await this.extractCategories(query);
      
      // Then use these categories for vector search
      const vectorResult = await this.vectorSearch(query, categories);
      
      if (vectorResult) {
        if (typeof vectorResult === 'object' && vectorResult.results) {
          return vectorResult.results;
        } else if (typeof vectorResult === 'string') {
          return vectorResult;
        }
      }
      
      // Fall back to Vertex AI direct search if vector search fails
      const { data, error } = await supabase.functions.invoke('vertex-ai', {
        body: { 
          prompt: query,
          searchMode: true,
          categories: categories
        }
      });
      
      if (error) {
        console.error('Error calling Vertex AI search:', error);
        return `I couldn't find specific information about "${query}". Please try refining your search.`;
      }
      
      if (data && data.text) {
        return data.text;
      }
      
      return `I couldn't find specific information about "${query}". Please try refining your search.`;
    } catch (error) {
      console.error('Error in enhanced search:', error);
      return `I couldn't find specific information about "${query}". Please try refining your search.`;
    }
  }
};
