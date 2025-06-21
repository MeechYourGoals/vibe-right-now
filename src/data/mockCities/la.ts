
import { CityData } from '@/types';

const la: CityData = {
  name: "Los Angeles",
  state: "CA",
  country: "USA",
  lat: 34.0522,
  lng: -118.2437,
  venues: [
    {
      id: "la-1",
      name: "In-N-Out Burger",
      address: "7009 Sunset Blvd",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      lat: 34.0983,
      lng: -118.3432,
      type: "restaurant" as const,
      rating: 4.4,
      price_level: 2,
      verified: true,
      vibes: ["West Coast Classic", "Fresh", "Cult Following"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=In-N-Out+Burger+LA"
    },
    {
      id: "la-2",
      name: "Crypto.com Arena",
      address: "1111 S Figueroa St",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      lat: 34.0430,
      lng: -118.2673,
      type: "sports" as const,
      rating: 4.2,
      verified: true,
      vibes: ["Lakers", "Entertainment", "Downtown LA"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Staples+Center+LA"
    },
    {
      id: "la-3",
      name: "Academy LA",
      address: "6021 Hollywood Blvd",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      lat: 34.1022,
      lng: -118.3275,
      type: "bar" as const,
      rating: 4.0,
      price_level: 3,
      verified: true,
      vibes: ["Hollywood", "Electronic Music", "Celebrity Sightings"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Academy+LA"
    }
  ]
};

export default la;
