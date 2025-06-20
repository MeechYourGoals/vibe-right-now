
import { Location } from "@/types";
import { 
  generateAddress, 
  generateZipCode, 
  generateLatitude, 
  generateLongitude, 
  generateVibes, 
  generateTags, 
  generatePhoneNumber, 
  generateWebsite 
} from "../locationUtils";

const barNames = [
  "The Tipsy Tavern",
  "Brewhouse & Grill",
  "The Local Pub",
  "Craft Beer Co.",
  "The Whiskey Bar",
  "Downtown Brewery",
  "The Sports Bar",
  "Rooftop Lounge",
  "The Corner Bar",
  "Sunset Taphouse"
];

const nightlifeNames = [
  "Club Atmosphere",
  "The Night Owl",
  "Electric Lounge",
  "Dance Floor",
  "Late Night Club",
  "The Underground",
  "Pulse Nightclub",
  "Neon Nights",
  "After Hours",
  "The Beat Club"
];

export const generateBars = (city: string, state: string, count: number = 3): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-bar-${index + 1}`,
    name: barNames[Math.floor(Math.random() * barNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "bar" as const,
    verified: Math.random() > 0.4,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    price_level: Math.floor(Math.random() * 4) + 1,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 3000) + 100,
    checkins: Math.floor(Math.random() * 800) + 50,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};

export const generateNightlife = (city: string, state: string, count: number = 2): Location[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-nightlife-${index + 1}`,
    name: nightlifeNames[Math.floor(Math.random() * nightlifeNames.length)],
    address: generateAddress(),
    city,
    state,
    country: "USA",
    zip: generateZipCode(),
    lat: generateLatitude(),
    lng: generateLongitude(),
    type: "nightlife" as const,
    verified: Math.random() > 0.3,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    price_level: Math.floor(Math.random() * 4) + 2,
    vibes: generateVibes(),
    business_status: "OPERATIONAL",
    tags: generateTags(),
    phone: generatePhoneNumber(),
    website: generateWebsite(),
    followers: Math.floor(Math.random() * 5000) + 200,
    checkins: Math.floor(Math.random() * 1200) + 100,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }));
};
