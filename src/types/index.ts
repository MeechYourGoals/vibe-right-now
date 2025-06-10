
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
  isCelebrity?: boolean;
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
  type: 'restaurant' | 'bar' | 'cafe' | 'nightclub' | 'museum' | 'park' | 'attraction' | 'sports' | 'event' | 'other';
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
  isCelebrity?: boolean;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

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
  isVenuePost?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  text?: string;
  timestamp: string;
  vibedHere?: boolean;
  likes?: number;
}

export interface AdFormat {
  id: string;
  name: string;
  description: string;
  dimensions?: string;
  type: 'image' | 'video' | 'carousel' | 'MomentCard' | 'VibeOverlay' | 'SpawnPoint' | 'HeatRingTakeover';
  duration?: number;
  placement?: string;
  kpis?: string[];
}

export interface TargetingOptions {
  demographics: {
    ageRange: [number, number];
    gender: 'all' | 'male' | 'female' | string[];
    interests: string[];
    location?: {
      radius: number;
      coordinates: [number, number];
      city?: string;
    };
  };
  location: {
    radius: number;
    coordinates: [number, number];
    city?: string;
  };
  behavior: {
    visitFrequency: string;
    spendingHabits: string[];
    pastAttendance?: string[];
    tripsIntent?: string;
  };
  behavioral?: {
    visitFrequency: string;
    spendingHabits: string[];
  };
  contextual?: {
    timeOfDay: string[];
    dayOfWeek: string[];
    weather: string[];
    events: string[];
    vibeTags?: string[];
    venueTypes?: string[];
    daypart?: string[];
  };
  momentScore?: {
    threshold: number;
    factors: string[];
    hypeLevel?: number;
    crowdDensity?: number;
  };
}

export type DateRange = AppDateRange;

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

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface ReviewSummary {
  id: string;
  venueId: string;
  platform: string;
  overallSentiment: number;
  sentimentSummary: string;
  totalReviews: number;
  averageRating: number;
  themes: Record<string, number>;
  lastUpdated: string;
  reviewsAnalyzed: number;
}
