import { Location } from "@/types";
import { generateAddress, generateZipCode, generateLatitude, generateLongitude, generateVibes, generateTags, generatePhoneNumber, generateWebsite } from "../locationUtils";

const restaurantNames = [
  "The Spicy Spoon",
  "Urban Eats",
  "Mama Rosa's",
  "The Blue Plate Diner",
  "Sizzle Steakhouse",
  "Aqua Grill",
  "The Daily Grind",
  "Bella Italia",
  "Zenith Bistro",
  "Rustic Tavern"
];

const cafeNames = [
  "The Coffee Corner",
  "Brew & Bites",
  "Cozy Cafe",
  "The Daily Drip",
  "Sweet Surrender Cafe",
  "Bean Scene",
  "The Latte Lounge",
  "Caffeine Fix",
  "Morning Glory Cafe",
  "The Tea Spot"
];

export const generateRestaurants = (city: string, state: string, count: number = 4): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-restaurant-${index + 1}`,
    name: restaurantNames[Math.floor(Math.random() * restaurantNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "restaurant" as const,
    verified: Math.random() > 0.3,
    rating: Math.round((Math.random() * 2.5 + 2.5) * 10) / 10,
    price_level: Math.floor(Math.random() * 4) + 1,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 4000) + 150,
    checkins: Math.floor(Math.random() * 1000) + 75,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};

export const generateCafes = (city: string, state: string, count: number = 2): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-cafe-${index + 1}`,
    name: cafeNames[Math.floor(Math.random() * cafeNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "cafe" as const,
    verified: Math.random() > 0.4,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    price_level: Math.floor(Math.random() * 3) + 1,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 2000) + 100,
    checkins: Math.floor(Math.random() * 600) + 50,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};

// Helper function to generate a random cuisine
const generateCuisine = (): string => {
  const cuisines = ["Italian", "Mexican", "American", "Chinese", "Indian", "Thai", "Japanese", "French"];
  return cuisines[Math.floor(Math.random() * cuisines.length)];
};

// Helper function to generate a random price range
const generatePriceRange = (): string => {
  const prices = ["$", "$$", "$$$"];
  return prices[Math.floor(Math.random() * prices.length)];
};
