
export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  followers?: number;
  following?: number;
  isVerified?: boolean;
  joinedDate?: string;
  location?: string;
  vibeTags?: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  images?: string[];
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  hours?: Record<string, string>;
  tags?: string[];
  vibeTags?: string[];
  verified?: boolean;
}

export interface EventItem extends Omit<Location, 'openNow' | 'hours'> {
  date?: string;
  startTime?: string;
  endTime?: string;
  performers?: string[];
  ticketPrice?: string;
  ticketUrl?: string;
  category?: string;
  venueName?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  timestamp: string;
  user?: User;
  likes?: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  userId: string;
  locationId?: string;
  content: string;
  media?: string[];
  timestamp: string;
  likes: number;
  comments: number;
  user?: User;
  location?: Location;
}

export interface SavedPlace {
  id: string;
  locationId: string;
  userId: string;
  savedAt: string;
  notes?: string;
  visitedAt?: string;
  rating?: number;
  status: 'visited' | 'want_to_visit';
  location?: Location;
}
