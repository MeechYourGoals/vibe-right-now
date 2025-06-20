
import { CityData, Location } from '@/types';

const dubai: CityData = {
  name: "Dubai",
  country: "UAE",
  lat: 25.2048,
  lng: 55.2708,
  venues: [
    {
      id: "dubai_1",
      name: "Burj Khalifa",
      address: "1 Sheikh Mohammed bin Rashid Blvd",
      city: "Dubai",
      country: "UAE",
      zip: "00000",
      lat: 25.197197,
      lng: 55.274376,
      type: "attraction",
      verified: true,
      rating: 4.6,
      vibes: ["Skyscraper", "Luxury", "Modern"],
      tags: ["tallest building", "observation deck", "luxury"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "dubai_2",
      name: "Nobu Dubai",
      address: "Atlantis The Palm",
      city: "Dubai",
      country: "UAE",
      zip: "00000",
      lat: 25.130556,
      lng: 55.116667,
      type: "restaurant",
      verified: true,
      rating: 4.5,
      vibes: ["Japanese Fusion", "Luxury", "Celebrity Chef"],
      tags: ["japanese", "nobu", "luxury dining"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "dubai_3",
      name: "CÉ LA VIE",
      address: "Address Sky View",
      city: "Dubai",
      country: "UAE",
      zip: "00000",
      lat: 25.182778,
      lng: 55.274167,
      type: "bar",
      verified: true,
      rating: 4.4,
      vibes: ["Rooftop", "Luxury", "Views"],
      tags: ["rooftop bar", "views", "luxury"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default dubai;
