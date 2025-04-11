
import { SearchService } from '@/services/search/SearchService';

/**
 * Strategy for handling complex search queries with multiple parameters
 * Now enhanced with Cloud Natural Language API support
 */
export const ComplexQueryStrategy = {
  /**
   * Determine if a query is complex based on various criteria
   */
  isComplexQuery(query: string): boolean {
    const hasMultipleKeywords = 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
    
    const hasQuestionWords = 
      /\b(what|where|when|how|which|why|who)\b/i.test(query);
    
    const isLongQuery = query.length > 50;
    
    return hasMultipleKeywords || hasQuestionWords || isLongQuery;
  },
  
  /**
   * Handle complex queries with integrated search service
   * @param query The complex search query
   * @param paginationState Current pagination state
   * @param categories Optional categories extracted by NLP
   */
  async handleComplexQuery(
    query: string, 
    paginationState: Record<string, number> = {},
    categories: string[] = []
  ): Promise<string> {
    console.log('Handling complex query with AI-powered search:', query);
    console.log('Using NLP categories:', categories);
    
    try {
      // Try vector search first, which now includes the NLP-derived categories
      const vectorSearchResult = await SearchService.vectorSearch(query);
      
      if (typeof vectorSearchResult === 'object' && vectorSearchResult !== null) {
        // If we have a structured result with categories
        const combinedCategories = [...new Set([
          ...(vectorSearchResult.categories || []),
          ...categories
        ])];
        
        console.log('Combined search categories:', combinedCategories);
        
        // Store enhanced categories in session
        try {
          sessionStorage.setItem('lastSearchCategories', JSON.stringify(combinedCategories));
          sessionStorage.setItem('lastSearchQuery', query);
        } catch (e) {
          console.error('Error storing combined categories in session:', e);
        }
        
        return vectorSearchResult.results;
      } else if (typeof vectorSearchResult === 'string' && vectorSearchResult.length > 0) {
        return vectorSearchResult;
      }
      
      // If vector search didn't return useful results, use generalized search
      return await SearchService.search(query);
    } catch (error) {
      console.error('Error in handleComplexQuery:', error);
      
      // Fallback response
      return `I couldn't find specific information about "${query}". Could you try rephrasing your question?`;
    }
  }
};
