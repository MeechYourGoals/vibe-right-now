
import { Location } from "@/types";
import { MockUserProfile, CityCoordinates } from "./types";

// Mock data for location generation
const locationTypes: Array<Location['type']> = ['restaurant', 'bar', 'cafe', 'nightclub', 'museum', 'attraction'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Austin', 'Portland', 'Seattle'];

// Generate mock user profiles for locations
const generateMockUser = (id: string, username: string): MockUserProfile => ({
  id,
  username,
  name: username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  avatar: `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 900000000) + 500000000}-${Math.floor(Math.random() * 900000000) + 500000000}?w=150&h=150&fit=crop&crop=face`,
  verified: Math.random() > 0.8,
  followers: Math.floor(Math.random() * 10000) + 100,
  following: Math.floor(Math.random() * 1000) + 50,
  posts: Math.floor(Math.random() * 500) + 10
});

// Generate locations for a specific city
export const generateLocationsForCity = (cityName: string, count: number = 20): Location[] => {
  const locations: Location[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = locationTypes[Math.floor(Math.random() * locationTypes.length)];
    const id = `${cityName.toLowerCase().replace(/\s+/g, '-')}-${type}-${i + 1}`;
    
    // Generate base coordinates for the city (mock data)
    const baseLat = 40.7128 + (Math.random() - 0.5) * 0.1; // Roughly NYC area
    const baseLng = -74.0060 + (Math.random() - 0.5) * 0.1;
    
    locations.push({
      id,
      name: `${generateLocationName(type)} ${i + 1}`,
      address: `${Math.floor(Math.random() * 999) + 1} ${generateStreetName()} ${generateStreetType()}`,
      city: cityName,
      state: 'NY', // Mock state
      country: 'US',
      lat: baseLat,
      lng: baseLng,
      type,
      verified: Math.random() > 0.7,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0
      tags: generateTags(type),
      hours: generateBusinessHours(),
      photos: generatePhotoUrls(type),
      amenities: generateAmenities(type)
    });
  }
  
  return locations;
};

// Generate locations for multiple cities
export const generateCityLocations = (cities: string[], countPerCity: number = 10): Location[] => {
  const allLocations: Location[] = [];
  
  cities.forEach(city => {
    const cityLocations = generateLocationsForCity(city, countPerCity);
    allLocations.push(...cityLocations);
  });
  
  return allLocations;
};

// Generate all city locations with default cities
export const generateAllCityLocations = (): Location[] => {
  return generateCityLocations(cities, 5);
};

const generateLocationName = (type: string): string => {
  const prefixes = {
    restaurant: ['The', 'Chez', 'Casa', 'Bistro', 'Taverna'],
    bar: ['The', 'Pub', 'Lounge', 'Tavern', 'Sports'],
    cafe: ['Coffee', 'Brew', 'Bean', 'Roast', 'Cup'],
    nightclub: ['Club', 'Night', 'Dance', 'Beat', 'Pulse'],
    museum: ['Museum of', 'Gallery', 'Art', 'History', 'Science'],
    park: ['Central', 'City', 'Memorial', 'Community', 'Riverside'],
    attraction: ['Adventure', 'Experience', 'Wonder', 'Discovery', 'Magic']
  };
  
  const suffixes = {
    restaurant: ['Kitchen', 'Grill', 'House', 'Place', 'Corner'],
    bar: ['Pub', 'Lounge', 'Tavern', 'Bar', 'Club'],
    cafe: ['Coffee', 'Roasters', 'House', 'Shop', 'Beans'],
    nightclub: ['Club', 'Lounge', 'Night', 'Dance', 'Beat'],
    museum: ['Museum', 'Gallery', 'Center', 'Institute', 'Hall'],
    park: ['Park', 'Gardens', 'Green', 'Commons', 'Plaza'],
    attraction: ['Center', 'Experience', 'World', 'Land', 'Zone']
  };
  
  const prefix = prefixes[type as keyof typeof prefixes]?.[Math.floor(Math.random() * 5)] || 'The';
  const suffix = suffixes[type as keyof typeof suffixes]?.[Math.floor(Math.random() * 5)] || 'Place';
  
  return `${prefix} ${suffix}`;
};

const generateStreetName = (): string => {
  const streetNames = ['Main', 'Oak', 'Pine', 'Broadway', 'First', 'Second', 'Park', 'Washington', 'Lincoln', 'Madison'];
  return streetNames[Math.floor(Math.random() * streetNames.length)];
};

const generateStreetType = (): string => {
  const streetTypes = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd'];
  return streetTypes[Math.floor(Math.random() * streetTypes.length)];
};

const generateTags = (type: string): string[] => {
  const tagMap = {
    restaurant: ['dining', 'food', 'cuisine', 'family-friendly'],
    bar: ['drinks', 'cocktails', 'nightlife', 'social'],
    cafe: ['coffee', 'breakfast', 'wifi', 'study'],
    nightclub: ['dancing', 'music', 'nightlife', 'party'],
    museum: ['culture', 'art', 'education', 'history'],
    park: ['outdoor', 'nature', 'recreation', 'family'],
    attraction: ['entertainment', 'tourist', 'fun', 'experience']
  };
  
  const baseTags = tagMap[type as keyof typeof tagMap] || ['general'];
  return baseTags.concat(['popular', 'recommended'].filter(() => Math.random() > 0.5));
};

const generateBusinessHours = () => {
  const standardHours = {
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '19:00', closed: false },
    saturday: { open: '10:00', close: '18:00', closed: false },
    sunday: { open: '11:00', close: '16:00', closed: Math.random() > 0.7 }
  };
  
  return standardHours;
};

const generatePhotoUrls = (type: string): string[] => {
  const photoCount = Math.floor(Math.random() * 5) + 1;
  const photos: string[] = [];
  
  for (let i = 0; i < photoCount; i++) {
    photos.push(`https://images.unsplash.com/photo-1${Math.floor(Math.random() * 900000000) + 500000000}-${Math.floor(Math.random() * 900000000) + 500000000}?w=400&h=300&fit=crop`);
  }
  
  return photos;
};

const generateAmenities = (type: string): string[] => {
  const amenityMap = {
    restaurant: ['WiFi', 'Parking', 'Outdoor Seating', 'Takeout', 'Delivery'],
    bar: ['WiFi', 'Live Music', 'Pool Table', 'Sports TV', 'Happy Hour'],
    cafe: ['WiFi', 'Outdoor Seating', 'Study Area', 'Pastries', 'Laptop Friendly'],
    nightclub: ['Dance Floor', 'VIP Area', 'Live DJ', 'Bar Service', 'Coat Check'],
    museum: ['Gift Shop', 'Guided Tours', 'Audio Guide', 'Parking', 'Accessibility'],
    park: ['Playground', 'Walking Trails', 'Picnic Area', 'Restrooms', 'Parking'],
    attraction: ['Gift Shop', 'Parking', 'Food Court', 'Group Discounts', 'Accessibility']
  };
  
  const baseAmenities = amenityMap[type as keyof typeof amenityMap] || ['WiFi', 'Parking'];
  return baseAmenities.filter(() => Math.random() > 0.3);
};

// Featured users for specific locations
const featuredUsers: MockUserProfile[] = [
  generateMockUser('user-1', 'sarah_vibes'),
  generateMockUser('user-2', 'jay_experiences'), 
  generateMockUser('user-3', 'adventure_alex'),
  generateMockUser('user-4', 'marco_travels'),
  generateMockUser('user-5', 'local_explorer')
];

export { featuredUsers };
