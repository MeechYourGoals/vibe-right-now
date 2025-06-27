
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

// Helper function to convert between coordinate types
export const toCoordinates = (location: UserLocation): Coordinates => ({
  lat: location.latitude,
  lng: location.longitude
});

export const toUserLocation = (coords: Coordinates): UserLocation => ({
  latitude: coords.lat,
  longitude: coords.lng
});
