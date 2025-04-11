import { getRandomArrayElement, getRandomInt } from '../random';

// Random business names
const businessNamePrefixes = [
  "The", "City", "Golden", "Blue", "Urban", "Metro", "Elite", "Royal", "Coastal", "Capital"
];
const businessNameWords = ["Café", "Bistro", "Bar", "Grill", "Restaurant", "Diner", "Lounge", "Pub", "Kitchen", "Eatery"];
const businessNameSuffixes = ["& Co.", "House", "Place", "Corner", "Hub", "Spot", "Joint", "Express", "Collective", "Room"];

// Random cuisines
const cuisines = ["Italian", "Mexican", "American", "Japanese", "Chinese", "Indian", "French", "Mediterranean", "Thai", "BBQ"];

// Random vibes
const vibes = ["cozy", "trendy", "upscale", "casual", "romantic", "family-friendly", "lively", "quiet", "vibrant", "historic"];

// Location types
const locationTypes = ["restaurant", "café", "bar", "club", "entertainment", "park", "museum", "shopping", "hotel", "fitness"];

// Sample photos
const samplePhotoUrls = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330",
  "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
  "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e",
  "https://images.unsplash.com/photo-1555992336-03a23c7b20ee",
];

// Generate Random Business Hours
const generateBusinessHours = (): BusinessHours => {
  const openTime = `${getRandomInt(7, 11)}:00 AM`;
  const closeTime = `${getRandomInt(8, 11)}:00 PM`;
  const weekendOpenTime = `${getRandomInt(8, 12)}:00 AM`;
  const weekendCloseTime = `${getRandomInt(4, 10)}:00 PM`;
  
  return {
    monday: { open: openTime, close: closeTime },
    tuesday: { open: openTime, close: closeTime },
    wednesday: { open: openTime, close: closeTime },
    thursday: { open: openTime, close: closeTime },
    friday: { open: openTime, close: closeTime },
    saturday: { open: weekendOpenTime, close: weekendCloseTime },
    sunday: { open: getRandomInt(0, 1) ? weekendOpenTime : 'Closed', close: getRandomInt(0, 1) ? weekendCloseTime : 'Closed' }
  };
};

// Generate random tags based on type
const generateTags = (type: string): string[] => {
  const tags: string[] = [];
  
  // Add type tag
  tags.push(type);
  
  // Add cuisine for restaurants
  if (type === "restaurant" || type === "café") {
    tags.push(getRandomArrayElement(cuisines));
  }
  
  // Add vibe tags
  tags.push(getRandomArrayElement(vibes));
  if (Math.random() > 0.7) {
    let secondVibe;
    do {
      secondVibe = getRandomArrayElement(vibes);
    } while (tags.includes(secondVibe));
    tags.push(secondVibe);
  }
  
  // Random features
  const features = ["outdoor seating", "wifi", "live music", "rooftop", "parking", "pet-friendly", "accessible"];
  if (Math.random() > 0.5) {
    tags.push(getRandomArrayElement(features));
  }
  
  return tags;
};

// Generate random price level
const generatePriceLevel = (): number => {
  const weights = [0.15, 0.35, 0.35, 0.15]; // Weights for price levels 1-4
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random <= sum) {
      return i + 1;
    }
  }
  
  return 2; // Default to level 2
};

// Generate a price range string from price level
const generatePriceRange = (priceLevel: number): string => {
  return "$".repeat(priceLevel);
};

// Generate a single random location
export const generateRandomLocation = (id: string, latBase = 34.05, lngBase = -118.25): Location => {
  const type = getRandomArrayElement(locationTypes);
  const priceLevel = generatePriceLevel();
  const tags = generateTags(type);
  const businessNamePrefix = getRandomArrayElement(businessNamePrefixes);
  const businessNameWord = getRandomArrayElement(businessNameWords);
  const businessNameSuffix = getRandomArrayElement(businessNameSuffixes);
  const businessName = Math.random() > 0.5 
    ? `${businessNamePrefix} ${businessNameWord}`
    : `${businessNameWord} ${businessNameSuffix}`;
  
  // Generate sample photos
  const photoCount = getRandomInt(1, 5);
  const photos = [];
  for (let i = 0; i < photoCount; i++) {
    photos.push({
      url: getRandomArrayElement(samplePhotoUrls)
    });
  }
  
  return {
    id,
    name: businessName,
    description: `A ${tags.join(', ')} ${type} located in the heart of the city.`,
    address: `${getRandomInt(100, 999)} ${getRandomArrayElement(["Main", "Oak", "Maple", "Pine", "Broadway"])} St`,
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    lat: latBase + (Math.random() - 0.5) * 0.1,
    lng: lngBase + (Math.random() - 0.5) * 0.1,
    type,
    rating: Math.round((2.5 + Math.random() * 2.5) * 10) / 10, // Rating between 2.5 and 5
    priceLevel,
    hours: generateBusinessHours(),
    phone: `(${getRandomInt(100, 999)}) ${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`,
    website: `https://example.com/${businessName.toLowerCase().replace(/\s+/g, '-')}`,
    photos,
    tags,
    verified: Math.random() > 0.7,
    vibes: tags.filter(tag => vibes.includes(tag)),
    isPopular: Math.random() > 0.7,
    priceRange: generatePriceRange(priceLevel),
    isFeatured: Math.random() > 0.8,
    featuredUntil: Math.random() > 0.8 ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString() : undefined,
    temporarilyClosed: Math.random() > 0.9,
    openNow: Math.random() > 0.3
  };
};

// Generate multiple random locations around a central point
export const generateRandomLocations = (count, latBase = 34.05, lngBase = -118.25) => {
  const locations = [];
  for(let i = 0; i < count; i++) {
    locations.push(generateRandomLocation(`loc_${i}`, latBase, lngBase));
  }
  return locations;
};
