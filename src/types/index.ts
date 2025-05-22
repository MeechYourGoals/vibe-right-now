
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
  content?: string; 
  locationId?: string;
  location: Location;
  timestamp: string;
  likes: number;
  comments: number;
  media: Media[];
  isPinned?: boolean;
  isVenuePost?: boolean;
  vibeTags?: string[];
  expiresAt?: string;
  saved?: boolean; // Add saved property for posts
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
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" | "nightclub" | "lounge" | "music_venue" | "comedy_club";
  verified?: boolean;
  isVerified?: boolean;
  hours?: Record<string, string>;
  vibes?: string[];
  vibeTags?: string[];
  images?: string[];
  userProfile?: any;
  rating?: number;
  followers?: number;
  checkins?: number;
  photos?: string[];
  categories?: string[];
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
  visitorsChange: number | string;
  posts: number;
  postsChange: number | string;
  likes: number;
  likesChange: number | string;
  mentions: number;
  mentionsChange: number | string;
  checkins: number;
  checkinsChange: number | string;
  reviews: number;
  reviewsChange: number | string;
  rating: number;
  ratingChange: number | string;
  visitorCount?: number;
  checkInCount?: number;
  checkInsCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
  viewsCount?: number;
  shares?: number;
  sharesChange?: string;
  engagementRate?: string;
  followerGrowth?: string;
  clickThroughRate?: string;
  totalVisits?: number;
  revenueImpact?: string;
  totalReach?: number;
  impressions?: number;
  viewsPer?: number;
}

// Fix the PostCard props issue
export interface PostCardProps {
  post?: Post;
  posts?: Post[];
  locationPostCount?: number;
  getComments?: (postId: string) => Comment[];
  comments?: Comment[];
  canDelete?: boolean;
  venue?: Location;
  onPostDeleted?: (postId: string) => void;
}
