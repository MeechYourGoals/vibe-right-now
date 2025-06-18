
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
export type { Post, Location, User, VenueInsights } from './core/base';

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

// Add missing types for city data and enhanced types
export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Enhanced Media interface with id property
export interface Media {
  id?: string;
  type: "image" | "video" | "audio";
  url: string;
}

// Enhanced User interface with social stats
export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
  createdAt: string;
  updatedAt: string;
}

// Enhanced Post interface with expiration
export interface EnhancedPost extends Post {
  expiresAt?: string;
}

// Advertising types
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: string;
  duration?: string;
  placement: string;
  kpis: string[];
  platform: string;
  dimensions: string;
  specifications: Record<string, any>;
  bestPractices: string[];
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'non-binary';
export type LocationType = 'restaurant' | 'bar' | 'nightclub' | 'cafe' | 'attraction' | 'sports' | 'event' | 'other';

export interface DemographicTargeting {
  gender: GenderTargeting;
  ageRange?: [number, number];
  interests?: string[];
  behaviors?: string[];
  location?: string[];
}

export interface GeographicTargeting {
  radius: number;
  cities: string[];
  regions: string[];
}

export interface BehavioralTargeting {
  venueVisits: string[];
  socialEngagement: string[];
  purchaseHistory: string[];
}

export interface InterestTargeting {
  categories: string[];
  keywords: string[];
  competitors: string[];
}

export interface ContextualTargeting {
  vibeTags: string[];
  venueTypes: string[];
  daypart: string[];
  timeOfDay: string[];
  dayOfWeek: string[];
  weather: string[];
  eventTypes: string[];
}

export interface MomentScoring {
  crowdDensity: string;
  vibeScore: string;
  crowdLevel: string;
  engagement: string;
}

export interface TargetingOptions {
  demographics: DemographicTargeting;
  geographic: GeographicTargeting;
  behaviors: BehavioralTargeting;
  interests: InterestTargeting;
  contextual: ContextualTargeting;
  momentScore: MomentScoring;
}
