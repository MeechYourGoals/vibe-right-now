
import { BaseEntity } from '../core/base';
import { GeoCoordinates, Address } from '../core/base';

export interface Location extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  lat: number;
  lng: number;
  type: 'restaurant' | 'bar' | 'attraction' | 'sports' | 'nightlife' | 'music' | 'comedy' | 'venue';
  verified?: boolean;
  rating?: number;
  price_level?: number;
  business_status?: string;
  google_maps_url?: string;
  vibes?: string[];
  tags?: string[];
  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  userProfile?: {
    id: string;
    username: string;
    avatar: string;
    bio?: string;
    name: string;
    type?: 'regular' | 'celebrity' | 'venue';
    verified?: boolean;
  };
  // Optional timestamps that will be added by the system
  createdAt?: string;
  updatedAt?: string;
}

export interface Venue extends Location {
  description?: string;
  photos?: string[];
  phone?: string;
  website?: string;
  social_media?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  amenities?: string[];
  capacity?: number;
  dress_code?: string;
  parking?: boolean;
  accessibility?: boolean;
}
