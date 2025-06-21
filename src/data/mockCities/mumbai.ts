
import { CityData } from '@/types';

const mumbai: CityData = {
  name: "Mumbai",
  country: "India",
  lat: 19.0760,
  lng: 72.8777,
  venues: [
    {
      id: "mum-1",
      name: "Gateway of India",
      address: "Apollo Bandar",
      city: "Mumbai",
      country: "India",
      lat: 18.9220,
      lng: 72.8347,
      type: "attraction" as const,
      rating: 4.3,
      verified: true,
      vibes: ["Historic", "Landmark", "Colonial"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Gateway+of+India+Mumbai",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "mum-2",
      name: "Trishna",
      address: "7 Rope Walk Lane",
      city: "Mumbai",
      country: "India",
      lat: 18.9388,
      lng: 72.8356,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 3,
      verified: true,
      vibes: ["Seafood", "Contemporary Indian", "Fine Dining"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Trishna+Mumbai",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "mum-3",
      name: "Trilogy",
      address: "The St. Regis Mumbai",
      city: "Mumbai",
      country: "India",
      lat: 19.0506,
      lng: 72.8330,
      type: "nightclub" as const,
      rating: 4.1,
      price_level: 4,
      verified: true,
      vibes: ["Upscale", "Hotel Club", "Bollywood"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Trilogy+Mumbai",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default mumbai;
