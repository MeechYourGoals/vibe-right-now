
export interface AdFormat {
  id: string;
  name: string;
  description: string;
}

export interface TargetingOptions {
  ageRange: { min: number; max: number };
  gender: GenderTargeting;
  interests: string[];
  location: string;
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'other';

export interface PlatformSentimentSummary {
  platform: string;
  sentiment: number;
  mentions: number;
}

export interface SentimentTheme {
  theme: string;
  sentiment: number;
  frequency: number;
}
