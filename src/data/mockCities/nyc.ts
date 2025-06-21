
import { CityData } from '@/types';

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
      type: "restaurant" as const,
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
      type: "sports" as const,
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
      type: "bar" as const,
      rating: 3.8,
      price_level: 4,
      verified: true,
      vibes: ["Upscale", "Nightlife", "Celebrity Hotspot"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=1+OAK+NYC"
    }
  ]
};

export default nyc;
