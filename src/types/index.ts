
export * from './geo';
export * from './insights';
export * from './entities/user';
export * from './features/advertising';
export * from './features/analytics';
export * from './features/sentiment';
export * from './venue';

import { GeoCoordinates } from './geo';
import { UserProfile } from './entities/user';
import { Venue } from './venue';

// Fix missing exports
export type Coordinates = GeoCoordinates;
export type UserProfileData = UserProfile;
export type UserProfileStats = UserProfile;

export interface CityData {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lng: number;
  venues: Venue[];
}

// Core types that are used throughout the app
export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  category: string;
  rating: number;
  images: string[];
  lat?: number;
  lng?: number;
  type?: string;
  price_level?: number;
  verified?: boolean;
  vibes?: string[];
  business_status?: string;
  google_maps_url?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  location: Location;
  media: Media[];
  likes: number;
  comments: Comment[];
  timestamp: Date;
  vibes: string[];
  isLiked?: boolean;
  checkInReward?: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

// Re-export User from entities
export { User } from './entities/user';
