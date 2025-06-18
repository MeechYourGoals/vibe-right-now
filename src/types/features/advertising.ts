
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: 'banner' | 'video' | 'story' | 'carousel' | 'native';
  duration?: number;
  platform: string;
  dimensions: {
    width: number;
    height: number;
  };
  kpis: string[];
}

export interface TargetingOptions {
  ageRange: { min: number; max: number };
  gender: GenderTargeting;
  interests: string[];
  location: string;
  demographics: {
    education: string[];
    income: string[];
    occupation: string[];
  };
  behaviors: {
    purchaseHistory: string[];
    appUsage: string[];
  };
  contextual: {
    timeOfDay: string[];
    deviceType: string[];
  };
  momentScore: number;
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'other';

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
