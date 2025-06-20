
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

const sportsVenueNames = [
  "Victory Stadium",
  "Champions Arena",
  "Titans Field",
  "Gladiators Coliseum",
  "Legends Park",
  "Royals Arena",
  "Stars Stadium",
  "Eagles Field",
  "Phoenix Coliseum",
  "Warriors Park",
];

export const generateSportsVenues = (city: string, state: string, count: number = 1): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-sports-${index + 1}`,
    name: sportsVenueNames[Math.floor(Math.random() * sportsVenueNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "sports" as const,
    verified: true,
    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
    price_level: Math.floor(Math.random() * 4) + 2,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 15000) + 1000,
    checkins: Math.floor(Math.random() * 5000) + 500,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};
