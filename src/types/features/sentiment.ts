
export interface PlatformSentimentSummary {
  platform: string;
  sentiment: number;
  mentions: number;
  overallSentiment: number;
  summary: string;
  reviewCount: number;
  lastUpdated: string;
  themes: SentimentTheme[];
}

export interface SentimentTheme {
  theme: string;
  sentiment: number;
  frequency: number;
  name: string;
  score: number;
}
