
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const toronto: CityData = {
  name: "Toronto",
  country: "Canada",
  lat: 43.6532,
  lng: -79.3832,
  venues: [
    {
      id: "tor-1",
      name: "CN Tower",
      address: "290 Bremner Blvd",
      city: "Toronto",
      country: "Canada",
      lat: 43.6426,
      lng: -79.3871,
      type: "attraction" as const,
      rating: 4.4,
      verified: true,
      vibes: ["Iconic", "Observation Deck", "City Views"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=CN+Tower+Toronto",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "tor-2",
      name: "Canoe",
      address: "66 Wellington St W",
      city: "Toronto",
      country: "Canada",
      lat: 43.6475,
      lng: -79.3831,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 4,
      verified: true,
      vibes: ["Fine Dining", "Canadian", "Tower Views"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Canoe+Restaurant+Toronto",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "tor-3",
      name: "Rebel Nightclub",
      address: "11 Polson St",
      city: "Toronto",
      country: "Canada",
      lat: 43.6395,
      lng: -79.3560,
      type: "nightclub" as const,
      rating: 4.0,
      price_level: 3,
      verified: true,
      vibes: ["Massive", "Electronic", "Waterfront"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Rebel+Nightclub+Toronto",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default toronto;
