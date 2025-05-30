
export interface CityCoordinates {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

export const cityCoordinates: Record<string, CityCoordinates> = {
  "los-angeles": {
    name: "Los Angeles",
    state: "California",
    country: "USA", 
    lat: 34.0522,
    lng: -118.2437
  },
  "new-york": {
    name: "New York",
    state: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.0060
  },
  "chicago": {
    name: "Chicago", 
    state: "Illinois",
    country: "USA",
    lat: 41.8781,
    lng: -87.6298
  },
  "miami": {
    name: "Miami",
    state: "Florida", 
    country: "USA",
    lat: 25.7617,
    lng: -80.1918
  },
  "san-francisco": {
    name: "San Francisco",
    state: "California",
    country: "USA",
    lat: 37.7749,
    lng: -122.4194
  }
};
