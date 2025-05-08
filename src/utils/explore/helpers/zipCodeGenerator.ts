
// Helper function to generate zip codes for different cities
export const generateZipCode = (city: string): string => {
  // Common zip code prefixes by city
  const zipPrefixes: Record<string, string> = {
    'San Francisco': '941',
    'Los Angeles': '900',
    'New York': '100',
    'Chicago': '606',
    'Miami': '331',
    'Seattle': '981',
    'Portland': '972',
    'Austin': '787',
    'Denver': '802',
    'Boston': '021',
  };
  
  const prefix = zipPrefixes[city] || '123';
  const suffix = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${prefix}${suffix}`;
};
