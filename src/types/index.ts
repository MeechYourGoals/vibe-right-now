
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  lat: number; // alias for latitude
  lng: number; // alias for longitude
  category: string;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  rating: number;
  reviewCount: number;
  price: string;
  imageUrl: string;
  isFeatured: boolean;
  verified: boolean;
  country: string;
  images?: string[];
  vibeTags?: string[];
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    weekdayText?: string[];
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
  visitorsChange?: string;
  checkins?: number;
  viewsCount?: number;
  impressions?: number;
  posts?: number;
  postsChange?: string;
  likes?: number;
  likesChange?: string;
  mentions?: number;
  mentionsChange?: string;
  checkinsChange?: string;
  reviews?: number;
  reviewsChange?: string;
  rating?: number;
  ratingChange?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  user: User; // alias for author
  location: Location;
  timestamp: string;
  media?: Media[];
  likes: number;
  comments: Comment[];
  vibedHere: boolean;
  isLiked?: boolean;
  isPinned?: boolean;
  isVenueOwned?: boolean;
  expiresAt?: string;
  vibeTags?: string[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  isPrivate?: boolean;
  followerCount?: number;
  followingCount?: number;
  bio?: string;
  location?: string;
  joinedDate?: string;
  website?: string;
}

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  duration?: number;
  aspectRatio?: number;
}
