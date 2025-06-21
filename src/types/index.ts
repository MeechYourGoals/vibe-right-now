
// Re-export all types from entities
export * from './entities/venue';
export * from './entities/content';
export * from './entities/user';
export * from './entities/events';
export * from './entities/messaging';

// Re-export feature types
export * from './features/advertising';
export * from './features/analytics';
export * from './features/chat';
export * from './features/search';
export * from './features/sentiment';

// Re-export core types
export * from './core/api';
export * from './core/base';

// Additional type exports
export * from './subscription';
export * from './insights';

// CityData type for explore functionality
export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone?: string;
  population?: number;
  state?: string;
  venues?: Location[];
}

// Missing sentiment analysis types
export interface PlatformSentimentSummary {
  platform: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  count: number;
}

export interface SentimentTheme {
  theme: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  mentions: number;
  examples: string[];
}

// Missing coordinate types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

// User profile types
export interface UserProfileData {
  id: string;
  username: string;
  name: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
  followersCount?: number;
  followingCount?: number;
}

export interface UserProfileStats {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  vibesCount: number;
}
