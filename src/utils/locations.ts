
import { Location } from "@/types";

export interface CityCoordinate {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

export const cityCoordinates: Record<string, CityCoordinate> = {
  ny: {
    name: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7128,
    lng: -74.0060
  },
  la: {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    lat: 34.0522,
    lng: -118.2437
  },
  chicago: {
    name: "Chicago",
    state: "IL",
    country: "USA",
    lat: 41.8781,
    lng: -87.6298
  },
  miami: {
    name: "Miami",
    state: "FL",
    country: "USA",
    lat: 25.7617,
    lng: -80.1918
  },
  sf: {
    name: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 37.7749,
    lng: -122.4194
  },
  london: {
    name: "London",
    country: "UK",
    lat: 51.5074,
    lng: -0.1278
  },
  paris: {
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522
  },
  tokyo: {
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503
  },
  sydney: {
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093
  },
  rome: {
    name: "Rome",
    country: "Italy",
    lat: 41.9028,
    lng: 12.4964
  },
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    lat: 41.3851,
    lng: 2.1734
  },
  berlin: {
    name: "Berlin",
    country: "Germany",
    lat: 52.5200,
    lng: 13.4050
  },
  amsterdam: {
    name: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lng: 4.9041
  },
  dublin: {
    name: "Dublin",
    country: "Ireland",
    lat: 53.3498,
    lng: -6.2603
  },
  seattle: {
    name: "Seattle",
    state: "WA",
    country: "USA",
    lat: 47.6062,
    lng: -122.3321
  },
  toronto: {
    name: "Toronto",
    country: "Canada",
    lat: 43.6532,
    lng: -79.3832
  },
  vancouver: {
    name: "Vancouver",
    country: "Canada",
    lat: 49.2827,
    lng: -123.1207
  }
};

// Generate a set of locations for each city
export const generateCityLocations = (city: CityCoordinate, count: number = 10): Location[] => {
  const locations: Location[] = [];
  
  const types = ["restaurant", "bar", "cafe", "club", "venue", "attraction", "hotel"];
  const priceRanges = ["$", "$$", "$$$", "$$$$"];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const price = priceRanges[Math.floor(Math.random() * priceRanges.length)];
    
    // Add some randomness to coordinates to spread locations around the city center
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;
    
    locations.push({
      id: `${city.name.toLowerCase().replace(/\s/g, '-')}-${type}-${i}`,
      name: generatePlaceName(city.name, type, i),
      address: `${Math.floor(Math.random() * 1000) + 1} ${getRandomStreetName()} ${getRandomStreetType()}`,
      city: city.name,
      state: city.state || "",
      country: city.country,
      lat: city.lat + latOffset,
      lng: city.lng + lngOffset,
      type,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      website: `https://www.${type.toLowerCase()}${i}.example.com`,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Random rating between 3.0 and 5.0
      price,
      description: generatePlaceDescription(type),
      tags: generateTags(type),
      images: generateImages(type, i),
      photos: generateImages(type, i),
      verified: Math.random() > 0.7,
      trending: Math.random() > 0.8,
      vibes: generateVibes()
    });
  }
  
  return locations;
};

