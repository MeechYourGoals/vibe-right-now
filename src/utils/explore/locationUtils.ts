
// Utility functions for location generation
export const generateAddress = (): string => {
  const streets = ["Main St", "Oak Ave", "Elm St", "Pine Rd", "Cedar Blvd", "Maple Dr", "First St", "Second Ave"];
  const numbers = Math.floor(Math.random() * 9999) + 1;
  return `${numbers} ${streets[Math.floor(Math.random() * streets.length)]}`;
};

export const generateZipCode = (): string => {
  return Math.floor(Math.random() * 90000 + 10000).toString();
};

export const generateLatitude = (): number => {
  return 37.7749 + (Math.random() * 0.1 - 0.05);
};

export const generateLongitude = (): number => {
  return -122.4194 + (Math.random() * 0.1 - 0.05);
};

export const generateVibes = (): string[] => {
  const vibes = ["Cozy", "Trendy", "Vibrant", "Chill", "Upscale", "Casual", "Energetic", "Intimate"];
  return vibes.slice(0, Math.floor(Math.random() * 3) + 1);
};

export const generateTags = (): string[] => {
  const tags = ["Popular", "Local Favorite", "Hidden Gem", "Date Night", "Family Friendly", "Pet Friendly"];
  return tags.slice(0, Math.floor(Math.random() * 2) + 1);
};

export const generatePhoneNumber = (): string => {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

export const generateWebsite = (): string => {
  const domains = ["example.com", "restaurant.com", "venue.com", "bar.com"];
  return `https://www.${domains[Math.floor(Math.random() * domains.length)]}`;
};
