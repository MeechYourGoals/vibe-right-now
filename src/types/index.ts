
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  state?: string;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified?: boolean;
  description?: string;
  image?: string;
  tags?: string[];
  rating?: number;
  priceLevel?: number;
  businessHours?: BusinessHours;
  address?: string;
  phoneNumber?: string;
  website?: string;
  photos?: string[];
  reviews?: Review[];
  distance?: string;
  placeId?: string; // Google Places ID
  googleMapsUrl?: string; // Direct link to Google Maps
}

export interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  price_level?: number;
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
  types: string[];
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  website?: string;
  formatted_phone_number?: string;
}

export interface PlaceSearchRequest {
  query: string;
  location?: {
    lat: number;
    lng: number;
  };
  radius?: number;
  type?: string;
}

export interface BusinessHours {
  monday: { open: string; close: string; closed?: boolean };
  tuesday: { open: string; close: string; closed?: boolean };
  wednesday: { open: string; close: string; closed?: boolean };
  thursday: { open: string; close: string; closed?: boolean };
  friday: { open: string; close: string; closed?: boolean };
  saturday: { open: string; close: string; closed?: boolean };
  sunday: { open: string; close: string; closed?: boolean };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts?: number;
  verified?: boolean;
  isPrivate?: boolean;
  lastActive?: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  media?: MediaItem[];
  location?: Location;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  saved?: boolean;
  tags?: string[];
  type?: 'text' | 'image' | 'video' | 'location';
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  alt?: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  liked?: boolean;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface VenueIdea {
  id: string;
  venueId: string;
  venueName: string;
  venueAddress?: string;
  venueCity?: string;
  venueImageUrl?: string;
  venueRating?: number;
  proposedById: string;
  proposedByName: string;
  proposedByAvatar: string;
  notes?: string;
  status: "pending" | "approved" | "rejected";
  tripId: string;
  createdAt: string;
  updatedAt: string;
  votes?: VenueVote[];
}

export interface VenueVote {
  id: string;
  venueIdeaId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  voteType: "upvote" | "downvote";
  createdAt: string;
}

export interface VenueSentimentAnalysis {
  id: string;
  venueId: string;
  platform: string;
  overallSentiment: number;
  sentimentSummary: string;
  reviewCount: number;
  themes: Record<string, number>;
  lastAnalyzedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdFormat {
  id: string;
  name: string;
  dimensions: string;
  description: string;
  platform: string;
  pricing?: string;
}
