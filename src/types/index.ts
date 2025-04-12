
export interface Location {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city: string;
  state: string;
  country?: string;
  lat: number;
  lng: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  hours?: BusinessHours | any;
  phone?: string;
  website?: string;
  photos?: any[];
  tags?: string[]; // Added tags property for location
  verified?: boolean; // Added verified property
  vibes?: string[]; // Added vibes property
  userProfile?: any; // Added for locationGenerator.ts
}

// Add these interfaces to fix the build errors
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen24Hours?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
  verified?: boolean;
  location?: string;
  website?: string;
  joinDate?: string;
  isPrivate?: boolean; // Added for regularUsers.ts
  isCelebrity?: boolean; // Added for celebrityUsers.ts
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  postId?: string;
  content?: string;
  vibedHere?: boolean; // Added for comments
}

export interface Media {
  id?: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content?: string;
  text?: string;
  media?: Media[];
  timestamp: string;
  likes: number;
  comments: number | Comment[];
  saved: boolean;
  expiresAt?: string;
  isPinned?: boolean;
  isVenuePost?: boolean;
}

export interface VenueInsights {
  id: string;
  venueName: string;
  totalVisits: number;
  uniqueVisitors: number;
  averageRating: number;
  topReasons: Array<{reason: string; count: number}>;
  demographics: {
    ageGroups: {[key: string]: number};
    gender: {[key: string]: number};
  };
  visitsByDay: {[key: string]: number};
  visitsByHour: {[key: string]: number};
  competitorAnalysis?: Array<{
    name: string;
    visitors: number;
    rating: number;
    distance: number;
  }>;
  visitorCount?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
  popularHours?: Record<string, number>;
  demographicData?: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
  };
  visitorTrends?: Array<{ date: string; count: number }>;
  mediaUploads?: number;
}

// Chat-specific interfaces
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  verified?: boolean;
  location?: {
    lat: number;
    lng: number;
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

export interface ExtractedIntent {
  type: 'search' | 'info' | 'question' | 'booking' | 'unknown';
  location?: string;
  date?: string;
  categories?: string[];
  mood?: string[];
  keywords?: string[];
}
