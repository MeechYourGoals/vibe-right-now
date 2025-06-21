
import { CityData, Location } from '@/types';

const barcelona: CityData = {
  name: "Barcelona",
  country: "Spain",
  lat: 41.3851,
  lng: 2.1734,
  venues: [
    {
      id: "barcelona_1",
      name: "Sagrada Familia",
      address: "Carrer de Mallorca, 401",
      city: "Barcelona",
      country: "Spain",
      zip: "08013",
      lat: 41.403630,
      lng: 2.174356,
      type: "attraction",
      verified: true,
      rating: 4.7,
      vibes: ["Architectural", "Historic", "Religious"],
      tags: ["gaudi", "basilica", "architecture"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "barcelona_2",
      name: "Cal Pep",
      address: "Plaça de les Olles, 8",
      city: "Barcelona",
      country: "Spain",
      zip: "08003",
      lat: 41.383812,
      lng: 2.183449,
      type: "restaurant",
      verified: true,
      rating: 4.4,
      vibes: ["Tapas", "Traditional", "Busy"],
      tags: ["tapas", "seafood", "traditional"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "barcelona_3",
      name: "Dry Martini",
      address: "Carrer d'Aribau, 162",
      city: "Barcelona",
      country: "Spain",
      zip: "08036",
      lat: 41.395077,
      lng: 2.154721,
      type: "bar",
      verified: true,
      rating: 4.5,
      vibes: ["Classic Cocktails", "Elegant", "Traditional"],
      tags: ["martini", "classic cocktails", "elegant"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default barcelona;
