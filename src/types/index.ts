
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
export type { Post, User, VenueInsights } from './core/base';

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
  state?: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Enhanced Media interface with consistent properties
export interface Media {
  id?: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
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

// Unified Location interface that matches all usage patterns
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "nightclub" | "cafe" | "attraction" | "sports" | "event" | "city" | "other";
  rating?: number;
  price_level?: number;
  verified?: boolean;
  vibes?: string[];
  business_status?: string;
  google_maps_url?: string;
  hours?: BusinessHours;
  tags?: string[];
  phone?: string;
  website?: string;
  followers?: number;
  checkins?: number;
  userProfile?: any;
}

// Business Hours interface with 24 hour support
export interface BusinessHours {
  monday: DayHours | string;
  tuesday: DayHours | string;
  wednesday: DayHours | string;
  thursday: DayHours | string;
  friday: DayHours | string;
  saturday: DayHours | string;
  sunday: DayHours | string;
  isOpenNow?: boolean;
  isOpen24Hours?: boolean;
  timezone?: string;
}

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
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
export type LocationType = 'restaurant' | 'bar' | 'nightclub' | 'cafe' | 'attraction' | 'sports' | 'event' | 'city' | 'other';

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
