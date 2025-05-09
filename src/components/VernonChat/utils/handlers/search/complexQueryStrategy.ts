
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { SwirlSearchService } from '@/services/SwirlSearchService';
import { HuggingFaceService } from '@/services/HuggingFaceService';

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
      
      // First try using HuggingFace for NLU and understanding
      try {
        const isAvailable = await HuggingFaceService.isAvailable();
        
        if (isAvailable) {
          console.log('Using HuggingFace transformers for query analysis');
          const { enhancedQuery, extractedEntities } = await HuggingFaceService.analyzeQuery(query);
          
          if (enhancedQuery && enhancedQuery !== query) {
            console.log('Query enhanced to:', enhancedQuery);
            query = enhancedQuery;
          }
          
          if (extractedEntities && extractedEntities.length > 0) {
            console.log('Extracted entities:', extractedEntities);
            // Add extracted entities to categories if possible
            categories = [...new Set([...categories, ...extractedEntities])];
          }
        }
      } catch (error) {
        console.error('HuggingFace analysis failed:', error);
      }
      
      // Try Swirl Search Service for web search
      try {
        const swirlAvailable = await SwirlSearchService.isAvailable();
        
        if (swirlAvailable) {
          console.log('Using Swirl search');
          const swirlResult = await SwirlSearchService.search(query);
          
          if (swirlResult && swirlResult.length > 100) {
            console.log('Swirl search returned good results');
            return swirlResult;
          }
        }
      } catch (error) {
        console.error('Swirl search failed:', error);
      }
      
      // Try standard search service as fallback
      try {
        const standardResults = await SearchService.search(query);
        console.log('Standard search completed');
        
        // Return whatever results we have
        return standardResults || FallbackSearchStrategy.generateFallbackResponse(query);
      } catch (error) {
        console.error('Standard search failed:', error);
        return FallbackSearchStrategy.generateFallbackResponse(query);
      }
    } catch (error) {
      console.error('Error in complex query handling:', error);
      return FallbackSearchStrategy.generateFallbackResponse(query);
    }
  }
}
