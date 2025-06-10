
import { Location, AppDateRange } from "@/types";
import { EventItem } from "@/components/venue/events/types";

// City coordinates for generating locations
const cityCoordinates = {
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Chicago": { lat: 41.8781, lng: -87.6298 },
  "Miami": { lat: 25.7617, lng: -80.1918 }
};

// Helper function to get random items from an array
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get additional tags
export const getAdditionalTags = (location: Location): string[] => {
  const baseTags = location.tags || [];
  const additionalTags = ["trendy", "popular", "cozy", "lively", "peaceful"];
  return [...baseTags, ...getRandomItems(additionalTags, 2)];
};

export const getMockLocations = (city: string, category: string): Location[] => {
  const coords = cityCoordinates[city as keyof typeof cityCoordinates] || cityCoordinates["San Francisco"];
  
  const baseLocations: Location[] = [
    {
      id: "1",
      name: "The Mission District",
      address: "3200 16th St",
      city: city,
      state: "CA",
      country: "US",
      lat: coords.lat + 0.01,
      lng: coords.lng + 0.01,
      type: category === "places" ? "restaurant" : "bar",
      verified: true,
      rating: 4.5,
      tags: ["trendy", "casual"],
      vibes: ["energetic", "social", "creative"]
    },
    {
      id: "2", 
      name: "Rooftop Lounge",
      address: "1500 Broadway",
      city: city,
      state: "CA", 
      country: "US",
      lat: coords.lat - 0.01,
      lng: coords.lng - 0.01,
      type: "bar",
      verified: true,
      rating: 4.2,
      tags: ["upscale", "views"],
      vibes: ["sophisticated", "romantic", "scenic"]
    },
    {
      id: "3",
      name: "Art Gallery Cafe",
      address: "800 Valencia St",
      city: city,
      state: "CA",
      country: "US", 
      lat: coords.lat + 0.005,
      lng: coords.lng - 0.005,
      type: "cafe",
      verified: false,
      rating: 4.7,
      tags: ["artistic", "quiet"],
      vibes: ["creative", "peaceful", "inspiring"]
    }
  ];

  return baseLocations;
};

export const getMockMusicEvents = (city: string, dateRange?: AppDateRange): EventItem[] => {
  return [
    {
      id: "music-1",
      title: "Live Jazz Night",
      description: "Enjoy smooth jazz with local artists",
      date: new Date().toISOString(),
      time: "8:00 PM",
      venue: "Blue Note Cafe",
      price: "$25",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      category: "music"
    },
    {
      id: "music-2", 
      title: "Indie Rock Showcase",
      description: "Featuring emerging indie artists",
      date: new Date(Date.now() + 86400000).toISOString(),
      time: "9:00 PM",
      venue: "The Fillmore",
      price: "$30",
      imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
      category: "music"
    }
  ];
};

export const getMockComedyEvents = (city: string, dateRange?: AppDateRange): EventItem[] => {
  return [
    {
      id: "comedy-1",
      title: "Stand-Up Comedy Night",
      description: "Hilarious local comedians",
      date: new Date().toISOString(),
      time: "7:30 PM", 
      venue: "Laugh Track Comedy Club",
      price: "$20",
      imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400",
      category: "comedy"
    }
  ];
};

export const getMockNightlifeVenues = (city: string, dateRange?: AppDateRange): Location[] => {
  const coords = cityCoordinates[city as keyof typeof cityCoordinates] || cityCoordinates["San Francisco"];
  
  return [
    {
      id: "nightlife-1",
      name: "Electric Nights",
      address: "1200 Market St",
      city: city,
      state: "CA",
      country: "US",
      lat: coords.lat,
      lng: coords.lng,
      type: "nightclub",
      verified: true,
      rating: 4.3,
      tags: ["dancing", "electronic"],
      vibes: ["energetic", "vibrant", "party"]
    }
  ];
};

// Additional utility functions for venue content
export const getCitySpecificContent = (location: Location): string => {
  return `Check out this amazing spot in ${location.city}! The vibes here are incredible.`;
};

export const getMediaForLocation = (location: Location) => {
  return [{
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
  }];
};
