
import { Location, Post, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "sarah_vibes",
    name: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    username: "jay_experiences",
    name: "Jay Johnson",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "3",
    username: "adventure_alex",
    name: "Alex Kim",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "4",
    username: "marco_travels",
    name: "Marco Williams",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "5",
    username: "local_explorer",
    name: "Jamie Chen",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

export const mockLocations: Location[] = [
  {
    id: "1",
    name: "Sunset Lounge",
    address: "123 Beach Drive",
    city: "Miami",
    state: "FL",
    country: "USA",
    lat: 25.761681,
    lng: -80.191788,
    type: "bar",
    verified: true,
  },
  {
    id: "2",
    name: "Artisan Coffee House",
    address: "456 Hipster Avenue",
    city: "Portland",
    state: "OR",
    country: "USA",
    lat: 45.5231,
    lng: -122.6765,
    type: "restaurant",
    verified: true,
  },
  {
    id: "3",
    name: "Summer Music Festival",
    address: "789 Park Lane",
    city: "Austin",
    state: "TX",
    country: "USA",
    lat: 30.2672,
    lng: -97.7431,
    type: "event",
    verified: true,
  },
  {
    id: "4",
    name: "Modern Art Museum",
    address: "101 Culture Street",
    city: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    type: "attraction",
    verified: true,
  },
  {
    id: "5",
    name: "Skyline Rooftop Bar",
    address: "202 High Rise Blvd",
    city: "Chicago",
    state: "IL",
    country: "USA",
    lat: 41.8781,
    lng: -87.6298,
    type: "bar",
    verified: false,
  },
];

// Helper to generate random time in the last few hours
const getRecentTime = (hoursAgo = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Helper to generate expiry time (24 hours after creation)
const getExpiryTime = (creationTime: string) => {
  const date = new Date(creationTime);
  date.setHours(date.getHours() + 24);
  return date.toISOString();
};

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: mockLocations[0],
    content: "The sunset view here is incredible tonight! DJ is playing the best vibes 🎵",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(1),
    expiresAt: getExpiryTime(getRecentTime(1)),
    likes: 42,
    comments: 7,
  },
  {
    id: "2",
    user: mockUsers[1],
    location: mockLocations[1],
    content: "They just put out fresh pastries! Get here quick, there's no line right now.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(2),
    expiresAt: getExpiryTime(getRecentTime(2)),
    likes: 18,
    comments: 3,
  },
  {
    id: "3",
    user: mockUsers[2],
    location: mockLocations[2],
    content: "The headline act is about to start! Crowd is energetic but not too packed yet.",
    media: [
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.5),
    expiresAt: getExpiryTime(getRecentTime(0.5)),
    likes: 104,
    comments: 22,
  },
  {
    id: "4",
    user: mockUsers[3],
    location: mockLocations[3],
    content: "New exhibit just opened! Only a small crowd so far, perfect time to check it out.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(3),
    expiresAt: getExpiryTime(getRecentTime(3)),
    likes: 29,
    comments: 5,
  },
  {
    id: "5",
    user: mockUsers[4],
    location: mockLocations[4],
    content: "Line is around the block tonight! But the view is worth the wait.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519214605650-76a613ee3245?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(1.5),
    expiresAt: getExpiryTime(getRecentTime(1.5)),
    likes: 56,
    comments: 11,
  },
];
