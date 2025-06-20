
import { Location } from "@/types";
import {
  generateAddress,
  generateZipCode,
  generateLatitude,
  generateLongitude,
  generateVibes,
  generateTags,
  generatePhoneNumber,
  generateWebsite,
} from "../locationUtils";

const attractionNames = [
  "Museum of Modern Art",
  "Historical Society",
  "Science Center",
  "Art Gallery",
  "Children's Museum",
  "Natural History Museum",
  "Air and Space Museum",
  "Hall of Fame",
  "Aquarium",
  "Botanical Garden",
];

const landmarkNames = [
  "City Monument",
  "Historic Tower",
  "Famous Bridge",
  "Cultural Center",
  "Memorial Park",
  "Observation Deck",
  "Heritage Site",
  "Public Square",
  "Scenic Overlook",
  "Landmark Building",
];

export const generateAttractions = (city: string, state: string, count: number = 2): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-attraction-${index + 1}`,
    name: attractionNames[Math.floor(Math.random() * attractionNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "attraction" as const,
    verified: Math.random() > 0.3,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    price_level: Math.floor(Math.random() * 4) + 1,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 5000) + 100,
    checkins: Math.floor(Math.random() * 1000) + 50,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};

export const generateLandmarks = (city: string, state: string, count: number = 1): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-landmark-${index + 1}`,
    name: landmarkNames[Math.floor(Math.random() * landmarkNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "attraction" as const,
    verified: true,
    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
    price_level: Math.floor(Math.random() * 3) + 1,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 10000) + 500,
    checkins: Math.floor(Math.random() * 2000) + 200,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};
