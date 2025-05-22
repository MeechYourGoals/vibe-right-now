
// Merge and align types with src/types/index.ts
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
  hours?: Record<string, string>;
  vibes?: string[];
  vibeTags?: string[];
  userProfile?: MockUserProfile;
  rating?: number;
  followers?: number;
  checkins?: number;
  images?: string[];
  photos?: string[];
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
  visitorCount?: number;
  checkInCount?: number;
  checkInsCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
  checkins?: number;
  checkinsChange?: number;
  mentions?: number;
  mentionsChange?: number;
  reviews?: number;
  reviewsChange?: number;
  rating?: number;
  ratingChange?: number;
}

// Import types from main types file
export * from "./index";
