import { Location } from "@/types";
import { getMockUserProfile } from "@/mock/users";
import { getRandomItems } from "@/utils/explore/mockGenerators";
import { vibeTags } from "../helpers/vibeTags";
import { generateZipCode } from "../helpers/zipCodeGenerator";

// Generate bar/nightlife locations for a city
export const generateBarLocations = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [];
  
  // Bar location
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-bar-1`,
    name: `${city} Brewing Co.`,
    address: `789 Elm Street`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'bar',
    verified: true,
    hours: {
      monday: '4:00 PM - 12:00 AM',
      tuesday: '4:00 PM - 12:00 AM',
      wednesday: '4:00 PM - 12:00 AM',
      thursday: '4:00 PM - 1:00 AM',
      friday: '3:00 PM - 2:00 AM',
      saturday: '12:00 PM - 2:00 AM',
      sunday: '12:00 PM - 10:00 PM'
    },
    vibes: getRandomItems(vibeTags, 3),
    userProfile: getMockUserProfile('venue'),
  });
  
  // Nightlife location
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-nightlife-1`,
    name: `Club ${city}`,
    address: `500 Nightlife Blvd`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'bar',
    verified: true,
    hours: {
      monday: 'Closed',
      tuesday: 'Closed',
      wednesday: '9:00 PM - 2:00 AM',
      thursday: '9:00 PM - 2:00 AM',
      friday: '9:00 PM - 3:00 AM',
      saturday: '9:00 PM - 3:00 AM',
      sunday: '9:00 PM - 1:00 AM'
    },
    vibes: [...getRandomItems(vibeTags, 2), 'Nightowl'],
    userProfile: getMockUserProfile('venue'),
  });
  
  return locations;
};

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
