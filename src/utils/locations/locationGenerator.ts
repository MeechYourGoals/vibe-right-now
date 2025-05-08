
import { Location } from "@/types";
import { 
  generateBusinessHours, 
  generateDescription, 
  generatePhoneNumber,
  generateAmenities,
  generatePopularTimes,
  generateImages
} from "./businessHoursUtils";
import { cityCoordinates } from "./cityDatabase";

/**
 * Generate a random location for a specific city
 */
export const generateLocationForCity = (
  city: string,
  state: string = "",
  type: string = "",
  id?: string
): Location => {
  // Get coordinates for the city, or use defaults if not found
  let cityCoords = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco
  const cityKey = city.toLowerCase();
  
  if (cityCoordinates[cityKey]) {
    cityCoords = {
      lat: cityCoordinates[cityKey].lat,
      lng: cityCoordinates[cityKey].lng
    };
  }
  
  // Add a small random offset to the coordinates for variety
  const latOffset = (Math.random() - 0.5) * 0.05;
  const lngOffset = (Math.random() - 0.5) * 0.05;
  
  // Possible venue types
  const venueTypes = ["restaurant", "bar", "event", "attraction", "sports", "music", "comedy", "nightlife", "other"];
  
  // Determine the type if not provided
  const locationType = type || venueTypes[Math.floor(Math.random() * venueTypes.length)];
  
  // Restaurant name prefixes and suffixes
  const restaurantPrefixes = [
    "The", "Blue", "Green", "Red", "Silver", "Golden", "Royal", "Urban",
    "Rustic", "Spice", "Salty", "Sweet", "Fresh", "Wild", "Hungry"
  ];
  
  const restaurantSuffixes = [
    "Table", "Spoon", "Fork", "Plate", "Bowl", "Kitchen", "Bistro", "Grill",
    "Cafe", "Diner", "Eatery", "Restaurant", "Brasserie", "Chophouse"
  ];
  
  // Bar name prefixes and suffixes
  const barPrefixes = [
    "The", "Dark", "Tipsy", "Thirsty", "Crafty", "Rustic", "Downtown",
    "Corner", "Hidden", "Local", "Night", "Vintage", "Urban"
  ];
  
  const barSuffixes = [
    "Tavern", "Pub", "Bar", "Lounge", "Speakeasy", "Brewery", "Distillery",
    "Saloon", "Taproom", "Spirits", "Social", "House", "Hideaway"
  ];
  
  // Event venue name prefixes and suffixes
  const eventPrefixes = [
    "Grand", "Royal", "Metro", "City", "Majestic", "Premier", "Elite",
    "Historic", "Modern", "Central", "Golden", "Diamond", "Platinum"
  ];
  
  const eventSuffixes = [
    "Hall", "Theater", "Venue", "Arena", "Center", "Auditorium", "Stage",
    "Pavilion", "Stadium", "Gardens", "Palace", "House", "Gallery"
  ];
  
  // Attraction name prefixes and suffixes
  const attractionPrefixes = [
    "Amazing", "Wonderful", "Incredible", "Fantastic", "Spectacular",
    "Exciting", "Thrilling", "Enchanted", "Magical", "Historic"
  ];
  
  const attractionSuffixes = [
    "Adventure", "Experience", "Discovery", "Wonder", "Exploration",
    "Journey", "Quest", "Showcase", "Exhibition", "Tour"
  ];
  
  // Sports venue name prefixes and suffixes
  const sportsPrefixes = [
    "Champion", "Victory", "Olympic", "Athletic", "Competitive",
    "Professional", "Team", "Sport", "National", "International"
  ];
  
  const sportsSuffixes = [
    "Stadium", "Arena", "Field", "Court", "Complex",
    "Center", "Gym", "Coliseum", "Park", "Grounds"
  ];
  
  // Music venue name prefixes and suffixes
  const musicPrefixes = [
    "Harmony", "Melody", "Rhythm", "Sound", "Echo",
    "Acoustic", "Electric", "Jazz", "Blues", "Rock"
  ];
  
  const musicSuffixes = [
    "Hall", "Stage", "Theater", "Lounge", "Club",
    "Room", "House", "Joint", "Bar", "Venue"
  ];
  
  // Comedy venue name prefixes and suffixes
  const comedyPrefixes = [
    "Laughing", "Funny", "Comic", "Humorous", "Witty",
    "Chuckle", "Giggles", "Joke", "Punchline", "Comedy"
  ];
  
  const comedySuffixes = [
    "Club", "Factory", "House", "Spot", "Zone",
    "Corner", "Stage", "Stand", "Theater", "Cellar"
  ];
  
  // Nightlife venue name prefixes and suffixes
  const nightlifePrefixes = [
    "Night", "Midnight", "After", "Dark", "Neon",
    "Late", "Twilight", "Starry", "Moonlit", "Cosmic"
  ];
  
  const nightlifeSuffixes = [
    "Club", "Lounge", "Bar", "Disco", "Dance",
    "Room", "Spot", "Scene", "District", "Quarter"
  ];
  
  // Generate venue name based on type
  let prefixes, suffixes;
  switch (locationType) {
    case "restaurant":
      prefixes = restaurantPrefixes;
      suffixes = restaurantSuffixes;
      break;
    case "bar":
      prefixes = barPrefixes;
      suffixes = barSuffixes;
      break;
    case "event":
      prefixes = eventPrefixes;
      suffixes = eventSuffixes;
      break;
    case "attraction":
      prefixes = attractionPrefixes;
      suffixes = attractionSuffixes;
      break;
    case "sports":
      prefixes = sportsPrefixes;
      suffixes = sportsSuffixes;
      break;
    case "music":
      prefixes = musicPrefixes;
      suffixes = musicSuffixes;
      break;
    case "comedy":
      prefixes = comedyPrefixes;
      suffixes = comedySuffixes;
      break;
    case "nightlife":
      prefixes = nightlifePrefixes;
      suffixes = nightlifeSuffixes;
      break;
    default:
      // Generic prefixes and suffixes
      prefixes = [...restaurantPrefixes, ...barPrefixes, ...eventPrefixes];
      suffixes = [...restaurantSuffixes, ...barSuffixes, ...eventSuffixes];
  }
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const name = `${prefix} ${suffix}`;
  
  // Generate street names with city theme if city is available
  let streetNames = ["Main", "Broadway", "First", "Second", "Park", "Oak", "Pine", "Maple", "Cedar", "Washington"];
  let streetTypes = ["St", "Ave", "Blvd", "Rd", "Ln", "Dr", "Way", "Pl"];
  
  if (city && typeof city === 'string') {
    const cityMatch = city.match(/[A-Z][a-z]+/g);
    if (cityMatch && cityMatch.length > 0) {
      streetNames = [...streetNames, cityMatch[0]];
    }
  }
  
  const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
  const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
  const streetNumber = Math.floor(Math.random() * 1000) + 100;
  const address = `${streetNumber} ${streetName} ${streetType}`;
  
  // Random ratings
  const ratingBase = 3.5;
  const ratingVariance = 1.5;
  const rating = Math.min(5, Math.max(1, ratingBase + (Math.random() * ratingVariance - ratingVariance / 2)));
  const ratingCount = Math.floor(Math.random() * 900) + 100;
  
  // Generate random vibes based on the location type
  const vibes = generateVibesForType(locationType);
  
  // Generate a unique ID if not provided
  const locationId = id || `loc-${Math.random().toString(36).substring(2, 10)}`;
  
  // Generate business hours
  const seed = parseInt(locationId.replace(/[^0-9]/g, '0').substring(0, 8), 16) % 10000;
  const businessHours = generateBusinessHours(seed);
  
  // Create and return the location object
  return {
    id: locationId,
    name,
    address,
    city,
    state,
    country: "USA",
    lat: cityCoords.lat + latOffset,
    lng: cityCoords.lng + lngOffset,
    type: locationType,
    rating,
    ratingCount,
    vibes,
    verified: Math.random() > 0.7,
    businessHours,
    description: generateDescription(locationType),
    phoneNumber: generatePhoneNumber(),
    amenities: generateAmenities(locationType),
    popular_times: generatePopularTimes(),
    images: generateImages(locationType, 5),
    ownerIdentifier: Math.random() > 0.9 ? `owner-${Math.random().toString(36).substring(7)}` : undefined
  };
};

