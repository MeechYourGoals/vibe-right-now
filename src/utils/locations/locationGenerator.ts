
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
import { getRandomUserProfile } from "./types";

// Generate mock business hours for a location
const generateBusinessHours = (locationId: string) => {
  // Different opening patterns based on venue type
  const patterns = [
    // Standard business hours
    {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 3:00 PM",
      sunday: "Closed"
    },
    // Restaurant hours
    {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 11:00 PM",
      friday: "11:00 AM - 12:00 AM",
      saturday: "10:00 AM - 12:00 AM",
      sunday: "10:00 AM - 9:00 PM"
    },
    // Bar/Nightclub hours
    {
      monday: "4:00 PM - 12:00 AM",
      tuesday: "4:00 PM - 12:00 AM",
      wednesday: "4:00 PM - 1:00 AM",
      thursday: "4:00 PM - 2:00 AM",
      friday: "4:00 PM - 4:00 AM",
      saturday: "4:00 PM - 4:00 AM",
      sunday: "4:00 PM - 10:00 PM"
    },
    // Morning business
    {
      monday: "6:00 AM - 2:00 PM",
      tuesday: "6:00 AM - 2:00 PM",
      wednesday: "6:00 AM - 2:00 PM",
      thursday: "6:00 AM - 2:00 PM",
      friday: "6:00 AM - 2:00 PM",
      saturday: "7:00 AM - 3:00 PM",
      sunday: "7:00 AM - 3:00 PM"
    }
  ];
  
  // Use a deterministic approach for each location
  const patternIndex = parseInt(locationId.substring(locationId.length - 2), 16) % patterns.length;
  return patterns[patternIndex];
};

// Generate random vibes for a location
const generateVibes = (locationId: string, locationType: string) => {
  const allVibes = [
    "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
    "Upscale", "Casual", "Romantic", "Lively", "Intimate", 
    "High Energy", "Laid Back", "Artsy", "Eclectic", "Historic",
    "Modern", "Vintage", "Industrial", "Bohemian", "Elegant"
  ];
  
  // Use location id to deterministically generate vibes
  const seed = parseInt(locationId.replace(/\D/g, '').substring(0, 4), 10) || 0;
  const count = (seed % 3) + 1; // 1-3 vibes per location
  
  const locationVibes = [];
  for (let i = 0; i < count; i++) {
    const index = (seed + i * 137) % allVibes.length;
    locationVibes.push(allVibes[index]);
  }
  
  // Add special vibes based on location type
  switch (locationType) {
    case "bar":
      locationVibes.push("NightOwl");
      break;
    case "restaurant":
      if (seed % 2 === 0) locationVibes.push("Foodie");
      break;
    case "sports":
      locationVibes.push("Game Day");
      break;
    case "attraction":
      locationVibes.push("Tourist");
      break;
  }
  
  // Remove duplicates
  return [...new Set(locationVibes)];
};

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
  const sportId = createId(city.name, 1);
  locations.push({
    id: sportId,
    name: getSportsVenueName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Sports Blvd`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: sportCoords.lat,
    lng: sportCoords.lng,
    type: "sports",
    verified: true,
    hours: generateBusinessHours(sportId),
    vibes: generateVibes(sportId, "sports"),
    userProfile: getRandomUserProfile()
  });
  
  // 2. Nightclub/Lounge
  const loungeCoords = createCoordinate(city.lat, city.lng, 2);
  const loungeId = createId(city.name, 2);
  locations.push({
    id: loungeId,
    name: getLoungeName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Nightlife Ave`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: loungeCoords.lat,
    lng: loungeCoords.lng,
    type: "bar",
    verified: true,
    hours: generateBusinessHours(loungeId),
    vibes: generateVibes(loungeId, "bar"),
    userProfile: getRandomUserProfile()
  });
  
  // 3. Restaurant
  const restaurantCoords = createCoordinate(city.lat, city.lng, 3);
  const restaurantId = createId(city.name, 3);
  locations.push({
    id: restaurantId,
    name: getRestaurantName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Culinary Lane`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: restaurantCoords.lat,
    lng: restaurantCoords.lng,
    type: "restaurant",
    verified: true,
    hours: generateBusinessHours(restaurantId),
    vibes: generateVibes(restaurantId, "restaurant"),
    userProfile: getRandomUserProfile()
  });
  
  // 4. Event/Concert
  const eventCoords = createCoordinate(city.lat, city.lng, 4);
  const eventId = createId(city.name, 4);
  locations.push({
    id: eventId,
    name: getEventName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Festival Way`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: eventCoords.lat,
    lng: eventCoords.lng,
    type: "event",
    verified: true,
    hours: generateBusinessHours(eventId),
    vibes: generateVibes(eventId, "event"),
    userProfile: getRandomUserProfile()
  });
  
  // 5. Comedy Club
  const comedyCoords = createCoordinate(city.lat, city.lng, 5);
  const comedyId = createId(city.name, 5);
  locations.push({
    id: comedyId,
    name: getComedyClubName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Laughter Road`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: comedyCoords.lat,
    lng: comedyCoords.lng,
    type: "event",
    verified: true,
    hours: generateBusinessHours(comedyId),
    vibes: generateVibes(comedyId, "event"),
    userProfile: getRandomUserProfile()
  });
  
  // 6. Fitness/Workout Class
  const fitnessCoords = createCoordinate(city.lat, city.lng, 6);
  const fitnessId = createId(city.name, 6);
  locations.push({
    id: fitnessId,
    name: getFitnessClassName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Fitness Drive`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: fitnessCoords.lat,
    lng: fitnessCoords.lng,
    type: "other",
    verified: true,
    hours: generateBusinessHours(fitnessId),
    vibes: generateVibes(fitnessId, "other"),
    userProfile: getRandomUserProfile()
  });
  
  // 7. Attraction
  const attractionCoords = createCoordinate(city.lat, city.lng, 7);
  const attractionId = createId(city.name, 7);
  locations.push({
    id: attractionId,
    name: getAttractionName(city.name),
    address: `${100 + Math.floor(Math.random() * 900)} Landmark Plaza`,
    city: city.name,
    state: city.state,
    country: city.country,
    lat: attractionCoords.lat,
    lng: attractionCoords.lng,
    type: "attraction",
    verified: true,
    hours: generateBusinessHours(attractionId),
    vibes: generateVibes(attractionId, "attraction"),
    userProfile: getRandomUserProfile()
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
