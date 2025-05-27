
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
  comments: number;
  shares: number;
  isLiked?: boolean;
  vibeTag?: string;
  momentScore?: number;
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
}

export interface ProcessMessageOptions {
  includeLocation?: boolean;
  includeVibeData?: boolean;
  maxResults?: number;
  temperature?: number;
}

export type SocialMediaSource = 'instagram' | 'google' | 'yelp' | 'other';

export interface SocialMediaPost {
  id: string;
  content: string;
  author: string;
  rating?: number;
  timestamp: string;
  platform: string;
  source: SocialMediaSource;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}
