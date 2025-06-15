
import { CityData } from '@/types/location';

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
    },
    {
      id: "la-4",
      name: "Intelligentsia Coffee",
      address: "3922 W Sunset Blvd",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      lat: 34.0978,
      lng: -118.2785,
      type: "restaurant" as const,
      rating: 4.3,
      price_level: 3,
      verified: true,
      vibes: ["Artisanal", "Silver Lake", "Specialty Coffee"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Intelligentsia+Coffee+LA"
    },
    {
      id: "la-5",
      name: "The Grove",
      address: "189 The Grove Dr",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      lat: 34.0719,
      lng: -118.3564,
      type: "attraction" as const,
      rating: 4.2,
      verified: true,
      vibes: ["Outdoor Shopping", "Entertainment", "Tourist Destination"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=The+Grove+LA"
    }
  ]
};

export default la;
