import { Location, BusinessHours } from "@/types";
import { cityCoordinates } from "./cityDatabase";
import { getRandomUserProfile, MockUserProfile } from "./types";

// Generate mock locations for demo/testing
export const generateMockLocations = (count: number = 20): Location[] => {
  const locations: Location[] = [];
  
  // Generate a variety of locations with different types
  const types = ["restaurant", "bar", "sports", "attraction", "event"];
  const cities = Object.keys(cityCoordinates).slice(0, 5); // Limit to first 5 cities
  
  for (let i = 0; i < count; i++) {
    const city = cities[i % cities.length];
    const cityData = cityCoordinates[city];
    
    if (!cityData) continue;
    
    // Create random offset from city center (for visual distribution)
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    const location: Location = {
      id: `${i + 1}`,
      name: generateName(i, types[i % types.length]),
      address: `${100 + i} Main St`,
      city: cityData.name,
      state: cityData.state || '',
      country: cityData.country,
      lat: cityData.lat + latOffset,
      lng: cityData.lng + lngOffset,
      type: types[i % types.length],
      hours: generateHours(types[i % types.length]) as BusinessHours,
      rating: 3 + Math.random() * 2,
      verified: i % 3 === 0, // Every third location is verified
      vibes: generateVibes(types[i % types.length]),
      distance: Math.random() * 5 + 0.5,
    };
    
    locations.push(location);
  }
  
  return locations;
};

// Generate mock locations for a specific city
export const generateCityLocations = (cityName: string, count: number = 5): Location[] => {
  // Ensure cityName is valid
  if (!cityName) return [];
  
  const cityKey = Object.keys(cityCoordinates).find(key => 
    cityCoordinates[key].name.toLowerCase() === cityName.toLowerCase()
  );
  
  if (!cityKey) return [];
  
  const cityData = cityCoordinates[cityKey];
  const locations: Location[] = [];
  const types = ["restaurant", "bar", "sports", "attraction", "event"];
  
  for (let i = 0; i < count; i++) {
    // Create random offset from city center
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    const location: Location = {
      id: `${cityName.toLowerCase().replace(/\s+/g, '')}-${i + 1}`,
      name: generateName(i, types[i % types.length]),
      address: `${100 + i} ${cityName} Ave`,
      city: cityData.name,
      state: cityData.state || '',
      country: cityData.country,
      lat: cityData.lat + latOffset,
      lng: cityData.lng + lngOffset,
      type: types[i % types.length],
      hours: generateHours(types[i % types.length]) as BusinessHours,
      rating: 3 + Math.random() * 2,
      verified: i % 3 === 0,
      vibes: generateVibes(types[i % types.length]),
    };
    
    locations.push(location);
  }
  
  return locations;
};

// Generate locations for all cities in the database
export const generateAllCityLocations = (locationsPerCity: number = 3): Location[] => {
  const allLocations: Location[] = [];
  
  // Ensure cityCoordinates is valid and has keys
  if (!cityCoordinates || typeof cityCoordinates !== 'object') {
    console.error("City coordinates not available");
    return [];
  }
  
  const cityKeys = Object.keys(cityCoordinates);
  
  // Check if cityKeys is an array before attempting to use forEach
  if (!Array.isArray(cityKeys) || cityKeys.length === 0) {
    console.error("No city keys available in cityCoordinates");
    return [];
  }
  
  // Use for...of instead of forEach to avoid potential issues
  for (const cityKey of cityKeys) {
    const cityName = cityCoordinates[cityKey].name;
    const cityLocations = generateCityLocations(cityName, locationsPerCity);
    allLocations.push(...cityLocations);
  }
  
  return allLocations;
};

