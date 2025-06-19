
import { BaseEntity, GeoCoordinates, Timestamps } from '../core/base';

export interface Location extends BaseEntity, GeoCoordinates, Timestamps {
  name: string;
  address: string;
  city: string;
  country: string;
  state?: string;
  type: string;
  verified: boolean;
  rating?: number;
  price_level?: number;
  business_status?: string;
  phone?: string;
  website?: string;
  google_maps_url?: string;
  vibes?: string[];
  tags?: string[];
  hours?: {
    [key: string]: string | { open: string; close: string; closed?: boolean; };
  };
}
