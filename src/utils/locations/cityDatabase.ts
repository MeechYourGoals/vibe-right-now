
import { CityCoordinates } from "./types";

// Main cities coordinates database grouped by regions
const northAmericanCities: Record<string, CityCoordinates> = {
  // United States
  "los angeles": { name: "Los Angeles", state: "CA", country: "USA", lat: 34.0522, lng: -118.2437 },
  "chicago": { name: "Chicago", state: "IL", country: "USA", lat: 41.8781, lng: -87.6298 },
  "honolulu": { name: "Honolulu", state: "HI", country: "USA", lat: 21.3069, lng: -157.8583 },
  "new york": { name: "New York", state: "NY", country: "USA", lat: 40.7128, lng: -74.0060 },
  "atlanta": { name: "Atlanta", state: "GA", country: "USA", lat: 33.7490, lng: -84.3880 },
  "miami": { name: "Miami", state: "FL", country: "USA", lat: 25.7617, lng: -80.1918 },
  "denver": { name: "Denver", state: "CO", country: "USA", lat: 39.7392, lng: -104.9903 },
  "las vegas": { name: "Las Vegas", state: "NV", country: "USA", lat: 36.1699, lng: -115.1398 },
  "indianapolis": { name: "Indianapolis", state: "IN", country: "USA", lat: 39.7684, lng: -86.1581 },
  "houston": { name: "Houston", state: "TX", country: "USA", lat: 29.7604, lng: -95.3698 },
  "dallas": { name: "Dallas", state: "TX", country: "USA", lat: 32.7767, lng: -96.7970 },
  "austin": { name: "Austin", state: "TX", country: "USA", lat: 30.2672, lng: -97.7431 },
  "charlotte": { name: "Charlotte", state: "NC", country: "USA", lat: 35.2271, lng: -80.8431 },
  "nashville": { name: "Nashville", state: "TN", country: "USA", lat: 36.1627, lng: -86.7816 },
  "boston": { name: "Boston", state: "MA", country: "USA", lat: 42.3601, lng: -71.0589 },
  "phoenix": { name: "Phoenix", state: "AZ", country: "USA", lat: 33.4484, lng: -112.0740 },
  "new orleans": { name: "New Orleans", state: "LA", country: "USA", lat: 29.9511, lng: -90.0715 },
  "seattle": { name: "Seattle", state: "WA", country: "USA", lat: 47.6062, lng: -122.3321 },
  "portland": { name: "Portland", state: "OR", country: "USA", lat: 45.5051, lng: -122.6750 },
  "san francisco": { name: "San Francisco", state: "CA", country: "USA", lat: 37.7749, lng: -122.4194 },
  "philadelphia": { name: "Philadelphia", state: "PA", country: "USA", lat: 39.9526, lng: -75.1652 },
  "orlando": { name: "Orlando", state: "FL", country: "USA", lat: 28.5383, lng: -81.3792 },
  "tampa": { name: "Tampa", state: "FL", country: "USA", lat: 27.9506, lng: -82.4572 },
  "washington dc": { name: "Washington DC", state: "DC", country: "USA", lat: 38.9072, lng: -77.0369 },
  "detroit": { name: "Detroit", state: "MI", country: "USA", lat: 42.3314, lng: -83.0458 },
  "st. louis": { name: "St. Louis", state: "MO", country: "USA", lat: 38.6270, lng: -90.1994 },
  "minneapolis": { name: "Minneapolis", state: "MN", country: "USA", lat: 44.9778, lng: -93.2650 },
  "salt lake city": { name: "Salt Lake City", state: "UT", country: "USA", lat: 40.7608, lng: -111.8910 },
  // Canada
  "toronto": { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
};

const europeanCities: Record<string, CityCoordinates> = {
  "paris": { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  "madrid": { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  "london": { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  "munich": { name: "Munich", country: "Germany", lat: 48.1351, lng: 11.5820 },
  "barcelona": { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 },
};

const asianCities: Record<string, CityCoordinates> = {
  "tokyo": { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  "dubai": { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  "hong kong": { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },
  "bangkok": { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  "mumbai": { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
  "beijing": { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
};

const australianCities: Record<string, CityCoordinates> = {
  "sydney": { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
};

const africanCities: Record<string, CityCoordinates> = {
  "lagos": { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
};

const latinAmericanCities: Record<string, CityCoordinates> = {
  "rio de janeiro": { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  "tulum": { name: "Tulum", country: "Mexico", lat: 20.2114, lng: -87.4654 },
  "cancun": { name: "Cancun", country: "Mexico", lat: 21.1619, lng: -86.8515 },
  "medellin": { name: "Medellin", country: "Colombia", lat: 6.2442, lng: -75.5812 },
};

// Combined database with all cities
export const cityCoordinates: Record<string, CityCoordinates> = {
  ...northAmericanCities,
  ...europeanCities,
  ...asianCities,
  ...australianCities,
  ...africanCities,
  ...latinAmericanCities
};
