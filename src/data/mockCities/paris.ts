
import { CityData } from '@/types';

const paris: CityData = {
  name: "Paris",
  country: "France",
  lat: 48.8566,
  lng: 2.3522,
  venues: [
    {
      id: "par-1",
      name: "L'As du Fallafel",
      address: "34 Rue des Rosiers",
      city: "Paris",
      country: "France",
      lat: 48.8570,
      lng: 2.3591,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 2,
      verified: true,
      vibes: ["Jewish Quarter", "Street Food", "Historic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=L'As+du+Fallafel+Paris",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "par-2",
      name: "Eiffel Tower",
      address: "Champ de Mars",
      city: "Paris",
      country: "France",
      lat: 48.8584,
      lng: 2.2945,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Iconic", "Romantic", "Tourist"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Eiffel+Tower+Paris",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "par-3",
      name: "Hemingway Bar",
      address: "15 Place Vendôme",
      city: "Paris",
      country: "France",
      lat: 48.8677,
      lng: 2.3281,
      type: "bar" as const,
      rating: 4.4,
      price_level: 4,
      verified: true,
      vibes: ["Classic Cocktails", "Literary", "Luxury"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Hemingway+Bar+Paris",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default paris;
