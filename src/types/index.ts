export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string | null;
  zip: string;
  latitude: number;
  longitude: number;
  lat: number;
  lng: number;
  category: string;
  type: 'food' | 'drink' | 'event' | 'sports' | 'nightlife' | 'other';
  rating: number;
  reviewCount: number;
  price: string;
  imageUrl: string;
  isFeatured: boolean;
  verified: boolean;
  country: string;
  formattedPhoneNumber: string;
  website: string;
  reservable: boolean;
  images?: string[];
  vibeTags?: string[];
  hours?: string;
  openingHours?: OpeningHours[];
  customerId?: string;
  followers?: number;
  checkins?: number;
  userProfile?: UserProfile;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface UserProfile {
  id: string;
  bio: string;
  interests: string[];
  photos: string[];
}

export interface Post {
  id: string;
  content: string;
  timestamp: string;
  location?: Location;
  media?: Media[];
  likes: number;
  comments: Comment[];
  shares: number;
  user: User;
  author: User;
  vibeTags?: string[];
  vibedHere?: boolean;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: string;
  user: User;
  likes: number;
  replies: Comment[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  location: Location;
  startTime: string;
  endTime: string;
  imageUrl: string;
  tags: string[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface SearchFilters {
  category: string;
  location: UserLocation | null;
  date: string;
  time: string;
}

export interface Vibe {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface City {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: User;
  post?: Post;
  comment?: Comment;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
}

export interface Subscription {
  id: string;
  plan: PricingPlan;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'past_due';
  paymentMethod: CreditCard;
}

export interface CreditCard {
  id: string;
  lastFour: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate?: boolean;
  website?: string;
  location?: string;
  joinedDate?: string;
}
