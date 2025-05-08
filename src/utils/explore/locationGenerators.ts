
import { Location } from "@/types";
import { generateRandomVibes } from "./mockGenerators";
import { getRandomUserProfile } from "@/utils/locations/types";
import { generateMusicVenues, generateComedyClubs } from "@/utils/locations/mockVenueGenerators";

// Generate mock locations for a city
export const generateMockLocationsForCity = (city: string, state: string) => {
  const types = ["restaurant", "bar", "event", "attraction", "sports", "other"];
  let mockCityLocations: Location[] = [];
  
  types.forEach((type, typeIndex) => {
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      const id = `${city.toLowerCase()}-${type}-${i}`;
      let name = "";
      
      switch (type) {
        case "restaurant":
          name = [`${city} Grill`, `Downtown ${city} Bistro`, `${city} Fine Dining`][i % 3];
          break;
        case "bar":
          name = [`${city} Rooftop Bar`, `${city} Craft Beer`, `${city} Nightclub`][i % 3];
          break;
        case "event":
          name = [`${city} Music Festival`, `${city} Art Exhibition`, `${city} Food Fest`][i % 3];
          break;
        case "attraction":
          name = [`${city} Museum`, `${city} Park`, `${city} Historical Site`][i % 3];
          break;
        case "sports":
          name = [`${city} Basketball Game`, `${city} Football Stadium`, `${city} Baseball Park`][i % 3];
          break;
        case "other":
          name = [`${city} Shopping Center`, `${city} Beach`, `${city} University`][i % 3];
          break;
      }
      
      mockCityLocations.push({
        id,
        name,
        address: `${100 + i} Main St`,
        city,
        state,
        country: "USA",
        zip: `${10000 + Math.floor(Math.random() * 90000)}`,
        lat: 40 + Math.random(),
        lng: -75 + Math.random(),
        type: type as any,
        verified: Math.random() > 0.3,
      });
    }
  });

  mockCityLocations = [
    ...mockCityLocations,
    ...generateMusicVenues(city, state),
    ...generateComedyClubs(city, state)
  ];
  
  return mockCityLocations;
};

// Generate local nightlife venues
export const generateLocalNightlifeVenues = (city: string, state: string): Location[] => {
  if (!city) return [];
  
  const nightlifeVenues = [
    "Rooftop Lounge", "Nightclub", "Cocktail Bar", "Jazz Bar", "Dance Club", 
    "Speakeasy", "Brewery", "Wine Bar", "Pub", "Karaoke Bar"
  ];
  
  const nightlifeLocations: Location[] = [];
  
  const count = Math.floor(Math.random() * 7) + 3;
  
  for (let i = 0; i < count; i++) {
    const venueName = `${city} ${nightlifeVenues[Math.floor(Math.random() * nightlifeVenues.length)]}`;
    const isVerified = Math.random() > 0.4;
    
    nightlifeLocations.push({
      id: `nightlife-${city}-${i}`,
      name: venueName,
      address: `${100 + i} Party St`,
      city,
      state,
      country: "USA",
      zip: `${10000 + Math.floor(Math.random() * 90000)}`,
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: "bar",
      verified: isVerified,
      vibes: generateRandomVibes()
    });
  }
  
  return nightlifeLocations;
};
