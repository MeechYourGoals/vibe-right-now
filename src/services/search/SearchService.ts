
import { GoogleAIService } from '@/services/GoogleAIService';

export class SearchService {
  static async search(query: string): Promise<string> {
    try {
      console.log('Performing search for:', query);
      
      // Use Google's search capabilities through GoogleAIService (Vertex AI)
      const searchResult = await this.performGoogleSearch(query);
      
      if (searchResult) {
        return searchResult;
      }
      
      return `I searched for "${query}" but couldn't find specific results. Please try rephrasing your question.`;
    } catch (error) {
      console.error('Error in SearchService:', error);
      return `I encountered an error while searching for "${query}". Please try again later.`;
    }
  }

  static async vectorSearch(query: string): Promise<string> {
    // Fallback to regular search for now
    return this.search(query);
  }

  static async comedySearch(query: string): Promise<string> {
    // Specialized comedy search using Google
    return this.search(`comedy shows events ${query}`);
  }

  private static async performGoogleSearch(query: string): Promise<string | null> {
    try {
      // Call GoogleAIService.search() which handles Vertex AI
      const result = await GoogleAIService.search(query);
      return result; // GoogleAIService.search already returns string | null
    } catch (error) {
      console.error('Error in performGoogleSearch calling GoogleAIService.search:', error);
      // Propagate null to let the calling function (search) handle the fallback message
      return null;
    }
  }
}
