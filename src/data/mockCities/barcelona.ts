
import { CityData, Location } from '@/types';

export const barcelonaLocations: Location[] = [
  {
    id: "barcelona-sagrada-familia",
    name: "Sagrada Família",
    address: "C/ de Mallorca, 401",
    city: "Barcelona",
    country: "Spain", 
    zip: "08013",
    lat: 41.4036,
    lng: 2.1744,
    type: "attraction",
    verified: true,
    rating: 4.7,
    vibes: ["Architectural Wonder", "Spiritual", "Iconic", "Tourist Magnet"],
    tags: ["Gaudí", "Basilica", "UNESCO", "Must-See"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "barcelona-cal-pep",
    name: "Cal Pep",
    address: "Pl. de les Olles, 8",
    city: "Barcelona",
    country: "Spain",
    zip: "08003", 
    lat: 41.3851,
    lng: 2.1834,
    type: "restaurant",
    verified: true,
    rating: 4.5,
    vibes: ["Authentic Tapas", "Bustling", "Traditional", "Local Favorite"],
    tags: ["Tapas", "Spanish Cuisine", "Bar Seating", "No Reservations"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "barcelona-paradiso",
    name: "Paradiso",
    address: "Carrer de Rera Palau, 4",
    city: "Barcelona",
    country: "Spain",
    zip: "08003",
    lat: 41.3833,
    lng: 2.1814,
    type: "bar",
    verified: true,
    rating: 4.6,
    vibes: ["Hidden Speakeasy", "Craft Cocktails", "Intimate", "World-Class"],
    tags: ["Cocktails", "Speakeasy", "World's 50 Best", "Reservation Required"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

const barcelona: CityData = {
  name: "Barcelona",
  country: "Spain",
  lat: 41.3851,
  lng: 2.1734,
  venues: barcelonaLocations
};

export default barcelona;
