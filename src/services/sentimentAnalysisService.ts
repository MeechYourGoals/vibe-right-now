
import { supabase } from '@/integrations/supabase/client';
import { PlatformSentimentSummary, SentimentTheme } from '@/types';
import type { Database } from '@/integrations/supabase/types';
import { 
  SentimentAnalysisResult, 
  VenueSentimentAnalysis 
} from "@/types";

export const mockSentimentData: PlatformSentimentSummary[] = [
  {
    platform: "Google Reviews",
    sentiment: 4.2,
    mentions: 156,
    overallSentiment: 4.2,
    summary: "Customers love the atmosphere and friendly staff",
    reviewCount: 156,
    lastUpdated: "2024-01-15T10:30:00Z",
    sentimentDistribution: {
      positive: 78,
      neutral: 15,
      negative: 7
    },
    themes: [
      { theme: "Great atmosphere", sentiment: 4.5, frequency: 45, examples: ["Amazing vibes", "Love the energy"] },
      { theme: "Friendly staff", sentiment: 4.3, frequency: 38, examples: ["Staff is so welcoming", "Great service"] }
    ]
  },
  {
    platform: "Yelp", 
    sentiment: 3.8,
    mentions: 89,
    overallSentiment: 3.8,
    summary: "Mixed reviews on service speed but good food quality",
    reviewCount: 89,
    lastUpdated: "2024-01-14T15:20:00Z",
    sentimentDistribution: {
      positive: 65,
      neutral: 20,
      negative: 15
    },
    themes: [
      { theme: "Food quality", sentiment: 4.1, frequency: 52, examples: ["Delicious food", "Great taste"] },
      { theme: "Service speed", sentiment: 3.2, frequency: 34, examples: ["Slow service", "Long wait times"] }
    ]
  },
  {
    platform: "TripAdvisor",
    sentiment: 4.0,
    mentions: 67,
    overallSentiment: 4.0,
    summary: "Tourists appreciate the location and ambiance",
    reviewCount: 67,
    lastUpdated: "2024-01-13T09:45:00Z",
    sentimentDistribution: {
      positive: 72,
      neutral: 18,
      negative: 10
    },
    themes: [
      { theme: "Location", sentiment: 4.4, frequency: 41, examples: ["Perfect location", "Great spot"] },
      { theme: "Ambiance", sentiment: 4.2, frequency: 38, examples: ["Beautiful atmosphere", "Lovely setting"] }
    ]
  },
  {
    platform: "Facebook",
    sentiment: 3.9,
    mentions: 124,
    overallSentiment: 3.9,
    summary: "Social media buzz around special events and promotions",
    reviewCount: 124,
    lastUpdated: "2024-01-16T14:10:00Z",
    sentimentDistribution: {
      positive: 69,
      neutral: 22,
      negative: 9
    },
    themes: [
      { theme: "Events", sentiment: 4.3, frequency: 47, examples: ["Great events", "Fun activities"] },
      { theme: "Promotions", sentiment: 3.8, frequency: 29, examples: ["Good deals", "Nice offers"] }
    ]
  },
  {
    platform: "Instagram",
    sentiment: 4.4,
    mentions: 203,
    overallSentiment: 4.4,
    summary: "Highly visual content with positive engagement",
    reviewCount: 203,
    lastUpdated: "2024-01-17T11:25:00Z",
    sentimentDistribution: {
      positive: 82,
      neutral: 12,
      negative: 6
    },
    themes: [
      { theme: "Visual appeal", sentiment: 4.6, frequency: 78, examples: ["Gorgeous photos", "Instagram worthy"] },
      { theme: "Food presentation", sentiment: 4.3, frequency: 56, examples: ["Beautiful plating", "Photogenic food"] }
    ]
  }
];

export const SentimentAnalysisService = {
  async getPlatformSentimentSummaries(venueId: string, venueName?: string): Promise<PlatformSentimentSummary[]> {
    try {
      const { data, error } = await supabase
        .from('venue_sentiment_analysis')
        .select('*')
        .eq('venue_id', venueId);

      if (error) {
        console.error('Error fetching sentiment analysis:', error);
        return mockSentimentData;
      }

      if (!data || data.length === 0) {
        return mockSentimentData;
      }

      return data.map(record => ({
        platform: record.platform,
        sentiment: record.overall_sentiment,
        mentions: record.review_count || 0,
        overallSentiment: record.overall_sentiment,
        summary: record.sentiment_summary,
        reviewCount: record.review_count || 0,
        lastUpdated: record.last_analyzed_at,
        sentimentDistribution: {
          positive: 70,
          neutral: 20,
          negative: 10
        },
        themes: Array.isArray(record.themes) ? record.themes as SentimentTheme[] : []
      }));

    } catch (error) {
      console.error('Error in getPlatformSentimentSummaries:', error);
      return mockSentimentData;
    }
  },

  async triggerMockAnalysis(venueId: string): Promise<void> {
    console.log(`Triggering mock analysis for venue: ${venueId}`);
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export const getSentimentAnalysis = async (venueId: string): Promise<VenueSentimentAnalysis[]> => {
  try {
    const { data, error } = await supabase
      .from('venue_sentiment_analysis')
      .select('*')
      .eq('venue_id', venueId);

    if (error) {
      console.error('Error fetching sentiment analysis:', error);
      return mockSentimentData.map(item => ({
        venueId,
        platform: item.platform,
        overallSentiment: item.sentiment,
        sentimentSummary: item.summary || "",
        themes: item.themes || [],
        reviewCount: item.reviewCount || 0,
        lastAnalyzedAt: item.lastUpdated || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }

    return data?.map(record => ({
      venueId: record.venue_id,
      platform: record.platform,
      overallSentiment: record.overall_sentiment,
      sentimentSummary: record.sentiment_summary,
      themes: Array.isArray(record.themes) ? record.themes as SentimentTheme[] : [],
      reviewCount: record.review_count || 0,
      lastAnalyzedAt: record.last_analyzed_at,
      createdAt: record.created_at,
      updatedAt: record.updated_at
    })) || [];

  } catch (error) {
    console.error('Error in getSentimentAnalysis:', error);
    return mockSentimentData.map(item => ({
      venueId,
      platform: item.platform,
      overallSentiment: item.sentiment,
      sentimentSummary: item.summary || "",
      themes: item.themes || [],
      reviewCount: item.reviewCount || 0,
      lastAnalyzedAt: item.lastUpdated || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }
};

export const refreshSentimentAnalysis = async (venueId: string): Promise<void> => {
  console.log(`Refreshing sentiment analysis for venue: ${venueId}`);
};
