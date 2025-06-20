
import { BaseEntity, Address, GeoCoordinates, Timestamps } from '../core/base';

export type LocationType = 
  | "restaurant" 
  | "bar" 
  | "nightclub" 
  | "cafe" 
  | "attraction" 
  | "sports" 
  | "event" 
  | "city" 
  | "other" 
  | "nightlife";

export interface Location extends BaseEntity, Address, GeoCoordinates, Timestamps {
  name: string;
  type: LocationType;
  verified: boolean;
  rating?: number;
  price_level?: number;
  vibes?: string[];
  business_status?: string;
  google_maps_url?: string;
  tags?: string[];
  phone?: string;
  website?: string;
  followers?: number;
  checkins?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Venue extends Location {
  description?: string;
  photos?: string[];
  amenities?: string[];
  capacity?: number;
  priceRange?: string;
  cuisine?: string[];
  musicGenres?: string[];
  dressCode?: string;
  ageRestriction?: number;
  parking?: boolean;
  wifi?: boolean;
  outdoor?: boolean;
  reservations?: boolean;
  delivery?: boolean;
  takeout?: boolean;
  accessibility?: boolean;
  petFriendly?: boolean;
  liveMusic?: boolean;
  danceFloor?: boolean;
  rooftop?: boolean;
  waterfront?: boolean;
  happyHour?: {
    days: string[];
    startTime: string;
    endTime: string;
    details?: string;
  };
  events?: {
    id: string;
    name: string;
    date: string;
    time: string;
    description?: string;
    price?: number;
    capacity?: number;
  }[];
}
