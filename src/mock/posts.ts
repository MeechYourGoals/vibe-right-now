
import { Post, Media } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

// Helper function to create media with required id
const createMedia = (type: "image" | "video" | "audio", url: string, thumbnail?: string): Media => ({
  id: Math.random().toString(36).substr(2, 9),
  type,
  url,
  thumbnail
});

// Helper function to get location with fallback and add required fields
const getLocationById = (id: string) => {
  const location = mockLocations.find(loc => loc.id === id);
  if (!location) {
    console.warn(`Location with ID ${id} not found`);
    return {
      ...mockLocations[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
  return {
    ...location,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: getLocationById("1"), // Rooftop Bar Barcelona
    content: "Amazing rooftop view! Perfect for sunset drinks.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 24,
    comments: [],
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "2",
    user: mockUsers[1],
    location: getLocationById("2"), // Mediterranean Bistro
    content: "Best paella in the city hands down! The seafood is incredibly fresh.",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&auto=format&fit=crop"),
      createMedia("image", "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80&auto=format&fit=crop"),
      createMedia("image", "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80&auto=format&fit=crop"),
      createMedia("video", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&auto=format&fit=crop")
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 89,
    comments: [],
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: "3",
    user: mockUsers[2],
    location: getLocationById("3"), // Lisbon Coffee House
    content: "Perfect morning coffee spot! The pastries are incredible too.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    likes: 45,
    comments: [],
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: "4",
    user: mockUsers[3],
    location: getLocationById("1"), // Using location 1 again for variety
    content: "Live music tonight was absolutely incredible! Great atmosphere.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    likes: 67,
    comments: [],
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  },
  {
    id: "5",
    user: mockUsers[4],
    location: getLocationById("2"), // Mediterranean Bistro
    content: "The wine selection here is outstanding! Perfect romantic dinner spot.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 156,
    comments: [],
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "6",
    user: mockUsers[5],
    location: getLocationById("3"), // Lisbon Coffee House
    content: "Great wifi and even better coffee! Perfect for remote work.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 78,
    comments: [],
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: "7",
    user: mockUsers[0],
    location: getLocationById("1"), // Rooftop Bar Barcelona
    content: "Thursday night vibes are unmatched here! Great cocktails and music.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 200),
    likes: 92,
    comments: [],
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString()
  },
  {
    id: "8",
    user: mockUsers[1],
    location: getLocationById("2"), // Mediterranean Bistro
    content: "Celebrating our anniversary here! The service is exceptional.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 134,
    comments: [],
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: "9",
    user: mockUsers[2],
    location: getLocationById("3"), // Lisbon Coffee House
    content: "Sunday brunch done right! The avocado toast is perfection.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    likes: 67,
    comments: [],
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
  },
  {
    id: "10",
    user: mockUsers[3],
    location: getLocationById("1"), // Rooftop Bar Barcelona
    content: "First time here and I'm already planning my next visit! Amazing atmosphere.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    likes: 43,
    comments: [],
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString()
  },
  {
    id: "11",
    user: mockUsers[4],
    location: getLocationById("2"), // Mediterranean Bistro
    content: "Business lunch meeting went perfectly! Great quiet atmosphere for conversations.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    likes: 89,
    comments: [],
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString()
  },
  {
    id: "12",
    user: mockUsers[5],
    location: getLocationById("3"), // Lisbon Coffee House
    content: "Their specialty latte art is incredible! Taste matches the presentation.",
    media: [createMedia("image", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
    likes: 56,
    comments: [],
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString()
  }
];
