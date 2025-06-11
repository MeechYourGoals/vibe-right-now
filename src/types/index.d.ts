
// If this file doesn't exist, we're creating it
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
}

export interface Media {
  type: "image" | "video";
  url: string;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media?: Media[];
  timestamp: string;
  expiresAt?: string;
  likes: User[]; // Array of users who liked the post
  comments: number;
  isPinned?: boolean;
  isVenuePost?: boolean;
  saved: boolean; // Added missing property
  vibeTags?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: User[];
  replies?: Comment[];
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
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  hours?: Record<string, string>;
  vibes?: string[];
  userProfile?: MockUserProfile;
  rating?: number;
  followers?: number;
  checkins?: number;
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
  viewsCount?: number; // Adding as optional for backward compatibility
}

export * from "./index";