/**
 * Generate random vibes for a location based on its type
 */
export const generateVibesForType = (type: string): string[] => {
  const commonVibes = ["friendly", "clean", "welcoming", "local favorite"];
  
  // Type-specific vibes
  const typeVibes: Record<string, string[]> = {
    restaurant: ["delicious", "tasty", "flavorful", "foodie heaven", "gourmet", "culinary delight", "savory", "satisfying"],
    bar: ["relaxed", "lively", "buzzing", "social", "crafty", "mixology", "nightcap", "happy hour"],
    event: ["exciting", "entertaining", "memorable", "energetic", "special occasion", "celebration"],
    attraction: ["fun", "family-friendly", "interesting", "fascinating", "tourist spot", "must-see", "exploration"],
    sports: ["competitive", "athletic", "team spirit", "energetic", "crowd-pleasing", "action-packed", "thrilling"],
    music: ["melodic", "rhythmic", "live music", "acoustic", "intimate", "amplified", "performance"],
    comedy: ["hilarious", "laugh-out-loud", "entertaining", "witty", "humorous", "stand-up", "improv"],
    nightlife: ["vibrant", "party", "dancing", "late-night", "trendy", "clubbing", "upscale"]
  };
  
  // Get vibes specific to the location type
  const specificVibes = typeVibes[type] || [];
  
  // Atmosphere vibes
  const atmosphereVibes = ["cozy", "casual", "upscale", "intimate", "bustling", "relaxed", "vibrant", "quiet", "trendy"];
  
  // Ambiance vibes
  const ambianceVibes = ["romantic", "rustic", "modern", "classic", "vintage", "industrial", "elegant", "artsy"];
  
  // Combine all potential vibes
  const allPotentialVibes = [...commonVibes, ...specificVibes, ...atmosphereVibes, ...ambianceVibes];
  
  // Select random vibes (between 3 and 6)
  const numberOfVibes = Math.floor(Math.random() * 4) + 3;
  const selectedVibes = [];
  
  // Ensure we have at least one type-specific vibe
  if (specificVibes.length > 0) {
    const typeVibeIndex = Math.floor(Math.random() * specificVibes.length);
    selectedVibes.push(specificVibes[typeVibeIndex]);
  } else {
    // If no type-specific vibes, use a common one
    const commonVibeIndex = Math.floor(Math.random() * commonVibes.length);
    selectedVibes.push(commonVibes[commonVibeIndex]);
  }
  
  // Add more random vibes
  while (selectedVibes.length < numberOfVibes) {
    const index = Math.floor(Math.random() * allPotentialVibes.length);
    const vibe = allPotentialVibes[index];
    
    // Avoid duplicates
    if (!selectedVibes.includes(vibe)) {
      selectedVibes.push(vibe);
    }
  }
  
  return selectedVibes;
};

/**
 * Generate multiple locations for a city
 */
export const generateLocationsForCity = (
  city: string,
  state: string = "",
  count: number = 10
): Location[] => {
  const locations: Location[] = [];
  
  // Ensure we have at least one of each major type
  const majorTypes = ["restaurant", "bar", "event", "attraction"];
  
  for (const type of majorTypes) {
    locations.push(generateLocationForCity(city, state, type));
  }
  
  // Generate the rest randomly
  for (let i = locations.length; i < count; i++) {
    locations.push(generateLocationForCity(city, state));
  }
  
  return locations;
};

/**
 * Get today's hours of operation
 */
export const getTodaysHours = (location: any): string => {
  if (!location || !location.businessHours) {
    return "Hours not available";
  }
  
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = dayNames[new Date().getDay()];
  const hours = location.businessHours[today];
  
  if (!hours || !hours.open) {
    return "Closed today";
  }
  
  return `${hours.openTime} - ${hours.closeTime}`;
};
