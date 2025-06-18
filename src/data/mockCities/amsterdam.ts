
import { CityData } from "@/types";

export const amsterdamData: CityData = {
  name: "Amsterdam",
  country: "Netherlands",
  lat: 52.3676,
  lng: 4.9041,
  venues: [
    {
      id: "amsterdam-1",
      name: "Paradiso",
      address: "Weteringschans 6-8",
      city: "Amsterdam",
      country: "Netherlands",
      coordinates: { lat: 52.3626, lng: 4.8839 },
      lat: 52.3626,
      lng: 4.8839,
      type: "nightclub",
      rating: 4.4,
      price_level: 2,
      verified: true,
      vibes: ["🎵 Live Music", "🎉 Dancing", "🍺 Drinks"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?q=Paradiso+Amsterdam",
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: "amsterdam-2", 
      name: "Rijksmuseum",
      address: "Museumstraat 1",
      city: "Amsterdam",
      country: "Netherlands",
      coordinates: { lat: 52.3600, lng: 4.8852 },
      lat: 52.3600,
      lng: 4.8852,
      type: "attraction",
      rating: 4.6,
      verified: true,
      vibes: ["🎨 Art", "🏛️ Culture", "📚 History"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?q=Rijksmuseum+Amsterdam",
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: "amsterdam-3",
      name: "Café Central",
      address: "Lange Nieuwstraat 62",
      city: "Amsterdam",
      country: "Netherlands",
      coordinates: { lat: 52.3738, lng: 4.8937 },
      lat: 52.3738,
      lng: 4.8937,
      type: "cafe",
      rating: 4.3,
      price_level: 2,
      verified: true,
      vibes: ["☕ Coffee", "🥐 Breakfast", "📚 Reading"],
      business_status: "OPERATIONAL",
      google_maps_url: "https://maps.google.com/?q=Cafe+Central+Amsterdam",
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ]
};
