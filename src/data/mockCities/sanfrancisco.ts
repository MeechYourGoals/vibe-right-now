
import { CityData, Location } from '@/types';

const sanfrancisco: CityData = {
  name: "San Francisco",
  state: "CA",
  country: "USA",
  lat: 37.7749,
  lng: -122.4194,
  venues: [
    {
      id: "sf_1",
      name: "The French Laundry",
      address: "6640 Washington St",
      city: "Yountville",
      state: "CA",
      country: "USA",
      zip: "94599",
      lat: 38.401668,
      lng: -122.359862,
      type: "restaurant",
      verified: true,
      rating: 4.9,
      vibes: ["Fine Dining", "Michelin Star", "Wine Country"],
      tags: ["french cuisine", "tasting menu", "napa valley"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "sf_2",
      name: "Trick Dog",
      address: "3010 20th St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zip: "94110",
      lat: 37.759021,
      lng: -122.414185,
      type: "bar",
      verified: true,
      rating: 4.6,
      vibes: ["Craft Cocktails", "Creative", "Mission"],
      tags: ["cocktails", "creative drinks", "mission district"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "sf_3",
      name: "Golden Gate Bridge",
      address: "Golden Gate Bridge",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zip: "94129",
      lat: 37.819929,
      lng: -122.478255,
      type: "attraction",
      verified: true,
      rating: 4.8,
      vibes: ["Iconic", "Views", "Historic"],
      tags: ["landmark", "bridge", "photography"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ]
};

export default sanfrancisco;
