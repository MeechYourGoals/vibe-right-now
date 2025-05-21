
// Types for Post
export interface Post {
  id: string;
  userId?: string; // Make userId optional as specified
  user: User;
  location: Location;
  content: string;
  media: (string | Media)[];
  timestamp: string;
  expiresAt?: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  vibeTags?: string[];
  locationId?: string;
}

// User interfaces
export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  isVerified?: boolean;
  isPremium?: boolean;
}

// Location interfaces
export interface Location {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  photos?: Media[];
  hours?: BusinessHours;
  phone?: string;
  website?: string;
  vibeTags?: string[];
  socialLinks?: SocialLinks;
  description?: string;
  amenities?: string[];
  attributes?: { [key: string]: any };
  url?: string;
}

// Media interface
export interface Media {
  id?: string;
  url: string;
  type?: 'image' | 'video';
  width?: number;
  height?: number;
  alt?: string;
  thumbnailUrl?: string;
}

// BusinessHours interface
export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  isOpen?: boolean;
  opensAt?: string;
  closesAt?: string;
}

// SocialLinks interface
export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  website?: string;
}

// Comment interface
export interface Comment {
  id: string;
  userId: string;
  user: User;
  postId: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

// VenueInsights interface
export interface VenueInsights {
  id: string;
  venueId: string;
  totalVisits: number;
  uniqueVisitors: number;
  peakHours: { [hour: string]: number };
  popularDays: { [day: string]: number };
  averageRating: number;
  reviewCount: number;
  sentimentScore: number;
  popularKeywords: string[];
  demographics?: {
    age?: { [range: string]: number };
    gender?: { [type: string]: number };
    location?: { [area: string]: number };
  };
  competitorComparison?: {
    [competitorId: string]: {
      name: string;
      performanceRatio: number;
    };
  };
}

// Credit Card interface
export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}

// Event Item interface
export interface EventItem {
  id: string;
  name: string;
  venueId: string;
  venue?: Location;
  date: string;
  time: string;
  description?: string;
  imageUrl?: string;
  ticketLink?: string;
  price?: string | number;
  category?: string;
  tags?: string[];
}

// Social Media API Keys interface
export interface SocialMediaApiKeys {
  instagram: string;
  tiktok: string;
  franki: string;
  yelp: string;
  tripadvisor: string;
  google: string;
  foursquare: string;
  other: string;
  otherUrl: string;
}
