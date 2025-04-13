
import { supabase } from '@/integrations/supabase/client';

/**
 * EventTrackingService - Tracks user events and syncs them to Palantir Foundry
 */
export class EventTrackingService {
  /**
   * Track a check-in event
   * @param checkInData The check-in data
   */
  static async trackCheckIn(checkInData: {
    userId: string;
    venueId: string;
    venueName: string;
    venueType: string;
    venueLat: number;
    venueLng: number;
    venueCity: string;
    venueState?: string;
    hasReceipt?: boolean;
    pointsEarned?: number;
    distance?: string;
  }): Promise<void> {
    try {
      console.log('Tracking check-in event:', checkInData);
      
      // Send to Palantir sync function
      await supabase.functions.invoke('palantir-sync', {
        body: {
          event_type: 'check_in',
          data: checkInData,
          batch_mode: false
        }
      });
    } catch (error) {
      console.error('Error tracking check-in event:', error);
    }
  }
  
  /**
   * Track a search event
   * @param searchData The search data
   */
  static async trackSearch(searchData: {
    userId?: string;
    query: string;
    location?: { lat: number; lng: number } | null;
    categories?: string[];
    resultsCount?: number;
    platform?: string;
    provider?: string;
    city?: string;
    timeframe?: string;
  }): Promise<void> {
    try {
      console.log('Tracking search event:', searchData);
      
      // Send to Palantir sync function
      await supabase.functions.invoke('palantir-sync', {
        body: {
          event_type: 'search',
          data: searchData,
          batch_mode: false
        }
      });
    } catch (error) {
      console.error('Error tracking search event:', error);
    }
  }
  
  /**
   * Track an RSVP event
   * @param rsvpData The RSVP data
   */
  static async trackRSVP(rsvpData: {
    userId: string;
    eventId: string;
    eventName: string;
    eventType: string;
    venueId: string;
    response: 'going' | 'interested' | 'not_going';
    groupSize?: number;
    source?: string;
  }): Promise<void> {
    try {
      console.log('Tracking RSVP event:', rsvpData);
      
      // Send to Palantir sync function
      await supabase.functions.invoke('palantir-sync', {
        body: {
          event_type: 'rsvp',
          data: rsvpData,
          batch_mode: false
        }
      });
    } catch (error) {
      console.error('Error tracking RSVP event:', error);
    }
  }
  
  /**
   * Track a favorite event
   * @param favoriteData The favorite data
   */
  static async trackFavorite(favoriteData: {
    userId: string;
    venueId: string;
    venueName: string;
    venueType: string;
    action: 'add' | 'remove';
  }): Promise<void> {
    try {
      console.log('Tracking favorite event:', favoriteData);
      
      // Send to Palantir sync function
      await supabase.functions.invoke('palantir-sync', {
        body: {
          event_type: 'favorite',
          data: favoriteData,
          batch_mode: false
        }
      });
    } catch (error) {
      console.error('Error tracking favorite event:', error);
    }
  }
  
  /**
   * Track a batch of events
   * @param events The events to track
   */
  static async trackBatch(events: Array<{
    event_type: string;
    data: any;
  }>): Promise<void> {
    try {
      console.log(`Tracking batch of ${events.length} events`);
      
      // Send batch to Palantir sync function
      await supabase.functions.invoke('palantir-sync', {
        body: {
          batch_mode: true,
          events
        }
      });
    } catch (error) {
      console.error('Error tracking batch events:', error);
    }
  }
}
