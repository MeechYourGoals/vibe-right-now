export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthday?: string;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
  verified?: boolean;
  isCelebrity?: boolean;
  isPrivate?: boolean;
}

export interface Post {
  id: string;
  content: string;
  media?: string[] | Media[];
  authorId: string;
  locationId: string;
  timestamp: string;
  likes?: number;
  comments?: number | Comment[];
  shares?: number;
  author?: User;
  location: Location;
  user?: User;
  vibeTags?: string[];
  isVenuePost?: boolean;
  isPinned?: boolean;
  expiresAt?: string;
  saved?: boolean;
  text?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId?: string;
  content: string;
  timestamp: string;
  author?: User;
  user?: User;
  likes?: number;
  vibedHere?: boolean;
  text?: string;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen24Hours?: boolean;
  [day: string]: string | boolean | undefined;
}

// Update the Location type to include geminiSummary
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  type?: string;
  category?: string;
  description?: string;
  phone?: string;
  website?: string;
  hours?: BusinessHours | Record<string, string[]>;
  rating?: number;
  tags?: string[];
  vibes?: string[];
  distance?: number | string;
  photos?: string[];
  reviews?: any[];
  geminiSummary?: string; // Add this field
  verified?: boolean; // For showing if the location data is real or mock
  country?: string;
  zip?: string;
  images?: string[];
  price?: string;
  amenities?: any[];
}

export interface VenueInsights {
  visitors?: number;
  visitorsCount?: number;
  visitorsChange?: number;
  posts?: number;
  postsChange?: number;
  engagement?: number;
  engagementChange?: number;
  likes?: number;
  likesChange?: number;
  comments?: number;
  commentsChange?: number;
  topPosts?: Post[];
  demographics?: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
    interests: Record<string, number>;
  };
  visitorsByTime?: Record<string, number>;
  visitorsByDay?: Record<string, number>;
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
}

// Add Venue type that extends Location
export interface Venue extends Location {
  ownerId?: string;
}
