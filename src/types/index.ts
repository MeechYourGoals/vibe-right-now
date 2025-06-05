export interface LocationItem {
  id: string;
  name: string;
  address: string;
  category: LocationCategory;
  coverImage: string;
  rating: number;
  reviews: number;
  openingHours: string;
  closingHours: string;
  latitude: number;
  longitude: number;
  description: string;
  website: string;
  phone: string;
  email: string;
  vibes: string[];
  priceRange: string;
  amenities: string[];
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  ownerVerified: boolean;
  posts: number;
  followers: number;
  isFollowing: boolean;
  isClaimed: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  sponsoredUntil?: string;
  lastUpdated?: string;
  waitTime?: number;
  deals?: Deal[];
  events?: Event[];
  menu?: MenuItem[];
  gallery?: string[];
  externalReviews?: ExternalReview[];
  relatedLocations?: string[];
  isClosed?: boolean;
}

export type LocationCategory =
  | 'restaurant'
  | 'bar'
  | 'cafe'
  | 'club'
  | 'hotel'
  | 'event'
  | 'other';

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discount: number;
  expires: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  ticketsAvailable: number;
  category: EventCategory;
}

export type EventCategory =
  | 'music'
  | 'sports'
  | 'theater'
  | 'comedy'
  | 'art'
  | 'other';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: MenuItemCategory;
}

export type MenuItemCategory =
  | 'appetizer'
  | 'entree'
  | 'dessert'
  | 'drink'
  | 'other';

export interface ExternalReview {
  id: string;
  platform: string;
  rating: number;
  text: string;
  author: string;
  date: string;
}

export interface Post {
  id: string;
  venueId: string;
  userId: string;
  username: string;
  userAvatar: string;
  userVerified?: boolean;
  content: string;
  mediaType: 'image' | 'video' | 'none';
  mediaUrl?: string;
  timestamp: string;
  location: string;
  category: LocationCategory;
  likes: number;
  comments: number;
  vibes: string[];
  vibe?: number;
  waitTime?: number;
  lastUpdated?: string;
  externalPost?: boolean;
  platform?: 'yelp' | 'tripadvisor' | 'instagram' | 'foursquare' | 'google' | 'franki';
  platformId?: string;
  rating?: number;
  reviewText?: string;
  authorName?: string;
  authorAvatar?: string;
  authorReviewCount?: number;
  isSponsored?: boolean;
  sponsoredBy?: string;
  impressions?: number;
  saved?: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  verified?: boolean;
  followersCount?: number;
}

export interface Vibe {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface AnalyticsData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

export interface SentimentData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface PaymentMethod {
  id: string;
  type: string;
  cardNumber: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}
