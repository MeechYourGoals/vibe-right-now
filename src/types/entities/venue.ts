
import { BaseEntity, GeoCoordinates, Address, Timestamps } from '../core/base';

export type LocationType = 
  | 'restaurant' 
  | 'bar' 
  | 'attraction' 
  | 'hotel' 
  | 'cafe' 
  | 'club' 
  | 'sports' 
  | 'shopping' 
  | 'entertainment' 
  | 'event'
  | 'nightclub'
  | 'nightlife'
  | 'other'
  | 'city';

export interface Location extends BaseEntity, GeoCoordinates, Address, Timestamps {
  name: string;
  type: LocationType;
  verified?: boolean;
  rating?: number;
  vibes?: string[];
  tags?: string[];
  description?: string;
  phone?: string;
  website?: string;
  hours?: string | { [key: string]: string | { open: string; close: string; closed?: boolean } };
  priceRange?: string;
  capacity?: number;
  amenities?: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  images?: string[];
  waitTime?: number;
  isOpen24Hours?: boolean;
}

export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}
