
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isPrivate?: boolean;
  bio?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  type?: string;
  phone?: string;
  website?: string;
  rating?: number;
  price?: string;
  hours?: Record<string, string>;
  description?: string;
  tags?: string[];
  images?: string[];
  verified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: string[];
  timestamp: string;
  likes: number;
  comments: number;
  vibeTags?: string[]; // Array of vibe tags for the post
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: Location;
  startDate: string;
  endDate: string;
  media?: string[];
  ticketUrl?: string;
  price?: string;
  tags?: string[];
  attendees?: number;
  interested?: number;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  creator: User;
  collaborators: User[];
  places: TripPlace[];
  visibility: 'public' | 'private' | 'friends';
  status: 'planning' | 'in-progress' | 'completed';
}

export interface TripPlace {
  id: string;
  tripId: string;
  location: Location;
  notes?: string;
  date?: string;
  order: number;
  status: 'must-see' | 'tentative' | 'visited';
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'trip-invite' | 'trip-update' | 'check-in';
  read: boolean;
  timestamp: string;
  user: User;
  post?: Post;
  trip?: Trip;
  location?: Location;
  content?: string;
}
