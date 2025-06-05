export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  hours?: BusinessHours | any;
  description?: string;
  rating?: number;
  tags?: string[];
  photos?: string[];
  website?: string;
  phone?: string;
  menu?: string;
  priceRange?: string;
  vibes?: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isDiscounted?: boolean;
  verified?: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  timestamp: string;
  content: string;
  media: Media[];
  likes: number;
  comments: number;
  isPinned?: boolean;
  isVenuePost?: boolean;
  vibeTags?: string[];
}

export interface Media {
  type: "image" | "video";
  url: string;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  timestamp: string;
  content: string;
}

export interface Event {
  id: string;
  name: string;
  location: Location;
  startTime: string;
  endTime: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  price?: number;
  isFeatured?: boolean;
}

export interface BusinessHours {
  monday: { open: string; close: string } | string;
  tuesday: { open: string; close: string } | string;
  wednesday: { open: string; close: string } | string;
  thursday: { open: string; close: string } | string;
  friday: { open: string; close: string } | string;
  saturday: { open: string; close: string } | string;
  sunday: { open: string; close: string } | string;
  isOpenNow: string;
  timezone: string;
  isOpen24Hours: boolean;
}

export interface City {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  maxSpendLimit?: number;
  vernonApproved?: boolean;
}
