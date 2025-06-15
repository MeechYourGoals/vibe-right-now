
// Centralized mock data types
import { Post, Comment, Location, User } from '@/types';

export interface MockDataCollections {
  posts: Post[];
  comments: Comment[];
  locations: Location[];
  users: User[];
  celebrities: User[];
  discountOffers: any[];
  cityLocations: any[];
}

export interface CityDataCollection {
  [cityName: string]: {
    name: string;
    country: string;
    lat: number;
    lng: number;
    venues: Location[];
  };
}
