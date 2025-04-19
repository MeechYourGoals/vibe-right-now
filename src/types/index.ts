
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
  zip?: string; // Making zip optional to fix the error
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
  photos?: string[]; // Add photos property
  verified?: boolean;
  country?: string;
  vibes?: string[];
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: Media[];
  timestamp: string;
  likes: number;
  comments: number;
  text?: string; // Add text property for backward compatibility
  vibeTags?: string[]; // Array of vibe tags for the post
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
  text?: string; // For backward compatibility
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

// VernonChat types
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

// Venue insights types
export interface VenueInsights {
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
}
