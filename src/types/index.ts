
export interface User {
  id: string;
  username: string;
  fullName?: string;  // Made optional to accommodate mock data
  name?: string;      // Added to accommodate mock data
  avatarUrl?: string; // Made optional to accommodate mock data
  avatar?: string;    // Added to accommodate mock data
  bio?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  isVerified?: boolean;
  
  // Added properties to match existing code
  verified?: boolean;
  isPrivate?: boolean;
  isCelebrity?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  verified: boolean;
  
  // Added properties to match existing code
  hours?: BusinessHours;
  vibes?: string[];
  tags?: string[];
  userProfile?: MockUserProfile;
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
  media: Media[];
  timestamp: string;
  expiresAt: string;
  likes: number;
  comments: number | Comment[]; // Updated to be either a number or array
  isPinned?: boolean;
  saved: boolean;
  isVenuePost?: boolean;
  text?: string; // For backward compatibility
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  text?: string; // For backward compatibility
  timestamp: string;
  vibedHere: boolean;
  likes?: number;
}

export interface Vibe {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Add BusinessHours interface
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen24Hours?: boolean;
}

// Add VenueInsights interface
export interface VenueInsights {
  totalViews: number;
  totalVisits: number;
  totalSaves: number;
  totalShares: number;
  averageRating: number;
  ratingCount: number;
  totalReviews: number;
  visitorCount: number;
  checkInCount: number;
  receiptUploads: number;
  discountRedemptions: number;
  dailyViews: Record<string, number>;
  peakHours: Record<string, number>;
  demographicData: {
    age: Record<string, number>;
    gender: Record<string, number>;
    location: Record<string, number>;
    ageGroups?: Record<string, number>;
  };
  competitiveInsights: {
    rank: number;
    totalCompetitors: number;
    marketShare: number;
    averageCompetitorRating: number;
  };
}

// Add ChatState interface for VernonNext component
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  verified?: boolean;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  isLoading: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  messages: ChatMessage[];
  searchResults?: any[];
  transcript: string;
  interimTranscript: string;
}

export type IntentType = 'search' | 'info' | 'question' | 'booking' | 'unknown';

export interface ExtractedIntent {
  type: IntentType;
  location?: string;
  date?: string;
  categories?: string[];
  keywords?: string[];
  mood?: string[];
}

// Add MockUserProfile for compatibility with existing code
export interface MockUserProfile {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  verified: boolean;
}
