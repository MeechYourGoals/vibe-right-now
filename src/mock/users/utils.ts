
import { User } from "@/types";

/**
 * Generates a generic bio for a user based on their username patterns
 * @param user The user object
 * @returns A bio string that matches the user's interests
 */
export const generateUserBio = (user: User): string => {
  if (user.bio) {
    return user.bio;
  }
  
  // Generate bios based on username patterns
  if (user.username.includes("food") || user.username.includes("chef") || user.username.includes("coffee")) {
    return "Foodie exploring the best culinary experiences around the world. Always on the hunt for hidden gems and authentic flavors. 🍜🍷✨";
  } else if (user.username.includes("travel") || user.username.includes("explorer") || user.username.includes("wanderer")) {
    return "Travel enthusiast with a passion for discovering new cultures and hidden spots. 30 countries and counting! 🌍✈️🧳";
  } else if (user.username.includes("party") || user.username.includes("club") || user.username.includes("fest")) {
    return "Nightlife connoisseur and music lover. Finding the best clubs, festivals, and dance floors wherever I go. 🎵🥂🕺";
  } else if (user.username.includes("sport") || user.username.includes("fitness")) {
    return "Sports fanatic and fitness enthusiast. Always looking for the next adrenaline rush and active experiences. 🏈🏀⚽";
  } else {
    return "Always seeking the next great vibe! Foodie, music lover, and adventure seeker exploring one city at a time. 🌮🎵✨";
  }
};

/**
 * Simple string hash function for deterministic selection
 * @param str The string to hash
 * @returns A number hash of the string
 */
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/**
 * Get featured users for display in prominent places
 * @returns An array of usernames
 */
export const getFeaturedUsers = (): string[] => {
  return [
    "sarah_vibes",          // Sarah Miller - regular user with nice profile
    "jay_experiences",      // Jay Johnson - photographer and coffee enthusiast
    "adventure_alex",       // Alex Kim - adrenaline junkie
    "marco_travels",        // Marco Williams - digital nomad
    "local_explorer",       // Jamie Chen - New York local expert
    "kimkardashian",        // Celebrity profiles
    "champagnepapi",        // Drake
    "sydney_sweeney",       // Sydney Sweeney
    "ishowspeed",           // IShowSpeed
    "keithlee"              // Keith Lee - food critic
  ];
};
