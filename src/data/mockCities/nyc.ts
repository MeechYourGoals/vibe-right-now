
import { CityData } from '@/types/location';

const nyc: CityData = {
  name: "New York",
  state: "NY",
  country: "USA",
  lat: 40.7128,
  lng: -74.0060,
  venues: [
    {
      id: "nyc-1",
      name: "Joe's Pizza",
      address: "7 Carmine St",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7301,
      lng: -74.0036,
      type: "restaurant",
      rating: 4.2,
      price_level: 2,
      verified: true,
      vibes: ["Authentic", "Classic NYC", "Local Favorite"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Joe's+Pizza+NYC"
    },
    {
      id: "nyc-2",
      name: "Madison Square Garden",
      address: "4 Pennsylvania Plaza",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7505,
      lng: -73.9934,
      type: "sports",
      rating: 4.0,
      verified: true,
      vibes: ["Iconic", "Sports", "Entertainment"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Madison+Square+Garden"
    },
    {
      id: "nyc-3",
      name: "1 OAK",
      address: "453 W 17th St",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7425,
      lng: -74.0089,
      type: "nightclub",
      rating: 3.8,
      price_level: 4,
      verified: true,
      vibes: ["Upscale", "Nightlife", "Celebrity Hotspot"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=1+OAK+NYC"
    },
    {
      id: "nyc-4",
      name: "Blue Bottle Coffee",
      address: "160 Berry St",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7197,
      lng: -73.9576,
      type: "cafe",
      rating: 4.3,
      price_level: 3,
      verified: true,
      vibes: ["Artisanal", "Trendy", "Third Wave Coffee"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Blue+Bottle+Coffee+NYC"
    },
    {
      id: "nyc-5",
      name: "Brookfield Place",
      address: "230 Vesey St",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7134,
      lng: -74.0158,
      type: "mall",
      rating: 4.1,
      verified: true,
      vibes: ["Luxury Shopping", "Waterfront", "Modern"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Brookfield+Place+NYC"
    }
  ]
};

export default nyc;
