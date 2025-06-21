
import { CityData, Location } from '@/types';

const miami: CityData = {
  name: "Miami",
  state: "FL",
  country: "USA",
  lat: 25.7617,
  lng: -80.1918,
  venues: [
    {
      id: "miami_1",
      name: "Joe's Stone Crab",
      address: "11 Washington Ave",
      city: "Miami Beach",
      state: "FL",
      country: "USA",
      zip: "33139",
      lat: 25.768370,
      lng: -80.130821,
      type: "restaurant",
      verified: true,
      rating: 4.5,
      vibes: ["Historic", "Seafood", "Upscale"],
      tags: ["stone crab", "seafood", "miami institution"]
    },
    {
      id: "miami_2",
      name: "LIV Nightclub",
      address: "4441 Collins Ave",
      city: "Miami Beach",
      state: "FL",
      country: "USA",
      zip: "33140",
      lat: 25.815173,
      lng: -80.120735,
      type: "bar",
      verified: true,
      rating: 4.2,
      vibes: ["Nightclub", "VIP", "Dancing"],
      tags: ["nightclub", "edm", "celebrity hotspot"]
    },
    {
      id: "miami_3",
      name: "Ball & Chain",
      address: "1513 SW 8th St",
      city: "Miami",
      state: "FL",
      country: "USA",
      zip: "33135",
      lat: 25.765842,
      lng: -80.220947,
      type: "bar",
      verified: true,
      rating: 4.3,
      vibes: ["Live Music", "Latin", "Historic"],
      tags: ["salsa", "live music", "little havana"]
    },
    {
      id: "miami_4",
      name: "Art Deco Historic District",
      address: "Ocean Drive",
      city: "Miami Beach",
      state: "FL",
      country: "USA",
      zip: "33139",
      lat: 25.781169,
      lng: -80.130821,
      type: "attraction",
      verified: true,
      rating: 4.4,
      vibes: ["Historic", "Art Deco", "Beach"],
      tags: ["architecture", "historic", "ocean drive"]
    },
    {
      id: "miami_5",
      name: "American Airlines Arena",
      address: "601 Biscayne Blvd",
      city: "Miami",
      state: "FL",
      country: "USA",
      zip: "33132",
      lat: 25.781389,
      lng: -80.188056,
      type: "sports",
      verified: true,
      rating: 4.2,
      vibes: ["Sports", "Basketball", "Entertainment"],
      tags: ["miami heat", "basketball", "downtown"]
    }
  ]
};

export default miami;
