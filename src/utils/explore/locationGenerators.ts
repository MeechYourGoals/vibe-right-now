
import { Location } from "@/types";
import { getMockUserProfile } from "@/mock/users";
import { getRandomItems } from "@/utils/explore/mockGenerators";

const vibeTags = [
  'Relaxed', 'Energetic', 'Upscale', 'Casual', 'Family Friendly', 
  'Romantic', 'Cozy', 'Trendy', 'Artsy', 'Historic', 'Modern', 
  'Elegant', 'Rustic', 'Industrial', 'Intimate', 'Vibrant', 
  'Quirky', 'Bohemian', 'Sophisticated', 'Eclectic', 'Nostalgic', 
  'Peaceful', 'Lively', 'Chic', 'Traditional', 'Innovative', 
  'Warm', 'Minimalist', 'Retro', 'Nightowl'
];

// Add this helper function to generate zip codes
const generateZipCode = (city: string): string => {
  // Common zip code prefixes by city
  const zipPrefixes: Record<string, string> = {
    'San Francisco': '941',
    'Los Angeles': '900',
    'New York': '100',
    'Chicago': '606',
    'Miami': '331',
    'Seattle': '981',
    'Portland': '972',
    'Austin': '787',
    'Denver': '802',
    'Boston': '021',
  };
  
  const prefix = zipPrefixes[city] || '123';
  const suffix = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${prefix}${suffix}`;
};

export const generateMockLocationsForCity = (city: string, state: string = ""): Location[] => {
  const locations: Location[] = [];
  
  // Restaurant locations
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
    rating: 4.5,
    followers: 328,
    checkins: 1240,
  });
  
  // More restaurant
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
    rating: 4.7,
    followers: 512,
    checkins: 2108,
  });
  
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
    rating: 4.6,
    followers: 621,
    checkins: 3409,
  });
  
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
    rating: 4.3,
    followers: 1843,
    checkins: 12540,
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
    rating: 4.8,
    followers: 2156,
    checkins: 18975,
  });
  
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
    rating: 4.7,
    followers: 5823,
    checkins: 45698,
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
    rating: 4.4,
    followers: 3891,
    checkins: 29843,
  });
  
  return locations;
};

export const generateLocalNightlifeVenues = (city: string, state: string = ""): Location[] => {
  const venues = generateMockLocationsForCity(city, state)
    .filter(location => location.type === 'bar');
  
  venues.forEach(venue => {
    if (!venue.vibes.includes('Nightowl')) {
      venue.vibes.push('Nightowl');
    }
  });
  
  return venues;
};
