
// Core types
export * from './core/base';
export * from './core/api';

// Entity types
export * from './entities/user';
export * from './entities/venue';
export * from './entities/content';
export * from './entities/events';
export * from './entities/messaging';

// Feature types
export * from './features/search';
export * from './features/analytics';
export * from './features/advertising';
export * from './features/sentiment';

// Re-export specific types for compatibility
export type { Post, User, VenueInsights } from './index.d';

// Chat types (with selective exports to avoid conflicts)
export type {
  ChatSession,
  ChatMessage,
  MessageRole,
  ChatContext,
  VoiceSession,
  AIAgent,
  AgentCapability,
  CapabilityType,
  CapabilityLevel
} from './features/chat';

// Additional missing types that are used throughout the codebase
export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

export interface AdFormat {
  id: string;
  name: string;
  type: string;
}

export interface TargetingOptions {
  ageRanges: string[];
  locations: string[];
  interests: string[];
  gender: GenderTargeting;
}

export interface GenderTargeting {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
}

// Sentiment Analysis Types
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
  trends: Array<{
    period: string;
    change: number;
  }>;
}

export interface SentimentAnalysisResult {
  score: number;
  magnitude: number;
  themes: SentimentTheme[];
  summary: string;
}

export interface VenueSentimentAnalysis {
  venueId: string;
  venueName: string;
  overallSentiment: number;
  totalReviews: number;
  platformSummaries: PlatformSentimentSummary[];
  topThemes: SentimentTheme[];
  sentimentTrend: Array<{
    date: Date;
    sentiment: number;
  }>;
  lastAnalyzed: Date;
  recommendations: string[];
}
