
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isPrivate?: boolean;
  bio?: string;
  verified?: boolean;
  isCelebrity?: boolean;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface BusinessHours {
  [day: string]: {
    open: string;
    close: string;
  };
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  lat: number;
  lng: number;
  type?: string;
  phone?: string;
  website?: string;
  rating?: number;
  price?: string;
  hours?: Record<string, string>;
  description?: string;
  tags?: string[];
  images?: string[];
  photos?: string[];
  verified?: boolean;
  country?: string;
  vibes?: string[];
  userProfile?: any;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: Media[];
  timestamp: string;
  likes: number;
  comments: number | Comment[];
  text?: string;
  vibeTags?: string[];
  vibes?: string[];
  isVenuePost?: boolean;
  isPinned?: boolean;
  expiresAt?: string;
  saved?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  text?: string;
  vibedHere?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: Location;
  startDate: string;
  endDate: string;
  media?: Media[];
  ticketUrl?: string;
  price?: string;
  tags?: string[];
  attendees?: number;
  interested?: number;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  creator: User;
  collaborators: User[];
  places: TripPlace[];
  visibility: 'public' | 'private' | 'friends';
  status: 'planning' | 'in-progress' | 'completed';
}

export interface TripPlace {
  id: string;
  tripId: string;
  location: Location;
  notes?: string;
  date?: string;
  order: number;
  status: 'must-see' | 'tentative' | 'visited';
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'trip-invite' | 'trip-update' | 'check-in';
  read: boolean;
  timestamp: string;
  user: User;
  post?: Post;
  trip?: Trip;
  location?: Location;
  content?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
}

export interface ExtractedIntent {
  intent: string;
  entities: Record<string, any>;
  confidence: number;
}

export interface VenueInsights {
  // Required legacy fields
  visitors: number;
  visitorsChange: number;
  posts: number;
  postsChange: number;
  engagement: number;
  engagementChange: number;
  likes: number;
  likesChange: number;
  comments: number;
  commentsChange: number;
  topPosts: Post[];
  demographics: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
    interests: Record<string, number>;
  };
  visitorsByTime: Record<string, number>;
  visitorsByDay: Record<string, number>;
  
  // Additional fields
  visitorCount?: number;
  checkInCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
  totalViews?: number;
  totalVisits?: number;
  totalSaves?: number;
  totalShares?: number;
  averageRating?: number;
  ratingCount?: number;
  totalReviews?: number;
  dailyViews?: Record<string, number>;
  peakHours?: Record<string, number>;
  demographicData?: any;
  competitiveInsights?: any;
  
  visitorChart?: {
    labels: string[];
    data: number[];
  };
  engagementChart?: {
    labels: string[];
    data: {
      comments: number[];
      likes: number[];
      shares: number[];
    };
  };
  period?: string;
  name?: string;
  id?: string;
}
