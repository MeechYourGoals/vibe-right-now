
import { Post } from "@/types";
import { mockUsers } from "@/mock/users";
import { mockLocations } from "@/mock/locations";
import { getRecentTime } from "./time-utils";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "The rooftop view here is absolutely incredible! Perfect spot for sunset drinks 🌅",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.5),
    likes: 245,
    comments: 18,
    shares: 12,
    location: mockLocations[0],
    vibeTags: ["Rooftop", "Sunset", "Trendy", "Views"],
    isVenuePost: false
  },
  {
    id: "2",
    user: mockUsers[1],
    content: "Just discovered this hidden gem! Their chocolate croissants are to die for 🥐✨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1555507036-ab794f67f3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(1.2),
    likes: 189,
    comments: 24,
    shares: 8,
    location: mockLocations[1],
    vibeTags: ["Cozy", "Pastries", "Hidden Gem"],
    isVenuePost: false
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "Epic night at the concert! The energy here is unmatched 🎵🔥",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.8),
    likes: 567,
    comments: 89,
    shares: 45,
    location: mockLocations[2],
    vibeTags: ["Live Music", "Concert", "Energy", "NightOwl"],
    isVenuePost: false
  },
  {
    id: "4",
    user: mockUsers[3],
    content: "Game day at its finest! Nothing beats watching with fellow fans 🏀",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(2.1),
    likes: 423,
    comments: 67,
    shares: 23,
    location: mockLocations[4],
    vibeTags: ["Sports", "Basketball", "Fans", "Game Day"],
    isVenuePost: false
  },
  {
    id: "5",
    user: mockUsers[4],
    content: "Art, culture, and amazing company. Perfect afternoon! 🎨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(1.5),
    likes: 298,
    comments: 45,
    shares: 19,
    location: mockLocations[5],
    vibeTags: ["Art", "Culture", "Museum", "Educational"],
    isVenuePost: false
  },
  {
    id: "6",
    user: mockUsers[5],
    content: "The atmosphere here is electric! Fourth quarter and we're winning! ⚡",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.2),
    likes: 612,
    comments: 94,
    shares: 38,
    location: mockLocations[6],
    vibeTags: ["Stadium", "Football", "Victory", "Electric"],
    isVenuePost: false
  },
  {
    id: "7",
    user: mockUsers[6],
    content: "Dancing the night away! This DJ knows exactly what we need 💃🎶",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.1),
    likes: 387,
    comments: 56,
    shares: 27,
    location: mockLocations[7],
    vibeTags: ["Dancing", "DJ", "NightOwl", "Party"],
    isVenuePost: false
  },
  {
    id: "8",
    user: mockUsers[7],
    content: "Serene morning walk through the gardens. Nature therapy at its best 🌿",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.3),
    likes: 156,
    comments: 23,
    shares: 9,
    location: mockLocations[8],
    vibeTags: ["Nature", "Peaceful", "Morning", "Gardens"],
    isVenuePost: false
  },
  {
    id: "9",
    user: mockUsers[8],
    content: "Beach volleyball and sunset vibes! Could this day get any better? 🏐🌅",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.7),
    likes: 334,
    comments: 41,
    shares: 16,
    location: mockLocations[9],
    vibeTags: ["Beach", "Volleyball", "Sunset", "Active"],
    isVenuePost: false
  },
  {
    id: "10",
    user: mockUsers[9],
    content: "Court side seats and an amazing game! This is what dreams are made of 🏀✨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    timestamp: getRecentTime(0.05),
    likes: 789,
    comments: 123,
    shares: 67,
    location: mockLocations[10],
    vibeTags: ["Basketball", "Court Side", "VIP", "Dreams"],
    isVenuePost: false
  }
];
