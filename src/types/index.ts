
export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isFollowing?: boolean;
  isPrivate?: boolean;
}

// Rename to avoid conflict with react-day-picker
export interface AppDateRange {
  from?: Date;
  to?: Date;
}

export interface CityCoordinates {
  lat: number;
  lng: number;
  name: string;
  state?: string;
  country: string;
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
  type: 'restaurant' | 'bar' | 'cafe' | 'nightclub' | 'museum' | 'park' | 'attraction' | 'sports' | 'event';
  verified?: boolean;
  rating?: number;
  tags?: string[];
  hours?: BusinessHours;
  amenities?: string[];
  photos?: string[];
  vibes?: string[];
  userProfile?: MockUserProfile;
  followers?: number;
  checkins?: number;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
  isOpen24Hours?: boolean;
}

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

// Add missing User interface
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isFollowing?: boolean;
  isPrivate?: boolean;
}

// Add missing Media interface
export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

// Add missing Post interface
export interface Post {
  id: string;
  user: User;
  location?: Location;
  content: string;
  media?: Media[];
  timestamp: string;
  expiresAt?: string;
  likes?: number;
  comments?: number;
  saved?: boolean;
  isPinned?: boolean;
  vibeTags?: string[];
}

// Add missing Comment interface
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  text?: string; // For backward compatibility
  timestamp: string;
  vibedHere?: boolean;
  likes?: number;
}

// Add missing advertising types
export interface AdFormat {
  id: string;
  name: string;
  description: string;
  dimensions?: string;
  type: 'image' | 'video' | 'carousel';
}

export interface TargetingOptions {
  demographics: {
    ageRange: [number, number];
    gender: 'all' | 'male' | 'female';
    interests: string[];
  };
  location: {
    radius: number;
    coordinates: [number, number];
    city?: string;
  };
  behavior: {
    visitFrequency: string;
    spendingHabits: string[];
  };
}

// Re-export DateRange as AppDateRange to avoid conflicts
export type DateRange = AppDateRange;

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
}
