
import { Location } from "@/types";
import { cityCoordinates } from "./cityDatabase";
import { 
  createId, 
  getSportsVenueName, 
  getLoungeName, 
  getRestaurantName, 
  getEventName, 
  getComedyClubName, 
  getFitnessClassName, 
  getAttractionName 
} from "./venueGenerators";

// Function to create a coordinate within a radius of the city center
const createCoordinate = (baseLat: number, baseLng: number, index: number) => {
  // Create a spiral pattern outward from center
  const angle = index * 0.5;
  const radius = 0.01 + (index * 0.002);
  return {
    lat: baseLat + radius * Math.cos(angle),
    lng: baseLng + radius * Math.sin(angle)
  };
};

// Function to generate venues for a specific city
export const generateCityLocations = (cityKey: string): Location[] => {
  const city = cityCoordinates[cityKey.toLowerCase()];
  if (!city) return [];
  
  const locations: Location[] = [];
  
  // 1. Sports Venue
  const sportCoords = createCoordinate(city.lat, city.lng, 1);
  locations.push({
    id: createId(city.name, 1),
    name: getSportsVenueName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Sports Blvd`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: sportCoords.lat,
    lng: sportCoords.lng,
    type: "sports",
    verified: true
  });
  
  // 2. Nightclub/Lounge
  const loungeCoords = createCoordinate(city.lat, city.lng, 2);
  locations.push({
    id: createId(city.name, 2),
    name: getLoungeName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Nightlife Ave`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: loungeCoords.lat,
    lng: loungeCoords.lng,
    type: "bar",
    verified: true
  });
  
  // 3. Restaurant
  const restaurantCoords = createCoordinate(city.lat, city.lng, 3);
  locations.push({
    id: createId(city.name, 3),
    name: getRestaurantName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Culinary Lane`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: restaurantCoords.lat,
    lng: restaurantCoords.lng,
    type: "restaurant",
    verified: true
  });
  
  // 4. Event/Concert
  const eventCoords = createCoordinate(city.lat, city.lng, 4);
  locations.push({
    id: createId(city.name, 4),
    name: getEventName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Festival Way`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: eventCoords.lat,
    lng: eventCoords.lng,
    type: "event",
    verified: true
  });
  
  // 5. Comedy Club
  const comedyCoords = createCoordinate(city.lat, city.lng, 5);
  locations.push({
    id: createId(city.name, 5),
    name: getComedyClubName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Laughter Road`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: comedyCoords.lat,
    lng: comedyCoords.lng,
    type: "event",
    verified: true
  });
  
  // 6. Fitness/Workout Class
  const fitnessCoords = createCoordinate(city.lat, city.lng, 6);
  locations.push({
    id: createId(city.name, 6),
    name: getFitnessClassName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Fitness Drive`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: fitnessCoords.lat,
    lng: fitnessCoords.lng,
    type: "other",
    verified: true
  });
  
  // 7. Attraction
  const attractionCoords = createCoordinate(city.lat, city.lng, 7);
  locations.push({
    id: createId(city.name, 7),
    name: getAttractionName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Landmark Plaza`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: attractionCoords.lat,
    lng: attractionCoords.lng,
    type: "attraction",
    verified: true
  });
  
  return locations;
};

// Generate a full database of locations for all cities
export const generateAllCityLocations = (): Location[] => {
  let allLocations: Location[] = [];
  
  Object.keys(cityCoordinates).forEach(cityKey => {
    const cityLocations = generateCityLocations(cityKey);
    allLocations = [...allLocations, ...cityLocations];
  });
  
  return allLocations;
};
