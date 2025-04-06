
import { Location } from "@/types";
import { cityCoordinates } from "./cityDatabase";

// Helper function to create a unique ID
export const createId = (cityName: string, index: number): string => {
  return `${cityName.toLowerCase().replace(/\s+/g, '-')}-${index}`;
};

// Helper functions to generate realistic names based on the city
export function getSportsVenueName(cityName: string): string {
  const teamNames: Record<string, string> = {
    "Los Angeles": "Lakers vs Clippers",
    "Chicago": "Bulls vs Bucks",
    "New York": "Knicks vs Nets",
    "Atlanta": "Hawks Game",
    "Miami": "Heat vs Magic",
    "Denver": "Nuggets vs Trail Blazers",
    "Las Vegas": "Raiders Game",
    "Indianapolis": "Pacers vs Bulls",
    "Houston": "Rockets vs Spurs",
    "Dallas": "Mavericks vs Thunder",
    "Austin": "Longhorns Football",
    "Charlotte": "Hornets vs Wizards", 
    "Nashville": "Predators Hockey",
    "Boston": "Celtics vs 76ers",
    "Phoenix": "Suns vs Warriors",
    "New Orleans": "Pelicans vs Grizzlies",
    "Seattle": "Seahawks Game",
    "Portland": "Trail Blazers vs Kings",
    "San Francisco": "Warriors vs Lakers",
    "Philadelphia": "76ers vs Heat",
    "Honolulu": "Hawaii Football",
    "Toronto": "Raptors vs Knicks",
    "Paris": "PSG Soccer Match",
    "Rio de Janeiro": "Flamengo Match",
    "Tokyo": "Sumo Tournament",
    "Madrid": "Real Madrid Match",
    "Sydney": "Sydney FC Match",
    "London": "Arsenal vs Chelsea",
    "Munich": "Bayern Munich Match",
    "Barcelona": "FC Barcelona Game"
  };
  
  return teamNames[cityName] || `${cityName} Championship Game`;
}

