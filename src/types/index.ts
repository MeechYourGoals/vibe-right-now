export * from './geo';
export * from './insights';
export * from './entities/user';
export * from './features/advertising';
export * from './features/analytics';
export * from './features/sentiment';
export * from './venue';

import { GeoCoordinates } from './geo';
import { UserProfile } from './entities/user';
import { Venue } from './venue';

// Fix missing exports
export type Coordinates = GeoCoordinates;
export type UserProfileData = UserProfile;
export type UserProfileStats = UserProfile;

export interface CityData {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lng: number;
  venues: Venue[];
}
