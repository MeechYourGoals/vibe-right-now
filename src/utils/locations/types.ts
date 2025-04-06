
import { Location } from "@/types";

// Type for city data
export interface CityCoordinates {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}
