
import { CityData } from '@/types';

const melbourne: CityData = {
  name: "Melbourne",
  country: "Australia",
  lat: -37.8136,
  lng: 144.9631,
  venues: [
    {
      id: "mel-1",
      name: "Federation Square",
      address: "Swanston St & Flinders St",
      city: "Melbourne",
      country: "Australia",
      lat: -37.8179,
      lng: 144.9690,
      type: "attraction" as const,
      rating: 4.2,
      verified: true,
      vibes: ["Cultural Hub", "Events", "Modern"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Federation+Square+Melbourne",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "mel-2",
      name: "Attica",
      address: "74 Glen Eira Rd",
      city: "Melbourne",
      country: "Australia",
      lat: -37.8623,
      lng: 144.9998,
      type: "restaurant" as const,
      rating: 4.8,
      price_level: 4,
      verified: true,
      vibes: ["Fine Dining", "Australian", "World-renowned"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Attica+Melbourne",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "mel-3",
      name: "Revolver Upstairs",
      address: "229 Chapel St",
      city: "Melbourne",
      country: "Australia",
      lat: -37.8256,
      lng: 144.9988,
      type: "nightclub" as const,
      rating: 4.1,
      price_level: 2,
      verified: true,
      vibes: ["Alternative", "Underground", "Live Music"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Revolver+Upstairs+Melbourne",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default melbourne;
