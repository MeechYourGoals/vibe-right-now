export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  isVerified?: boolean;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state?: string;
  country?: string;
  latitude: number;
  longitude: number;
  rating?: number;
  reviewCount?: number;
  hours?: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  verified?: boolean;
  description?: string;
  phoneNumber?: string;
  website?: string;
  email?: string;
  priceRange?: string;
  amenities?: string[];
  images?: string[];
}

export interface Media {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Event {
  id: string;
  location: Location;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  media: Media[];
  tags: string[];
}

export interface Notification {
  id: string;
  user: User;
  type: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  users: User[];
  messages: Message[];
}

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  imageUrl?: string;
  collaborators: User[];
  places: TripPlace[];
}

export interface TripPlace {
  id: string;
  place: Location;
  addedBy: User;
  notes?: string;
  addedAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

// Update Post interface to include saved property
export interface Post {
  id: string;
  user: User;
  content: string;
  media: Media[];
  timestamp: string;
  likes: number;
  location: Location;
  vibeTags?: string[];
  isPinned?: boolean;
  isVenuePost?: boolean;
  saved?: boolean; // Add this property
}
