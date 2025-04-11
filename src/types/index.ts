export interface Location {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city: string;
  state: string;
  country?: string;
  lat: number;
  lng: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  hours?: any;
  phone?: string;
  website?: string;
  photos?: any[];
  tags?: string[]; // Added tags property for location
}
