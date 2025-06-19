
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
export type UserProfileStats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
};

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
  state?: string;
  phone?: string;
  website?: string;
  hours?: string | { 
    open: string; 
    close: string; 
    closed?: boolean; 
    monday?: string; 
    tuesday?: string; 
    wednesday?: string; 
    thursday?: string; 
    friday?: string; 
    saturday?: string; 
    sunday?: string;
    isOpen24Hours?: boolean;
  };
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  zip?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  user?: User;
  location: Location;
  media: Media[];
  likes: number;
  comments: Comment[];
  timestamp: Date;
  vibes: string[];
  isLiked?: boolean;
  checkInReward?: number;
  createdAt?: string;
  updatedAt?: string;
  isVenuePost?: boolean;
  isPinned?: boolean;
  saved?: boolean;
  vibeTags?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  user?: User;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  postId?: string;
  contentId?: string;
  vibedHere?: boolean;
  parentId?: string;
}

export interface Media {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  caption?: string;
}

// Re-export User from entities
export { User } from './entities/user';
