
import { supabase } from '@/integrations/supabase/client';

/**
 * Event service using Google Places API (replaces Ticketmaster)
 */
export class EventService {
  /**
   * Search for events using Google Places API
   */
  static async searchEvents(location: string, query?: string): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          query: query ? `${query} events ${location}` : `events ${location}`,
          type: 'establishment'
        }
      });

      if (error) {
        console.error('Error calling Google Places for events:', error);
        return [];
      }

      return data?.results || [];
    } catch (error) {
      console.error('Error in event service:', error);
      return [];
    }
  }
}
