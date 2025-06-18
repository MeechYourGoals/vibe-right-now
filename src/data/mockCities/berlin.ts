
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const berlin: CityData = {
  name: "Berlin",
  country: "Germany",
  lat: 52.5200,
  lng: 13.4050,
  venues: [
    {
      id: "ber-1",
      name: "Berghain",
      address: "Am Wriezener Bahnhof",
      city: "Berlin",
      country: "Germany",
      lat: 52.5109,
      lng: 13.4434,
      type: "nightclub" as const,
      rating: 4.7,
      price_level: 3,
      verified: true,
      vibes: ["Techno", "Industrial", "Legendary"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Berghain+Berlin",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "ber-2",
      name: "Brandenburg Gate",
      address: "Pariser Platz",
      city: "Berlin",
      country: "Germany",
      lat: 52.5163,
      lng: 13.3777,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Historic", "Iconic", "Tourism"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Brandenburg+Gate+Berlin",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "ber-3",
      name: "Zur Letzten Instanz",
      address: "Waisenstraße 14-16",
      city: "Berlin",
      country: "Germany",
      lat: 52.5186,
      lng: 13.4081,
      type: "restaurant" as const,
      rating: 4.2,
      price_level: 2,
      verified: true,
      vibes: ["Traditional", "Historic", "German Cuisine"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Zur+Letzten+Instanz+Berlin",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default berlin;
