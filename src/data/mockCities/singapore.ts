
import { CityData } from '@/types';

const singapore: CityData = {
  name: "Singapore",
  country: "Singapore",
  lat: 1.3521,
  lng: 103.8198,
  venues: [
    {
      id: "sgp-1",
      name: "Marina Bay Sands",
      address: "10 Bayfront Ave",
      city: "Singapore",
      country: "Singapore",
      lat: 1.2834,
      lng: 103.8607,
      type: "attraction" as const,
      rating: 4.5,
      verified: true,
      vibes: ["Infinity Pool", "Luxury", "Skyline Views"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Marina+Bay+Sands+Singapore"
    },
    {
      id: "sgp-2",
      name: "Hawker Chan",
      address: "2 Bayfront Ave",
      city: "Singapore",
      country: "Singapore",
      lat: 1.2837,
      lng: 103.8583,
      type: "restaurant" as const,
      rating: 4.3,
      price_level: 1,
      verified: true,
      vibes: ["Michelin Star", "Street Food", "Local"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Hawker+Chan+Singapore"
    },
    {
      id: "sgp-3",
      name: "Zouk",
      address: "3C River Valley Rd",
      city: "Singapore",
      country: "Singapore",
      lat: 1.2936,
      lng: 103.8461,
      type: "nightclub" as const,
      rating: 4.4,
      price_level: 3,
      verified: true,
      vibes: ["Electronic", "World-renowned", "Multi-room"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Zouk+Singapore"
    }
  ]
};

export default singapore;
