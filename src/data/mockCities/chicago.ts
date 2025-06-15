
import { CityData } from '@/types/location';

const chicago: CityData = {
  name: "Chicago",
  state: "IL",
  country: "USA",
  lat: 41.8781,
  lng: -87.6298,
  venues: [
    {
      id: "chi-1",
      name: "Lou Malnati's Pizzeria",
      address: "439 N Wells St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      lat: 41.8903,
      lng: -87.6339,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 2,
      verified: true,
      vibes: ["Deep Dish", "Chicago Classic", "Tourist Favorite"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Lou+Malnati's+Chicago"
    },
    {
      id: "chi-2",
      name: "United Center",
      address: "1901 W Madison St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      lat: 41.8807,
      lng: -87.6742,
      type: "sports" as const,
      rating: 4.3,
      verified: true,
      vibes: ["Bulls", "Blackhawks", "Arena"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=United+Center+Chicago"
    },
    {
      id: "chi-3",
      name: "Sound-Bar",
      address: "226 W Ontario St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      lat: 41.8936,
      lng: -87.6362,
      type: "nightclub" as const,
      rating: 4.0,
      price_level: 3,
      verified: true,
      vibes: ["Electronic", "Rooftop", "Downtown"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Sound-Bar+Chicago"
    },
    {
      id: "chi-4",
      name: "Millennium Park",
      address: "201 E Randolph St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      lat: 41.8826,
      lng: -87.6226,
      type: "attraction" as const,
      rating: 4.6,
      verified: true,
      vibes: ["Bean", "Outdoor", "Art"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Millennium+Park+Chicago"
    },
    {
      id: "chi-5",
      name: "Intelligentsia Coffee",
      address: "53 E Randolph St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      lat: 41.8847,
      lng: -87.6251,
      type: "cafe" as const,
      rating: 4.4,
      price_level: 3,
      verified: true,
      vibes: ["Third Wave", "Downtown", "Work-Friendly"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Intelligentsia+Coffee+Chicago"
    }
  ]
};

export default chicago;
