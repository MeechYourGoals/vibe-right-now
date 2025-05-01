
import { Location } from "@/types";

/**
 * Generate a random ZIP code for a given city and state
 */
export const generateRandomZip = (city: string, state: string): string => {
  // Map of states to zip code prefixes
  const zipPrefixes: Record<string, string[]> = {
    'CA': ['900', '902', '913', '940', '941', '942', '943', '944', '945', '946', '947', '948', '949'],
    'NY': ['100', '101', '102', '103', '104', '110', '111', '112', '113', '114', '115', '116'],
    'IL': ['606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616'],
    'TX': ['750', '751', '752', '753', '754', '770', '771', '772', '773', '774', '775', '776', '777', '778', '779'],
    'FL': ['320', '321', '322', '323', '324', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339'],
    'WA': ['980', '981', '982', '983', '984', '985', '986', '987', '988', '989'],
    'MA': ['010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023', '024'],
    'OR': ['970', '971', '972', '973', '974', '975', '976', '977', '978', '979'],
    'CO': ['800', '801', '802', '803', '804', '805', '806', '807', '808', '809'],
    'GA': ['300', '301', '302', '303', '304', '305', '306', '307', '308', '309'],
  };
  
  // Default to California if state not found
  const prefixes = zipPrefixes[state] || zipPrefixes['CA'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  
  return prefix + suffix;
};

/**
 * Generate random vibes for a venue
 */
export const generateRandomVibes = (): string[] => {
  const allVibes = [
    "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
    "Upscale", "Casual", "Romantic", "Lively", "Intimate", 
    "High Energy", "Laid Back", "Artsy", "Eclectic", "Historic",
    "Modern", "Vintage", "Industrial", "Bohemian", "Elegant"
  ];
  
  const numberOfVibes = Math.floor(Math.random() * 4) + 1;
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numberOfVibes; i++) {
    const randomVibe = allVibes[Math.floor(Math.random() * allVibes.length)];
    if (!selectedVibes.includes(randomVibe)) {
      selectedVibes.push(randomVibe);
    }
  }
  
  return selectedVibes;
};

/**
 * Generate local nightlife venues for a city
 */
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
      zip: generateRandomZip(city, state),
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: "bar",
      verified: isVerified,
      vibes: generateRandomVibes()
    });
  }
  
  return nightlifeLocations;
};
