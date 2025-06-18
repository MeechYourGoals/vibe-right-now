
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const sydney: CityData = {
  name: "Sydney",
  country: "Australia",
  lat: -33.8688,
  lng: 151.2093,
  venues: [
    {
      id: "syd-1",
      name: "Sydney Opera House",
      address: "Bennelong Point",
      city: "Sydney",
      country: "Australia",
      lat: -33.8568,
      lng: 151.2153,
      type: "attraction" as const,
      rating: 4.8,
      verified: true,
      vibes: ["Iconic", "Architecture", "Opera"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Sydney+Opera+House",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "syd-2",
      name: "Quay Restaurant",
      address: "Overseas Passenger Terminal",
      city: "Sydney",
      country: "Australia",
      lat: -33.8609,
      lng: 151.2111,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 4,
      verified: true,
      vibes: ["Fine Dining", "Harbor Views", "Modern Australian"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Quay+Restaurant+Sydney",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "syd-3",
      name: "Home The Venue",
      address: "101 Wheat Rd",
      city: "Sydney",
      country: "Australia",
      lat: -33.8570,
      lng: 151.2092,
      type: "nightclub" as const,
      rating: 4.1,
      price_level: 3,
      verified: true,
      vibes: ["Electronic", "Underground", "Warehouse"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Home+The+Venue+Sydney",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default sydney;
