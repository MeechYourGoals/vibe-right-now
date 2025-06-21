
import { CityData, Location } from '@/types';

const berlin: CityData = {
  name: "Berlin",
  country: "Germany",
  lat: 52.5200,
  lng: 13.4050,
  venues: [
    {
      id: "berlin_1",
      name: "Brandenburg Gate",
      address: "Pariser Platz",
      city: "Berlin",
      country: "Germany",
      zip: "10117",
      lat: 52.516275,
      lng: 13.377704,
      type: "attraction",
      verified: true,
      rating: 4.5,
      vibes: ["Historic", "Iconic", "Political"],
      tags: ["landmark", "history", "gate"]
    },
    {
      id: "berlin_2",
      name: "Zur Letzten Instanz",
      address: "Waisenstraße 14-16",
      city: "Berlin",
      country: "Germany",
      zip: "10179",
      lat: 52.516941,
      lng: 13.418385,
      type: "restaurant",
      verified: true,
      rating: 4.2,
      vibes: ["Historic", "German Cuisine", "Traditional"],
      tags: ["german food", "historic", "traditional"]
    },
    {
      id: "berlin_3",
      name: "Berghain",
      address: "Am Wriezener Bahnhof",
      city: "Berlin",
      country: "Germany",
      zip: "10243",
      lat: 52.510972,
      lng: 13.442222,
      type: "bar",
      verified: true,
      rating: 4.3,
      vibes: ["Techno", "Underground", "Industrial"],
      tags: ["techno", "club", "underground"]
    }
  ]
};

export default berlin;
