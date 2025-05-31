
import { Post } from '@/types';
import mockUsers from './users';

// Mock posts data
export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "Just had the most amazing brunch at this hidden gem! The avocado toast was perfect and the vibes were immaculate ✨ #BrunchGoals",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&h=400&fit=crop"
      }
    ],
    timestamp: "2024-01-15T10:30:00Z",
    likes: 127,
    comments: 23,
    shares: 8,
    vibeTags: ["brunch", "foodie", "aesthetic"],
    location: {
      id: "loc1",
      name: "Sunrise Cafe",
      address: "123 Ocean Dr",
      city: "Miami",
      country: "USA",
      lat: 25.7617,
      lng: -80.1918,
      type: "restaurant",
      verified: true
    }
  },
  {
    id: "2", 
    user: mockUsers[1],
    content: "Last night was INSANE! The energy at this place was off the charts 🔥 Can't wait to come back next weekend",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=500&h=400&fit=crop"
      }
    ],
    timestamp: "2024-01-14T23:45:00Z",
    likes: 89,
    comments: 15,
    shares: 12,
    vibeTags: ["nightlife", "party", "weekend"],
    location: {
      id: "loc2",
      name: "Neon Nights",
      address: "456 Collins Ave",
      city: "Miami",
      country: "USA", 
      lat: 25.7907,
      lng: -80.1300,
      type: "bar",
      verified: true
    }
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "Coffee and sunset views - does it get any better? This spot has become my daily ritual ☕️🌅",
    media: [
      {
        type: "image", 
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop"
      }
    ],
    timestamp: "2024-01-14T18:20:00Z",
    likes: 156,
    comments: 31,
    shares: 6,
    vibeTags: ["coffee", "sunset", "peaceful"],
    location: {
      id: "loc3",
      name: "Bayfront Cafe",
      address: "789 Biscayne Blvd",
      city: "Miami",
      country: "USA",
      lat: 25.7753,
      lng: -80.1889,
      type: "restaurant",
      verified: true
    }
  }
];

export default mockPosts;
