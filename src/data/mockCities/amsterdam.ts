
import { CityData } from '@/types';

const amsterdam: CityData = {
  name: "Amsterdam",
  country: "Netherlands",
  lat: 52.3676,
  lng: 4.9041,
  venues: [
    {
      id: "ams-1",
      name: "De School",
      address: "Doctor Jan van Breemenstraat 1",
      city: "Amsterdam",
      country: "Netherlands",
      lat: 52.3567,
      lng: 4.8634,
      type: "nightclub" as const,
      rating: 4.5,
      price_level: 3,
      verified: true,
      vibes: ["Techno", "Underground", "Industrial"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=De+School+Amsterdam"
    },
    {
      id: "ams-2",
      name: "Anne Frank House",
      address: "Prinsengracht 263-267",
      city: "Amsterdam",
      country: "Netherlands",
      lat: 52.3752,
      lng: 4.8840,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Historic", "Museum", "Cultural"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Anne+Frank+House+Amsterdam"
    },
    {
      id: "ams-3",
      name: "Café Central",
      address: "Lange Nieuwstraat 462",
      city: "Amsterdam",
      country: "Netherlands",
      lat: 52.3738,
      lng: 4.8909,
      type: "cafe" as const,
      rating: 4.3,
      price_level: 2,
      verified: true,
      vibes: ["Brown Café", "Traditional", "Local"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Cafe+Central+Amsterdam"
    }
  ]
};

export default amsterdam;
