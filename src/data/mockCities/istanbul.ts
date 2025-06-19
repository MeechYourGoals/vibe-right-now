
import { CityData } from '@/types';

const istanbul: CityData = {
  name: "Istanbul",
  country: "Turkey",
  lat: 41.0082,
  lng: 28.9784,
  venues: [
    {
      id: "ist-1",
      name: "Hagia Sophia",
      address: "Sultan Ahmet",
      city: "Istanbul",
      country: "Turkey",
      lat: 41.0086,
      lng: 28.9802,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Historic", "Byzantine", "Ottoman"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Hagia+Sophia+Istanbul"
    },
    {
      id: "ist-2",
      name: "Mikla",
      address: "Marmara Pera Hotel",
      city: "Istanbul",
      country: "Turkey",
      lat: 41.0362,
      lng: 28.9744,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 4,
      verified: true,
      vibes: ["Modern Turkish", "Rooftop", "Bosphorus Views"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Mikla+Istanbul"
    },
    {
      id: "ist-3",
      name: "Reina",
      address: "Muallim Naci Cd.",
      city: "Istanbul",
      country: "Turkey",
      lat: 41.0436,
      lng: 29.0058,
      type: "nightclub" as const,
      rating: 4.1,
      price_level: 4,
      verified: true,
      vibes: ["Bosphorus", "Upscale", "Waterfront"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Reina+Istanbul"
    }
  ]
};

export default istanbul;
