
import { Location } from "@/types";

// Type for city data
export interface CityCoordinates {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

// Main cities coordinates database
export const cityCoordinates: Record<string, CityCoordinates> = {
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
  
  // International Cities
  "paris": { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  "toronto": { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  "rio de janeiro": { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  "tulum": { name: "Tulum", country: "Mexico", lat: 20.2114, lng: -87.4654 },
  "cancun": { name: "Cancun", country: "Mexico", lat: 21.1619, lng: -86.8515 },
  "tokyo": { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  "madrid": { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  "sydney": { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  "dubai": { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  "london": { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  "hong kong": { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },
  "bangkok": { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  "mumbai": { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777 },
  "lagos": { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },
  "munich": { name: "Munich", country: "Germany", lat: 48.1351, lng: 11.5820 },
  "barcelona": { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 },
};

// Helper function to create a unique ID
const createId = (cityName: string, index: number): string => {
  return `${cityName.toLowerCase().replace(/\s+/g, '-')}-${index}`;
};

// Function to generate venue types for each city
export const generateCityLocations = (cityKey: string): Location[] => {
  const city = cityCoordinates[cityKey.toLowerCase()];
  if (!city) return [];
  
  // Create a radius around the city center for venue distribution
  const createCoordinate = (baseLat: number, baseLng: number, index: number) => {
    // Create a spiral pattern outward from center
    const angle = index * 0.5;
    const radius = 0.01 + (index * 0.002);
    return {
      lat: baseLat + radius * Math.cos(angle),
      lng: baseLng + radius * Math.sin(angle)
    };
  };
  
  // Different venue collections for each city
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

// Helper functions to generate realistic names based on the city
function getSportsVenueName(cityName: string): string {
  const teamNames: Record<string, string> = {
    "Los Angeles": "Lakers vs Clippers",
    "Chicago": "Bulls vs Bucks",
    "New York": "Knicks vs Nets",
    "Atlanta": "Hawks Game",
    "Miami": "Heat vs Magic",
    "Denver": "Nuggets vs Trail Blazers",
    "Las Vegas": "Raiders Game",
    "Indianapolis": "Pacers vs Bulls",
    "Houston": "Rockets vs Spurs",
    "Dallas": "Mavericks vs Thunder",
    "Austin": "Longhorns Football",
    "Charlotte": "Hornets vs Wizards", 
    "Nashville": "Predators Hockey",
    "Boston": "Celtics vs 76ers",
    "Phoenix": "Suns vs Warriors",
    "New Orleans": "Pelicans vs Grizzlies",
    "Seattle": "Seahawks Game",
    "Portland": "Trail Blazers vs Kings",
    "San Francisco": "Warriors vs Lakers",
    "Philadelphia": "76ers vs Heat",
    "Honolulu": "Hawaii Football",
    "Toronto": "Raptors vs Knicks",
    "Paris": "PSG Soccer Match",
    "Rio de Janeiro": "Flamengo Match",
    "Tokyo": "Sumo Tournament",
    "Madrid": "Real Madrid Match",
    "Sydney": "Sydney FC Match",
    "London": "Arsenal vs Chelsea",
    "Munich": "Bayern Munich Match",
    "Barcelona": "FC Barcelona Game"
  };
  
  return teamNames[cityName] || `${cityName} Championship Game`;
}

function getLoungeName(cityName: string): string {
  const prefixes = ["Skyline", "Azure", "Velvet", "Whisper", "Onyx", "Mirage", "Ember", "Lunar", "Echo", "Tempo"];
  const suffixes = ["Lounge", "Club", "Rooftop", "Night Club", "Ultra Lounge", "Social House", "Speakeasy", "VIP Room"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "Las Vegas": "XS Nightclub",
    "Miami": "LIV Miami",
    "New York": "1 OAK NYC",
    "Los Angeles": "Avalon Hollywood",
    "London": "Ministry of Sound",
    "Tokyo": "Womb Tokyo",
    "Dubai": "White Dubai",
    "Hong Kong": "Dragon-i",
    "Bangkok": "Sing Sing Theater",
    "Berlin": "Berghain",
    "Ibiza": "Pacha Ibiza"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

function getRestaurantName(cityName: string): string {
  const prefixes = ["The Grand", "Bistro", "Café", "Trattoria", "Cucina", "Chez", "Maison", "Casa", "Brasserie"];
  const suffixes = ["Table", "Kitchen", "Grill", "Eatery", "Dining Room", "Bites", "Provisions", "& Co.", "House"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "New York": "Le Bernardin",
    "Paris": "L'Atelier de Joël Robuchon",
    "Tokyo": "Sukiyabashi Jiro",
    "London": "The Ledbury",
    "Hong Kong": "Lung King Heen",
    "Chicago": "Alinea",
    "San Francisco": "Benu",
    "Bangkok": "Gaggan",
    "Los Angeles": "Providence",
    "Sydney": "Quay",
    "Las Vegas": "Joël Robuchon",
    "New Orleans": "Commander's Palace",
    "Miami": "Joe's Stone Crab"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

function getEventName(cityName: string): string {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = months[new Date().getMonth()];
  const nextMonth = months[(new Date().getMonth() + 1) % 12];
  
  // Special cases for certain cities
  const specialEvents: Record<string, string> = {
    "New Orleans": "Jazz & Heritage Festival",
    "Austin": "South by Southwest (SXSW)",
    "Miami": "Art Basel Miami Beach",
    "Las Vegas": "Electric Daisy Carnival",
    "New York": "New York Fashion Week",
    "Los Angeles": "Grammy Awards Show",
    "Nashville": "CMA Music Festival",
    "Chicago": "Lollapalooza",
    "San Francisco": "Outside Lands Festival",
    "Paris": "Paris Fashion Week",
    "Rio de Janeiro": "Rio Carnival",
    "Tulum": "Tulum Art & Music Festival",
    "Tokyo": "Tokyo Game Show",
    "Munich": "Oktoberfest"
  };
  
  const eventTypes = [
    `${cityName} Music Festival`,
    `${cityName} Film Festival`,
    `${cityName} Art Exhibition`,
    `${cityName} Food & Wine Festival`,
    `${cityName} ${currentMonth} Fest`,
    `${nextMonth} Block Party`
  ];
  
  return specialEvents[cityName] || eventTypes[Math.floor(Math.random() * eventTypes.length)];
}

function getComedyClubName(cityName: string): string {
  const prefixes = ["The Laugh", "Chuckle", "Comedy", "Funny", "Jest", "Ha-Ha", "Giggle", "Punchline"];
  const suffixes = ["Factory", "Club", "House", "Cellar", "Spot", "Lounge", "Workshop", "Stage"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "New York": "Comedy Cellar",
    "Los Angeles": "The Comedy Store",
    "Chicago": "Second City",
    "Las Vegas": "Brad Garrett's Comedy Club",
    "Boston": "Nick's Comedy Stop",
    "Philadelphia": "Helium Comedy Club",
    "Atlanta": "Laughing Skull Lounge",
    "Austin": "Cap City Comedy Club",
    "San Francisco": "Punch Line",
    "London": "Top Secret Comedy Club",
    "Toronto": "Yuk Yuk's"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

function getFitnessClassName(cityName: string): string {
  const prefixes = ["Peak", "Pulse", "Core", "Flex", "Vigor", "Zenith", "Summit", "Prime", "Elite"];
  const suffixes = ["Fitness", "Training", "Pilates", "Yoga", "CrossFit", "HIIT Class", "Boxing", "SoulCycle"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "Los Angeles": "Barry's Bootcamp LA",
    "New York": "SoulCycle Tribeca",
    "Miami": "Equinox South Beach",
    "Las Vegas": "Life Time Athletic",
    "Chicago": "Studio Three",
    "Austin": "Black Swan Yoga",
    "Honolulu": "Yogaloha Hawaii",
    "Toronto": "BOLO",
    "London": "1Rebel",
    "Sydney": "F45 Training"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

function getAttractionName(cityName: string): string {
  // Special cases for well-known attractions in each city
  const specialAttractions: Record<string, string> = {
    "New York": "Empire State Building",
    "Los Angeles": "Griffith Observatory",
    "Chicago": "Art Institute of Chicago",
    "Las Vegas": "Bellagio Fountains",
    "San Francisco": "Golden Gate Bridge",
    "New Orleans": "French Quarter",
    "Miami": "South Beach",
    "Seattle": "Space Needle",
    "Boston": "Fenway Park",
    "Washington": "National Mall",
    "Nashville": "Grand Ole Opry",
    "Atlanta": "Georgia Aquarium",
    "Dallas": "The Sixth Floor Museum",
    "Denver": "Red Rocks Park",
    "Honolulu": "Waikiki Beach",
    "Austin": "Barton Springs Pool",
    "Philadelphia": "Liberty Bell",
    "Phoenix": "Desert Botanical Garden",
    "Portland": "Powell's Books",
    "Paris": "Eiffel Tower",
    "London": "British Museum",
    "Tokyo": "Senso-ji Temple",
    "Rio de Janeiro": "Christ the Redeemer",
    "Sydney": "Sydney Opera House",
    "Dubai": "Burj Khalifa",
    "Madrid": "Prado Museum",
    "Barcelona": "La Sagrada Familia",
    "Toronto": "CN Tower",
    "Munich": "Marienplatz",
    "Bangkok": "Grand Palace",
    "Hong Kong": "Victoria Peak",
    "Mumbai": "Gateway of India",
    "Lagos": "Lekki Conservation Centre",
    "Tulum": "Tulum Ruins",
    "Cancun": "Chichen Itza"
  };
  
  const genericAttractions = [
    `${cityName} Museum of Art`,
    `${cityName} Botanical Gardens`,
    `${cityName} Observatory`,
    `${cityName} Historical Museum`,
    `${cityName} Zoo`,
    `${cityName} Aquarium`
  ];
  
  return specialAttractions[cityName] || genericAttractions[Math.floor(Math.random() * genericAttractions.length)];
}

// Generate a full database of locations for all cities
export const generateAllCityLocations = (): Location[] => {
  let allLocations: Location[] = [];
  
  Object.keys(cityCoordinates).forEach(cityKey => {
    const cityLocations = generateCityLocations(cityKey);
    allLocations = [...allLocations, ...cityLocations];
  });
  
  return allLocations;
};
