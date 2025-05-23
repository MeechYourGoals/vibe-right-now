
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
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other" | "music_venue" | "comedy_club" | "nightclub" | "lounge";
  rating: number;
  reviewCount: number;
  price: string;
  imageUrl: string;
  isFeatured: boolean;
  verified: boolean;
  country: string;
  images?: string[];
  vibeTags?: string[];
  vibes?: string[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    weekdayText?: string[];
    isOpen24Hours?: boolean;
    isOpenNow?: string;
    timezone?: string;
  };
  openingHours?: {
    weekdayText: string[];
  };
  formattedPhoneNumber: string;
  website: string;
  reservable: boolean;
  customerId?: string;
  followers?: number;
  checkins?: number;
  userProfile?: {
    id: string;
    username: string;
    avatar: string;
    bio?: string;
    verified: boolean;
  };
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  location: Location;
  startTime: string;
  endTime: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  price: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  reservable: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
  vibedHere: boolean;
  likes: number;
}

export interface VenueInsights {
  totalVisits?: number;
  visitors?: number;
  visitorsChange?: number;
  checkins?: number;
  viewsCount?: number;
  impressions?: number;
  posts?: number;
  postsChange?: number;
  likes?: number;
  likesChange?: number;
  mentions?: number;
  mentionsChange?: number;
  checkinsChange?: number;
  reviews?: number;
  reviewsChange?: number;
  rating?: number;
  ratingChange?: number;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  user: User;
  location: Location;
  timestamp: string;
  media?: Media[];
  likes: number;
  comments: Comment[];
  vibedHere: boolean;
  isLiked?: boolean;
  isPinned?: boolean;
  isVenueOwned?: boolean;
  isVenuePost?: boolean;
  expiresAt?: string;
  vibeTags?: string[];
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  isVerified?: boolean;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  isCelebrity?: boolean;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

// Social Media Types (Google ecosystem only)
export interface SocialMediaPost {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  platform: 'google' | 'yelp' | 'instagram';
  imageUrl?: string;
  likes?: number;
  comments?: number;
  rating?: number;
  venueName: string;
  source: 'google' | 'yelp' | 'instagram' | 'other';
  url?: string;
}

export interface SocialMediaApiKeys {
  instagram: string;
  yelp: string;
  google: string;
}
