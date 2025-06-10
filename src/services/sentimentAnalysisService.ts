
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

export interface SentimentTrend {
  date: string;
  sentiment: number;
  review_count: number;
}

class SentimentAnalysisService {
  async getVenueSentiment(venueId: string): Promise<VenueSentimentAnalysis[]> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId);

      if (error) throw error;

      return data?.map(item => ({
        ...item,
        themes: typeof item.themes === 'string' ? JSON.parse(item.themes) : item.themes || {}
      })) || [];
    } catch (error) {
      console.error('Error fetching venue sentiment:', error);
      return [];
    }
  }

  async analyzeSentiment(venueId: string, platform: string, reviews: any[]): Promise<VenueSentimentAnalysis | null> {
    try {
      // Mock sentiment analysis for now
      const mockAnalysis = {
        venue_id: venueId,
        platform,
        overall_sentiment: Math.random() * 2 - 1, // -1 to 1
        sentiment_summary: "Generally positive feedback with some mixed reviews",
        themes: {
          "food quality": Math.random(),
          "service": Math.random(),
          "atmosphere": Math.random(),
          "value": Math.random()
        },
        review_count: reviews.length,
        last_analyzed_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .upsert({
          ...mockAnalysis,
          themes: JSON.stringify(mockAnalysis.themes)
        })
        .select()
        .single();

      if (error) throw error;

      return {
        ...data,
        themes: typeof data.themes === 'string' ? JSON.parse(data.themes) : data.themes || {}
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return null;
    }
  }

  async getSentimentTrends(venueId: string, days: number = 30): Promise<SentimentTrend[]> {
    try {
      // Mock trends data for now
      const trends: SentimentTrend[] = [];
      const endDate = new Date();
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(endDate);
        date.setDate(date.getDate() - i);
        
        trends.push({
          date: date.toISOString().split('T')[0],
          sentiment: Math.random() * 2 - 1,
          review_count: Math.floor(Math.random() * 20) + 1
        });
      }
      
      return trends;
    } catch (error) {
      console.error('Error fetching sentiment trends:', error);
      return [];
    }
  }

  async generateInsights(venueId: string): Promise<string[]> {
    try {
      const sentimentData = await this.getVenueSentiment(venueId);
      
      const insights: string[] = [];
      
      if (sentimentData.length > 0) {
        const avgSentiment = sentimentData.reduce((sum, item) => sum + item.overall_sentiment, 0) / sentimentData.length;
        
        if (avgSentiment > 0.3) {
          insights.push("Overall customer sentiment is very positive");
        } else if (avgSentiment > 0) {
          insights.push("Customer sentiment is generally positive");
        } else if (avgSentiment > -0.3) {
          insights.push("Customer sentiment is mixed");
        } else {
          insights.push("Customer sentiment needs attention");
        }
        
        // Add theme-based insights
        const allThemes: Record<string, number[]> = {};
        sentimentData.forEach(item => {
          Object.entries(item.themes).forEach(([theme, score]) => {
            if (!allThemes[theme]) allThemes[theme] = [];
            allThemes[theme].push(score);
          });
        });
        
        Object.entries(allThemes).forEach(([theme, scores]) => {
          const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
          if (avgScore > 0.7) {
            insights.push(`${theme} receives consistently high praise`);
          } else if (avgScore < 0.3) {
            insights.push(`${theme} may need improvement based on feedback`);
          }
        });
      }
      
      return insights;
    } catch (error) {
      console.error('Error generating insights:', error);
      return ["Unable to generate insights at this time"];
    }
  }
}

export const sentimentAnalysisService = new SentimentAnalysisService();
