
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Location } from "@/types";
import { MockUserProfile, getRandomUserProfile } from "@/utils/locations/types";

// Generate mock music venues for a city
export const generateMockMusicVenues = (city: string) => {
  return [
    'Arena ' + city,
    'The ' + city + ' Theatre',
    'Club ' + city,
    'The ' + city + ' Concert Hall',
    'Underground ' + city,
    'The ' + city + ' Amphitheatre',
    'Jazz Club ' + city
  ];
};

// Generate mock artists
export const generateMockArtists = () => {
  return [
    'The Rolling Stones',
    'Taylor Swift',
    'Ed Sheeran',
    'Lady Gaga',
    'Drake',
    'Beyoncé',
    'Coldplay',
    'The Weeknd',
    'Bad Bunny',
    'BTS',
    'Harry Styles',
    'Post Malone',
    'Dua Lipa',
    'Billie Eilish',
    'Bruno Mars'
  ];
};

// Generate mock comedians
export const generateMockComedians = () => {
  return [
    'Dave Chappelle',
    'Kevin Hart',
    'John Mulaney',
    'Ali Wong',
    'Bill Burr',
    'Trevor Noah',
    'Amy Schumer',
    'Chris Rock',
    'Jerry Seinfeld',
    'Jim Gaffigan',
    'Sebastian Maniscalco',
    'Wanda Sykes',
    'Jo Koy',
    'Tom Segura',
    'Bert Kreischer'
  ];
};

// Get city-specific content
export const getCitySpecificContent = (location: Location) => {
  return `Check out this amazing ${location.type} in ${location.city}! The vibes are incredible right now.`;
};

// Get media for a location
export const getMediaForLocation = (location: Location) => {
  const imageMap: Record<string, string> = {
    "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
    "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop",
    "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?q=80&w=1000&auto=format&fit=crop",
    "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",
    "34": "https://images.unsplash.com/photo-1530915872-13619796d013?q=80&w=1000&auto=format&fit=crop",
    "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop",
  };

  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
    "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop",
    "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
  };

  return {
    type: "image" as const,
    url: imageMap[location.id] || typeDefaultMedia[location.type] || `https://source.unsplash.com/random/800x600/?${location.type},${location.city}`
  };
};

// Generate random vibes
export const generateRandomVibes = (): string[] => {
  const allVibes = [
    "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
    "Upscale", "Casual", "Romantic", "Lively", "Intimate", 
    "High Energy", "Laid Back", "Artsy", "Eclectic", "Historic",
    "Modern", "Vintage", "Industrial", "Bohemian", "Elegant"
  ];
  
  const numberOfVibes = Math.floor(Math.random() * 4) + 1;
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numberOfVibes; i++) {
    const randomVibe = allVibes[Math.floor(Math.random() * allVibes.length)];
    if (!selectedVibes.includes(randomVibe)) {
      selectedVibes.push(randomVibe);
    }
  }
  
  return selectedVibes;
};

// Get additional tags for a location
export const getAdditionalTags = (location: Location) => {
  const commonTags = ["Happening Now", "Popular", "Trending"];
  const typeSpecificTags: Record<string, string[]> = {
    "restaurant": ["Fine Dining", "Casual Eats", "Brunch Spot", "Discounted Menu"],
    "bar": ["Live Music", "Happy Hour", "Nightlife", "Craft Cocktails", "Sports Bar"],
    "event": ["Live Music", "Festival", "Discounted Tix", "Limited Time", "Family Friendly"],
    "attraction": ["Tourist Spot", "Local Favorite", "Photo Spot", "Cultural", "Outdoor"],
    "sports": ["Game Day", "Discounted Tix", "Live Broadcast", "Family Friendly"],
    "other": ["Hidden Gem", "New Opening", "Local Favorite"]
  };
  
  const specificTags = typeSpecificTags[location.type] || [];
  
  const numberOfTags = Math.floor(Math.random() * 3) + 2;
  const additionalTags = [...specificTags, ...commonTags]
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfTags);
  
  return additionalTags;
};
