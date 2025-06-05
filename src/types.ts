
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  hours?: BusinessHours | any;
  description?: string;
  rating?: number;
  tags?: string[];
  photos?: string[];
  website?: string;
  phone?: string;
  menu?: string;
  priceRange?: string;
  vibes?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isDiscounted?: boolean;
  verified?: boolean;
  zip?: string;
  followers?: number;
  checkins?: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  isVerified?: boolean;
  verified?: boolean;
  isCelebrity?: boolean;
  isPrivate?: boolean;
  type?: 'regular' | 'celebrity' | 'venue';
  followers?: number;
  following?: number;
  posts?: number;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  timestamp: string;
  content: string;
  media: Media[];
  likes: number;
  comments: number;
  shares?: number;
  isPinned?: boolean;
  isVenuePost?: boolean;
  vibeTags?: string[];
  expiresAt?: string;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  timestamp: string;
  content: string;
  text?: string;
  vibedHere?: boolean;
  likes?: number;
}

export interface Event {
  id: string;
  name: string;
  location: Location;
  startTime: string;
  endTime: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  price?: number;
  isFeatured?: boolean;
}

export interface BusinessHours {
  monday: { open: string; close: string } | string;
  tuesday: { open: string; close: string } | string;
  wednesday: { open: string; close: string } | string;
  thursday: { open: string; close: string } | string;
  friday: { open: string; close: string } | string;
  saturday: { open: string; close: string } | string;
  sunday: { open: string; close: string } | string;
  isOpenNow?: string;
  timezone?: string;
  isOpen24Hours?: boolean;
}

export interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}

export interface VenueIdea {
  id: string;
  trip_id: string;
  venue_id: string;
  venue_name: string;
  venue_address?: string;
  venue_city?: string;
  venue_image_url?: string;
  venue_rating?: number;
  proposed_by_id: string;
  proposed_by_name: string;
  proposed_by_avatar: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  trip_venue_votes?: VenueVote[];
}

export interface VenueVote {
  id: string;
  venue_idea_id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  vote_type: "up" | "down";
  created_at: string;
}

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

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

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

export interface VenueSentimentAnalysis {
  id: string;
  venue_id: string;
  platform: string;
  overall_sentiment: number;
  sentiment_summary: string;
  themes: Record<string, number>;
  review_count: number;
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
