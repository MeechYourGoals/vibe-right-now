
import { supabase } from '@/integrations/supabase/client';
import { VenueSentimentAnalysis } from '@/types';

export interface ReviewData {
  text: string;
  rating: number;
  source: string;
  timestamp: string;
}

export interface SentimentResult {
  sentiment: number;
  themes: Record<string, number>;
  summary: string;
}

export class SentimentAnalysisService {
  static async analyzeVenueSentiment(
    venueId: string,
    reviews: ReviewData[]
  ): Promise<SentimentResult> {
    try {
      // Simple sentiment analysis based on ratings and keywords
      const totalReviews = reviews.length;
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
      
      // Convert 1-5 rating to -1 to 1 sentiment score
      const sentiment = (avgRating - 3) / 2;
      
      // Extract themes from review text
      const themes = this.extractThemes(reviews);
      
      // Generate summary
      const summary = this.generateSummary(sentiment, themes, totalReviews);
      
      return {
        sentiment,
        themes,
        summary
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return {
        sentiment: 0,
        themes: {},
        summary: 'Unable to analyze sentiment at this time.'
      };
    }
  }

  static async getVenueSentimentAnalysis(venueId: string): Promise<VenueSentimentAnalysis[]> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId);

      if (error) throw error;

      return data.map(item => ({
        ...item,
        themes: typeof item.themes === 'string' ? {} : (item.themes as Record<string, number>)
      })) as VenueSentimentAnalysis[];
    } catch (error) {
      console.error('Error fetching sentiment analysis:', error);
      return [];
    }
  }

  static async saveVenueSentimentAnalysis(
    venueId: string,
    platform: string,
    sentimentResult: SentimentResult,
    reviewCount: number
  ): Promise<VenueSentimentAnalysis | null> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .insert({
          venue_id: venueId,
          platform,
          overall_sentiment: sentimentResult.sentiment,
          review_count: reviewCount,
          sentiment_summary: sentimentResult.summary,
          themes: sentimentResult.themes,
          last_analyzed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        ...data,
        themes: typeof data.themes === 'string' ? {} : (data.themes as Record<string, number>)
      } as VenueSentimentAnalysis;
    } catch (error) {
      console.error('Error saving sentiment analysis:', error);
      return null;
    }
  }

  private static extractThemes(reviews: ReviewData[]): Record<string, number> {
    const themes: Record<string, number> = {};
    const keywords = {
      service: ['service', 'staff', 'server', 'waitress', 'waiter', 'friendly', 'rude'],
      food: ['food', 'delicious', 'tasty', 'bland', 'fresh', 'stale', 'meal'],
      atmosphere: ['atmosphere', 'ambiance', 'vibe', 'mood', 'cozy', 'loud', 'quiet'],
      cleanliness: ['clean', 'dirty', 'sanitary', 'hygiene', 'spotless', 'messy'],
      value: ['price', 'expensive', 'cheap', 'value', 'worth', 'overpriced', 'affordable']
    };

    reviews.forEach(review => {
      const text = review.text.toLowerCase();
      Object.entries(keywords).forEach(([theme, words]) => {
        const mentions = words.filter(word => text.includes(word)).length;
        themes[theme] = (themes[theme] || 0) + mentions;
      });
    });

    return themes;
  }

  private static generateSummary(
    sentiment: number,
    themes: Record<string, number>,
    reviewCount: number
  ): string {
    let summary = `Based on ${reviewCount} reviews, `;
    
    if (sentiment > 0.3) {
      summary += 'customers generally have a positive experience.';
    } else if (sentiment < -0.3) {
      summary += 'customers have mixed to negative experiences.';
    } else {
      summary += 'customer experiences are mixed.';
    }

    const topTheme = Object.entries(themes)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (topTheme && topTheme[1] > 0) {
      summary += ` Most mentions relate to ${topTheme[0]}.`;
    }

    return summary;
  }
}