// Helper function to generate venue name based on type
const generateName = (index: number, type: string): string => {
  const prefixes = {
    restaurant: ["Tasty", "Gourmet", "Spice", "Fresh", "Urban"],
    bar: ["Sunset", "Corner", "Crafty", "Downtown", "Night"],
    sports: ["Victory", "Champion", "Elite", "Stadium", "Arena"],
    attraction: ["Wonder", "Amazing", "Historic", "Grand", "Scenic"],
    event: ["Annual", "Festival", "Celebration", "Showcase", "Expo"]
  };
  
  const suffixes = {
    restaurant: ["Bistro", "Kitchen", "Grill", "Diner", "Cafe"],
    bar: ["Lounge", "Tavern", "Pub", "Bar & Grill", "Brewery"],
    sports: ["Field", "Stadium", "Center", "Arena", "Park"],
    attraction: ["Museum", "Gallery", "Garden", "Tower", "Park"],
    event: ["Festival", "Fair", "Convention", "Show", "Concert"]
  };
  
  // Handle potential undefined cases
  if (!prefixes[type as keyof typeof prefixes] || !suffixes[type as keyof typeof suffixes]) {
    return `Venue ${index}`;
  }
  
  const prefix = prefixes[type as keyof typeof prefixes][index % 5];
  const suffix = suffixes[type as keyof typeof suffixes][index % 5];
  
  return `${prefix} ${suffix}`;
};

// Helper function to generate business hours
const generateHours = (type: string): Record<string, string> => {
  if (type === "restaurant") {
    return {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "12:00 PM - 9:00 PM"
    };
  } else if (type === "bar") {
    return {
      monday: "4:00 PM - 12:00 AM",
      tuesday: "4:00 PM - 12:00 AM",
      wednesday: "4:00 PM - 12:00 AM",
      thursday: "4:00 PM - 1:00 AM",
      friday: "4:00 PM - 2:00 AM",
      saturday: "4:00 PM - 2:00 AM",
      sunday: "4:00 PM - 12:00 AM"
    };
  } else if (type === "attraction") {
    return {
      monday: "10:00 AM - 6:00 PM",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM", 
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "9:00 AM - 9:00 PM", 
      sunday: "9:00 AM - 6:00 PM"
    };
  } else if (type === "sports" || type === "event") {
    return {
      monday: "Event times vary",
      tuesday: "Event times vary",
      wednesday: "Event times vary",
      thursday: "Event times vary", 
      friday: "Event times vary",
      saturday: "Event times vary",
      sunday: "Event times vary"
    };
  }
  
  // Default hours
  return {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM", 
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 3:00 PM",
    sunday: "Closed"
  };
};

// Generate vibes based on venue type
const generateVibes = (type: string): string[] => {
  const vibesByType = {
    restaurant: ["Cozy", "Upscale", "Family-friendly", "Romantic", "Trendy"],
    bar: ["Lively", "Chill", "Upbeat", "Sophisticated", "Energetic"],
    sports: ["Exciting", "Competitive", "Team spirit", "High-energy", "Fan-friendly"],
    attraction: ["Cultural", "Educational", "Inspiring", "Scenic", "Historic"],
    event: ["Festive", "Entertaining", "Social", "Creative", "Memorable"]
  };
  
  const allVibes = ["Busy", "Popular", "Local favorite", "Hidden gem"];
  const typeVibes = vibesByType[type as keyof typeof vibesByType] || [];
  
  // Select 2-3 vibes
  const numberOfVibes = Math.floor(Math.random() * 2) + 2;
  const combinedVibes = [...typeVibes, ...allVibes];
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numberOfVibes; i++) {
    const randomIndex = Math.floor(Math.random() * combinedVibes.length);
    const vibe = combinedVibes[randomIndex];
    
    if (!selectedVibes.includes(vibe)) {
      selectedVibes.push(vibe);
    }
    
    // Remove selected vibe to avoid duplicates
    combinedVibes.splice(randomIndex, 1);
    
    if (combinedVibes.length === 0) break;
  }
  
  return selectedVibes;
};

