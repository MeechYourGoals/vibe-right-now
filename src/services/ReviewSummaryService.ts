
import { supabase } from '@/integrations/supabase/client';

interface Review {
  author_name?: string;
  rating?: number;
  text: string;
  time?: number;
}

interface SummaryResponse {
  summary?: string;
  error?: string;
}

export class ReviewSummaryService {
  /**
   * Generate an AI summary of reviews for a location
   * @param reviews Array of review objects
   * @param placeName The name of the place being reviewed
   * @returns A summary of the reviews
   */
  static async generateSummary(reviews: Review[], placeName: string): Promise<string> {
    try {
      console.log(`Generating summary for ${placeName} with ${reviews.length} reviews`);
      
      if (!reviews || reviews.length === 0) {
        return "No reviews available to summarize.";
      }

      // Process reviews to ensure they have the required fields
      const processedReviews = reviews.map(review => ({
        text: review.text || "",
        rating: review.rating || 0
      }));

      // Call the Supabase Edge Function to generate a summary
      const { data, error } = await supabase.functions.invoke<SummaryResponse>('gemini-summarize', {
        body: {
          reviews: processedReviews,
          placeName
        }
      });

      if (error) {
        console.error('Error calling review summary function:', error);
        throw new Error(`Failed to generate summary: ${error.message}`);
      }

      if (!data || data.error) {
        throw new Error(data?.error || 'Unknown error generating summary');
      }

      return data.summary || "Unable to generate a summary from the available reviews.";
    } catch (error) {
      console.error('Error in review summary service:', error);
      return "Error generating review summary. Please try again later.";
    }
  }

  /**
   * Cache the review summary for a location in local storage
   * @param locationId Unique identifier for the location
   * @param summary The generated summary
   */
  static cacheSummary(locationId: string, summary: string): void {
    try {
      const cache = {
        summary,
        timestamp: Date.now()
      };
      localStorage.setItem(`review_summary_${locationId}`, JSON.stringify(cache));
    } catch (error) {
      console.error('Error caching summary:', error);
    }
  }

  /**
   * Get a cached summary if available and not expired
   * @param locationId Unique identifier for the location
   * @param maxAgeMs Maximum age in milliseconds (default: 24 hours)
   * @returns The cached summary or null if not available/expired
   */
  static getCachedSummary(locationId: string, maxAgeMs = 24 * 60 * 60 * 1000): string | null {
    try {
      const cacheJson = localStorage.getItem(`review_summary_${locationId}`);
      if (!cacheJson) return null;

      const cache = JSON.parse(cacheJson);
      const isExpired = Date.now() - cache.timestamp > maxAgeMs;

      return isExpired ? null : cache.summary;
    } catch (error) {
      console.error('Error retrieving cached summary:', error);
      return null;
    }
  }
}
