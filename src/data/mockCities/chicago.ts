
import { CityData, Location } from '@/types';

const chicago: CityData = {
  name: "Chicago",
  state: "IL",
  country: "USA",
  lat: 41.8781,
  lng: -87.6298,
  venues: [
    {
      id: "chicago_1",
      name: "Alinea",
      address: "1723 N Halsted St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60614",
      lat: 41.912304,
      lng: -87.649862,
      type: "restaurant",
      verified: true,
      rating: 4.8,
      vibes: ["Upscale", "Fine Dining", "Innovative"],
      tags: ["molecular gastronomy", "tasting menu"]
    },
    {
      id: "chicago_2",
      name: "The Violet Hour",
      address: "1520 N Damen Ave",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60622",
      lat: 41.908463,
      lng: -87.677842,
      type: "bar",
      verified: true,
      rating: 4.6,
      vibes: ["Craft Cocktails", "Speakeasy", "Dark"],
      tags: ["cocktails", "intimate", "prohibition era"]
    },
    {
      id: "chicago_3",
      name: "Green Mill Cocktail Lounge",
      address: "4802 N Broadway",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60640",
      lat: 41.969592,
      lng: -87.659657,
      type: "bar",
      verified: true,
      rating: 4.5,
      vibes: ["Historic", "Jazz", "Live Music"],
      tags: ["jazz club", "historic", "live music"]
    },
    {
      id: "chicago_4",
      name: "Wrigley Field",
      address: "1060 W Addison St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60613",
      lat: 41.948437,
      lng: -87.655334,
      type: "sports",
      verified: true,
      rating: 4.3,
      vibes: ["Historic", "Sports", "Iconic"],
      tags: ["baseball", "cubs", "historic ballpark"]
    },
    {
      id: "chicago_5",
      name: "Second City",
      address: "1616 N Wells St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60614",
      lat: 41.911684,
      lng: -87.634821,
      type: "attraction",
      verified: true,
      rating: 4.4,
      vibes: ["Comedy", "Entertainment", "Historic"],
      tags: ["comedy club", "improv", "sketch comedy"]
    }
  ]
};

export default chicago;
