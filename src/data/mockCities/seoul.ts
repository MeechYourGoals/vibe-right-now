
import { CityData } from '@/types';

const currentDate = new Date().toISOString();

const seoul: CityData = {
  name: "Seoul",
  country: "South Korea",
  lat: 37.5665,
  lng: 126.9780,
  venues: [
    {
      id: "seo-1",
      name: "Gyeongbokgung Palace",
      address: "161 Sajik-ro",
      city: "Seoul",
      country: "South Korea",
      lat: 37.5797,
      lng: 126.9770,
      type: "attraction" as const,
      rating: 4.5,
      verified: true,
      vibes: ["Palace", "Traditional", "Historic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Gyeongbokgung+Palace+Seoul",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "seo-2",
      name: "Mingles",
      address: "19 Dosan-daero 67-gil",
      city: "Seoul",
      country: "South Korea",
      lat: 37.5219,
      lng: 127.0411,
      type: "restaurant" as const,
      rating: 4.7,
      price_level: 4,
      verified: true,
      vibes: ["Michelin Star", "Korean Fusion", "Fine Dining"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Mingles+Seoul",
      createdAt: currentDate,
      updatedAt: currentDate
    },
    {
      id: "seo-3",
      name: "Octagon",
      address: "645 Nonhyeon-ro",
      city: "Seoul",
      country: "South Korea",
      lat: 37.5172,
      lng: 127.0286,
      type: "nightclub" as const,
      rating: 4.3,
      price_level: 4,
      verified: true,
      vibes: ["Gangnam", "K-Pop", "Electronic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Octagon+Seoul",
      createdAt: currentDate,
      updatedAt: currentDate
    }
  ]
};

export default seoul;
