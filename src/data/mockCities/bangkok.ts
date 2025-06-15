
import { CityData } from '@/types';

const bangkok: CityData = {
  name: "Bangkok",
  country: "Thailand",
  lat: 13.7563,
  lng: 100.5018,
  venues: [
    {
      id: "bkk-1",
      name: "Wat Pho",
      address: "2 Sanamchai Rd",
      city: "Bangkok",
      country: "Thailand",
      lat: 13.7465,
      lng: 100.4927,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Temple", "Buddha", "Historic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Wat+Pho+Bangkok"
    },
    {
      id: "bkk-2",
      name: "Gaggan",
      address: "68/1 Soi Langsuan",
      city: "Bangkok",
      country: "Thailand",
      lat: 13.7441,
      lng: 100.5416,
      type: "restaurant" as const,
      rating: 4.8,
      price_level: 4,
      verified: true,
      vibes: ["Progressive Indian", "Molecular", "Award-winning"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Gaggan+Bangkok"
    },
    {
      id: "bkk-3",
      name: "Levels Club",
      address: "Aloft Bangkok",
      city: "Bangkok",
      country: "Thailand",
      lat: 13.7558,
      lng: 100.5389,
      type: "nightclub" as const,
      rating: 4.2,
      price_level: 3,
      verified: true,
      vibes: ["Rooftop", "City Views", "Electronic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Levels+Club+Bangkok"
    }
  ]
};

export default bangkok;
