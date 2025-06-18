
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const dubai: CityData = {
  name: "Dubai",
  country: "UAE",
  lat: 25.2048,
  lng: 55.2708,
  venues: [
    {
      id: "dub-1",
      name: "Burj Khalifa",
      address: "1 Sheikh Mohammed bin Rashid Blvd",
      city: "Dubai",
      country: "UAE",
      lat: 25.1972,
      lng: 55.2744,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Skyscraper", "Observation Deck", "Luxury"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Burj+Khalifa+Dubai",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "dub-2",
      name: "Nobu Dubai",
      address: "Four Seasons Resort Dubai",
      city: "Dubai",
      country: "UAE",
      lat: 25.1938,
      lng: 55.2731,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 4,
      verified: true,
      vibes: ["Japanese", "Celebrity Chef", "Luxury"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Nobu+Dubai",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "dub-3",
      name: "White Dubai",
      address: "Meydan Racecourse",
      city: "Dubai",
      country: "UAE",
      lat: 25.1729,
      lng: 55.3276,
      type: "nightclub" as const,
      rating: 4.2,
      price_level: 4,
      verified: true,
      vibes: ["Rooftop", "Luxury", "International DJs"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=White+Dubai",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default dubai;
