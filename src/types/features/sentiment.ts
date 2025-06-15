
// Sentiment analysis types

export interface SentimentTheme {
  theme: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  mentions: number;
  keywords: string[];
  examples: string[];
}

export interface PlatformSentimentSummary {
  platform: string;
  totalReviews: number;
  averageSentiment: number;
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