// Helper function to generate place names based on city and type
const generatePlaceName = (cityName: string, type: string, index: number): string => {
  const restaurantPrefixes = ["The", "Casa", "Café", "Bistro", "Trattoria", "Urban", "Golden", "Royal", "Blue", "Green"];
  const restaurantSuffixes = ["Kitchen", "Table", "Spoon", "Garden", "Plate", "Grill", "Oven", "Fork", "Feast"];
  
  const barPrefixes = ["The", "Tipsy", "Rustic", "Vintage", "Corner", "Downtown", "Classic", "Modern", "Cozy"];
  const barSuffixes = ["Bar", "Lounge", "Pub", "Tavern", "Spirits", "Cellar", "Brewery", "Distillery"];
  
  const attractionPrefixes = ["Amazing", "Historic", "Beautiful", "Majestic", "Incredible", "Spectacular"];
  const attractionSuffixes = ["Museum", "Gallery", "Park", "Garden", "Monument", "Theater", "Cathedral", "Tower"];
  
  switch (type) {
    case "restaurant":
      return `${restaurantPrefixes[index % restaurantPrefixes.length]} ${restaurantSuffixes[index % restaurantSuffixes.length]}`;
    case "bar":
    case "club":
      return `${barPrefixes[index % barPrefixes.length]} ${barSuffixes[index % barSuffixes.length]}`;
    case "cafe":
      return `${cityName} Coffee House ${index + 1}`;
    case "venue":
      return `${cityName} ${["Event Center", "Convention Hall", "Theatre", "Auditorium"][index % 4]}`;
    case "attraction":
      return `${attractionPrefixes[index % attractionPrefixes.length]} ${attractionSuffixes[index % attractionSuffixes.length]}`;
    case "hotel":
      return `${["Grand", "Royal", "Luxury", "Premium", "Plaza"][index % 5]} Hotel ${cityName}`;
    default:
      return `${cityName} Place ${index + 1}`;
  }
};

// Helper function to generate descriptions
const generatePlaceDescription = (type: string): string => {
  const descriptions = {
    restaurant: [
      "A cozy spot offering delicious cuisine with a modern twist.",
      "Farm-to-table restaurant with seasonal ingredients and a warm atmosphere.",
      "Upscale dining experience with an innovative menu and craft cocktails.",
      "Family-friendly eatery serving comfort food classics and homestyle favorites."
    ],
    bar: [
      "Trendy cocktail bar with expert mixologists and a vibrant atmosphere.",
      "Relaxed neighborhood pub with craft beers and classic bar snacks.",
      "Upscale wine bar featuring an extensive selection and small plates.",
      "Sports bar with multiple screens, great drinks, and tasty pub grub."
    ],
    cafe: [
      "Artisanal coffee shop with house-roasted beans and freshly baked pastries.",
      "Charming café offering organic teas, light meals, and cozy seating.",
      "Modern espresso bar with specialty drinks and grab-and-go options.",
      "Quaint bakery café serving breakfast, lunch, and delicious desserts."
    ],
    club: [
      "High-energy nightclub featuring top DJs and a state-of-the-art sound system.",
      "Exclusive dance venue with multiple rooms and diverse music styles.",
      "Trendy club with VIP bottle service and an outdoor terrace.",
      "Underground electronic music venue popular with locals and tourists alike."
    ],
    venue: [
      "Versatile event space perfect for concerts, conferences, and private parties.",
      "Historic venue with stunning architecture and modern amenities.",
      "Intimate performance space showcasing local and international talent.",
      "Multi-purpose venue with flexible layouts and professional production."
    ],
    attraction: [
      "Must-visit landmark with breathtaking views and fascinating history.",
      "Cultural attraction featuring exhibits that showcase local heritage.",
      "Popular tourist destination with guided tours and interactive experiences.",
      "Hidden gem offering unique photo opportunities and memorable moments."
    ],
    hotel: [
      "Luxury accommodation with elegant rooms and world-class amenities.",
      "Boutique hotel offering personalized service and stylish design.",
      "Comfortable lodging with convenient location and great value.",
      "Historic hotel blending traditional charm with modern conveniences."
    ]
  };
  
  const typeDescriptions = descriptions[type as keyof typeof descriptions] || descriptions.restaurant;
  return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
};

