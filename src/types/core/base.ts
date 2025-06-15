
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
