// If this file doesn't exist, create it

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string; // Added to match required type
  country: string;
  lat: number;
  lng: number;
  type: string;
  verified: boolean;
  vibes?: string[];
  description?: string;
  photos?: string[];
  phone?: string;
  website?: string;
  hours?: Record<string, string>;
  price?: string;
  rating?: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string; // Required field per error
  venueId?: string;
  location: string;
  type: string;
  price: string;
  ticketsAvailable: number; // Required field per error
  imageUrl: string;
  ticketUrl: string;
  tags?: string[];
  ownerId?: string;
  featured?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Add other type definitions as needed
