
export interface User {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  joinedDate: string;
  location?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  // Legacy properties for backward compatibility
  avatar?: string;
  name?: string;
  postsCount?: number;
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
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: 'restaurant' | 'bar' | 'nightclub' | 'lounge' | 'music_venue' | 'comedy_club' | 'attraction' | 'sports' | 'event' | 'other';
  rating?: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  photos?: string[];
  description?: string;
  amenities?: string[];
  vibeScore?: number;
  isOpen?: boolean;
  city: string;
  state?: string;
  country: string;
  source: string;
  created_at?: string;
  updated_at?: string;
  // Additional properties
  type?: 'restaurant' | 'bar' | 'nightclub' | 'lounge' | 'music_venue' | 'comedy_club' | 'attraction' | 'sports' | 'event' | 'other';
  verified?: boolean;
  isVerified?: boolean;
  hours?: BusinessHours;
  vibes?: number;
  // Legacy properties for backward compatibility
  latitude?: number;
  longitude?: number;
  zip?: string;
  reviewCount?: number;
  price?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  formattedPhoneNumber?: string;
  website?: string;
  reservable?: boolean;
  images?: string[];
  vibeTags?: string[];
  openingHours?: string;
  customerId?: string;
  followers?: number;
  checkins?: number;
  userProfile?: any;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  images?: string[];
  videos?: string[];
  location?: Location;
  timestamp: string;
  likes: number;
  comments: number | Comment[];
  shares: number;
  isLiked?: boolean;
  vibeTag?: string;
  momentScore?: number;
  // Additional properties
  media?: Media[];
  author?: User;
  vibeTags?: string[];
  vibedHere?: boolean;
  isPinned?: boolean;
  expiresAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  vibedHere?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: Location;
  category: 'music' | 'sports' | 'food' | 'nightlife' | 'arts' | 'comedy' | 'other';
  price?: number;
  image?: string;
  attendees: number;
  isAttending?: boolean;
  organizer: User;
  tags?: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  type: 'text' | 'location' | 'recommendation';
  data?: any;
}

export interface MessageContext {
  messages: Message[];
  options?: ProcessMessageOptions;
  paginationState?: any;
  query?: string;
}

export interface ProcessMessageOptions {
  includeLocation?: boolean;
  includeVibeData?: boolean;
  maxResults?: number;
  temperature?: number;
  setIsTyping?: (isTyping: boolean) => void;
  setIsSearching?: (isSearching: boolean) => void;
  updatePaginationState?: (state: any) => void;
  isVenueMode?: boolean;
}

export interface MessageProcessor {
  canHandle: (context: MessageContext) => boolean;
  process: (context: MessageContext) => Promise<Message>;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  name: string;
  expMonth: number;
  expYear: number;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}

export type SocialMediaSource = 'instagram' | 'google' | 'yelp' | 'tiktok' | 'tripadvisor' | 'foursquare' | 'franki' | 'other';

export interface SocialMediaPost {
  id: string;
  content: string;
  author: string;
  username: string;
  userAvatar?: string;
  venueName?: string;
  rating?: number;
  timestamp: string;
  platform: string;
  source: SocialMediaSource;
  likes?: number;
  comments?: number;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  originalUrl?: string;
}

export interface VenueInsights {
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  engagementRate: number;
  topVibeTag: string;
  peakHours: string;
  totalVisits: number;
  visitors: number;
  visitorsChange: number;
  checkins: number;
  viewsCount: number;
  impressions: number;
  demographics: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
  };
}

export interface SocialMediaApiKeys {
  instagram?: string;
  google?: string;
  yelp?: string;
  tiktok?: string;
  tripadvisor?: string;
  foursquare?: string;
  franki?: string;
  other?: string;
  otherUrl?: string;
}
