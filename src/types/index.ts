
export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
  isVerified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  vibeTags?: string[];
  coverPhoto?: string;
  joinedDate?: string;
  location?: string;
  isPrivate?: boolean;
  isCelebrity?: boolean;
  verified?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
  vibedHere: boolean;
  likes: number;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  media: Media[];
  location: Location;
  timestamp: string;
  likes: number;
  comments: number;
  vibeTags?: string[];
  isSponsored?: boolean;
  sponsorInfo?: {
    name: string;
    logo: string;
    cta: string;
  };
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
  userProfile?: User;
  rating?: number;
  followers?: number;
  checkins?: number;
}

export interface BusinessHours {
  [key: string]: string;
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
}
