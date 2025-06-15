
import { SearchStrategy, SearchOptions } from '../types';
import { SearchService } from '@/services/search/SearchService';
import { IntegratedSearchProvider } from '@/services/search/providers/IntegratedSearchProvider';

export class ComplexQueryStrategy implements SearchStrategy {
  canHandle(query: string): boolean {
    // Handle queries that are complex or don't fit other categories
    const hasMultipleTopics = this.countTopics(query) > 2;
    const isComplex = query.split(' ').length > 10;
    const hasSpecialRequirements = /compare|versus|vs|best|top|recommend/i.test(query);
    
    return hasMultipleTopics || isComplex || hasSpecialRequirements;
  }

  async execute(query: string, options?: SearchOptions): Promise<string> {
    console.log('Executing ComplexQueryStrategy for:', query);
    
    try {
      // Try vector search first
      const vectorResult = await IntegratedSearchProvider.attemptVectorSearch(
        query, 
        options?.includeCategories
      );
      
      if (vectorResult && vectorResult.length > 100) {
        return vectorResult;
      }

      // Try direct AI search
      const aiResult = await IntegratedSearchProvider.attemptDirectAISearch(
        query, 
        options?.includeCategories
      );
      
      if (aiResult && aiResult.length > 100) {
        return aiResult;
      }

      // Fallback to search service
      const searchResult = await SearchService.search(query);
      
      if (searchResult && searchResult.length > 100) {
        return searchResult;
      }
      
      return "I couldn't process that complex query. Please try breaking it down into simpler questions.";
    } catch (error) {
      console.error('ComplexQueryStrategy error:', error);
      throw error;
    }
  }

  getPriority(): number {
    return 3;
  }

  private countTopics(query: string): number {
    const topics = [
      /restaurant|dining|food|eat/i,
      /bar|pub|drink|cocktail/i,
      /event|show|concert|festival/i,
      /hotel|accommodation|stay/i,
      /attraction|museum|park|tour/i,
      /shopping|store|mall/i,
      /transport|uber|taxi|metro/i
    ];
    
    return topics.filter(topic => topic.test(query)).length;
  }
}
