
import { Location } from '@/types';

export const bangkokVenues: Location[] = [
  {
    id: "bangkok_1",
    name: "Grand Palace",
    address: "Na Phra Lan Rd",
    city: "Bangkok",
    country: "Thailand",
    zip: "10200",
    lat: 13.749722,
    lng: 100.491389,
    type: "attraction",
    verified: true,
    rating: 4.4,
    vibes: ["Historic", "Royal", "Traditional"],
    tags: ["palace", "thai architecture", "royal"]
  },
  {
    id: "bangkok_2",
    name: "Gaggan",
    address: "68/1 Soi Langsuan",
    city: "Bangkok",
    country: "Thailand",
    zip: "10330",
    lat: 13.737222,
    lng: 100.544167,
    type: "restaurant",
    verified: true,
    rating: 4.7,
    vibes: ["Progressive Indian", "Fine Dining", "Creative"],
    tags: ["progressive indian", "molecular gastronomy", "tasting menu"]
  },
  {
    id: "bangkok_3",
    name: "Sky Bar",
    address: "1055 Silom Rd",
    city: "Bangkok",
    country: "Thailand",
    zip: "10500",
    lat: 13.724722,
    lng: 100.524167,
    type: "bar",
    verified: true,
    rating: 4.3,
    vibes: ["Rooftop", "Luxury", "City Views"],
    tags: ["rooftop bar", "city views", "luxury"]
  }
];

const bangkok = {
  name: "Bangkok",
  country: "Thailand",
  lat: 13.7563,
  lng: 100.5018,
  venues: bangkokVenues
};

export default bangkok;
