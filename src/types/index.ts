
// Re-export all types from the entities
export * from './entities/venue';
export * from './core/base';

// Define CityData type here to avoid circular imports
export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Extended Comment interface with all required properties
export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
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

// User interface
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  email?: string;
  createdAt?: Date;
  verified?: boolean;
}

// Post interface
export interface Post {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  likes: number;
  comments: Comment[];
  media?: Media[];
  location?: Location;
  vibedHere?: boolean;
  type?: 'post' | 'review' | 'check-in';
}

// Media interface
export interface Media {
  id?: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
}

// Advertising types
export interface AdFormat {
  id: string;
  name: string;
  type: 'banner' | 'video' | 'native' | 'story';
  dimensions?: string;
}

export interface TargetingOptions {
  ageRange: { min: number; max: number };
  gender: GenderTargeting;
  interests: string[];
  location: string[];
  behaviors: string[];
}

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
