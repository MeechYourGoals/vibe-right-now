
import { db } from '@/services/database';
import { VenueSentimentAnalysis, PlatformSentimentSummary, SentimentTheme } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export class SentimentAnalysisService {
  private static readonly CACHE_DURATION_DAYS = 30;

  static async getVenueSentiment(venueId: string): Promise<PlatformSentimentSummary[]> {
    try {
      const result = await db.sentiment.getVenueSentimentAnalysis(venueId);
      
      if (result.success && result.data) {
        return this.transformToSummary(result.data);
      }
      
      console.error('Error fetching venue sentiment:', result.error);
      return this.getMockSentimentData(venueId);
    } catch (error) {
      console.error('Error fetching venue sentiment:', error);
      return this.getMockSentimentData(venueId);
    }
  }

  static async updateVenueSentiment(
    venueId: string, 
    platform: string, 
    sentimentData: Partial<VenueSentimentAnalysis>
  ): Promise<VenueSentimentAnalysis | null> {
    try {
      const result = await db.sentiment.upsertVenueSentiment(venueId, platform, sentimentData);
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error updating venue sentiment:', error);
      return null;
    }
  }

  // Analyze reviews for a venue on a specific platform
  static async analyzeVenueReviews(
    venueId: string, 
    platform: string, 
    reviews: Array<{ id: string; text: string; }>
  ): Promise<VenueSentimentAnalysis | null> {
    try {
      const { data, error } = await supabase.functions.invoke('review-sentiment-analyzer', {
        body: {
          venue_id: venueId,
          platform: platform,
          reviews: reviews
        }
      });

      if (error) {
        console.error('Error calling sentiment analysis function:', error);
        return null;
      }

      return data?.analysis || null;
    } catch (error) {
      console.error('Error in sentiment analysis service:', error);
      return null;
    }
  }

  // Get sentiment analysis for a venue across all platforms
  static async getVenueSentimentAnalysis(venueId: string): Promise<VenueSentimentAnalysis[]> {
    try {
      const result = await db.sentiment.getVenueSentimentAnalysis(venueId);
      return result.success && result.data ? result.data : [];
    } catch (error) {
      console.error('Error in getVenueSentimentAnalysis:', error);
      return [];
    }
  }

  // Get formatted platform summaries for display
  static async getPlatformSentimentSummaries(venueId: string): Promise<PlatformSentimentSummary[]> {
    const analyses = await this.getVenueSentimentAnalysis(venueId);
    
    return analyses.map(analysis => ({
      platform: analysis.platform,
      overallSentiment: analysis.overall_sentiment,
      summary: analysis.sentiment_summary,
      themes: this.formatThemes(analysis.themes),
      reviewCount: analysis.review_count,
      lastUpdated: analysis.last_analyzed_at
    }));
  }

  // Format themes for display
  private static formatThemes(themes: Record<string, number>): SentimentTheme[] {
    return Object.entries(themes).map(([name, score]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      score,
      mentions: 1,
      examples: []
    }));
  }

  // Get sentiment summary for a specific platform
  static async getPlatformSentiment(venueId: string, platform: string): Promise<VenueSentimentAnalysis | null> {
    try {
      const result = await db.sentiment.getPlatformSentiment(venueId, platform);
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error in getPlatformSentiment:', error);
      return null;
    }
  }

  // Trigger analysis for mock data (for demo purposes)
  static async triggerMockAnalysis(venueId: string): Promise<void> {
    const mockReviews = {
      yelp: [
        { id: 'yelp_1', text: 'Amazing ambience and great service! The food was incredible and the staff was so friendly.' },
        { id: 'yelp_2', text: 'Love the atmosphere here but the music was too loud. Great cocktails though!' },
        { id: 'yelp_3', text: 'Perfect spot for date night. Romantic lighting and excellent wine selection.' }
      ],
      facebook: [
        { id: 'fb_1', text: 'Great place but very crowded. The ambience is nice but DJ was too loud for conversation.' },
        { id: 'fb_2', text: 'Fantastic food and service. Love coming here for brunch!' },
        { id: 'fb_3', text: 'Beautiful decor and atmosphere. Service could be faster but overall good experience.' }
      ],
      google: [
        { id: 'g_1', text: 'Excellent food quality and beautiful interior design. Staff is professional and friendly.' },
        { id: 'g_2', text: 'Great cocktails and nice atmosphere. Can get quite busy on weekends.' },
        { id: 'g_3', text: 'Love the vibe here! Perfect for celebrations. Food is consistently good.' }
      ]
    };

    for (const [platform, reviews] of Object.entries(mockReviews)) {
      await this.analyzeVenueReviews(venueId, platform, reviews);
    }
  }

  private static transformToSummary(data: VenueSentimentAnalysis[]): PlatformSentimentSummary[] {
    return data.map(item => ({
      platform: item.platform,
      overallSentiment: item.overall_sentiment,
      summary: item.sentiment_summary,
      themes: Object.entries(item.themes).map(([name, score]) => ({
        name,
        score,
        mentions: Math.floor(score * 10),
        examples: [`Sample review about ${name}`]
      })),
      reviewCount: item.review_count,
      lastUpdated: item.last_analyzed_at
    }));
  }

  private static getMockSentimentData(venueId: string): PlatformSentimentSummary[] {
    const platforms = ['Google', 'Yelp', 'TripAdvisor'];
    
    return platforms.map(platform => ({
      platform,
      overallSentiment: Math.random() * 2 - 1,
      summary: `Overall positive sentiment for ${platform} reviews`,
      themes: [
        { name: 'Ambience', score: 0.8, mentions: 45, examples: ['Great atmosphere', 'Love the vibe'] },
        { name: 'Service', score: 0.6, mentions: 32, examples: ['Friendly staff', 'Quick service'] },
        { name: 'Food Quality', score: 0.7, mentions: 28, examples: ['Delicious food', 'Fresh ingredients'] }
      ],
      reviewCount: Math.floor(Math.random() * 100) + 50,
      lastUpdated: new Date().toISOString()
    }));
  }

  static async cacheReviewSentiment(
    venueId: string,
    platform: string,
    reviewId: string,
    reviewText: string,
    sentimentScore: number,
    themes: Record<string, number>
  ): Promise<void> {
    try {
      await db.sentiment.cacheReviewSentiment(
        venueId,
        platform,
        reviewId,
        reviewText,
        sentimentScore,
        themes
      );
    } catch (error) {
      console.error('Error caching review sentiment:', error);
    }
  }

  static async getCachedReviewSentiment(
    venueId: string,
    platform: string,
    reviewId: string
  ) {
    try {
      const result = await db.sentiment.getCachedReviewSentiment(venueId, platform, reviewId);
      return result.success ? result.data : null;
    } catch (error) {
      console.error('Error fetching cached sentiment:', error);
      return null;
    }
  }

  static async cleanupExpiredCache(): Promise<void> {
    try {
      await db.sentiment.cleanupExpiredCache();
    } catch (error) {
      console.error('Error cleaning up expired cache:', error);
    }
  }
}

export default SentimentAnalysisService;
