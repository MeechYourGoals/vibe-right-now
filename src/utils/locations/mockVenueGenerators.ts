import { Location } from '@/components/VernonNext/types';

export const generateMusicVenues = (city: string, state: string): Location[] => {
  return [
    {
      id: `${city.toLowerCase()}-music-1`,
      name: `${city} Arena`,
      address: "123 Music Ave",
      city,
      state,
      country: "USA",
      zip: "12345",
      lat: 40.7128,
      lng: -74.0060,
      type: "music",
      verified: true,
      vibes: ["Live Music", "High Energy", "Trending"]
    },
    {
      id: `${city.toLowerCase()}-music-2`,
      name: `The ${city} Theatre`,
      address: "456 Stage St",
      city,
      state,
      country: "USA",
      zip: "67890",
      lat: 40.730610,
      lng: -73.935242,
      type: "music",
      verified: false,
      vibes: ["Concert", "Acoustic", "Indie"]
    },
    {
      id: `${city.toLowerCase()}-music-3`,
      name: `Club ${city}`,
      address: "789 Beat Blvd",
      city,
      state,
      country: "USA",
      zip: "10112",
      lat: 34.052235,
      lng: -118.243683,
      type: "music",
      verified: true,
      vibes: ["DJ", "Dance", "Nightlife"]
    }
  ];
};

export const generateComedyClubs = (city: string, state: string): Location[] => {
  return [
    {
      id: `${city.toLowerCase()}-comedy-1`,
      name: `${city} Comedy Club`,
      address: "456 Laugh Lane",
      city,
      state,
      country: "USA",
      zip: "12345",
      lat: 40.7128,
      lng: -74.0060,
      type: "comedy",
      verified: true,
      vibes: ["Comedy", "Nightlife", "Entertainment"]
    },
    {
      id: `${city.toLowerCase()}-comedy-2`,
      name: `The ${city} Chuckle House`,
      address: "789 Joke Junction",
      city,
      state,
      country: "USA",
      zip: "54321",
      lat: 34.0522,
      lng: -118.2437,
      type: "comedy",
      verified: false,
      vibes: ["Stand-up", "Improv", "Drinks"]
    },
    {
      id: `${city.toLowerCase()}-comedy-3`,
      name: `Giggles ${city}`,
      address: "101 Hilarity Heights",
      city,
      state,
      country: "USA",
      zip: "98765",
      lat: 41.8781,
      lng: -87.6298,
      type: "comedy",
      verified: true,
      vibes: ["Open Mic", "Sketch", "Late Night"]
    }
  ];
};
