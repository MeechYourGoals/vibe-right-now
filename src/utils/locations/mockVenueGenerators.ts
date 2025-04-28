
import { Location } from "@/types";

export const createId = (city: string, index: number): string => {
  return `${city.toLowerCase().replace(/\s+/g, '-')}-venue-${index}`;
};

export const getSportsVenueName = (city: string): string => {
  const names = [
    `${city} Arena`,
    `${city} Stadium`,
    `${city} Sports Center`,
    `${city} Athletic Park`,
    `${city} Coliseum`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const getLoungeName = (city: string): string => {
  const names = [
    `${city} Skybar`,
    `Rooftop ${city}`,
    `${city} Nightclub`,
    `Club ${city}`,
    `${city} Lounge`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const getRestaurantName = (city: string): string => {
  const names = [
    `${city} Bistro`,
    `${city} Fine Dining`,
    `${city} Eatery`,
    `Downtown ${city} Kitchen`,
    `${city} Grill`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const getEventName = (city: string): string => {
  const names = [
    `${city} Music Festival`,
    `${city} Concert Hall`,
    `${city} Event Center`,
    `${city} Performing Arts`,
    `${city} Theater`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const getComedyClubName = (city: string): string => {
  const names = [
    `${city} Comedy Club`,
    `Laugh Factory ${city}`,
    `${city} Improv`,
    `Comedy Cellar ${city}`,
    `${city} Stand Up`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const getFitnessClassName = (city: string): string => {
  const names = [
    `${city} Fitness Center`,
    `${city} Yoga Studio`,
    `${city} Pilates`,
    `${city} CrossFit`,
    `${city} Gym`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const getAttractionName = (city: string): string => {
  const names = [
    `${city} Museum`,
    `${city} Art Gallery`,
    `${city} Aquarium`,
    `${city} National Park`,
    `${city} Zoo`
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Generate a random ZIP code based on the city
const generateRandomZip = (city: string, state: string): string => {
  const cityHash = Array.from(city).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stateHash = Array.from(state || "").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const zipBase = (10000 + (cityHash + stateHash) % 89999);
  return zipBase.toString();
};

export const generateMusicVenues = (city: string, state: string): Location[] => {
  const venues: Location[] = [];
  
  for (let i = 0; i < 3; i++) {
    const id = `music-venue-${city.toLowerCase().replace(/\s+/g, '-')}-${i}`;
    venues.push({
      id,
      name: `${city} Music Hall ${i + 1}`,
      address: `${100 + i * 50} Music Avenue`,
      city,
      state,
      country: 'USA',
      zip: generateRandomZip(city, state),
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.006 + (Math.random() - 0.5) * 0.1,
      type: 'event',
      verified: Math.random() > 0.3,
      vibes: ["Live Music", "Trendy", "Nightlife"]
    });
  }
  
  return venues;
};

export const generateComedyClubs = (city: string, state: string): Location[] => {
  const venues: Location[] = [];
  
  for (let i = 0; i < 2; i++) {
    const id = `comedy-venue-${city.toLowerCase().replace(/\s+/g, '-')}-${i}`;
    venues.push({
      id,
      name: getComedyClubName(city),
      address: `${100 + i * 50} Comedy Street`,
      city,
      state,
      country: 'USA',
      zip: generateRandomZip(city, state),
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.006 + (Math.random() - 0.5) * 0.1,
      type: 'event',
      verified: Math.random() > 0.3,
      vibes: ["Comedy", "Nightlife", "Entertainment"]
    });
  }
  
  return venues;
};
