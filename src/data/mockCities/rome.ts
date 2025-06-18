
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const rome: CityData = {
  name: "Rome",
  country: "Italy",
  lat: 41.9028,
  lng: 12.4964,
  venues: [
    {
      id: "rom-1",
      name: "Colosseum",
      address: "Piazza del Colosseo",
      city: "Rome",
      country: "Italy",
      lat: 41.8902,
      lng: 12.4922,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Ancient", "Historic", "Iconic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Colosseum+Rome",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "rom-2",
      name: "La Pergola",
      address: "Via Alberto Cadlolo 101",
      city: "Rome",
      country: "Italy",
      lat: 41.9146,
      lng: 12.4516,
      type: "restaurant" as const,
      rating: 4.7,
      price_level: 4,
      verified: true,
      vibes: ["Michelin Star", "Rooftop", "Fine Dining"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=La+Pergola+Rome",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "rom-3",
      name: "Goa Club",
      address: "Via Giuseppe Libetta 13",
      city: "Rome",
      country: "Italy",
      lat: 41.8773,
      lng: 12.4738,
      type: "nightclub" as const,
      rating: 4.0,
      price_level: 3,
      verified: true,
      vibes: ["Electronic", "Underground", "Alternative"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Goa+Club+Rome",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default rome;
