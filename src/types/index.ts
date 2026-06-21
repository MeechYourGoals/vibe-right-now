
import { MockUserProfile } from "@/mock/users";
import type { Post, Media, Comment, Story, ContentMetrics } from './entities/content';
import type { AdFormat, TargetingOptions, GenderTargeting, AdCampaign } from './features/advertising';

export interface User {
  id: string;
  username: string;
  displayName?: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  verified?: boolean;
  isPrivate?: boolean;
  location?: string;
  followers?: number;
  following?: number;
  posts?: number;
  subscription?: any;
  points?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
  holderName?: string;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
  [key: string]: any;
}

export type { Coordinates, UserLocation } from './coordinates';

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country?: string;
  zip?: string;
  lat: number;
  lng: number;
  type: string;
  verified?: boolean;
  rating?: number;
  price_level?: number;
  phone?: string;
  website?: string;
  google_maps_url?: string;
  business_status?: string;
  hours?: string | VenueHours | { [key: string]: string | { open: string; close: string; closed?: boolean } };
  vibes?: string[];
  tags?: string[];
  images?: string[];
  userProfile?: MockUserProfile;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface VenueHours {
  isOpen24Hours?: boolean;
  isOpenNow?: boolean;
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
  [key: string]: any;
}

export type BusinessHours = VenueHours;

// Re-export from content types
export type { Post, Media, Comment, Story, ContentMetrics } from './entities/content';

// Re-export from advertising types
export type { AdFormat, TargetingOptions, GenderTargeting, AdCampaign } from './features/advertising';

export type SentimentAnalysisResult = any;
export type VenueSentimentAnalysis = any;


// User profile types
export interface UserProfileData {
  user: User;
  posts: Post[];
  followedVenues: Location[];
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
}

export interface UserProfileStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

// Add missing type exports
export interface VenueInsights {
  totalVisits?: number;
  avgRating?: number;
  topVibes?: string[];
  peakHours?: string[];
  demographics?: {
    ageGroups: Record<string, number>;
    genderSplit: Record<string, number>;
  };
  visitors?: number;
  visitorCount?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}

export interface SentimentTheme {
  theme?: string;
  sentiment?: number;
  count?: number;
  name?: string;
  score?: number;
  examples?: string[];
}

export interface PlatformSentimentSummary {
  platform: string;
  overallSentiment: number;
  reviewCount: number;
  themes: SentimentTheme[];
  summary?: string;
  lastUpdated?: string;
  sentimentDistribution?: { positive: number; neutral: number; negative: number };
}

export interface CityData {
  id?: string;
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: any[];
}
