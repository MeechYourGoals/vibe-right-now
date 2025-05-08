
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  verified?: boolean;
  bio?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  type: 'restaurant' | 'bar' | 'attraction' | 'event' | 'sports' | 'nightlife' | 'comedy' | 'music' | 'other';
  verified?: boolean;
  vibes?: string[];
  description?: string;
  websiteUrl?: string;
  phoneNumber?: string;
  priceLevel?: number;
  rating?: number;
  businessHours?: BusinessHours;
  photos?: string[];
  ownerIdentifier?: string;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  user?: User;  // For convenience when populating
  locationId: string;
  location?: Location;  // For convenience when populating
  timestamp: string;
  likes: number;
  comments: number;
  media?: Media[] | string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  user?: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export type DayHours = boolean | {
  open: boolean;
  openTime?: string;
  closeTime?: string;
};
