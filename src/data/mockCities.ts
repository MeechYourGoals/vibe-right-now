
import { CityData } from '@/types/location';

export const mockCitiesData: CityData[] = [
  // US Cities
  {
    name: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7128,
    lng: -74.0060,
    venues: [
      {
        id: "nyc-1",
        name: "Joe's Pizza",
        address: "7 Carmine St",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7301,
        lng: -74.0036,
        type: "restaurant",
        rating: 4.2,
        price_level: 2,
        verified: true,
        vibes: ["Authentic", "Classic NYC", "Local Favorite"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Joe's+Pizza+NYC"
      },
      {
        id: "nyc-2",
        name: "Madison Square Garden",
        address: "4 Pennsylvania Plaza",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7505,
        lng: -73.9934,
        type: "sports",
        rating: 4.0,
        verified: true,
        vibes: ["Iconic", "Sports", "Entertainment"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Madison+Square+Garden"
      },
      {
        id: "nyc-3",
        name: "1 OAK",
        address: "453 W 17th St",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7425,
        lng: -74.0089,
        type: "nightclub",
        rating: 3.8,
        price_level: 4,
        verified: true,
        vibes: ["Upscale", "Nightlife", "Celebrity Hotspot"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=1+OAK+NYC"
      },
      {
        id: "nyc-4",
        name: "Blue Bottle Coffee",
        address: "160 Berry St",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7197,
        lng: -73.9576,
        type: "cafe",
        rating: 4.3,
        price_level: 3,
        verified: true,
        vibes: ["Artisanal", "Trendy", "Third Wave Coffee"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Blue+Bottle+Coffee+NYC"
      },
      {
        id: "nyc-5",
        name: "Brookfield Place",
        address: "230 Vesey St",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7134,
        lng: -74.0158,
        type: "mall",
        rating: 4.1,
        verified: true,
        vibes: ["Luxury Shopping", "Waterfront", "Modern"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Brookfield+Place+NYC"
      }
    ]
  },
  {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    lat: 34.0522,
    lng: -118.2437,
    venues: [
      {
        id: "la-1",
        name: "In-N-Out Burger",
        address: "7009 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0983,
        lng: -118.3432,
        type: "restaurant",
        rating: 4.4,
        price_level: 2,
        verified: true,
        vibes: ["West Coast Classic", "Fresh", "Cult Following"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=In-N-Out+Burger+LA"
      },
      {
        id: "la-2",
        name: "Staples Center",
        address: "1111 S Figueroa St",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0430,
        lng: -118.2673,
        type: "sports",
        rating: 4.2,
        verified: true,
        vibes: ["Lakers", "Entertainment", "Downtown LA"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Staples+Center+LA"
      },
      {
        id: "la-3",
        name: "Academy LA",
        address: "6021 Hollywood Blvd",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.1022,
        lng: -118.3275,
        type: "nightclub",
        rating: 4.0,
        price_level: 3,
        verified: true,
        vibes: ["Hollywood", "Electronic Music", "Celebrity Sightings"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Academy+LA"
      },
      {
        id: "la-4",
        name: "Intelligentsia Coffee",
        address: "3922 W Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0978,
        lng: -118.2785,
        type: "cafe",
        rating: 4.3,
        price_level: 3,
        verified: true,
        vibes: ["Artisanal", "Silver Lake", "Specialty Coffee"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Intelligentsia+Coffee+LA"
      },
      {
        id: "la-5",
        name: "The Grove",
        address: "189 The Grove Dr",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0719,
        lng: -118.3564,
        type: "mall",
        rating: 4.2,
        verified: true,
        vibes: ["Outdoor Shopping", "Entertainment", "Tourist Destination"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=The+Grove+LA"
      }
    ]
  },
  {
    name: "Miami",
    state: "FL",
    country: "USA",
    lat: 25.7617,
    lng: -80.1918,
    venues: [
      {
        id: "miami-1",
        name: "Joe's Stone Crab",
        address: "11 Washington Ave",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7663,
        lng: -80.1320,
        type: "restaurant",
        rating: 4.3,
        price_level: 4,
        verified: true,
        vibes: ["Miami Institution", "Seafood", "South Beach"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Joe's+Stone+Crab+Miami"
      },
      {
        id: "miami-2",
        name: "FTX Arena",
        address: "601 Biscayne Blvd",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7814,
        lng: -80.1870,
        type: "sports",
        rating: 4.1,
        verified: true,
        vibes: ["Heat", "Basketball", "Downtown Miami"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=FTX+Arena+Miami"
      },
      {
        id: "miami-3",
        name: "LIV",
        address: "4441 Collins Ave",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.8138,
        lng: -80.1221,
        type: "nightclub",
        rating: 4.0,
        price_level: 4,
        verified: true,
        vibes: ["World Famous", "Electronic Music", "VIP Experience"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=LIV+Miami"
      },
      {
        id: "miami-4",
        name: "Panther Coffee",
        address: "2390 NW 2nd Ave",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7959,
        lng: -80.2010,
        type: "cafe",
        rating: 4.2,
        price_level: 2,
        verified: true,
        vibes: ["Local Roaster", "Wynwood", "Creative District"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Panther+Coffee+Miami"
      },
      {
        id: "miami-5",
        name: "Aventura Mall",
        address: "19501 Biscayne Blvd",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.9564,
        lng: -80.1426,
        type: "mall",
        rating: 4.3,
        verified: true,
        vibes: ["Luxury Shopping", "Fashion", "High-End Brands"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Aventura+Mall+Miami"
      }
    ]
  },
  // International Cities
  {
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    venues: [
      {
        id: "paris-1",
        name: "L'As du Fallafel",
        address: "34 Rue des Rosiers",
        city: "Paris",
        country: "France",
        lat: 48.8574,
        lng: 2.3620,
        type: "restaurant",
        rating: 4.2,
        price_level: 2,
        verified: true,
        vibes: ["Marais District", "Authentic", "Local Institution"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=L'As+du+Fallafel+Paris"
      },
      {
        id: "paris-2",
        name: "Stade de France",
        address: "93216 Saint-Denis",
        city: "Paris",
        country: "France",
        lat: 48.9244,
        lng: 2.3601,
        type: "sports",
        rating: 4.1,
        verified: true,
        vibes: ["Football", "Concerts", "National Stadium"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Stade+de+France"
      },
      {
        id: "paris-3",
        name: "Rex Club",
        address: "5 Boulevard Poissonnière",
        city: "Paris",
        country: "France",
        lat: 48.8707,
        lng: 2.3479,
        type: "nightclub",
        rating: 4.3,
        price_level: 3,
        verified: true,
        vibes: ["Electronic Music", "Underground", "Techno"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Rex+Club+Paris"
      },
      {
        id: "paris-4",
        name: "Loustic",
        address: "40 Rue Chapon",
        city: "Paris",
        country: "France",
        lat: 48.8636,
        lng: 2.3559,
        type: "cafe",
        rating: 4.4,
        price_level: 3,
        verified: true,
        vibes: ["Specialty Coffee", "Third Wave", "Le Marais"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Loustic+Coffee+Paris"
      },
      {
        id: "paris-5",
        name: "Galeries Lafayette",
        address: "40 Boulevard Haussmann",
        city: "Paris",
        country: "France",
        lat: 48.8738,
        lng: 2.3320,
        type: "mall",
        rating: 4.2,
        verified: true,
        vibes: ["Luxury Shopping", "Historic", "Fashion Capital"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Galeries+Lafayette+Paris"
      }
    ]
  },
  {
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    venues: [
      {
        id: "tokyo-1",
        name: "Sukiyabashi Jiro",
        address: "Tsukamoto Sogyo Building B1F",
        city: "Tokyo",
        country: "Japan",
        lat: 35.6713,
        lng: 139.7656,
        type: "restaurant",
        rating: 4.8,
        price_level: 4,
        verified: true,
        vibes: ["World Famous", "Sushi Master", "Michelin Starred"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Sukiyabashi+Jiro+Tokyo"
      },
      {
        id: "tokyo-2",
        name: "Tokyo Dome",
        address: "1-3-61 Koraku, Bunkyo",
        city: "Tokyo",
        country: "Japan",
        lat: 35.7056,
        lng: 139.7519,
        type: "sports",
        rating: 4.0,
        verified: true,
        vibes: ["Baseball", "Giants", "Big Egg"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Tokyo+Dome"
      },
      {
        id: "tokyo-3",
        name: "Womb",
        address: "2-16 Maruyamacho, Shibuya",
        city: "Tokyo",
        country: "Japan",
        lat: 35.6617,
        lng: 139.6955,
        type: "nightclub",
        rating: 4.2,
        price_level: 3,
        verified: true,
        vibes: ["Electronic Music", "Shibuya", "Underground"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Womb+Tokyo"
      },
      {
        id: "tokyo-4",
        name: "Blue Bottle Coffee",
        address: "3-13-14 Minamiaoyama, Minato",
        city: "Tokyo",
        country: "Japan",
        lat: 35.6652,
        lng: 139.7244,
        type: "cafe",
        rating: 4.1,
        price_level: 3,
        verified: true,
        vibes: ["Minimalist", "Third Wave", "Omotesando"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Blue+Bottle+Coffee+Tokyo"
      },
      {
        id: "tokyo-5",
        name: "Shibuya Sky",
        address: "2-24-12 Shibuya, Shibuya",
        city: "Tokyo",
        country: "Japan",
        lat: 35.6590,
        lng: 139.7016,
        type: "mall",
        rating: 4.3,
        verified: true,
        vibes: ["Observation Deck", "Shopping", "Modern"],
        business_status: "OPERATIONAL",
        google_maps_url: "https://maps.google.com/maps?q=Shibuya+Sky+Tokyo"
      }
    ]
  }
];

// Function to find city by name with fuzzy matching
export const findCityByName = (searchTerm: string): CityData | null => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return mockCitiesData.find(city => {
    const cityName = city.name.toLowerCase();
    const fullName = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`.toLowerCase();
    
    return cityName.includes(normalizedSearch) || 
           fullName.includes(normalizedSearch) ||
           normalizedSearch.includes(cityName);
  }) || null;
};

// Function to search venues across all cities
export const searchVenues = (searchTerm: string, cityName?: string): Location[] => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  let citiesToSearch = mockCitiesData;
  
  if (cityName) {
    const targetCity = findCityByName(cityName);
    if (targetCity) {
      citiesToSearch = [targetCity];
    }
  }
  
  const results: Location[] = [];
  
  citiesToSearch.forEach(city => {
    city.venues.forEach(venue => {
      const venueName = venue.name.toLowerCase();
      const venueType = venue.type.toLowerCase();
      const venueVibes = venue.vibes?.join(' ').toLowerCase() || '';
      
      if (venueName.includes(normalizedSearch) ||
          venueType.includes(normalizedSearch) ||
          venueVibes.includes(normalizedSearch)) {
        results.push(venue);
      }
    });
  });
  
  return results.slice(0, 10); // Limit results
};
