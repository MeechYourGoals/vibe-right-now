
import { Location } from '@/types';

const cities = [
  { name: 'Los Angeles', state: 'CA', country: 'US' },
  { name: 'New York', state: 'NY', country: 'US' },
  { name: 'Miami', state: 'FL', country: 'US' },
  { name: 'Las Vegas', state: 'NV', country: 'US' },
  { name: 'Chicago', state: 'IL', country: 'US' }
];

const venueTypes: Location['category'][] = [
  'restaurant', 'bar', 'nightclub', 'lounge', 'music_venue', 
  'comedy_club', 'attraction', 'sports', 'event', 'other'
];

const vibeTagsOptions = [
  ['🔥 Lit', '🎉 Party', '⚡ Electric'],
  ['🌃 Chill', '🍸 Classy', '💎 Bougie'],
  ['🎵 Vibes', '🎭 Artsy', '📸 Aesthetic'],
  ['🌮 Foodie', '☕ Coffee', '🍺 Craft'],
  ['🏀 Sports', '🎪 Fun', '🌟 Trending'],
  ['🌅 Sunset', '🏙️ Skyline', '🌊 Ocean'],
  ['🎸 Rock', '🎤 Karaoke', '💃 Dance']
];

export const generateRandomLocation = (id: string): Location => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  const venueType = venueTypes[Math.floor(Math.random() * venueTypes.length)];
  const vibeSet = vibeTagsOptions[Math.floor(Math.random() * vibeTagsOptions.length)];

  return {
    id,
    name: `${venueType.charAt(0).toUpperCase() + venueType.slice(1)} ${Math.floor(Math.random() * 1000)}`,
    address: `${Math.floor(Math.random() * 9999)} Random St`,
    city: city.name,
    state: city.state,
    country: city.country,
    category: venueType,
    rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
    priceRange: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)] as '$' | '$$' | '$$$' | '$$$$',
    lat: 34.0522 + (Math.random() - 0.5) * 0.1,
    lng: -118.2437 + (Math.random() - 0.5) * 0.1,
    source: 'generated',
    description: `A great ${venueType} in ${city.name}`,
    amenities: ['WiFi', 'Parking', 'Outdoor Seating'].slice(0, Math.floor(Math.random() * 3) + 1),
    vibes: vibeSet.slice(0, Math.floor(Math.random() * 3) + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

export const generateLocationBatch = (count: number, startId: number = 1): Location[] => {
  const locations: Location[] = [];
  for (let i = 0; i < count; i++) {
    locations.push(generateRandomLocation((startId + i).toString()));
  }
  return locations;
};

// Specific generators for different venue types
export const generateRestaurants = (city: string, count: number = 10): Location[] => {
  const restaurants: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    restaurants.push({
      id: `restaurant_${i}`,
      name: `Restaurant ${i + 1}`,
      address: `${100 + i} Food St`,
      city,
      state: 'CA',
      country: 'US',
      category: 'restaurant',
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      priceRange: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)] as '$' | '$$' | '$$$' | '$$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `A delicious restaurant in ${city}`,
      amenities: ['WiFi', 'Parking', 'Outdoor Seating'],
      vibes: ['🌮 Foodie', '🍸 Classy', '📸 Aesthetic'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return restaurants;
};

export const generateBars = (city: string, count: number = 10): Location[] => {
  const bars: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    bars.push({
      id: `bar_${i}`,
      name: `Bar ${i + 1}`,
      address: `${200 + i} Drink Ave`,
      city,
      state: 'CA',
      country: 'US',
      category: 'bar',
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      priceRange: ['$$', '$$$', '$$$$'][Math.floor(Math.random() * 3)] as '$$' | '$$$' | '$$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `A cool bar in ${city}`,
      amenities: ['Happy Hour', 'Live Music', 'Outdoor Seating'],
      vibes: ['🍸 Classy', '🌃 Chill', '🔥 Lit'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return bars;
};

export const generateNightclubs = (city: string, count: number = 5): Location[] => {
  const nightclubs: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    nightclubs.push({
      id: `nightclub_${i}`,
      name: `Club ${i + 1}`,
      address: `${300 + i} Party Blvd`,
      city,
      state: 'CA',
      country: 'US',
      category: 'nightclub',
      rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
      priceRange: ['$$$', '$$$$'][Math.floor(Math.random() * 2)] as '$$$' | '$$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `The hottest nightclub in ${city}`,
      amenities: ['VIP Sections', 'DJ Booth', 'Dance Floor'],
      vibes: ['🔥 Lit', '💃 Dance', '🎉 Party'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return nightclubs;
};

export const generateAttractions = (city: string, count: number = 8): Location[] => {
  const attractions: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    attractions.push({
      id: `attraction_${i}`,
      name: `Attraction ${i + 1}`,
      address: `${400 + i} Tourist Way`,
      city,
      state: 'CA',
      country: 'US',
      category: 'attraction',
      rating: Number((4.2 + Math.random() * 0.8).toFixed(1)),
      priceRange: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)] as '$' | '$$' | '$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `A must-see attraction in ${city}`,
      amenities: ['Guided Tours', 'Gift Shop', 'Photo Opportunities'],
      vibes: ['📸 Aesthetic', '🎭 Artsy', '🌟 Trending'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return attractions;
};

export const generateSportsVenues = (city: string, count: number = 5): Location[] => {
  const sportsVenues: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    sportsVenues.push({
      id: `sports_${i}`,
      name: `Sports Venue ${i + 1}`,
      address: `${500 + i} Stadium Dr`,
      city,
      state: 'CA',
      country: 'US',
      category: 'sports',
      rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
      priceRange: ['$$', '$$$', '$$$$'][Math.floor(Math.random() * 3)] as '$$' | '$$$' | '$$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `An exciting sports venue in ${city}`,
      amenities: ['Concessions', 'Parking', 'Team Store'],
      vibes: ['🏀 Sports', '🔥 Lit', '🎉 Party'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return sportsVenues;
};

export const generateMusicVenues = (city: string, count: number = 6): Location[] => {
  const musicVenues: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    musicVenues.push({
      id: `music_${i}`,
      name: `Music Venue ${i + 1}`,
      address: `${600 + i} Music Row`,
      city,
      state: 'CA',
      country: 'US',
      category: 'music_venue',
      rating: Number((4.1 + Math.random() * 0.9).toFixed(1)),
      priceRange: ['$$', '$$$'][Math.floor(Math.random() * 2)] as '$$' | '$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `Live music venue in ${city}`,
      amenities: ['Sound System', 'Bar', 'Stage'],
      vibes: ['🎵 Vibes', '🎸 Rock', '🎤 Live'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return musicVenues;
};

export const generateComedyClubs = (city: string, count: number = 4): Location[] => {
  const comedyClubs: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    comedyClubs.push({
      id: `comedy_${i}`,
      name: `Comedy Club ${i + 1}`,
      address: `${700 + i} Laugh Lane`,
      city,
      state: 'CA',
      country: 'US',
      category: 'comedy_club',
      rating: Number((4.3 + Math.random() * 0.7).toFixed(1)),
      priceRange: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)] as '$' | '$$' | '$$$',
      lat: 34.0522 + Math.random() * 0.01,
      lng: -118.2437 + Math.random() * 0.01,
      source: 'generated',
      description: `Comedy club with great laughs in ${city}`,
      amenities: ['Comedy Shows', 'Bar', 'Intimate Setting'],
      vibes: ['😂 Comedy', '🎭 Performance', '🍻 Fun'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return comedyClubs;
};
