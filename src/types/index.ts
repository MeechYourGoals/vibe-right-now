
export interface Location {
  id: string;
  name: string;
  address?: string;
  city: string;
  state?: string;
  country?: string;
  type: 'restaurant' | 'bar' | 'event' | 'attraction' | 'sports' | 'other';
  lat: number;
  lng: number;
  rating?: number;
  reviews?: number;
  priceLevel?: number;
  hours?: string | {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    isOpenNow: string;
    timezone: string;
  };
  verified?: boolean;
  photos?: string[];
  vibes?: string[];
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface BusinessHours {
  weekdayText: string[];
}

export interface Media {
  type: 'image' | 'video';
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
  likes: number;
  vibes: number;
  vibedHere: boolean;
  comments: Comment[];
  saved: boolean;
  isVenuePost?: boolean;
  isPinned?: boolean;
  vibeTags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  vibedHere?: boolean;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface DateRange {
  from: Date;
  to?: Date;
}

export type ChatMode = 'user' | 'venue';

export interface Message {
  id: string;
  content: string;
  direction: MessageDirection;
  timestamp: Date;
  aiResponse?: boolean;
  text?: string;
  sender?: 'user' | 'ai';
}

export type MessageDirection = 'incoming' | 'outgoing';

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
}

export interface AdFormat {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  maxFileSize: string;
}

export interface TargetingOptions {
  demographics: {
    ageRange: string[];
    gender: string[];
    interests: string[];
  };
  location: {
    radius: number;
    cities: string[];
  };
  behavior: {
    visitFrequency: string[];
    spendingHabits: string[];
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
  mentions: number;
}
