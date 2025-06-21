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

// Enhanced sentiment analysis types
export interface PlatformSentimentSummary {
  platform: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  count: number;
  overallSentiment?: number;
  summary?: string;
  reviewCount?: number;
  themes?: SentimentTheme[];
  lastUpdated?: string;
  sentimentDistribution?: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface SentimentTheme {
  theme: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  mentions: number;
  examples: string[];
  name?: string;
  score?: number;
  frequency?: number;
}

// Coordinate types
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

// Unified type definitions to prevent conflicts
import { MockUserProfile } from "@/mock/users";

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
  displayName?: string;
  isPrivate?: boolean;
  email?: string;
  isCelebrity?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id?: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media?: Media[];
  timestamp: Date;
  expiresAt?: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  isVenuePost?: boolean;
  saved: boolean;
  vibeTags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  vibedHere?: boolean;
  contentId?: string;
  parentId?: string;
  author?: User;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'published';
  engagement?: { likes: number; replies: number; reactions: any[] };
  moderation?: { status: 'approved'; flags: any[] };
}

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
  type: "restaurant" | "bar" | "nightclub" | "cafe" | "attraction" | "sports" | "event" | "city" | "other" | "nightlife";
  verified: boolean;
  rating?: number;
  price_level?: number;
  vibes?: string[];
  business_status?: string;
  google_maps_url?: string;
  hours?: Record<string, string | { open: string; close: string; closed?: boolean; }>;
  tags?: string[];
  phone?: string;
  website?: string;
  followers?: number;
  checkins?: number;
  userProfile?: MockUserProfile;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

// VernonChat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: string;
  text?: string;
  sender?: 'user' | 'ai';
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  isOpen?: boolean;
  isMinimized?: boolean;
  isLoading?: boolean;
  isListening?: boolean;
  isSpeaking?: boolean;
  searchResults?: any[];
  transcript?: string;
  interimTranscript?: string;
}

export interface VenueInsights {
  visitors: number;
  visitorsChange: string;
  posts: number;
  postsChange: string;
  shares: number;
  sharesChange: string;
  likes: number;
  likesChange: string;
  engagementRate: string;
  followerGrowth: string;
  clickThroughRate: string;
  totalVisits: number;
  revenueImpact: string;
  totalReach: number;
  impressions: number;
  viewsPer: number;
  viewsCount?: number;
  visitorCount?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}

// Google Places types
export interface PlaceResult {
  name: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type?: string;
}

// User profile hook types
export interface UserProfileStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export interface UserProfileData {
  profile: User | null;
  loading: boolean;
  error: string | null;
  userPosts: Post[];
  followedVenues: Location[];
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
  getFollowStatus: (userId: string) => boolean;
  getMutualFollowers: (userId: string) => User[];
  getUserPosts: (userId: string) => Post[];
  getUserStats: (userId: string) => UserProfileStats;
  getPostComments: (postId: string) => Comment[];
}

// City Data type
export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Advertising types
export interface AdFormat {
  id: string;
  name: string;
  description: string;
}

export interface TargetingOptions {
  ageRange: { min: number; max: number };
  gender: GenderTargeting;
  interests: string[];
  location: string;
}

export type GenderTargeting = 'all' | 'male' | 'female' | 'other';

// Sentiment analysis types
export interface PlatformSentimentSummary {
  platform: string;
  sentiment: number;
  mentions: number;
}

export interface SentimentTheme {
  theme: string;
  sentiment: number;
  frequency: number;
}

export * from "./index";
