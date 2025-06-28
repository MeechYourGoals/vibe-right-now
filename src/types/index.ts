
export interface User {
  id: string;
  username: string;
  displayName?: string; // Add displayName property
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  verified?: boolean;
  isPrivate?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  createdAt?: string;
  updatedAt?: string;
}

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
  google_maps_url?: string; // Add google_maps_url property
  business_status?: string; // Add business_status property
  hours?: string | VenueHours | { [key: string]: string | { open: string; close: string; closed?: boolean } };
  vibes?: string[];
  tags?: string[];
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VenueHours {
  isOpen24Hours?: boolean;
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
}

// Re-export from content types
export { Post, Media, Comment, Story, ContentMetrics } from './entities/content';

// Re-export from advertising types
export { AdFormat, TargetingOptions, GenderTargeting, AdCampaign } from './features/advertising';

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
  totalVisits: number;
  avgRating: number;
  topVibes: string[];
  peakHours: string[];
  demographics: {
    ageGroups: Record<string, number>;
    genderSplit: Record<string, number>;
  };
}

export interface PlatformSentimentSummary {
  platform: string;
  overallSentiment: number;
  reviewCount: number;
  themes: SentimentTheme[];
}

export interface SentimentTheme {
  theme: string;
  sentiment: number;
  count: number;
}

export interface CityData {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}
