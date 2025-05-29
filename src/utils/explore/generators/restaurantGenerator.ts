
import { Location } from "@/types";
import { getMockUserProfile } from "@/mock/users";
import { getRandomItems } from "@/utils/explore/mockGenerators";
import { vibeTags } from "../helpers/vibeTags";
import { generateZipCode } from "../helpers/zipCodeGenerator";

// Generate restaurant locations for a city
export const generateRestaurantLocations = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [];
  
  // First restaurant
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-restaurant-1`,
    name: `Taste of ${city}`,
    address: `123 Main Street`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'restaurant',
    verified: true,
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    vibes: getRandomItems(vibeTags, 3),
    userProfile: getMockUserProfile('venue'),
  });
  
  // Second restaurant
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-restaurant-2`,
    name: `${city} Bistro`,
    address: `456 Oak Avenue`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'restaurant',
    verified: true,
    hours: {
      monday: '5:00 PM - 10:00 PM',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '5:00 PM - 11:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    vibes: getRandomItems(vibeTags, 3),
    userProfile: getMockUserProfile('venue'),
  });
  
  return locations;
};
