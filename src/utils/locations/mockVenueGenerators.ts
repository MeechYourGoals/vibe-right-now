
import { Location } from "@/types";

export const generateMusicVenues = (city: string, state: string): Location[] => {
  const venues: Location[] = [];
  
  const venueNames = [
    `${city} Arena`,
    `${city} Concert Hall`,
    `${city} Theatre`,
    `${city} Music Club`,
    `${city} Symphony Center`
  ];
  
  venueNames.forEach((name, index) => {
    venues.push({
      id: `music-venue-${city.toLowerCase()}-${index}`,
      name,
      address: `${100 + index} Music Ave`,
      city,
      state,
      country: "USA",
      zip: generateRandomZip(city, state),
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: "event",
      verified: Math.random() > 0.3,
      vibes: ["Music", "Entertainment", "Nightlife"]
    });
  });
  
  return venues;
};

export const generateComedyClubs = (city: string, state: string): Location[] => {
  const venues: Location[] = [];
  
  const venueNames = [
    `${city} Comedy Club`,
    `${city} Improv`,
    `Laugh Factory ${city}`,
    `Comedy Cellar ${city}`,
    `Jokes On ${city}`
  ];
  
  venueNames.forEach((name, index) => {
    venues.push({
      id: `comedy-venue-${city.toLowerCase()}-${index}`,
      name,
      address: `${100 + index} Laugh St`,
      city,
      state,
      country: "USA",
      zip: generateRandomZip(city, state),
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: "event",
      verified: Math.random() > 0.3,
      vibes: ["Comedy", "Entertainment", "Nightlife"]
    });
  });
  
  return venues;
};

export const generateRandomZip = (city: string, state: string): string => {
  const cityHash = Array.from(city).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stateHash = Array.from(state || "").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const zipBase = (10000 + (cityHash + stateHash) % 89999);
  return zipBase.toString();
};