// Format location hours for display
export const formatLocationHours = (hours: BusinessHours | undefined): string => {
  if (!hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  return hours[today as keyof BusinessHours] as string || "Hours not available";
};

// Get location open/closed status
export const getLocationStatus = (location: Location): "open" | "closed" | "unknown" => {
  if (!location.hours) return "unknown";
  
  const now = new Date();
  const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const hours = location.hours[today as keyof typeof location.hours];
  
  if (!hours || hours === "Closed") return "closed";
  if (hours === "Open 24 hours") return "open";
  
  // Parse hours like "9:00 AM - 5:00 PM"
  const hoursMatch = hours.match(/(\d+):(\d+)\s+(AM|PM)\s+-\s+(\d+):(\d+)\s+(AM|PM)/);
  if (!hoursMatch) return "unknown";
  
  const [_, openHour, openMinute, openPeriod, closeHour, closeMinute, closePeriod] = hoursMatch;
  
  const openTime = getTimeInMinutes(parseInt(openHour), parseInt(openMinute), openPeriod);
  const closeTime = getTimeInMinutes(parseInt(closeHour), parseInt(closeMinute), closePeriod);
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  return (currentTime >= openTime && currentTime <= closeTime) ? "open" : "closed";
};

// Helper function to convert time to minutes since midnight
const getTimeInMinutes = (hour: number, minute: number, period: string): number => {
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  
  return hour * 60 + minute;
};

// Get today's hours string
export const getTodaysHours = (location: Location): string => {
  if (!location.hours) return "Hours not available";
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const hours = location.hours as BusinessHours;
  
  return hours[today as keyof BusinessHours] as string || "Hours not available";
};

/**
 * Generates a mock venue with realistic data for development
 */
export function generateMockVenue(id: string, options: Partial<Location> = {}): Location {
  const venueTypes = ['restaurant', 'bar', 'club', 'cafe', 'attraction', 'event', 'sports'];
  const selectedType = options.type || venueTypes[Math.floor(Math.random() * venueTypes.length)];
  
  const cityInfo = options.city ? 
    getCityCoordinates(options.city) : 
    getCityCoordinates('Miami');
  
  // Generate location near the city center
  const lat = cityInfo.lat + (Math.random() * 0.05 - 0.025);
  const lng = cityInfo.lng + (Math.random() * 0.05 - 0.025);
  
  // Generate name based on venue type
  const name = generateVenueName(selectedType);
  
  // Generate business hours
  const hours = generateBusinessHours(selectedType);
  
  // Generate ratings
  const ratingValue = (Math.random() * 2 + 3).toFixed(1);
  const ratingCount = Math.floor(Math.random() * 500) + 50;
  
  return {
    id: id,
    name: options.name || name,
    address: options.address || generateAddress(options.city || 'Miami'),
    city: options.city || 'Miami',
    state: options.state || 'FL',
    lat: options.lat || lat,
    lng: options.lng || lng,
    type: selectedType,
    category: options.category || generateCategory(selectedType),
    description: options.description || generateDescription(selectedType),
    phone: options.phone || generatePhoneNumber(),
    website: options.website || `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
    hours: options.hours || hours,
    pricing: options.pricing || Math.floor(Math.random() * 3) + 1,
    rating: options.rating || parseFloat(ratingValue),
    ratingCount: options.ratingCount || ratingCount,
    images: options.images || generateImages(selectedType),
    amenities: options.amenities || generateAmenities(selectedType),
    popular_times: options.popular_times || generatePopularTimes()
  };
}

/**
 * Generates a venue name based on type
 */
export function generateVenueName(type: string): string {
  // Names by type
  const names: Record<string, string[]> = {
    restaurant: [
      'The Hungry Bistro', 'Ocean View Grill', 'The Savory Plate',
      'Urban Eats', 'Fusion Kitchen', 'The Daily Feast',
      'Harbor House', 'The Spice Route', 'Sapphire Dining'
    ],
    bar: [
      'The Tipsy Cork', 'Nightcap Lounge', 'The Crafty Pint',
      'Barrel & Vine', 'The Mixing Room', 'The Velvet Lounge',
      'Skyline Bar', 'The Copper Tap', 'Midnight Social'
    ],
    club: [
      'Pulse', 'Elevate', 'Mirage', 'Eclipse', 'Euphoria',
      'Rhythm', 'Vibe', 'Illusion', 'Ecstasy', 'Utopia'
    ],
    cafe: [
      'Morning Brew', 'The Daily Grind', 'Café Soleil',
      'Bean & Leaf', 'The Cozy Cup', 'Urban Roast',
      'The Artful Espresso', 'Cream & Sugar', 'The Reading Room'
    ],
    attraction: [
      'Wonder World', 'Discovery Zone', 'Heritage Park',
      'Natural Wonders', 'The Grand Gallery', 'Ocean Depths',
      'Sky Tower', 'History Haven', 'Adventure Realm'
    ],
    event: [
      'The Grand Ballroom', 'Festival Plaza', 'The Landmark',
      'Celebration Hall', 'The Venue', 'Performance Place',
      'Convention Center', 'The Pavilion', 'Legacy Arena'
    ],
    sports: [
      'Victory Stadium', 'Champions Field', 'The Athletic Club',
      'Sports Complex', 'The Arena', 'Olympic Center',
      'Fitness Hub', 'The Court', 'Training Grounds'
    ]
  };
  
  // Default names if type doesn't match
  const defaultNames = [
    'The Local Spot', 'City Center', 'Urban Oasis',
    'The Gathering', 'Main Street Hub', 'Downtown Place'
  ];
  
  const venueNames = names[type] || defaultNames;
  return venueNames[Math.floor(Math.random() * venueNames.length)];
}

/**
 * Generates a realistic address
 */
export function generateAddress(city: string): string {
  const streets = [
    'Main St', 'Park Ave', 'Ocean Dr', 'Maple Ave',
    'Market St', 'Broadway', 'Highland Ave', 'Washington Blvd',
    'Central Ave', 'Sunset Blvd', 'River Rd', 'Bay St'
  ];
  
  const numbers = Math.floor(Math.random() * 999) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  
  return `${numbers} ${street}`;
}

/**
 * Generates a category based on venue type
 */
export function generateCategory(type: string): string {
  const categories: Record<string, string[]> = {
    restaurant: [
      'Italian', 'Mexican', 'American', 'Chinese', 'Japanese',
      'Thai', 'Mediterranean', 'Indian', 'French', 'BBQ'
    ],
    bar: [
      'Cocktail Bar', 'Sports Bar', 'Wine Bar', 'Brewery',
      'Pub', 'Lounge', 'Rooftop Bar', 'Dive Bar', 'Speakeasy'
    ],
    club: [
      'Dance Club', 'Live Music', 'Jazz Club', 'Hip Hop',
      'EDM', 'Latin', 'R&B', 'Alternative', 'Pop'
    ],
    cafe: [
      'Coffee Shop', 'Bakery', 'Tea House', 'Dessert Shop',
      'Juice Bar', 'Brunch Spot', 'Bistro', 'Sandwich Shop'
    ],
    attraction: [
      'Museum', 'Art Gallery', 'Historic Site', 'Park',
      'Zoo', 'Aquarium', 'Theme Park', 'Garden', 'Theater'
    ],
    event: [
      'Concert Hall', 'Conference Center', 'Wedding Venue',
      'Exhibition Space', 'Theater', 'Festival Grounds'
    ],
    sports: [
      'Stadium', 'Arena', 'Sports Bar', 'Golf Course',
      'Tennis Club', 'Bowling Alley', 'Fitness Center'
    ]
  };
  
  const defaultCategories = ['Entertainment', 'Venue', 'Landmark'];
  const venueCategories = categories[type] || defaultCategories;
  
  return venueCategories[Math.floor(Math.random() * venueCategories.length)];
}

// Gets the coordinates for a city
export function getCityCoordinates(cityName: string): { lat: number, lng: number } {
  const cityCoordinates: Record<string, { lat: number, lng: number }> = {
    'Miami': { lat: 25.7617, lng: -80.1918 },
    'New York': { lat: 40.7128, lng: -74.0060 },
    'Los Angeles': { lat: 34.0522, lng: -118.2437 },
    'Chicago': { lat: 41.8781, lng: -87.6298 },
    'Austin': { lat: 30.2672, lng: -97.7431 },
    'San Francisco': { lat: 37.7749, lng: -122.4194 },
    'Seattle': { lat: 47.6062, lng: -122.3321 },
    'Denver': { lat: 39.7392, lng: -104.9903 },
    'Atlanta': { lat: 33.7490, lng: -84.3880 },
    'Boston': { lat: 42.3601, lng: -71.0589 },
    'Nashville': { lat: 36.1627, lng: -86.7816 },
    'New Orleans': { lat: 29.9511, lng: -90.0715 },
    'Washington DC': { lat: 38.9072, lng: -77.0369 }
  };
  
  // If we have coordinates for this city, return them
  if (typeof cityName === 'string' && cityName in cityCoordinates) {
    return cityCoordinates[cityName];
  }
  
  // Default to Miami if city not found
  return cityCoordinates['Miami'];
}
