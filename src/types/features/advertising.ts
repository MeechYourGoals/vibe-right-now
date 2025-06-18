
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: 'banner' | 'video' | 'story' | 'carousel' | 'native' | 'MomentCard' | 'VibeOverlay' | 'SpawnPoint' | 'HeatRingTakeover';
  duration?: number | string;
  platform: string;
  dimensions: {
    width: number;
    height: number;
  } | string;
  kpis: string[];
  placement?: string;
  specifications?: Record<string, any>;
  bestPractices?: string[];
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
    gender: GenderTargeting;
    ageRange: [number, number];
  };
  behaviors: {
    purchaseHistory: string[];
    appUsage: string[];
    venueVisits: string[];
    socialEngagement: string[];
  };
  contextual: {
    timeOfDay: string[];
    deviceType: string[];
    vibeTags: string[];
    venueTypes: string[];
    daypart: string[];
    dayOfWeek: string[];
    weather: string[];
    eventTypes: string[];
  };
  momentScore: {
    crowdDensity: string;
    vibeScore: string;
    crowdLevel: string;
    engagement: string;
  };
  geographic?: {
    radius: number;
    cities: string[];
    regions: string[];
  };
  interests?: {
    categories: string[];
    keywords: string[];
    competitors: string[];
  };
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'other' | 'non-binary';

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
