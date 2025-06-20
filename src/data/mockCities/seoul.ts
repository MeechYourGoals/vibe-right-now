
import { CityData, Location } from '@/types';

const seoul: CityData = {
  name: "Seoul",
  country: "South Korea",
  lat: 37.5665,
  lng: 126.9780,
  venues: [
    {
      id: "seoul_1",
      name: "Gyeongbokgung Palace",
      address: "161 Sajik-ro",
      city: "Seoul",
      country: "South Korea",
      zip: "03045",
      lat: 37.579617,
      lng: 126.977041,
      type: "attraction",
      verified: true,
      rating: 4.5,
      vibes: ["Historic", "Royal", "Traditional"],
      tags: ["palace", "korean architecture", "historic"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "seoul_2",
      name: "Mingles",
      address: "19 Dosan-daero 67-gil",
      city: "Seoul",
      country: "South Korea",
      zip: "06015",
      lat: 37.526111,
      lng: 127.038889,
      type: "restaurant",
      verified: true,
      rating: 4.6,
      vibes: ["Korean Fusion", "Fine Dining", "Modern"],
      tags: ["korean fusion", "fine dining", "modern korean"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "seoul_3",
      name: "Charles H",
      address: "25 Itaewon-ro 27ga-gil",
      city: "Seoul",
      country: "South Korea",
      zip: "04349",
      lat: 37.534167,
      lng: 126.994722,
      type: "bar",
      verified: true,
      rating: 4.4,
      vibes: ["Craft Cocktails", "Speakeasy", "Intimate"],
      tags: ["cocktails", "speakeasy", "craft drinks"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default seoul;
