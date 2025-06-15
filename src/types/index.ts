// Re-export all types from a centralized location
export * from './core/base';
export * from './core/api';

export * from './entities/user';
export * from './entities/venue';
export * from './entities/content';
export * from './entities/messaging';
export * from './entities/events';

export * from './features/chat';
export * from './features/search';
export * from './features/analytics';

// Legacy compatibility - keep existing types that are still used
import { MockUserProfile } from "@/mock/users";

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
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" | "nightclub" | "mall" | "cafe" | "city";
  verified?: boolean;
  vibes?: string[];
  rating?: number;
  price_level?: number;
  phone?: string;
  website?: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
  business_status?: string;
  google_maps_url?: string;
  userProfile?: MockUserProfile;
  followers?: number;
  checkins?: number;
  tags?: string[];
  hours?: BusinessHours;
}

export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

export interface BusinessHours {
  monday: { open: string; close: string; } | string;
  tuesday: { open: string; close: string; } | string;
  wednesday: { open: string; close: string; } | string;
  thursday: { open: string; close: string; } | string;
  friday: { open: string; close: string; } | string;
  saturday: { open: string; close: string; } | string;
  sunday: { open: string; close: string; } | string;
  isOpenNow?: string;
  timezone?: string;
  isOpen24Hours?: boolean;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  user: MockUserProfile;
  content: string;
  media: Media[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  location?: Location;
  vibeTags?: string[];
  isVenuePost?: boolean;
  isPinned?: boolean;
  expiresAt?: string;
  saved: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: MockUserProfile;
  content: string;
  text: string;
  timestamp: string;
  vibedHere: boolean;
  likes: number;
}

// Add User type for backward compatibility
export interface User {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  name: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isCelebrity?: boolean;
  isPrivate?: boolean;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}

// VernonChat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'error';
  content: string;
  timestamp: string;
  // For compatibility with older format
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

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
