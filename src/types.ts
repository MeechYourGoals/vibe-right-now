export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthday?: string;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  content: string;
  media?: string[];
  authorId: string;
  locationId: string;
  timestamp: string;
  likes?: number;
  comments?: number;
  shares?: number;
  author: User;
  location: Location;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  timestamp: string;
  author: User;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen24Hours?: boolean;
}

// Update the Location type to include geminiSummary
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  type?: string;
  category?: string;
  description?: string;
  phone?: string;
  website?: string;
  hours?: BusinessHours;
  rating?: number;
  tags?: string[];
  vibes?: string[];
  distance?: number;
  photos?: string[];
  reviews?: any[];
  geminiSummary?: string; // Add this field
  verified?: boolean; // For showing if the location data is real or mock
}
