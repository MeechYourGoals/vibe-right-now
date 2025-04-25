
import { VertexAIService } from '@/services/VertexAIService';
import { Location } from '@/types';
import { EventItem } from '@/components/venue/events/types';
import { generateComedyEvents } from '../eventService';

interface ComedySearchResult {
  events?: EventItem[];
  venues?: Location[];
  contextualResponse?: string;
}

export class ComedySearchService {
  private static locationCache: Record<string, Location[]> = {};
  private static eventCache: Record<string, EventItem[]> = {};
  
  public static async searchComedyInCity(city: string, state: string): Promise<ComedySearchResult> {
    const cacheKey = `${city.toLowerCase()}-${state.toLowerCase()}`;
    
    // Use cached results if available
    if (this.eventCache[cacheKey] && this.locationCache[cacheKey]) {
      return {
        events: this.eventCache[cacheKey],
        venues: this.locationCache[cacheKey]
      };
    }
    
    // Generate fresh comedy events for the location
    const events = generateComedyEvents(city, state);
    this.eventCache[cacheKey] = events;
    
    // For venues, we'll import from another utility that generates comedy clubs
    const venues = this.generateComedyVenues(city, state);
    this.locationCache[cacheKey] = venues;
    
    try {
      // Generate contextual response about comedy in this city
      const contextualPrompt = `Tell me about comedy shows and venues in ${city}, ${state}.`;
      const contextualResponse = await VertexAIService.searchWithVertex(contextualPrompt, { 
        city, 
        category: 'comedy' 
      });
      
      return {
        events,
        venues,
        contextualResponse
      };
    } catch (error) {
      console.error('Error fetching comedy contextual data:', error);
      // Return just the events and venues without the contextual response
      return { events, venues };
    }
  }
  
  public static async getComedianInfo(comedian: string): Promise<string> {
    try {
      const prompt = `Tell me about comedian ${comedian}, their style of comedy, and notable shows.`;
      
      return await VertexAIService.generateText(prompt, [], {
        temperature: 0.3, // Lower temperature for more factual responses
      });
    } catch (error) {
      console.error('Error fetching comedian info:', error);
      return `Information about ${comedian} is currently unavailable.`;
    }
  }
  
  private static generateComedyVenues(city: string, state: string): Location[] {
    // Generate mock comedy clubs for the specified city
    return [
      {
        id: `comedy-club-1-${city.toLowerCase()}`,
        name: `${city} Comedy Club`,
        address: '123 Laugh Avenue',
        city,
        state,
        zip: '12345',
        country: 'USA',
        lat: 40 + Math.random() * 5,
        lng: -75 - Math.random() * 5,
        type: 'comedy',
        verified: true,
        description: `The premier comedy venue in ${city} featuring both established and up-and-coming comedians.`,
        rating: 4.5 + Math.random() * 0.5,
        photos: [
          'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1000&auto=format&fit=crop'
        ]
      },
      {
        id: `comedy-club-2-${city.toLowerCase()}`,
        name: `The Laugh Factory ${city}`,
        address: '456 Improv Street',
        city,
        state,
        zip: '12346',
        country: 'USA',
        lat: 40 + Math.random() * 5,
        lng: -75 - Math.random() * 5,
        type: 'comedy',
        verified: true,
        description: `Home to the best stand-up comedy shows in ${city}. Shows every weekend with national headliners.`,
        rating: 4.3 + Math.random() * 0.6,
        photos: [
          'https://images.unsplash.com/photo-1517457210348-703079e57d4b?q=80&w=1000&auto=format&fit=crop'
        ]
      },
      {
        id: `comedy-club-3-${city.toLowerCase()}`,
        name: `Improv Theater ${city}`,
        address: '789 Comedy Boulevard',
        city,
        state,
        zip: '12347',
        country: 'USA',
        lat: 40 + Math.random() * 5,
        lng: -75 - Math.random() * 5,
        type: 'comedy',
        verified: Math.random() > 0.3,
        description: `Specializing in improv comedy shows and classes. Great for a night of laughs and surprises.`,
        rating: 4.0 + Math.random() * 0.8,
        photos: [
          'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1000&auto=format&fit=crop'
        ]
      }
    ];
  }
}
