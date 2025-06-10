export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isFollowing?: boolean;
  isPrivate?: boolean;
}

export interface CityCoordinates {
  lat: number;
  lng: number;
  name: string;
  state?: string;
  country: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: 'restaurant' | 'bar' | 'cafe' | 'nightclub' | 'museum' | 'park' | 'attraction' | 'sports' | 'event';
  verified?: boolean;
  rating?: number;
  tags?: string[];
  hours?: BusinessHours;
  amenities?: string[];
  photos?: string[];
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

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}
