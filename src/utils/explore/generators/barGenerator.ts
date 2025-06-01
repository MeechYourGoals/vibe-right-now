
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
