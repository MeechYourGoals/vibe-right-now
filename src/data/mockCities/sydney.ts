
import { CityData } from '@/types';

const sydney: CityData = {
  name: "Sydney",
  country: "Australia",
  lat: -33.8688,
  lng: 151.2093,
  venues: [
    {
      id: "sydney_1",
      name: "Sydney Opera House",
      address: "Bennelong Point",
      city: "Sydney",
      country: "Australia",
      zip: "2000",
      lat: -33.856159,
      lng: 151.215256,
      type: "attraction",
      verified: true,
      rating: 4.6,
      vibes: ["Iconic", "Architecture", "Performance"],
      tags: ["opera", "architecture", "harbor"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "sydney_2",
      name: "Quay Restaurant",
      address: "Upper Level, Overseas Passenger Terminal",
      city: "Sydney",
      country: "Australia",
      zip: "2000",
      lat: -33.858667,
      lng: 151.211056,
      type: "restaurant",
      verified: true,
      rating: 4.5,
      vibes: ["Fine Dining", "Harbor Views", "Modern Australian"],
      tags: ["fine dining", "harbor views", "modern australian"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: "sydney_3",
      name: "Frankie's Pizza",
      address: "50 Hunter St",
      city: "Sydney",
      country: "Australia",
      zip: "2000",
      lat: -33.866143,
      lng: 151.209900,
      type: "bar",
      verified: true,
      rating: 4.3,
      vibes: ["Rock Bar", "Pizza", "Underground"],
      tags: ["rock music", "pizza", "underground"],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

export default sydney;
