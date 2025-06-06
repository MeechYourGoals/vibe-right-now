import { supabase } from "@/integrations/supabase/client";

export interface VenueSentimentAnalysis {
  id: string;
  venue_id: string;
  platform: string;
  overall_sentiment: number;
  sentiment_summary: string;
  themes: Record<string, number>;
  review_count: number;
  last_analyzed_at: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewSentimentCache {
  id: string;
  review_id: string;
  platform: string;
  venue_id: string;
  review_text: string;
  sentiment_score: number;
  themes: Record<string, number>;
  analyzed_at: string;
  expires_at: string;
}

export const sentimentAnalysisService = {
  async getVenueSentimentAnalysis(venueId: string): Promise<VenueSentimentAnalysis[]> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId);

      if (error) {
        console.error('Error fetching venue sentiment analysis:', error);
        return [];
      }

      // Cast themes properly from Json to Record<string, number>
      return data.map(item => ({
        ...item,
        themes: (item.themes as any) || {}
      })) as VenueSentimentAnalysis[];
    } catch (error) {
      console.error('Error in getVenueSentimentAnalysis:', error);
      return [];
    }
  },

  async createVenueSentimentAnalysis(analysis: Omit<VenueSentimentAnalysis, 'id' | 'created_at' | 'updated_at'>): Promise<VenueSentimentAnalysis | null> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .insert([{
          venue_id: analysis.venue_id,
          platform: analysis.platform,
          overall_sentiment: analysis.overall_sentiment,
          sentiment_summary: analysis.sentiment_summary,
          themes: analysis.themes,
          review_count: analysis.review_count,
          last_analyzed_at: analysis.last_analyzed_at
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating venue sentiment analysis:', error);
        return null;
      }

      // Cast themes properly from Json to Record<string, number>
      return {
        ...data,
        themes: (data.themes as any) || {}
      } as VenueSentimentAnalysis;
    } catch (error) {
      console.error('Error in createVenueSentimentAnalysis:', error);
      return null;
    }
  },

  async getReviewSentimentCache(reviewId: string, platform: string): Promise<ReviewSentimentCache | null> {
    try {
      const { data, error } = await supabase
        .from('review_sentiment_cache')
        .select('*')
        .eq('review_id', reviewId)
        .eq('platform', platform)
        .single();

      if (error) {
        // If no data is found, it's not an error, just return null
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error('Error fetching review sentiment cache:', error);
        return null;
      }

      return data as ReviewSentimentCache;
    } catch (error) {
      console.error('Error in getReviewSentimentCache:', error);
      return null;
    }
  },

  async cacheReviewSentiment(cacheData: Omit<ReviewSentimentCache, 'id' | 'analyzed_at' | 'expires_at'>): Promise<ReviewSentimentCache | null> {
    try {
      const now = new Date();
      const expires_at = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); // Expires in 7 days

      const { data, error } = await supabase
        .from('review_sentiment_cache')
        .insert([{
          review_id: cacheData.review_id,
          platform: cacheData.platform,
          venue_id: cacheData.venue_id,
          review_text: cacheData.review_text,
          sentiment_score: cacheData.sentiment_score,
          themes: cacheData.themes,
          analyzed_at: now.toISOString(),
          expires_at: expires_at.toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error caching review sentiment:', error);
        return null;
      }

      return data as ReviewSentimentCache;
    } catch (error) {
      console.error('Error in cacheReviewSentiment:', error);
      return null;
    }
  },

  async clearExpiredCache(): Promise<void> {
    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from('review_sentiment_cache')
        .delete()
        .lt('expires_at', now);

      if (error) {
        console.error('Error clearing expired review sentiment cache:', error);
      } else {
        console.log('Expired review sentiment cache cleared successfully.');
      }
    } catch (error) {
      console.error('Error in clearExpiredCache:', error);
    }
  }
};
