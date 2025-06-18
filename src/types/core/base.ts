
// Base types for the entire application
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street?: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  coordinates: GeoCoordinates;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  alt?: string;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  name?: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  isPrivate?: boolean;
  email?: string;
  posts?: number;
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Common status types
export type EntityStatus = 'active' | 'inactive' | 'pending' | 'archived';
export type VisibilityLevel = 'public' | 'private' | 'friends' | 'followers';
export type ContentType = 'text' | 'image' | 'video' | 'audio' | 'location' | 'event';
export type LocationType = 'restaurant' | 'bar' | 'nightclub' | 'cafe' | 'hotel' | 'attraction' | 'event' | 'sports' | 'comedy' | 'music';

export interface BusinessHours {
  [key: string]: {
    open: string;
    close: string;
    closed?: boolean;
  } | string;
  isOpenNow?: boolean;
  timezone?: string;
}

// Location interface with all required properties
export interface Location extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  coordinates: GeoCoordinates;
  lat?: number;
  lng?: number;
  type: LocationType;
  verified?: boolean;
  tags?: string[];
  hours?: BusinessHours;
  metadata?: LocationMetadata;
  rating?: number;
  business_status?: string;
  vibes?: string[];
  google_maps_url?: string;
  price_level?: number;
  phone?: string;
  website?: string;
}

export interface LocationMetadata {
  rating?: number;
  priceLevel?: number;
  website?: string;
  phone?: string;
  description?: string;
  capacity?: number;
  amenities?: string[];
}

// Post interface with additional properties for compatibility
export interface Post extends BaseEntity {
  title?: string;
  content: string;
  author: UserProfile;
  user?: UserProfile;
  location?: Location;
  media?: MediaItem[];
  tags?: string[];
  vibeTags?: string[];
  visibility: VisibilityLevel;
  likes?: number;
  comments?: number;
  saved?: boolean;
  timestamp?: Date;
  isVenuePost?: boolean;
  isPinned?: boolean;
  isExternalPost?: boolean;
}

// User interface
export interface User extends BaseEntity {
  username: string;
  displayName: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  posts?: number;
}

// Venue insights interface
export interface VenueInsights {
  id: string;
  venueId: string;
  totalVisits: number;
  averageRating: number;
  peakHours: string[];
  demographics: {
    ageGroups: Record<string, number>;
    genders: Record<string, number>;
  };
  trends: {
    period: string;
    growth: number;
  }[];
  visitorCount?: number;
  visitors?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}

// Advertising interfaces
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: string;
  placement: string;
  platform: string;
  dimensions: string;
  specifications: Record<string, any>;
  bestPractices: string[];
  kpis: string[];
  duration?: number;
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'other';

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
  excludeLocations: string[];
}

export interface BehavioralTargeting {
  visitFrequency: string[];
  spendingHabits: string[];
  deviceUsage: string[];
}

export interface InterestTargeting {
  categories: string[];
  brands: string[];
  keywords: string[];
}

export interface ContextualTargeting {
  timeOfDay: string[];
  dayOfWeek: string[];
  weather: string[];
  eventTypes: string[];
  vibeTags?: string[];
  venueTypes?: string[];
  daypart?: string[];
}

export interface MomentScoring {
  vibeScore: number;
  crowdLevel: number;
  engagement: number;
  crowdDensity?: string;
}

export interface TargetingOptions {
  demographics: DemographicTargeting;
  geographic: GeographicTargeting;
  behaviors: BehavioralTargeting;
  interests: InterestTargeting;
  contextual: ContextualTargeting;
  momentScore: MomentScoring;
}
