
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zip?: string;
  lat: number;
  lng: number;
  type: string;
  verified?: boolean;
  vibes?: string[];
  rating?: number;
  price_level?: number;
  phone?: string;
  website?: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  photos?: Array<{
    photo_reference: string;
    width: number;
    height: number;
  }>;
  business_status?: string;
  google_maps_url?: string;
}

export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}
