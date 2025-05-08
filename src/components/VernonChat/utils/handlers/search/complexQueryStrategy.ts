
import { SearchService } from '@/services/search/SearchService';
import { FallbackSearchStrategy } from './fallbackSearchStrategy';
import { VertexAIService } from '@/services/VertexAIService';

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
      
      // First try using Google's Vertex AI
      try {
        const vertexResult = await VertexAIService.searchWithVertex(query, categories);
        console.log('Vertex AI search completed');
        
        if (vertexResult && vertexResult.length > 100) {
          console.log('Vertex AI search returned good results');
          return vertexResult;
        }
      } catch (error) {
        console.error('Vertex AI search failed:', error);
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
