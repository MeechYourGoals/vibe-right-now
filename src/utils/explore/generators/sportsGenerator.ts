
import { Location } from "@/types";
import { getMockUserProfile } from "@/mock/users";
import { getRandomItems } from "@/utils/explore/mockGenerators";
import { vibeTags } from "../helpers/vibeTags";
import { generateZipCode } from "../helpers/zipCodeGenerator";

// Generate sports venues for a city
export const generateSportsLocations = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [];
  
  // Sports location
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-sports-1`,
    name: `${city} Arena`,
    address: `300 Sports Center Drive`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'sports',
    verified: true,
    hours: {
      monday: 'Varies by event',
      tuesday: 'Varies by event',
      wednesday: 'Varies by event',
      thursday: 'Varies by event',
      friday: 'Varies by event',
      saturday: 'Varies by event',
      sunday: 'Varies by event'
    },
    vibes: getRandomItems(vibeTags, 3),
    userProfile: getMockUserProfile('venue'),
  });
  
  return locations;
};
