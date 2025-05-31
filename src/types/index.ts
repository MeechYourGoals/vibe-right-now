export interface Location {
  id: string;
  name: string;
  city: string;
  state?: string;
  country?: string;
  type: 'restaurant' | 'bar' | 'event' | 'attraction' | 'sports' | 'other';
  lat: number;
  lng: number;
  rating?: number;
  reviews?: number;
  priceLevel?: number;
  hours?: string;
  verified?: boolean;
  photos?: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface BusinessHours {
  weekdayText: string[];
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }[];
  timestamp: string;
  likes: number;
  vibes: number;
  vibedHere: boolean;
  comments: Comment[];
  saved: boolean;
  isVenuePost?: boolean;
  isPinned?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface DateRange {
  from: Date;
  to?: Date;
}

export type ChatMode = 'user' | 'venue';

export interface Message {
  id: string;
  content: string;
  direction: MessageDirection;
  timestamp: Date;
  aiResponse?: boolean;
  text?: string;
  sender?: 'user' | 'ai';
}

export type MessageDirection = 'incoming' | 'outgoing';
