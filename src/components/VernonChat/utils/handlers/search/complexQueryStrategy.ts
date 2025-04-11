
import { SearchService } from '@/services/search/SearchService';
import { cleanResponseText } from '../../responseFormatter';

/**
 * Handles complex natural language queries
 */
export const ComplexQueryStrategy = {
  /**
   * Detects if a query is complex (multiple requirements, conditions, etc.)
   */
  isComplexQuery(inputValue: string): boolean {
    return inputValue.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(inputValue);
  },
  
  /**
   * Processes a complex query using vector search
   */
  async handleComplexSearch(inputValue: string): Promise<{response: string, categories: string[]}> {
    try {
      // Attempt with vector search for most up-to-date information
      const vectorSearchResult = await SearchService.vectorSearch(inputValue);
      
      let responseText = '';
      let categories: string[] = [];
      
      if (typeof vectorSearchResult === 'object' && vectorSearchResult !== null) {
        responseText = vectorSearchResult.results || '';
        categories = vectorSearchResult.categories || [];
        
        // Set categories in sessionStorage for the Explore page to use
        if (categories && categories.length > 0) {
          try {
            sessionStorage.setItem('lastSearchCategories', JSON.stringify(categories));
            sessionStorage.setItem('lastSearchQuery', inputValue);
            console.log('Set search categories in session storage:', categories);
          } catch (e) {
            console.error('Error setting categories in sessionStorage:', e);
          }
        }
      } else if (typeof vectorSearchResult === 'string') {
        responseText = vectorSearchResult;
      }
      
      console.log('Vector search successful, response length:', typeof responseText === 'string' ? responseText.length : 'object');
      console.log('Categories extracted:', categories);
      
      if (responseText && (typeof responseText === 'string' && responseText.length > 100)) {
        // Include a link to the Explore page for a better visual experience
        const exploreLinkText = "\n\nYou can also [view all these results on our Explore page](/explore?q=" + 
          encodeURIComponent(inputValue) + ") for a better visual experience.";
        return {
          response: cleanResponseText(responseText + exploreLinkText),
          categories
        };
      }
      
      console.log('Vector search returned insufficient response, trying other methods');
      return { response: '', categories: [] };
    } catch (vectorError) {
      console.error('Vector search failed:', vectorError);
      return { response: '', categories: [] };
    }
  }
};
