
import { CityData } from '@/types';

const tokyo: CityData = {
  name: "Tokyo",
  country: "Japan",
  lat: 35.6762,
  lng: 139.6503,
  venues: [
    {
      id: "tokyo_1",
      name: "Sukiyabashi Jiro",
      address: "Tsukamoto Sogyo Building B1F",
      city: "Tokyo",
      country: "Japan",
      zip: "104-0061",
      lat: 35.671236,
      lng: 139.763635,
      type: "restaurant",
      verified: true,
      rating: 4.7,
      vibes: ["Sushi", "Master Chef", "Traditional"],
      tags: ["sushi", "omakase", "michelin star"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "tokyo_2",
      name: "Robot Restaurant",
      address: "1-7-1 Kabukicho",
      city: "Tokyo",
      country: "Japan",
      zip: "160-0021",
      lat: 35.694668,
      lng: 139.702687,
      type: "attraction",
      verified: true,
      rating: 4.2,
      vibes: ["Entertainment", "Unique", "Colorful"],
      tags: ["robots", "show", "shinjuku"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "tokyo_3",
      name: "Golden Gai",
      address: "1-1-6 Kabukicho",
      city: "Tokyo",
      country: "Japan",
      zip: "160-0021",
      lat: 35.693836,
      lng: 139.703049,
      type: "bar",
      verified: true,
      rating: 4.4,
      vibes: ["Traditional", "Tiny Bars", "Local"],
      tags: ["yakitori", "tiny bars", "local culture"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default tokyo;
