
import { generateEventsResponse, getCitySpecificEvent, getEventWebsite } from './eventService';
import { Location } from '@/types';
import { VertexAIService } from '@/services/VertexAIService';

export type SearchResponse = {
  type: 'ai' | 'location' | 'event';
  content: string;
  items?: Location[];
};

export class SimpleSearchService {
  static async search(query: string, location?: string): Promise<SearchResponse> {
    if (!query) {
      return { 
        type: 'ai', 
        content: 'Please enter a search query.' 
      };
    }
    
    // Detect what kind of search this is
    if (this.isEventQuery(query)) {
      const eventsResponse = await this.generateEventResponse(query, location);
      return {
        type: 'event',
        content: eventsResponse
      };
    }
    
    if (this.isLocationQuery(query)) {
      const locationResponse = await this.generateLocationResponse(query, location);
      return {
        type: 'location',
        content: locationResponse
      };
    }
    
    // Default to AI response
    return {
      type: 'ai',
      content: await this.getAIResponse(query, location)
    };
  }
  
  private static isEventQuery(query: string): boolean {
    const eventKeywords = [
      'event', 'show', 'concert', 'performance', 'game', 'match',
      'festival', 'play', 'theater', 'theatre', 'musical', 'comedy',
      'standup', 'stand-up', 'movie', 'screening', 'premiere'
    ];
    
    const lowerQuery = query.toLowerCase();
    return eventKeywords.some(keyword => lowerQuery.includes(keyword));
  }
  
  private static isLocationQuery(query: string): boolean {
    const locationKeywords = [
      'where', 'place', 'restaurant', 'bar', 'club', 'cafe', 'hotel',
      'park', 'museum', 'gallery', 'store', 'shop', 'mall', 'center',
      'theatre', 'theater', 'cinema', 'stadium', 'arena'
    ];
    
    const lowerQuery = query.toLowerCase();
    return locationKeywords.some(keyword => lowerQuery.includes(keyword));
  }
  
  private static async getAIResponse(query: string, location?: string): Promise<string> {
    try {
      let aiPrompt = query;
      
      if (location) {
        aiPrompt = `[Looking in ${location}] ${query}`;
      }
      
      return await VertexAIService.generateText(aiPrompt, [], {
        temperature: 0.7,
        maxTokens: 300
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "I'm sorry, I couldn't process your request right now.";
    }
  }
  
  private static async generateEventResponse(query: string, location?: string): Promise<string> {
    try {
      let eventQuery = query;
      
      if (location) {
        eventQuery = `${query} in ${location}`;
      }
      
      return await generateEventsResponse(eventQuery);
    } catch (error) {
      console.error('Error generating event response:', error);
      return "I couldn't find specific events matching your query.";
    }
  }
  
  private static async generateLocationResponse(query: string, location?: string): Promise<string> {
    try {
      let locationQuery = query;
      
      if (location) {
        locationQuery = `${query} in ${location}`;
      }
      
      const response = await VertexAIService.searchWithVertex(locationQuery, {
        city: location
      });
      
      return response;
    } catch (error) {
      console.error('Error generating location response:', error);
      return "I couldn't find specific locations matching your query.";
    }
  }
}
