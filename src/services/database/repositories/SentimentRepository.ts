
import { BaseRepository, DatabaseResult, PaginatedResult } from '../BaseRepository';

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
  venue_id: string;
  platform: string;
  review_id: string;
  review_text: string;
  sentiment_score: number;
  themes: Record<string, number>;
  analyzed_at: string;
  expires_at: string;
}

export class SentimentRepository extends BaseRepository {
  async getVenueSentimentAnalysis(venueId: string): Promise<PaginatedResult<VenueSentimentAnalysis>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId)
        .order('last_analyzed_at', { ascending: false });

      return { data: data as VenueSentimentAnalysis[] | null, error };
    }) as Promise<PaginatedResult<VenueSentimentAnalysis>>;
  }

  async upsertVenueSentiment(
    venueId: string,
    platform: string,
    sentimentData: Partial<VenueSentimentAnalysis>
  ): Promise<DatabaseResult<VenueSentimentAnalysis>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('venue_sentiment_analysis')
        .upsert({
          venue_id: venueId,
          platform,
          overall_sentiment: sentimentData.overall_sentiment || 0,
          sentiment_summary: sentimentData.sentiment_summary || '',
          themes: sentimentData.themes || {},
          review_count: sentimentData.review_count || 0,
          last_analyzed_at: new Date().toISOString()
        })
        .select()
        .single();

      return { data: data as VenueSentimentAnalysis | null, error };
    });
  }

  async getPlatformSentiment(venueId: string, platform: string): Promise<DatabaseResult<VenueSentimentAnalysis>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId)
        .eq('platform', platform)
        .maybeSingle();

      return { data: data as VenueSentimentAnalysis | null, error };
    });
  }

  async cacheReviewSentiment(
    venueId: string,
    platform: string,
    reviewId: string,
    reviewText: string,
    sentimentScore: number,
    themes: Record<string, number>
  ): Promise<DatabaseResult<ReviewSentimentCache>> {
    return this.executeQuery(async () => {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const { data, error } = await this.supabase
        .from('review_sentiment_cache')
        .upsert({
          venue_id: venueId,
          platform,
          review_id: reviewId,
          review_text: reviewText,
          sentiment_score: sentimentScore,
          themes,
          expires_at: expiresAt.toISOString()
        })
        .select()
        .single();

      return { data: data as ReviewSentimentCache | null, error };
    });
  }

  async getCachedReviewSentiment(
    venueId: string,
    platform: string,
    reviewId: string
  ): Promise<DatabaseResult<ReviewSentimentCache>> {
    return this.executeQuery(async () => {
      const { data, error } = await this.supabase
        .from('review_sentiment_cache')
        .select('*')
        .eq('venue_id', venueId)
        .eq('platform', platform)
        .eq('review_id', reviewId)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      return { data: data as ReviewSentimentCache | null, error };
    });
  }

  async cleanupExpiredCache(): Promise<DatabaseResult<void>> {
    return this.executeQuery(async () => {
      const { error } = await this.supabase.rpc('cleanup_expired_reviews');
      return { data: null, error };
    });
  }
}
