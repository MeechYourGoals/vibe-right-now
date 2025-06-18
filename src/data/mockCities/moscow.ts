
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const moscow: CityData = {
  name: "Moscow",
  country: "Russia",
  lat: 55.7558,
  lng: 37.6176,
  venues: [
    {
      id: "mos-1",
      name: "Red Square",
      address: "Red Square",
      city: "Moscow",
      country: "Russia",
      lat: 55.7539,
      lng: 37.6208,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Historic", "Kremlin", "Iconic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Red+Square+Moscow",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "mos-2",
      name: "White Rabbit",
      address: "Smolenskaya Square 3",
      city: "Moscow",
      country: "Russia",
      lat: 55.7472,
      lng: 37.5847,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 4,
      verified: true,
      vibes: ["Modern Russian", "Panoramic Views", "Fine Dining"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=White+Rabbit+Moscow",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "mos-3",
      name: "Gipsy",
      address: "Komsomolsky Prospekt 28",
      city: "Moscow",
      country: "Russia",
      lat: 55.7558,
      lng: 37.5847,
      type: "nightclub" as const,
      rating: 4.2,
      price_level: 4,
      verified: true,
      vibes: ["Upscale", "Live Music", "Russian Elite"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Gipsy+Moscow",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default moscow;
