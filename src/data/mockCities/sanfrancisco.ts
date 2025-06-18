
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const sanfrancisco: CityData = {
  name: "San Francisco",
  state: "CA",
  country: "USA",
  lat: 37.7749,
  lng: -122.4194,
  venues: [
    {
      id: "sf-1",
      name: "Tartine Bakery",
      address: "600 Guerrero St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.7603,
      lng: -122.4238,
      type: "restaurant" as const,
      rating: 4.4,
      price_level: 3,
      verified: true,
      vibes: ["Artisanal", "Mission", "Bakery"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Tartine+Bakery+San+Francisco",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "sf-2",
      name: "Chase Center",
      address: "1 Warriors Way",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.7680,
      lng: -122.3875,
      type: "sports" as const,
      rating: 4.3,
      verified: true,
      vibes: ["Warriors", "Modern", "Bay View"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Chase+Center+San+Francisco",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "sf-3",
      name: "Audio Nightclub",
      address: "316 11th St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.7708,
      lng: -122.4147,
      type: "nightclub" as const,
      rating: 3.8,
      price_level: 3,
      verified: true,
      vibes: ["Underground", "Electronic", "SOMA"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Audio+Nightclub+San+Francisco",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "sf-4",
      name: "Golden Gate Bridge",
      address: "Golden Gate Bridge",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.8199,
      lng: -122.4783,
      type: "attraction" as const,
      rating: 4.7,
      verified: true,
      vibes: ["Iconic", "Views", "Must-See"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Golden+Gate+Bridge",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "sf-5",
      name: "Blue Bottle Coffee",
      address: "66 Mint St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.7815,
      lng: -122.4054,
      type: "cafe" as const,
      rating: 4.2,
      price_level: 3,
      verified: true,
      vibes: ["Third Wave", "Minimalist", "SOMA"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Blue+Bottle+Coffee+San+Francisco",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default sanfrancisco;
