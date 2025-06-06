
import { supabase } from "@/integrations/supabase/client";
import { VenueSentimentAnalysis, PlatformSentimentSummary, SentimentTheme } from "@/types";

export class SentimentAnalysisService {
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
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId)
        .order('last_analyzed_at', { ascending: false });

      if (error) {
        console.error('Error fetching sentiment analysis:', error);
        return [];
      }

      return data || [];
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
      mentions: 1, // Simplified for now
      examples: [] // Could be enhanced to include example phrases
    }));
  }

  // Get sentiment summary for a specific platform
  static async getPlatformSentiment(venueId: string, platform: string): Promise<VenueSentimentAnalysis | null> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId)
        .eq('platform', platform)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching platform sentiment:', error);
        return null;
      }

      return data || null;
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

    // Trigger analysis for each platform
    for (const [platform, reviews] of Object.entries(mockReviews)) {
      await this.analyzeVenueReviews(venueId, platform, reviews);
    }
  }
}
