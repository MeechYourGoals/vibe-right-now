
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
  hours?: BusinessHours;
  phone?: string;
  website?: string;
  photos?: any[];
  tags?: string[]; // Added tags property for location
  verified?: boolean; // Added verified property
  vibes?: string[]; // Added vibes property
  isPopular?: boolean; // Added popular flag for trending venues
  priceRange?: string; // Added price range display string (e.g., "$$$")
  isFeatured?: boolean; // Added featured flag for promoted venues
  featuredUntil?: string; // Featured promotion end date
  temporarilyClosed?: boolean; // Flag for temporarily closed venues
  openNow?: boolean; // Flag for venues currently open
}

// Modified BusinessHours interface to fix type errors
export interface BusinessHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
  [key: string]: { open: string; close: string };
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
  isPrivate?: boolean; // Added to fix type errors
  isCelebrity?: boolean; // Added to fix type errors
}

// Updated Comment interface to include both text and content fields
export interface Comment {
  id: string;
  user: User;
  text: string;
  content?: string;
  timestamp: string;
  likes: number;
  postId?: string;
  vibedHere?: boolean;
}

export interface Post {
  id: string;
  user: User;
  location?: Location;
  text?: string;
  media?: Media[];
  timestamp: string;
  likes: number;
  comments: Comment[];
  saved: boolean;
  content?: string; // Added to fix type errors
  isVenuePost?: boolean; // Added to fix type errors
  isPinned?: boolean; // Added to fix type errors
  expiresAt?: string; // Added to fix type errors
}

// Updated Media interface to ensure id is always included
export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
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
  visitorCount?: number; // Added to fix type errors
  checkInCount?: number; // Added to fix type errors
  receiptUploads?: number; // Added to fix type errors
  discountRedemptions?: number; // Added to fix type errors
  popularHours?: {[key: string]: number}; // Added to fix type errors
}
