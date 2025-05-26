
import { supabase } from '@/integrations/supabase/client';

/**
 * Review service using Google Places API (replaces Yelp Fusion)
 */
export class ReviewService {
  /**
   * Get reviews for a place using Google Places API
   */
  static async getReviews(placeId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('google-places', {
        body: {
          placeId: placeId,
          fields: ['reviews', 'rating', 'user_ratings_total']
        }
      });

      if (error) {
        console.error('Error calling Google Places for reviews:', error);
        return [];
      }

      return data?.result?.reviews || [];
    } catch (error) {
      console.error('Error in review service:', error);
      return [];
    }
  }
}
