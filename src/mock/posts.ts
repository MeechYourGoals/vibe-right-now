import { Post, Location, User } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

const getRandomUser = (): User => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

const getRandomLocation = (): Location => {
  return mockLocations[Math.floor(Math.random() * mockLocations.length)];
};

export const mockPosts: Post[] = [
  {
    id: "1",
    user: getRandomUser(),
    location: getRandomLocation(),
    content: "Amazing vibes at this spot! The atmosphere is incredible 🔥",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80" }
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 8,
    saved: false
  },
  {
    id: "2", 
    user: getRandomUser(),
    location: getRandomLocation(),
    content: "Best cocktails in the city! 🍸✨",
    media: [
      { type: "image" as const, url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500&q=80" }
    ],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(),
    likes: 28,
    comments: 5,
    saved: true,
    isPinned: true
  },
  {
    id: "3",
    user: getRandomUser(), 
    location: getRandomLocation(),
    content: "Live music tonight! Come through 🎵",
    media: [
      { type: "video" as const, url: "https://example.com/video.mp4" }
    ],
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    comments: 12,
    saved: false,
    vibeTags: ["live-music", "nightlife", "drinks"]
  }
];

export const getPostComments = (postId: string) => {
  // Mock comments for posts
  return [];
};
