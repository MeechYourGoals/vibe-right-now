
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
  isVerified?: boolean; // Previously referenced as 'verified'
  isCelebrity?: boolean; // Add for UserProfileHeader
  joinedDate?: string;
  location?: string;
  vibeTags?: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  country?: string; // Add for several components
  zipCode?: string;
  zip?: string; // Some components use zip instead of zipCode
  lat?: number;
  lng?: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  images?: string[];
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  hours?: Record<string, string>;
  tags?: string[];
  vibeTags?: string[];
  vibes?: string[]; // Add for InfoWindowContent
  verified?: boolean;
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface EventItem extends Omit<Location, 'openNow' | 'hours'> {
  date?: string;
  startTime?: string;
  endTime?: string;
  performers?: string[];
  ticketPrice?: string;
  ticketUrl?: string;
  category?: string;
  venueName?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  timestamp: string;
  user?: User;
  likes?: number;
  replies?: Comment[];
  text?: string; // For backward compatibility
  vibedHere?: boolean; // Add for CommentItem
}

export interface Post {
  id: string;
  userId?: string; // Make optional since many mock posts don't include it
  locationId?: string;
  content: string;
  media?: Media[] | string[];
  timestamp: string;
  likes: number;
  comments: number | Comment[];
  user?: User;
  location?: Location;
  vibeTags?: string[]; // Add for PostFeed, ProfileTabContent, etc.
  isPinned?: boolean; // Add for PostCard, PostHeader
  isVenuePost?: boolean; // Add for PostCard
  saved?: boolean;
  expiresAt?: string;
}

export interface SavedPlace {
  id: string;
  locationId: string;
  userId: string;
  savedAt: string;
  notes?: string;
  visitedAt?: string;
  rating?: number;
  status: 'visited' | 'want_to_visit';
  location?: Location;
}

export interface VenueInsights {
  visitors?: number;
  visitorsChange?: string;
  visitorCount?: number;
  posts?: number;
  postsChange?: string;
  shares?: number;
  sharesChange?: string;
  likes?: number;
  likesChange?: string;
  engagementRate?: string;
  followerGrowth?: string;
  clickThroughRate?: string;
  totalVisits?: number;
  revenueImpact?: string;
  totalReach?: number;
  impressions?: number;
  viewsPer?: number;
  viewsCount?: number;
  checkInCount?: number;
  checkInsCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}
