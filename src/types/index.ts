
// Re-export all types from the entities
export * from './entities/venue';
export * from './core/base';

// Define CityData type here to avoid circular imports
export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}

// Export missing types that are causing build errors
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

export interface AdFormat {
  id: string;
  name: string;
  type: string;
  description?: string;
  duration?: number | string;
  platform?: string;
  dimensions?: string;
  kpis?: string[];
  placement?: string;
}

export interface TargetingOptions {
  ageRange: { min: number; max: number };
  gender: GenderTargeting;
  interests: string[];
  location: string;
  ageRanges?: string[];
  demographics?: {
    gender: GenderTargeting | string;
    ageRange: { min: number; max: number } | number[];
    interests?: string[];
    behaviors?: string[];
    location?: string[];
  };
  behaviors?: {
    categories: string[];
    frequency: string;
    venueVisits?: string[];
    socialEngagement?: string[];
    purchaseHistory?: string[];
  };
  contextual?: {
    categories: string[];
    frequency: string;
    vibeTags?: string[];
    venueTypes?: string[];
    daypart?: string[];
    timeOfDay?: string[];
    dayOfWeek?: string[];
    weather?: string[];
    eventTypes?: string[];
  };
  momentScore?: number | {
    crowdDensity: string;
    vibeScore: string;
    crowdLevel: string;
    engagement: string;
  };
}

export interface GenderTargeting {
  all: boolean;
  male: boolean;
  female: boolean;
  other: boolean;
}

export interface PlatformSentimentSummary {
  platform: string;
  sentiment: number;
  mentions: number;
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
  sentiment: number;
  frequency: number;
  name?: string;
  score?: number;
  examples?: string[];
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
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}
