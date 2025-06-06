// If this file doesn't exist, we're creating it
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
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  hours?: BusinessHours;
  vibes?: string[];
  userProfile?: MockUserProfile;
  rating?: number;
  followers?: number;
  checkins?: number;
  tags?: string[];
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
  user: User;
  location: Location;
  content: string;
  media?: Media[];
  timestamp: string;
  expiresAt: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  saved: boolean;
  vibeTags?: string[];
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

// Advertising Suite Types
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type: 'MomentCard' | 'VibeOverlay' | 'SpawnPoint' | 'HeatRingTakeover';
  duration?: string;
  placement: string;
  kpis: string[];
}

export interface Campaign {
  id: string;
  name: string;
  adFormat: AdFormat;
  targeting: TargetingOptions;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  performance: CampaignPerformance;
}

export interface TargetingOptions {
  demographics: {
    ageRange: [number, number];
    gender: string[];
    location: string[];
  };
  behavioral: {
    pastAttendance: string[];
    clipHistory: string[];
    tripsIntent: boolean;
  };
  contextual: {
    vibeTags: string[];
    venueTypes: string[];
    daypart: string[];
  };
  momentScore: {
    hypeLevel: number;
    crowdDensity: number;
  };
}

export interface CampaignPerformance {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  spend: number;
  roas: number;
  footTrafficLift: number;
}

// Sentiment Analysis Types
export interface VenueSentimentAnalysis {
  id: string;
  venue_id: string;
  overall_sentiment: number; // -1.0 to 1.0
  sentiment_summary: string;
  review_count: number;
  platform: string;
  themes: Record<string, number>; // e.g., {"ambience": 0.8, "service": 0.6}
  last_analyzed_at: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewSentimentCache {
  id: string;
  venue_id: string;
  platform: string;
  review_id: string;
  review_text: string;
  sentiment_score: number;
  themes: Record<string, number>;
  analyzed_at: string;
  expires_at: string;
}

export interface SentimentTheme {
  name: string;
  score: number;
  mentions: number;
  examples: string[];
}

export interface PlatformSentimentSummary {
  platform: string;
  overallSentiment: number;
  summary: string;
  themes: SentimentTheme[];
  reviewCount: number;
  lastUpdated: string;
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

export interface VenueIdea {
  id: string;
  trip_id: string;
  venue_id: string;
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_state: string;
  venue_type: string;
  venue_rating?: number;
  proposed_by_id: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  trip_venue_votes: Array<{
    id: string;
    vote_type: string;
    user_name: string;
    user_avatar: string;
  }>;
}

export * from "./index";
