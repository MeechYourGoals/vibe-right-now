
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
  name?: string; // Added for compatibility
  avatar?: string;
  bio?: string;
  verified: boolean;
  isPrivate?: boolean;
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
  };
}

// Location interface with all required properties
export interface Location extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  coordinates: GeoCoordinates;
  lat?: number; // Added for compatibility
  lng?: number; // Added for compatibility
  type: LocationType;
  verified?: boolean;
  tags?: string[];
  hours?: BusinessHours;
  metadata?: LocationMetadata;
  rating?: number; // Added for compatibility
  business_status?: string; // Added for compatibility
  vibes?: string[]; // Added for compatibility
  google_maps_url?: string; // Added for compatibility
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
  user?: UserProfile; // Added for compatibility
  location?: Location;
  media?: MediaItem[];
  tags?: string[];
  visibility: VisibilityLevel;
  likes?: number; // Added for compatibility
  timestamp?: Date; // Added for compatibility
}

// User interface
export interface User extends BaseEntity {
  username: string;
  displayName: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
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
}
