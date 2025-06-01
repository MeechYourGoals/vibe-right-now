
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  isVerified?: boolean;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  type: string;
  verified: boolean;
  vibes?: string[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  location?: Location;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  user?: User;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  user?: User;
}

export interface CreditCard {
  id: string;
  lastFour: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isPrivate: boolean;
}

export interface VenueSentimentAnalysis {
  id: string;
  venue_id: string;
  platform: string;
  overall_sentiment: number;
  review_count: number;
  sentiment_summary: string;
  themes: Record<string, number>;
  created_at: string;
  updated_at: string;
  last_analyzed_at: string;
}
