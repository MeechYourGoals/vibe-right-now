
/**
 * Utility functions for vibe-related operations
 */

// Generate random vibes for location listings
export const generateRandomVibes = (): string[] => {
  const allVibes = [
    "Trendy", 
    "Cozy", 
    "Upscale", 
    "Family Friendly", 
    "Romantic", 
    "Casual", 
    "Nightowl", 
    "Chill", 
    "Energetic",
    "Artsy",
    "Historic",
    "Zen",
    "Industrial",
    "Modern",
    "Classic"
  ];
  
  // Select 1-3 random vibes
  const numVibes = Math.floor(Math.random() * 3) + 1;
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numVibes; i++) {
    const randomIndex = Math.floor(Math.random() * allVibes.length);
    const vibe = allVibes[randomIndex];
    
    if (!selectedVibes.includes(vibe)) {
      selectedVibes.push(vibe);
    }
  }
  
  return selectedVibes;
}
