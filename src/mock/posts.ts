
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
    location: getLocationById("8"), // Christ the Redeemer
    content: "Standing before this iconic statue in Rio! The view from up here is absolutely breathtaking. The journey to get here was worth every step 🙏✨",
    media: [createMedia("image", "/lovable-uploads/d7af47d3-90bc-49b0-8a9c-faf6e01c78b0.png")],
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 24,
    comments: 8,
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: "2",
    user: mockUsers[1],
    location: getLocationById("20"), // Coachella
    content: "Coachella Weekend 1 was UNREAL! The energy, the music, the desert vibes - everything was perfect. Already planning for next year 🎵🌵",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&auto=format&fit=crop"),
      createMedia("image", "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80&auto=format&fit=crop"),
      createMedia("image", "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&q=80&auto=format&fit=crop"),
      createMedia("video", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&auto=format&fit=crop")
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    likes: 89,
    comments: 23,
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: "3",
    user: mockUsers[2],
    location: getLocationById("23"), // InvestFest
    content: "InvestFest Atlanta was incredible! So much knowledge shared about building wealth and financial literacy. The energy in the room was electric! 💰📈",
    media: [createMedia("image", "/lovable-uploads/d2e0af4e-9fb3-4e3c-9e91-3ce0e8e25e9f.png")],
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    likes: 45,
    comments: 12,
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: "4",
    user: mockUsers[3],
    location: getLocationById("18"), // Sydney Opera House
    content: "Finally made it to the Sydney Opera House! The architecture is even more stunning in person. Caught an amazing performance tonight 🎭🏛️",
    media: [createMedia("image", "/lovable-uploads/f3f4d0fa-5c4e-4a3a-8b7a-1e2b0c4d5e6f.png")],
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    likes: 67,
    comments: 15,
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  },
  {
    id: "5",
    user: mockUsers[4],
    location: getLocationById("19"), // Eiffel Tower
    content: "Paris at sunset from the Eiffel Tower - no words can describe this magic! The city of lights truly lives up to its name ✨🇫🇷",
    media: [createMedia("image", "/lovable-uploads/a1b2c3d4-e5f6-4c8e-9b7a-0f1e2d3c4b5a.png")],
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    likes: 156,
    comments: 34,
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: "6",
    user: mockUsers[5],
    location: getLocationById("30"), // Lakers vs Warriors
    content: "WHAT A GAME! Lakers pulled through in overtime! The energy at Crypto.com Arena was absolutely insane! 🏀🔥",
    media: [createMedia("image", "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 78,
    comments: 19,
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: "7",
    user: mockUsers[6],
    location: getLocationById("6"), // Madison Square Garden
    content: "The Garden never disappoints! What an incredible show tonight. NYC always brings that special energy 🗽🎤",
    media: [createMedia("image", "/lovable-uploads/e4f5g6h7-i8j9-4d3e-a1b2-c5d6e7f8g9h0.png")],
    timestamp: new Date(Date.now() - 1000 * 60 * 200),
    likes: 92,
    comments: 27,
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 200).toISOString()
  },
  {
    id: "8",
    user: mockUsers[7],
    location: getLocationById("22"), // Bitcoin Conference
    content: "Bitcoin Conference Nashville was mind-blowing! The future of finance is happening right here, right now. So many innovative minds in one place 🚀₿",
    media: [createMedia("image", "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 134,
    comments: 41,
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: "9",
    user: mockUsers[8],
    location: getLocationById("11"), // Mama's Fish House
    content: "Best seafood I've ever had! Mama's Fish House in Maui is an absolute must-visit. The ocean view while dining is perfection 🌺🐟",
    media: [createMedia("image", "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    likes: 67,
    comments: 16,
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
  },
  {
    id: "10",
    user: mockUsers[9],
    location: getLocationById("35"), // WM Phoenix Open
    content: "Loudest hole in golf! The 16th at TPC Scottsdale during the Phoenix Open is pure chaos in the best way possible ⛳🍺",
    media: [createMedia("image", "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    likes: 43,
    comments: 11,
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString()
  },
  {
    id: "11",
    user: mockUsers[10],
    location: getLocationById("7"), // Encore Beach Club
    content: "Vegas pool party vibes at Encore Beach Club! The sun, the music, the energy - this is what summer dreams are made of ☀️🏊‍♀️",
    media: [createMedia("image", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    likes: 89,
    comments: 24,
    saved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString()
  },
  {
    id: "12",
    user: mockUsers[11],
    location: getLocationById("25"), // The Comedy Cellar Austin
    content: "Laughed until my sides hurt at The Comedy Cellar! Austin's comedy scene is absolutely phenomenal. Such talented performers 😂🎭",
    media: [createMedia("image", "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&q=80&auto=format&fit=crop")],
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
    likes: 56,
    comments: 13,
    saved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString()
  }
];
