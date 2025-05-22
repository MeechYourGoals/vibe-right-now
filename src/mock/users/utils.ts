
// Add utility functions that might be referenced elsewhere

/**
 * Creates a hash string from input text
 */
export const hashString = (text: string): number => {
  let hash = 0;
  if (text.length === 0) return hash;
  
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash);
};

/**
 * Generate a user bio based on their username
 */
export const generateUserBio = (username: string): string => {
  const hash = hashString(username);
  
  const bios = [
    "Finding the best vibes in the city.",
    "Exploring new places and seeking unique experiences.",
    "Food enthusiast and adventure seeker.",
    "Capturing moments and sharing memories.",
    "Music lover and outdoor enthusiast.",
    "Always on the lookout for amazing events and venues.",
    "Coffee addict with a passion for discovering hidden gems.",
    "Nightlife enthusiast and social butterfly.",
    "Travel lover documenting my journey.",
    "Foodie with a taste for the extraordinary.",
  ];
  
  return bios[hash % bios.length];
};
