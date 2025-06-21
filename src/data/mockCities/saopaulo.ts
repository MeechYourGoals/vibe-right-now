
import { CityData } from '@/types';

const saopaulo: CityData = {
  name: "São Paulo",
  country: "Brazil",
  lat: -23.5505,
  lng: -46.6333,
  venues: [
    {
      id: "sao-1",
      name: "Museu de Arte de São Paulo",
      address: "Av. Paulista 1578",
      city: "São Paulo",
      country: "Brazil",
      lat: -23.5614,
      lng: -46.6558,
      type: "attraction" as const,
      rating: 4.5,
      verified: true,
      vibes: ["Art Museum", "Modern", "Cultural"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=MASP+Sao+Paulo",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "sao-2",
      name: "DOM",
      address: "Rua Barão de Capanema 549",
      city: "São Paulo",
      country: "Brazil",
      lat: -23.5693,
      lng: -46.6814,
      type: "restaurant" as const,
      rating: 4.7,
      price_level: 4,
      verified: true,
      vibes: ["Brazilian", "Fine Dining", "Award-winning"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=DOM+Restaurant+Sao+Paulo",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "sao-3",
      name: "D.Edge",
      address: "Alameda Olga 170",
      city: "São Paulo",
      country: "Brazil",
      lat: -23.5505,
      lng: -46.6333,
      type: "nightclub" as const,
      rating: 4.4,
      price_level: 3,
      verified: true,
      vibes: ["Electronic", "Underground", "World-class"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=D.Edge+Sao+Paulo",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default saopaulo;
