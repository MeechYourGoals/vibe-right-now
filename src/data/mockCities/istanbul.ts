
import { CityData, Location } from '@/types';

const istanbul: CityData = {
  name: "Istanbul",
  country: "Turkey",
  lat: 41.0082,
  lng: 28.9784,
  venues: [
    {
      id: "istanbul_1",
      name: "Hagia Sophia",
      address: "Sultan Ahmet, Ayasofya Meydanı",
      city: "Istanbul",
      country: "Turkey",
      zip: "34122",
      lat: 41.008583,
      lng: 28.980833,
      type: "attraction",
      verified: true,
      rating: 4.6,
      vibes: ["Historic", "Byzantine", "Ottoman"],
      tags: ["historic", "byzantine", "museum"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "istanbul_2",
      name: "Pandeli",
      address: "Eminönü, Mısır Çarşısı 1",
      city: "Istanbul",
      country: "Turkey",
      zip: "34116",
      lat: 41.016944,
      lng: 28.970278,
      type: "restaurant",
      verified: true,
      rating: 4.3,
      vibes: ["Ottoman Cuisine", "Historic", "Traditional"],
      tags: ["ottoman cuisine", "historic", "spice bazaar"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "istanbul_3",
      name: "360 Istanbul",
      address: "Istiklal Cd. No:311",
      city: "Istanbul",
      country: "Turkey",
      zip: "34433",
      lat: 41.036389,
      lng: 28.976944,
      type: "bar",
      verified: true,
      rating: 4.2,
      vibes: ["Rooftop", "Panoramic Views", "Modern"],
      tags: ["rooftop", "bosphorus views", "modern"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default istanbul;
