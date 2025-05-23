export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  category: string;
  rating: number;
  reviewCount: number;
  price: string;
  imageUrl: string;
  isFeatured: boolean;
  openingHours: {
    weekdayText: string[];
  };
  formattedPhoneNumber: string;
  website: string;
  reservable: boolean;
  customerId?: string;
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
