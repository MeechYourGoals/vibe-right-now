
// Base type definitions
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
  displayName?: string;
  isPrivate?: boolean;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id?: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media?: Media[];
  timestamp: Date;
  expiresAt?: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  isVenuePost?: boolean;
  saved: boolean;
  vibeTags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
  vibedHere?: boolean;
  contentId?: string;
  parentId?: string;
  author?: User;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'published';
  engagement?: { likes: number; replies: number; reactions: any[] };
  moderation?: { status: 'approved'; flags: any[] };
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
  type: "restaurant" | "bar" | "nightclub" | "cafe" | "attraction" | "sports" | "event" | "city" | "other";
  verified: boolean;
  rating?: number;
  price_level?: number;
  vibes?: string[];
  business_status?: string;
  google_maps_url?: string;
  hours?: Record<string, string>;
  tags?: string[];
  phone?: string;
  website?: string;
  followers?: number;
  checkins?: number;
  userProfile?: any;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface UserProfileStats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export interface UserProfileData {
  profile: User | null;
  loading: boolean;
  error: string | null;
  userPosts: Post[];
  followedVenues: Location[];
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
  getFollowStatus: (userId: string) => boolean;
  getMutualFollowers: (userId: string) => User[];
  getUserPosts: (userId: string) => Post[];
  getUserStats: (userId: string) => UserProfileStats;
  getPostComments: (postId: string) => Comment[];
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