// Helper function to generate tags based on place type
const generateTags = (type: string): string[] => {
  const commonTags = ["Trending", "Popular", "Highly Rated"];
  
  const typeTags: Record<string, string[]> = {
    restaurant: ["Fine Dining", "Casual Eats", "Outdoor Seating", "Brunch", "Dinner", "Lunch", "Takeout", "Delivery"],
    bar: ["Cocktails", "Craft Beer", "Wine Bar", "Sports Bar", "Happy Hour", "Live Music", "Rooftop"],
    cafe: ["Coffee", "Breakfast", "Pastries", "Wifi", "Study Spot", "Cozy", "Quiet"],
    club: ["Dancing", "DJ", "Nightlife", "VIP", "Bottle Service", "Late Night", "21+"],
    venue: ["Events", "Live Shows", "Concerts", "Private Parties", "Corporate", "Weddings"],
    attraction: ["Sightseeing", "Family Friendly", "Historic", "Photo Spot", "Tours Available"],
    hotel: ["Luxury", "Budget", "Pool", "Spa", "Room Service", "Fitness Center", "Pet Friendly"]
  };
  
  // Select 2-4 random tags from the common tags and type-specific tags
  const allTags = [...commonTags, ...(typeTags[type] || [])];
  const numTags = Math.floor(Math.random() * 3) + 2; // 2-4 tags
  const selectedTags: string[] = [];
  
  for (let i = 0; i < numTags; i++) {
    const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!selectedTags.includes(randomTag)) {
      selectedTags.push(randomTag);
    }
  }
  
  return selectedTags;
};

// Helper function to generate images
const generateImages = (type: string, index: number): string[] => {
  const baseUrl = "https://source.unsplash.com/featured/?";
  const imageCount = Math.floor(Math.random() * 3) + 1; // 1-3 images
  const images: string[] = [];
  
  for (let i = 0; i < imageCount; i++) {
    const query = `${type},${getSubtypeQuery(type)}`;
    const uniqueId = `${index}-${i}-${Date.now() % 1000}`;
    images.push(`${baseUrl}${query}/${uniqueId}`);
  }
  
  return images;
};

// Helper function to get more specific image query based on type
const getSubtypeQuery = (type: string): string => {
  const subtypes: Record<string, string[]> = {
    restaurant: ["food", "dining", "restaurant", "cuisine", "meal"],
    bar: ["drinks", "cocktails", "bartender", "pub", "lounge"],
    cafe: ["coffee", "cafe", "espresso", "pastry", "bakery"],
    club: ["nightclub", "party", "dj", "dancing", "nightlife"],
    venue: ["concert", "event", "stage", "performance", "hall"],
    attraction: ["landmark", "tourist", "scenery", "sightseeing", "monument"],
    hotel: ["hotel", "room", "suite", "accommodation", "lobby"]
  };
  
  const typeSubtypes = subtypes[type] || subtypes.restaurant;
  return typeSubtypes[Math.floor(Math.random() * typeSubtypes.length)];
};

// Generate vibes for a location
const generateVibes = (): string[] => {
  const allVibes = [
    "Cozy", "Lively", "Romantic", "Energetic", "Chill", 
    "Upscale", "Casual", "Friendly", "Intimate", "Crowded",
    "Trendy", "Hip", "Classic", "Modern", "Retro",
    "Quiet", "Buzzing", "Family-friendly", "Artsy", "Business"
  ];
  
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 vibes
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomVibe = allVibes[Math.floor(Math.random() * allVibes.length)];
    if (!selectedVibes.includes(randomVibe)) {
      selectedVibes.push(randomVibe);
    }
  }
  
  return selectedVibes;
};

// Helper function for random street names
const getRandomStreetName = (): string => {
  const streetNames = [
    "Main", "Oak", "Maple", "Pine", "Cedar", "Elm",
    "Washington", "Broadway", "Park", "Lake", "Hill",
    "River", "Church", "School", "Market", "Court"
  ];
  
  return streetNames[Math.floor(Math.random() * streetNames.length)];
};

// Helper function for random street types
const getRandomStreetType = (): string => {
  const streetTypes = [
    "St", "Ave", "Blvd", "Dr", "Ln", "Rd",
    "Way", "Pl", "Ct", "Terrace", "Circle"
  ];
  
  return streetTypes[Math.floor(Math.random() * streetTypes.length)];
};

// Generate all locations for all cities
export const generateAllCityLocations = (): Location[] => {
  let allLocations: Location[] = [];
  
  Object.values(cityCoordinates).forEach(city => {
    const cityLocations = generateCityLocations(city, 15); // Generate 15 locations per city
    allLocations = [...allLocations, ...cityLocations];
  });
  
  return allLocations;
};
