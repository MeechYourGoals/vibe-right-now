
import { CityData, Location } from '@/types';

const rome: CityData = {
  name: "Rome",
  country: "Italy",
  lat: 41.9028,
  lng: 12.4964,
  venues: [
    {
      id: "rome_1",
      name: "Colosseum",
      address: "Piazza del Colosseo, 1",
      city: "Rome",
      country: "Italy",
      zip: "00184",
      lat: 41.890169,
      lng: 12.492269,
      type: "attraction",
      verified: true,
      rating: 4.6,
      vibes: ["Ancient", "Historic", "Iconic"],
      tags: ["ancient rome", "gladiators", "amphitheater"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "rome_2",
      name: "La Pergola",
      address: "Via Alberto Cadlolo, 101",
      city: "Rome",
      country: "Italy",
      zip: "00136",
      lat: 41.915278,
      lng: 12.454167,
      type: "restaurant",
      verified: true,
      rating: 4.8,
      vibes: ["Fine Dining", "Michelin Star", "Panoramic"],
      tags: ["fine dining", "michelin star", "rooftop"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "rome_3",
      name: "Jerry Thomas Project",
      address: "Vicolo Cellini, 30",
      city: "Rome",
      country: "Italy",
      zip: "00186",
      lat: 41.895278,
      lng: 12.473611,
      type: "bar",
      verified: true,
      rating: 4.4,
      vibes: ["Speakeasy", "Craft Cocktails", "Hidden"],
      tags: ["speakeasy", "cocktails", "prohibition"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default rome;
