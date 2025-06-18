
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const miami: CityData = {
  name: "Miami",
  state: "FL",
  country: "USA",
  lat: 25.7617,
  lng: -80.1918,
  venues: [
    {
      id: "mia-1",
      name: "Joe's Stone Crab",
      address: "11 Washington Ave",
      city: "Miami",
      state: "FL",
      country: "USA",
      lat: 25.7663,
      lng: -80.1320,
      type: "restaurant" as const,
      rating: 4.4,
      price_level: 4,
      verified: true,
      vibes: ["Seafood", "Historic", "South Beach"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Joe's+Stone+Crab+Miami",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "mia-2",
      name: "LIV Nightclub",
      address: "4441 Collins Ave",
      city: "Miami",
      state: "FL",
      country: "USA",
      lat: 25.8138,
      lng: -80.1208,
      type: "nightclub" as const,
      rating: 4.1,
      price_level: 4,
      verified: true,
      vibes: ["Celebrity", "Upscale", "Beach Club"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=LIV+Nightclub+Miami",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "mia-3",
      name: "FTX Arena",
      address: "601 Biscayne Blvd",
      city: "Miami",
      state: "FL",
      country: "USA",
      lat: 25.7814,
      lng: -80.1870,
      type: "sports" as const,
      rating: 4.2,
      verified: true,
      vibes: ["Heat", "Basketball", "Downtown"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=FTX+Arena+Miami",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "mia-4",
      name: "Art Deco Historic District",
      address: "Ocean Dr",
      city: "Miami",
      state: "FL",
      country: "USA",
      lat: 25.7804,
      lng: -80.1300,
      type: "attraction" as const,
      rating: 4.5,
      verified: true,
      vibes: ["Art Deco", "Historic", "Colorful"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Art+Deco+District+Miami",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "mia-5",
      name: "Panther Coffee",
      address: "2390 NW 2nd Ave",
      city: "Miami",
      state: "FL",
      country: "USA",
      lat: 25.7976,
      lng: -80.2012,
      type: "cafe" as const,
      rating: 4.3,
      price_level: 2,
      verified: true,
      vibes: ["Local Roaster", "Wynwood", "Hip"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Panther+Coffee+Miami",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default miami;
