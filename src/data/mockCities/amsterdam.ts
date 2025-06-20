
import { CityData, Location } from '@/types';

const amsterdam: CityData = {
  name: "Amsterdam",
  country: "Netherlands",
  lat: 52.3676,
  lng: 4.9041,
  venues: [
    {
      id: "amsterdam_1",
      name: "Anne Frank House",
      address: "Prinsengracht 263-267",
      city: "Amsterdam",
      country: "Netherlands",
      zip: "1016 GV",
      lat: 52.375417,
      lng: 4.883961,
      type: "attraction",
      verified: true,
      rating: 4.4,
      vibes: ["Historic", "Educational", "Memorial"],
      tags: ["history", "museum", "memorial"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "amsterdam_2",
      name: "Café de Reiger",
      address: "Nieuwe Leliestraat 34",
      city: "Amsterdam",
      country: "Netherlands",
      zip: "1015 SZ",
      lat: 52.378056,
      lng: 4.883611,
      type: "restaurant",
      verified: true,
      rating: 4.3,
      vibes: ["Traditional", "Dutch Cuisine", "Cozy"],
      tags: ["dutch food", "traditional", "neighborhood"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "amsterdam_3",
      name: "Door 74",
      address: "Reguliersdwarsstraat 74",
      city: "Amsterdam",
      country: "Netherlands",
      zip: "1017 BN",
      lat: 52.364722,
      lng: 4.891944,
      type: "bar",
      verified: true,
      rating: 4.5,
      vibes: ["Speakeasy", "Craft Cocktails", "Hidden"],
      tags: ["cocktails", "speakeasy", "craft drinks"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default amsterdam;
