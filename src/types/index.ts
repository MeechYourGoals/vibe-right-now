
// Re-export all types from the entities
export * from './entities/venue';
export * from './core/base';

// Define CityData type here to avoid circular imports
export interface CityData {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  venues: Location[];
}
