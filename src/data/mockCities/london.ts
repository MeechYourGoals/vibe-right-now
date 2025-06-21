
import { CityData } from '@/types';

const london: CityData = {
  name: "London",
  country: "UK",
  lat: 51.5074,
  lng: -0.1278,
  venues: [
    {
      id: "lon-1",
      name: "Dishoom",
      address: "12 Upper St. Martin's Lane",
      city: "London",
      country: "UK",
      lat: 51.5136,
      lng: -0.1277,
      type: "restaurant" as const,
      rating: 4.6,
      price_level: 2,
      verified: true,
      vibes: ["Bombay Canteen", "Indian Street Food", "Trendy"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Dishoom+London",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "lon-2",
      name: "Wembley Stadium",
      address: "Wembley",
      city: "London",
      country: "UK",
      lat: 51.5560,
      lng: -0.2795,
      type: "sports" as const,
      rating: 4.4,
      verified: true,
      vibes: ["Football", "Concert Venue", "Iconic"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Wembley+Stadium+London",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "lon-3",
      name: "Ministry of Sound",
      address: "103 Gaunt St",
      city: "London",
      country: "UK",
      lat: 51.4983,
      lng: -0.1006,
      type: "bar" as const,
      rating: 4.0,
      price_level: 3,
      verified: true,
      vibes: ["Dance", "Electronic", "Legendary"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Ministry+of+Sound+London",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "lon-4",
      name: "Monmouth Coffee",
      address: "27 Monmouth St",
      city: "London",
      country: "UK",
      lat: 51.5142,
      lng: -0.1251,
      type: "restaurant" as const,
      rating: 4.5,
      price_level: 2,
      verified: true,
      vibes: ["Specialty Coffee", "Covent Garden", "Relaxed"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Monmouth+Coffee+London",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "lon-5",
      name: "Westfield London",
      address: "Ariel Way",
      city: "London",
      country: "UK",
      lat: 51.5079,
      lng: -0.2235,
      type: "attraction" as const,
      rating: 4.3,
      verified: true,
      vibes: ["Shopping", "Modern", "Dining"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/maps?q=Westfield+London",
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default london;
