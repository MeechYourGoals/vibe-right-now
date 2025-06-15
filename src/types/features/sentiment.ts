
// Sentiment analysis types

export interface SentimentTheme {
  name: string;
  theme: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  mentions: number;
  keywords: string[];
  examples: string[];
  score: number;
}

export interface PlatformSentimentSummary {
  platform: string;
  totalReviews: number;
  reviewCount: number;
  averageSentiment: number;
  overallSentiment: number;
  summary: string;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  themes: SentimentTheme[];
  lastUpdated: Date;
  trends: {
    period: string;
    change: number;
  }[];
}

export interface VenueSentimentAnalysis {
  venueId: string;
  venueName: string;
  overallSentiment: number;
  totalReviews: number;
  platformSummaries: PlatformSentimentSummary[];
  topThemes: SentimentTheme[];
  sentimentTrend: {
    date: Date;
    sentiment: number;
  }[];
  lastAnalyzed: Date;
  recommendations: string[];
}

export interface SentimentAnalysisResult {
  score: number;
  magnitude: number;
  themes: SentimentTheme[];
  summary: string;
}
