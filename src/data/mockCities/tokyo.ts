
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const tokyo: CityData = {
  name: "Tokyo",
  country: "Japan",
  lat: 35.6762,
  lng: 139.6503,
  venues: [
    {
      id: "tok-1",
      name: "Sukiyabashi Jiro",
      address: "Tsukamoto Sogyo Building",
      city: "Tokyo",
      country: "Japan",
      lat: 35.6717,
      lng: 139.7648,
      type: "restaurant" as const,
      rating: 4.8,
      price_level: 4,
      verified: true,
      vibes: ["Michelin Star", "Sushi Master", "Ginza"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Sukiyabashi+Jiro+Tokyo",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "tok-2",
      name: "Womb",
      address: "2-16 Maruyamacho",
      city: "Tokyo",
      country: "Japan",
      lat: 35.6588,
      lng: 139.7016,
      type: "nightclub" as const,
      rating: 4.3,
      price_level: 3,
      verified: true,
      vibes: ["Techno", "Shibuya", "Underground"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Womb+Nightclub+Tokyo",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "tok-3",
      name: "Tokyo Dome",
      address: "1-3-61 Koraku",
      city: "Tokyo",
      country: "Japan",
      lat: 35.7056,
      lng: 139.7519,
      type: "sports" as const,
      rating: 4.2,
      verified: true,
      vibes: ["Baseball", "Giants", "Big Egg"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Tokyo+Dome",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "tok-4",
      name: "Senso-ji Temple",
      address: "2-3-1 Asakusa",
      city: "Tokyo",
      country: "Japan",
      lat: 35.7148,
      lng: 139.7967,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Historic", "Temple", "Traditional"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Senso-ji+Temple+Tokyo",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "tok-5",
      name: "Blue Seal Coffee",
      address: "Shibuya Crossing",
      city: "Tokyo",
      country: "Japan",
      lat: 35.6598,
      lng: 139.7006,
      type: "cafe" as const,
      rating: 4.4,
      price_level: 2,
      verified: true,
      vibes: ["Modern", "Shibuya", "Japanese Coffee"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Blue+Seal+Coffee+Tokyo",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default tokyo;
