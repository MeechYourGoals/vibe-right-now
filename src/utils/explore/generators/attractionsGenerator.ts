
import { Location } from "@/types";
import { getMockUserProfile } from "@/mock/users";
import { getRandomItems } from "@/utils/explore/mockGenerators";
import { vibeTags } from "../helpers/vibeTags";
import { generateZipCode } from "../helpers/zipCodeGenerator";

// Generate event and attraction locations for a city
export const generateEventAndAttractionLocations = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [];
  
  // Event location
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-event-1`,
    name: `${city} Festival Ground`,
    address: `101 Festival Way`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'event',
    verified: true,
    hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '10:00 AM - 8:00 PM'
    },
    vibes: getRandomItems(vibeTags, 3),
    userProfile: getMockUserProfile('venue'),
  });
  
  // Attraction location
  locations.push({
    id: `${city.toLowerCase().replace(/\s+/g, '-')}-attraction-1`,
    name: `${city} Museum of Art`,
    address: `200 Culture Blvd`,
    city: city,
    state: state || 'CA',
    country: 'USA',
    zip: generateZipCode(city),
    lat: 37.7749 + (Math.random() * 0.02 - 0.01),
    lng: -122.4194 + (Math.random() * 0.02 - 0.01),
    type: 'attraction',
    verified: true,
    hours: {
      monday: 'Closed',
      tuesday: '10:00 AM - 5:00 PM',
      wednesday: '10:00 AM - 5:00 PM',
      thursday: '10:00 AM - 5:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    vibes: getRandomItems(vibeTags, 3),
    userProfile: getMockUserProfile('venue'),
  });
  
  return locations;
};
