export interface LocationItem {
  id: string;
  name: string;
  address: string;
  category: LocationCategory;
  type: LocationCategory; // Add type property as alias for category
  city: string; // Add city property
  state?: string; // Add state property
  country?: string; // Add country property
  verified?: boolean; // Add verified property
  tags?: string[]; // Add tags property
  hours?: BusinessHours; // Add hours property
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

// Add Location type alias for compatibility
export type Location = LocationItem;

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
  media?: Media[]; // Add media property
  timestamp: string;
  location: LocationItem; // Change from string to LocationItem
  category: LocationCategory;
  likes: number;
  comments: number;
  vibes: string[];
  vibeTags?: string[]; // Add vibeTags property
  user?: User; // Add user property
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
  name?: string; // Add name property for compatibility
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar: string;
  user?: User; // Add user property
  content: string;
  text?: string; // Add text property as alias
  timestamp: string;
  likes: number;
  vibedHere?: boolean; // Add vibedHere property
  replies?: Comment[];
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
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
}

export interface AdFormat {
  id: string;
  name: string;
  description: string;
  type?: string; // Add type property
  dimensions: string;
  platforms: string[];
}

export interface TargetingOptions {
  demographics: {
    ageRange: { min: number; max: number };
    gender: string[];
    education: string[];
    income: string[];
  };
  interests: string[];
  behaviors: string[];
  locations: {
    countries: string[];
    cities: string[];
    radius: number;
  };
  customAudiences: string[];
}

export interface PlatformSentimentSummary {
  platform: string;
  totalReviews: number;
  averageRating: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  trending: 'up' | 'down' | 'stable';
}

export interface SentimentTheme {
  theme: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  examples: string[];
}

// Business Hours interface
export interface BusinessHours {
  [key: string]: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpenNow: string;
  timezone: string;
}
