
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}
