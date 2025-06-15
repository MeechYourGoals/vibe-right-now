
import { SearchStrategy, SearchOptions } from '../types';

export class FallbackSearchStrategy implements SearchStrategy {
  canHandle(query: string): boolean {
    return true; // Always can handle as fallback
  }

  async execute(query: string, options?: SearchOptions): Promise<string> {
    console.log('Executing FallbackSearchStrategy for:', query);
    
    // Extract key topics from the query
    const topics = this.extractTopics(query);
    
    // Generate a helpful response based on detected topics
    return this.generateFallbackResponse(query, topics);
  }

  getPriority(): number {
    return 999; // Lowest priority
  }

  private extractTopics(query: string): string[] {
    const topics: string[] = [];
    
    // Check for cities
    const cityPattern = /\b(chicago|new york|los angeles|san francisco|miami|austin|seattle|boston|atlanta|nashville|denver|portland|dallas|houston)\b/gi;
    const cityMatches = query.match(cityPattern);
    if (cityMatches) {
      topics.push(...cityMatches);
    }
    
    // Check for types of venues
    const venuePattern = /\b(restaurants?|bars?|clubs?|museums?|theaters?|parks?|cafes?|coffee shops?|concerts?|festivals?|shows?|events?)\b/gi;
    const venueMatches = query.match(venuePattern);
    if (venueMatches) {
      topics.push(...venueMatches);
    }
    
    // Check for cuisines
    const cuisinePattern = /\b(italian|mexican|chinese|japanese|thai|indian|french|greek|spanish|mediterranean|vegan|vegetarian|seafood|steak)\b/gi;
    const cuisineMatches = query.match(cuisinePattern);
    if (cuisineMatches) {
      topics.push(...cuisineMatches);
    }
    
    return Array.from(new Set(topics.map(t => t.toLowerCase())));
  }

  private generateFallbackResponse(query: string, topics: string[]): string {
    if (topics.length === 0) {
      return `I don't have specific information about "${query}" at the moment. Could you try rephrasing your question or asking about something more specific?`;
    }
    
    const locationPatterns = ["in", "near", "around", "close to"];
    const hasLocation = locationPatterns.some(pattern => query.includes(pattern));
    
    if (hasLocation) {
      return `I'd be happy to help you find information about ${topics.join(", ")}. While I don't have real-time data available right now, I suggest checking popular apps like Yelp, Google Maps, or Eventbrite for the most up-to-date information. You can also try asking me again later.`;
    }
    
    return `I'd like to help you find information about ${topics.join(", ")}. While I can't access specific details at the moment, you might want to try a more specific question including location details (like city or neighborhood) or time frame. You can also check dedicated apps for the most current information.`;
  }
}
