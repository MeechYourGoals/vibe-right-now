

// Export all types
export * from './custom';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  followers?: number;
  following?: number;
  posts?: number;
  isVerified?: boolean;
  isCelebrity?: boolean;
  isPrivate?: boolean;
  vibeTags?: string[];
}

export interface Media {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  vibedHere: boolean;
  likes: number;
  text?: string; // For backwards compatibility
}

export interface Post {
  id: string;
  user: User;
  userId: string; 
  text?: string;
  content?: string; // Adding content field
  locationId?: string;
  location: Location;
  timestamp: string;
  likes: number;
  comments: number;
  media: Media[];
  isPinned?: boolean;
  isVenuePost?: boolean;
  vibeTags?: string[];
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
  vibeTags?: string[];
  images?: string[];
  userProfile?: any;
  rating?: number;
  followers?: number;
  checkins?: number;
  photos?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  image?: string;
  description?: string;
  price?: string;
}

export interface VenueInsights {
  visitors: number;
  visitorsChange: number;
  posts: number;
  postsChange: number;
  likes: number;
  likesChange: number;
  mentions: number;
  mentionsChange: number;
  checkins: number;
  checkinsChange: number;
  reviews: number;
  reviewsChange: number;
  rating: number;
  ratingChange: number;
  // Additional fields needed for MetricsOverview component
  visitorCount?: number;
  checkInCount?: number;
  checkInsCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
  // Fields from types.d.ts
  viewsCount?: number;
  visitorsChange?: string;
  postsChange?: string;
  sharesChange?: string;
  likesChange?: string;
  engagementRate?: string;
  followerGrowth?: string;
  clickThroughRate?: string;
  totalVisits?: number;
  revenueImpact?: string;
  totalReach?: number;
  impressions?: number;
  viewsPer?: number;
  shares?: number;
}

// Fix the PostCard props issue
export interface PostCardProps {
  post?: Post;
  posts?: Post[];
  locationPostCount?: number;
  getComments?: (postId: string) => Comment[];
}

