
import { Location } from "@/types";

// Type for city data
export interface CityCoordinates {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

// Map-related types
export type MapStyle = "default" | "terrain" | "satellite";

export interface MapReferencePoint {
  lat: number;
  lng: number;
}

