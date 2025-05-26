
import { Location } from "@/types";
import { generateBusinessHours } from "@/utils/businessHoursUtils";

export const mockLocations: Location[] = [
  {
    id: "1",
    name: "Sunset Lounge",
    address: "123 Sunset Blvd",
    city: "Miami",
    state: "FL",
    country: "US",
    lat: 25.7617,
    lng: -80.1918,
    type: "bar",
    rating: 4.5,
    priceLevel: 3,
    openNow: true,
    images: ["https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"],
    description: "Trendy rooftop bar with amazing sunset views",
    hours: generateBusinessHours(),
    vibeTags: ["trendy", "upscale", "romantic"],
    verified: true
  },
  {
    id: "2", 
    name: "Artisan Coffee House",
    address: "456 Arts District",
    city: "Portland",
    state: "OR",
    country: "US",
    lat: 45.5152,
    lng: -122.6784,
    type: "restaurant",
    rating: 4.3,
    priceLevel: 2,
    openNow: true,
    images: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400"],
    description: "Cozy coffee shop with locally roasted beans",
    hours: generateBusinessHours(),
    vibeTags: ["chill", "artsy", "casual"],
    verified: true
  }
];
