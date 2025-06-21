
// Core types
export * from './core/base';
export * from './core/api';

// Entity types - Location must be exported properly
export * from './entities/venue';
export * from './entities/user';
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

// Extended Comment interface with all required properties
export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  // Extended properties for compatibility
  user: User;
  postId: string;
  contentId?: string;
  parentId?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  vibedHere?: boolean;
  status?: 'published';
  engagement?: { likes: number; replies: number; reactions: any[] };
  moderation?: { status: 'approved'; flags: any[] };
}

// Consolidated Media interface (single definition to avoid conflicts) - Updated to include audio
export interface Media {
  id?: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
}

export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Fix GenderTargeting to work with both string and object usage
export type GenderTargeting = string | {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
};

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
