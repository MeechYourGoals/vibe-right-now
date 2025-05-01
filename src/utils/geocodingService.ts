
/**
 * Utility service for geocoding operations
 */
import { cityCoordinates } from "@/utils/cityLocations";

// Major US cities and their states
const majorCities: Record<string, string> = {
  "new york": "NY",
  "los angeles": "CA",
  "chicago": "IL",
  "houston": "TX",
  "phoenix": "AZ",
  "philadelphia": "PA",
  "san antonio": "TX",
  "san diego": "CA",
  "dallas": "TX",
  "austin": "TX",
  "san jose": "CA",
  "fort worth": "TX",
  "jacksonville": "FL",
  "columbus": "OH",
  "charlotte": "NC",
  "san francisco": "CA",
  "indianapolis": "IN",
  "seattle": "WA",
  "denver": "CO",
  "washington": "DC",
  "boston": "MA",
  "nashville": "TN",
  "baltimore": "MD",
  "portland": "OR",
  "las vegas": "NV",
  "milwaukee": "WI",
  "albuquerque": "NM",
  "tucson": "AZ",
  "fresno": "CA",
  "sacramento": "CA",
  "long beach": "CA",
  "kansas city": "MO",
  "mesa": "AZ",
  "atlanta": "GA",
  "miami": "FL",
  "oakland": "CA",
  "minneapolis": "MN",
  "tulsa": "OK",
  "cleveland": "OH",
  "wichita": "KS",
  "arlington": "TX",
  "new orleans": "LA",
  "tampa": "FL",
  "honolulu": "HI",
  "aurora": "CO",
  "detroit": "MI",
  "pittsburgh": "PA",
  "memphis": "TN",
  "st. louis": "MO",
  "cincinnati": "OH",
  "raleigh": "NC",
  "orlando": "FL"
};

// Get city and state from coordinates using reverse geocoding
export const getCityStateFromCoordinates = async (lat: number, lng: number): Promise<{city: string, state: string}> => {
  try {
    // First try using free Nominatim OpenStreetMap service
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract city and state from address components
    let city = data.address.city || 
               data.address.town || 
               data.address.village || 
               data.address.hamlet || 
               "";
               
    // For US, state is typically state or state_code
    // For other countries, it might be county, state, region, etc.
    let state = data.address.state ||
                data.address.county ||
                data.address.region ||
                "";
    
    // If in US, try to convert state name to state code
    if (data.address.country_code === "us" && state && state.length > 2) {
      const stateCode = getStateCodeFromName(state);
      if (stateCode) {
        state = stateCode;
      }
    }
    
    return { city, state };
  } catch (error) {
    console.error("Geocoding error:", error);
    
    // Try using backup geocoding service if primary fails
    try {
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
      
      if (!response.ok) {
        throw new Error(`Backup geocoding error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        city: data.city || data.locality || "",
        state: data.principalSubdivisionCode ? 
               data.principalSubdivisionCode.split('-')[1] : 
               data.principalSubdivision || ""
      };
    } catch (backupError) {
      console.error("Backup geocoding error:", backupError);
      return { city: "", state: "" };
    }
  }
};

// Mapping of US state full names to state codes
const usStateMap: Record<string, string> = {
  'alabama': 'AL',
  'alaska': 'AK',
  'arizona': 'AZ',
  'arkansas': 'AR',
  'california': 'CA',
  'colorado': 'CO',
  'connecticut': 'CT',
  'delaware': 'DE',
  'florida': 'FL',
  'georgia': 'GA',
  'hawaii': 'HI',
  'idaho': 'ID',
  'illinois': 'IL',
  'indiana': 'IN',
  'iowa': 'IA',
  'kansas': 'KS',
  'kentucky': 'KY',
  'louisiana': 'LA',
  'maine': 'ME',
  'maryland': 'MD',
  'massachusetts': 'MA',
  'michigan': 'MI',
  'minnesota': 'MN',
  'mississippi': 'MS',
  'missouri': 'MO',
  'montana': 'MT',
  'nebraska': 'NE',
  'nevada': 'NV',
  'new hampshire': 'NH',
  'new jersey': 'NJ',
  'new mexico': 'NM',
  'new york': 'NY',
  'north carolina': 'NC',
  'north dakota': 'ND',
  'ohio': 'OH',
  'oklahoma': 'OK',
  'oregon': 'OR',
  'pennsylvania': 'PA',
  'rhode island': 'RI',
  'south carolina': 'SC',
  'south dakota': 'SD',
  'tennessee': 'TN',
  'texas': 'TX',
  'utah': 'UT',
  'vermont': 'VT',
  'virginia': 'VA',
  'washington': 'WA',
  'west virginia': 'WV',
  'wisconsin': 'WI',
  'wyoming': 'WY'
};

// Get state code from state name
export const getStateCodeFromName = (stateName: string): string => {
  return usStateMap[stateName.toLowerCase()] || stateName;
};

// Get state name from state code
export const getStateNameFromCode = (stateCode: string): string => {
  const stateCodeLower = stateCode.toLowerCase();
  for (const [name, code] of Object.entries(usStateMap)) {
    if (code.toLowerCase() === stateCodeLower) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  return stateCode;
};

// Helper function to get city and state from search query
export const parseCityStateFromQuery = (query: string): { city: string, state: string } => {
  // Check for comma-separated input first
  const parts = query.split(',').map(part => part.trim());
  const city = parts[0];
  let state = parts.length > 1 ? parts[1] : "";
  
  // If only city is provided, try to look up the correct state for major cities
  if (!state && city) {
    const lowerCityName = city.toLowerCase();
    if (majorCities[lowerCityName]) {
      state = majorCities[lowerCityName];
      console.log(`Found state ${state} for city ${city}`);
    }
  }
  
  // Convert state code to standard format if possible
  if (state.length === 2) {
    state = state.toUpperCase();
  } else if (state.length > 2) {
    // Try to convert state name to code
    const stateCode = getStateCodeFromName(state);
    if (stateCode) {
      state = stateCode;
    }
  }
  
  return { city, state };
};

// Helper to find city by name and return its coordinates
export const findCityCoordinates = (cityName: string): { lat: number, lng: number } | null => {
  const lowerCityName = cityName.toLowerCase();
  
  // Try to match the city name in our database
  for (const key in cityCoordinates) {
    const city = cityCoordinates[key];
    if (city.name.toLowerCase() === lowerCityName) {
      return { lat: city.lat, lng: city.lng };
    }
  }
  
  return null;
};
