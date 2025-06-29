
import { CityData } from '@/types';

const phoenix: CityData = {
  name: "Phoenix",
  state: "AZ",
  country: "USA",
  lat: 33.4484,
  lng: -112.0740,
  venues: [
    {
      id: "phx-1",
      name: "Pizzeria Bianco",
      address: "623 E Adams St",
      city: "Phoenix",
      state: "AZ",
      country: "USA",
      lat: 33.4510,
      lng: -112.0659,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 2,
      verified: true,
      vibes: ["Wood-fired Pizza", "Local Favorite", "Popular"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Pizzeria+Bianco+Phoenix"
    },
    {
      id: "phx-2",
      name: "Chase Field",
      address: "401 E Jefferson St",
      city: "Phoenix",
      state: "AZ",
      country: "USA",
      lat: 33.4455,
      lng: -112.0667,
      type: "sports" as const,
      rating: 4.4,
      verified: true,
      vibes: ["Baseball", "Diamondbacks", "Downtown"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Chase+Field+Phoenix"
    },
    {
      id: "phx-3",
      name: "Bar Smith",
      address: "130 E Washington St",
      city: "Phoenix",
      state: "AZ",
      country: "USA",
      lat: 33.4479,
      lng: -112.0708,
      type: "bar" as const,
      rating: 3.9,
      price_level: 3,
      verified: true,
      vibes: ["Rooftop", "Dance", "Downtown Vibes"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Bar+Smith+Phoenix"
    },
    {
      id: "phx-4",
      name: "Lux Coffee",
      address: "441 N Central Ave",
      city: "Phoenix",
      state: "AZ",
      country: "USA",
      lat: 33.4572,
      lng: -112.0736,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 2,
      verified: true,
      vibes: ["Hipster", "Café", "Work-Friendly"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Lux+Coffee+Phoenix"
    },
    {
      id: "phx-5",
      name: "Biltmore Fashion Park",
      address: "2502 E Camelback Rd",
      city: "Phoenix",
      state: "AZ",
      country: "USA",
      lat: 33.5102,
      lng: -112.0237,
      type: "attraction" as const,
      rating: 4.4,
      verified: true,
      vibes: ["Shopping", "Upscale", "Outdoor"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Biltmore+Fashion+Park+Phoenix"
    }
  ]
};

export default phoenix;
