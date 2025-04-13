
import { supabase } from '@/integrations/supabase/client';
import { Location } from '@/types';

/**
 * Interface for recommendations from Palantir AIP
 */
export interface PalantirRecommendation {
  id: string;
  type: 'venue' | 'event' | 'activity';
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
    city: string;
    state?: string;
  };
  score: number;
  confidence: number;
  relevance_factors: string[];
  timing: {
    best_time?: string;
    availability?: string[];
    recommended_duration?: string;
  };
  metadata: Record<string, any>;
}

/**
 * Service for interacting with Palantir AIP recommendations
 */
export class PalantirAIPService {
  /**
   * Get personalized venue recommendations for a user
   * @param userId The user ID
   * @param count The number of recommendations to get
   * @param context Additional context for recommendations
   * @returns Array of venue recommendations
   */
  static async getPersonalizedRecommendations(
    userId: string,
    count: number = 10,
    context?: {
      location?: { lat: number; lng: number };
      timeframe?: string;
      categories?: string[];
      city?: string;
    }
  ): Promise<Location[]> {
    try {
      console.log('Getting personalized recommendations for user:', userId);
      
      // In a production app, this would call a Palantir AIP endpoint
      // For now, we'll simulate the recommendation logic with a Supabase edge function
      
      const { data, error } = await supabase.functions.invoke('palantir-recommendations', {
        body: {
          action: 'get_recommendations',
          user_id: userId,
          count,
          context
        }
      });
      
      if (error) {
        console.error('Error getting recommendations:', error);
        throw error;
      }
      
      // Convert Palantir recommendations to Location objects
      return data?.recommendations?.map((rec: PalantirRecommendation) => ({
        id: rec.id,
        name: rec.name,
        address: rec.location.address || '',
        city: rec.location.city,
        state: rec.location.state || '',
        country: 'US', // Default
        lat: rec.location.lat,
        lng: rec.location.lng,
        type: mapRecommendationTypeToLocationType(rec.type),
        verified: true,
        vibes: rec.relevance_factors || []
      })) || [];
    } catch (error) {
      console.error('Error in getPersonalizedRecommendations:', error);
      return [];
    }
  }
  
  /**
   * Get trending locations based on Palantir's analysis
   * @param city Optional city filter
   * @param count Number of trending locations to return
   * @returns Array of trending locations
   */
  static async getTrendingLocations(city?: string, count: number = 5): Promise<Location[]> {
    try {
      console.log('Getting trending locations', city ? `for ${city}` : '');
      
      const { data, error } = await supabase.functions.invoke('palantir-recommendations', {
        body: {
          action: 'get_trending',
          city,
          count
        }
      });
      
      if (error) {
        console.error('Error getting trending locations:', error);
        throw error;
      }
      
      // Convert Palantir trending data to Location objects
      return data?.trending?.map((trend: PalantirRecommendation) => ({
        id: trend.id,
        name: trend.name,
        address: trend.location.address || '',
        city: trend.location.city,
        state: trend.location.state || '',
        country: 'US', // Default
        lat: trend.location.lat,
        lng: trend.location.lng,
        type: mapRecommendationTypeToLocationType(trend.type),
        verified: true,
        vibes: trend.relevance_factors || []
      })) || [];
    } catch (error) {
      console.error('Error in getTrendingLocations:', error);
      return [];
    }
  }
  
  /**
   * Get upcoming events based on Palantir's prediction model
   * @param userId Optional user ID for personalization
   * @param city Optional city filter
   * @param count Number of events to return
   * @returns Array of upcoming events as locations
   */
  static async getUpcomingEvents(userId?: string, city?: string, count: number = 5): Promise<Location[]> {
    try {
      console.log('Getting upcoming events', userId ? `for user ${userId}` : '', city ? `in ${city}` : '');
      
      const { data, error } = await supabase.functions.invoke('palantir-recommendations', {
        body: {
          action: 'get_events',
          user_id: userId,
          city,
          count
        }
      });
      
      if (error) {
        console.error('Error getting upcoming events:', error);
        throw error;
      }
      
      // Convert Palantir events data to Location objects
      return data?.events?.map((event: PalantirRecommendation) => ({
        id: event.id,
        name: event.name,
        address: event.location.address || '',
        city: event.location.city,
        state: event.location.state || '',
        country: 'US', // Default
        lat: event.location.lat,
        lng: event.location.lng,
        type: 'event',
        verified: true,
        vibes: event.relevance_factors || [],
        hours: { 
          event_time: event.timing.best_time || 'TBD'
        }
      })) || [];
    } catch (error) {
      console.error('Error in getUpcomingEvents:', error);
      return [];
    }
  }
}

/**
 * Maps Palantir recommendation types to Location types
 */
function mapRecommendationTypeToLocationType(type: string): "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" {
  switch (type) {
    case 'restaurant':
    case 'food':
      return 'restaurant';
    case 'bar':
    case 'nightlife':
      return 'bar';
    case 'event':
      return 'event';
    case 'attraction':
    case 'activity':
      return 'attraction';
    case 'sports':
      return 'sports';
    default:
      return 'other';
  }
}
