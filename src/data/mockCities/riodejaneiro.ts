
import { CityData } from '@/types';

const riodejaneiro: CityData = {
  name: "Rio de Janeiro",
  country: "Brazil",
  lat: -22.9068,
  lng: -43.1729,
  venues: [
    {
      id: "rio-1",
      name: "Christ the Redeemer",
      address: "Corcovado",
      city: "Rio de Janeiro",
      country: "Brazil",
      lat: -22.9519,
      lng: -43.2105,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Iconic", "Religious", "City Views"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Christ+the+Redeemer+Rio",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "rio-2",
      name: "Oro",
      address: "Rua General San Martin 889",
      city: "Rio de Janeiro",
      country: "Brazil",
      lat: -22.9519,
      lng: -43.1864,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 4,
      verified: true,
      vibes: ["Brazilian", "Fine Dining", "Local Ingredients"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Oro+Restaurant+Rio",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "rio-3",
      name: "Green Nation Fest",
      address: "Av. Borges de Medeiros 701",
      city: "Rio de Janeiro",
      country: "Brazil",
      lat: -22.9711,
      lng: -43.1863,
      type: "nightclub" as const,
      rating: 4.2,
      price_level: 3,
      verified: true,
      vibes: ["Beach Club", "Electronic", "Lagoa"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Green+Nation+Fest+Rio",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default riodejaneiro;
