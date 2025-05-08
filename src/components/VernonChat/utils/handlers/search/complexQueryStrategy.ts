
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';

/**
 * Strategy for handling complex queries that may require multiple search approaches
 */
export class ComplexQueryStrategy {
  /**
   * Determine if the query is complex enough to warrant special handling
   */
  static isComplexQuery(query: string): boolean {
    // Complex queries typically have multiple parts or specific filters
    return (
      query.length > 15 &&
      (query.includes("near") ||
       query.includes("around") ||
       query.includes("in") ||
       query.includes("at") ||
       query.includes("with") ||
       query.includes("that") ||
       query.includes("where") ||
       query.includes("who") ||
       query.includes("what") ||
       query.includes("when") ||
       query.split(" ").length > 4)
    );
  }

  /**
   * Handle complex search queries by combining vector and keyword searches
   */
  static async handleComplexQuery(
    query: string,
    paginationState: Record<string, number> = {},
    categories: string[] = []
  ): Promise<string> {
    try {
      console.log('Handling complex query with categories:', categories);
      
      // First try a vector search with semantic understanding
      let vectorSearchResult = null;
      try {
        vectorSearchResult = await SearchService.vectorSearch(query);
        console.log('Vector search completed');
      } catch (error) {
        console.error('Vector search failed:', error);
      }
      
      // If vector search succeeded and returned meaningful results, use them
      if (vectorSearchResult && vectorSearchResult.length > 100) {
        console.log('Vector search returned good results');
        return vectorSearchResult;
      }
      
      // Try standard search service as fallback
      try {
        const standardResults = await SearchService.search(query);
        console.log('Standard search completed');
        
        // If both vector and standard search returned results, combine them
        if (vectorSearchResult && standardResults) {
          return `Based on your query "${query}", I found:\n\n${vectorSearchResult}\n\nAdditionally:\n\n${standardResults}`;
        }
        
        // Use whichever results we have
        return standardResults || vectorSearchResult || FallbackSearchStrategy.generateFallbackResponse(query);
      } catch (error) {
        console.error('Standard search failed:', error);
        return vectorSearchResult || FallbackSearchStrategy.generateFallbackResponse(query);
      }
    } catch (error) {
      console.error('Error in complex query handling:', error);
      return FallbackSearchStrategy.generateFallbackResponse(query);
    }
  }
}
