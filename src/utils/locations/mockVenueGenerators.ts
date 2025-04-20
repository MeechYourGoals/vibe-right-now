
import { Location } from "@/types";
import { cityCoordinates } from "./cityDatabase";

export function generateMusicVenues(city: string, state: string): Location[] {
  if (!city) {
    city = "San Francisco";
    state = "CA";
  }
  
  const musicVenues = [
    { name: `${city} Arena`, type: "Large Arena" },
    { name: `The ${city} Theatre`, type: "Historic Theatre" },
    { name: `${city} Jazz Club`, type: "Jazz Venue" },
    { name: `Underground ${city}`, type: "Live Music Bar" },
    { name: `${city} Symphony Hall`, type: "Classical" },
    { name: `The Sound Bar ${city}`, type: "Club" },
    { name: `${city} House of Blues`, type: "Blues Venue" }
  ];
  
  return musicVenues.map((venue, index) => ({
    id: `music-${city.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    name: venue.name,
    address: `${100 + index} Music Row`,
    city,
    state,
    country: "USA",
    zip: `${10000 + Math.floor(Math.random() * 90000)}`,
    lat: cityCoordinates[city]?.lat || (40 + Math.random()),
    lng: cityCoordinates[city]?.lng || (-75 + Math.random()),
    type: "music",
    verified: Math.random() > 0.3,
    venueType: venue.type,
    vibes: ["Live Music", "Entertainment", "Nightlife"]
  }));
}

export function generateComedyClubs(city: string, state: string): Location[] {
  if (!city) {
    city = "San Francisco";
    state = "CA";
  }
  
  const comedyVenues = [
    { name: `${city} Comedy Club`, type: "Stand-up Club" },
    { name: `Laugh Factory ${city}`, type: "Comedy Chain" },
    { name: `${city} Improv`, type: "Improv Theatre" },
    { name: `Funny Bone ${city}`, type: "Comedy Club" },
    { name: `Comedy Cellar ${city}`, type: "Underground Club" }
  ];
  
  return comedyVenues.map((venue, index) => ({
    id: `comedy-${city.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    name: venue.name,
    address: `${200 + index} Comedy Lane`,
    city,
    state,
    country: "USA",
    zip: `${10000 + Math.floor(Math.random() * 90000)}`,
    lat: cityCoordinates[city]?.lat || (40 + Math.random()),
    lng: cityCoordinates[city]?.lng || (-75 + Math.random()),
    type: "comedy",
    verified: Math.random() > 0.3,
    venueType: venue.type,
    vibes: ["Comedy", "Entertainment", "Nightlife"]
  }));
}

export function generateNightlifeVenues(city: string, state: string): Location[] {
  if (!city) {
    city = "San Francisco";
    state = "CA";
  }
  
  const nightlifeVenues = [
    { name: `${city} Rooftop Lounge`, type: "Rooftop Bar" },
    { name: `Club ${city}`, type: "Nightclub" },
    { name: `The ${city} Speakeasy`, type: "Cocktail Bar" },
    { name: `${city} Ultra Lounge`, type: "Upscale Club" },
    { name: `Sky ${city}`, type: "Rooftop Club" },
    { name: `The ${city} Social`, type: "Lounge" },
    { name: `Velvet ${city}`, type: "VIP Club" }
  ];
  
  return nightlifeVenues.map((venue, index) => ({
    id: `nightlife-${city.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    name: venue.name,
    address: `${300 + index} Night Ave`,
    city,
    state,
    country: "USA",
    zip: `${10000 + Math.floor(Math.random() * 90000)}`,
    lat: cityCoordinates[city]?.lat || (40 + Math.random()),
    lng: cityCoordinates[city]?.lng || (-75 + Math.random()),
    type: "nightlife",
    verified: Math.random() > 0.3,
    venueType: venue.type,
    vibes: ["Nightlife", "Entertainment", "Drinks"]
  }));
}