export function getLoungeName(cityName: string): string {
  const prefixes = ["Skyline", "Azure", "Velvet", "Whisper", "Onyx", "Mirage", "Ember", "Lunar", "Echo", "Tempo"];
  const suffixes = ["Lounge", "Club", "Rooftop", "Night Club", "Ultra Lounge", "Social House", "Speakeasy", "VIP Room"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "Las Vegas": "XS Nightclub",
    "Miami": "LIV Miami",
    "New York": "1 OAK NYC",
    "Los Angeles": "Avalon Hollywood",
    "London": "Ministry of Sound",
    "Tokyo": "Womb Tokyo",
    "Dubai": "White Dubai",
    "Hong Kong": "Dragon-i",
    "Bangkok": "Sing Sing Theater",
    "Berlin": "Berghain",
    "Ibiza": "Pacha Ibiza"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

export function getRestaurantName(cityName: string): string {
  const prefixes = ["The Grand", "Bistro", "Café", "Trattoria", "Cucina", "Chez", "Maison", "Casa", "Brasserie"];
  const suffixes = ["Table", "Kitchen", "Grill", "Eatery", "Dining Room", "Bites", "Provisions", "& Co.", "House"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "New York": "Le Bernardin",
    "Paris": "L'Atelier de Joël Robuchon",
    "Tokyo": "Sukiyabashi Jiro",
    "London": "The Ledbury",
    "Hong Kong": "Lung King Heen",
    "Chicago": "Alinea",
    "San Francisco": "Benu",
    "Bangkok": "Gaggan",
    "Los Angeles": "Providence",
    "Sydney": "Quay",
    "Las Vegas": "Joël Robuchon",
    "New Orleans": "Commander's Palace",
    "Miami": "Joe's Stone Crab"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

export function getEventName(cityName: string): string {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = months[new Date().getMonth()];
  const nextMonth = months[(new Date().getMonth() + 1) % 12];
  
  // Special cases for certain cities
  const specialEvents: Record<string, string> = {
    "New Orleans": "Jazz & Heritage Festival",
    "Austin": "South by Southwest (SXSW)",
    "Miami": "Art Basel Miami Beach",
    "Las Vegas": "Electric Daisy Carnival",
    "New York": "New York Fashion Week",
    "Los Angeles": "Grammy Awards Show",
    "Nashville": "CMA Music Festival",
    "Chicago": "Lollapalooza",
    "San Francisco": "Outside Lands Festival",
    "Paris": "Paris Fashion Week",
    "Rio de Janeiro": "Rio Carnival",
    "Tulum": "Tulum Art & Music Festival",
    "Tokyo": "Tokyo Game Show",
    "Munich": "Oktoberfest"
  };
  
  const eventTypes = [
    `${cityName} Music Festival`,
    `${cityName} Film Festival`,
    `${cityName} Art Exhibition`,
    `${cityName} Food & Wine Festival`,
    `${cityName} ${currentMonth} Fest`,
    `${nextMonth} Block Party`
  ];
  
  return specialEvents[cityName] || eventTypes[Math.floor(Math.random() * eventTypes.length)];
}

export function getComedyClubName(cityName: string): string {
  const prefixes = ["The Laugh", "Chuckle", "Comedy", "Funny", "Jest", "Ha-Ha", "Giggle", "Punchline"];
  const suffixes = ["Factory", "Club", "House", "Cellar", "Spot", "Lounge", "Workshop", "Stage"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "New York": "Comedy Cellar",
    "Los Angeles": "The Comedy Store",
    "Chicago": "Second City",
    "Las Vegas": "Brad Garrett's Comedy Club",
    "Boston": "Nick's Comedy Stop",
    "Philadelphia": "Helium Comedy Club",
    "Atlanta": "Laughing Skull Lounge",
    "Austin": "Cap City Comedy Club",
    "San Francisco": "Punch Line",
    "London": "Top Secret Comedy Club",
    "Toronto": "Yuk Yuk's"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

export function getFitnessClassName(cityName: string): string {
  const prefixes = ["Peak", "Pulse", "Core", "Flex", "Vigor", "Zenith", "Summit", "Prime", "Elite"];
  const suffixes = ["Fitness", "Training", "Pilates", "Yoga", "CrossFit", "HIIT Class", "Boxing", "SoulCycle"];
  
  // Special cases for certain cities
  const specialNames: Record<string, string> = {
    "Los Angeles": "Barry's Bootcamp LA",
    "New York": "SoulCycle Tribeca",
    "Miami": "Equinox South Beach",
    "Las Vegas": "Life Time Athletic",
    "Chicago": "Studio Three",
    "Austin": "Black Swan Yoga",
    "Honolulu": "Yogaloha Hawaii",
    "Toronto": "BOLO",
    "London": "1Rebel",
    "Sydney": "F45 Training"
  };
  
  return specialNames[cityName] || `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

export function getAttractionName(cityName: string): string {
  // Special cases for well-known attractions in each city
  const specialAttractions: Record<string, string> = {
    "New York": "Empire State Building",
    "Los Angeles": "Griffith Observatory",
    "Chicago": "Art Institute of Chicago",
    "Las Vegas": "Bellagio Fountains",
    "San Francisco": "Golden Gate Bridge",
    "New Orleans": "French Quarter",
    "Miami": "South Beach",
    "Seattle": "Space Needle",
    "Boston": "Fenway Park",
    "Washington": "National Mall",
    "Nashville": "Grand Ole Opry",
    "Atlanta": "Georgia Aquarium",
    "Dallas": "The Sixth Floor Museum",
    "Denver": "Red Rocks Park",
    "Honolulu": "Waikiki Beach",
    "Austin": "Barton Springs Pool",
    "Philadelphia": "Liberty Bell",
    "Phoenix": "Desert Botanical Garden",
    "Portland": "Powell's Books",
    "Paris": "Eiffel Tower",
    "London": "British Museum",
    "Tokyo": "Senso-ji Temple",
    "Rio de Janeiro": "Christ the Redeemer",
    "Sydney": "Sydney Opera House",
    "Dubai": "Burj Khalifa",
    "Madrid": "Prado Museum",
    "Barcelona": "La Sagrada Familia",
    "Toronto": "CN Tower",
    "Munich": "Marienplatz",
    "Bangkok": "Grand Palace",
    "Hong Kong": "Victoria Peak",
    "Mumbai": "Gateway of India",
    "Lagos": "Lekki Conservation Centre",
    "Tulum": "Tulum Ruins",
    "Cancun": "Chichen Itza"
  };
  
  const genericAttractions = [
    `${cityName} Museum of Art`,
    `${cityName} Botanical Gardens`,
    `${cityName} Observatory`,
    `${cityName} Historical Museum`,
    `${cityName} Zoo`,
    `${cityName} Aquarium`
  ];
  
  return specialAttractions[cityName] || genericAttractions[Math.floor(Math.random() * genericAttractions.length)];
}
