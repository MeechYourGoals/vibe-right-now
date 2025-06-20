
import { CityData, Location } from '@/types';

const singapore: CityData = {
  name: "Singapore",
  country: "Singapore",
  lat: 1.3521,
  lng: 103.8198,
  venues: [
    {
      id: "singapore_1",
      name: "Marina Bay Sands",
      address: "10 Bayfront Ave",
      city: "Singapore",
      country: "Singapore",
      zip: "018956",
      lat: 1.283333,
      lng: 103.860833,
      type: "attraction",
      verified: true,
      rating: 4.4,
      vibes: ["Luxury", "Iconic", "Modern"],
      tags: ["infinity pool", "luxury", "skyline"]
    },
    {
      id: "singapore_2",
      name: "Odette",
      address: "1 St Andrew's Rd",
      city: "Singapore",
      country: "Singapore",
      zip: "178957",
      lat: 1.289722,
      lng: 103.851389,
      type: "restaurant",
      verified: true,
      rating: 4.6,
      vibes: ["Fine Dining", "French", "Michelin Star"],
      tags: ["french cuisine", "fine dining", "michelin star"]
    },
    {
      id: "singapore_3",
      name: "28 HongKong Street",
      address: "28 Hongkong St",
      city: "Singapore",
      country: "Singapore",
      zip: "059667",
      lat: 1.284167,
      lng: 103.847222,
      type: "bar",
      verified: true,
      rating: 4.5,
      vibes: ["Speakeasy", "Craft Cocktails", "Asian"],
      tags: ["cocktails", "speakeasy", "asian inspired"]
    }
  ]
};

export default singapore;
