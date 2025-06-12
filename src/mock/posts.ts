
import { Post } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: mockLocations[0],
    content: "Just had the most amazing brunch at this hidden gem! 🥐✨ The avocado toast was perfection and the vibes were immaculate. Can't wait to come back with friends!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    likes: 24,
    comments: 8,
    shares: 3,
    saved: false
  },
  {
    id: "2",
    user: mockUsers[1],
    location: mockLocations[1],
    content: "Exploring the vibrant street art scene in the city today! 🎨🏙️ Every corner is a new masterpiece. So inspired by the creativity around here.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1523895664952-72274d0a15aa?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    likes: 37,
    comments: 12,
    shares: 0,
    saved: true
  },
  {
    id: "3",
    user: mockUsers[2],
    location: mockLocations[2],
    content: "Caught the sunset at the beach and it was absolutely breathtaking! 🌅🌊 The sky was painted with the most incredible colors. Feeling grateful for moments like these.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    likes: 52,
    comments: 18,
    shares: 0,
    saved: false
  },
  {
    id: "4",
    user: mockUsers[3],
    location: mockLocations[3],
    content: "Just finished an intense workout session at the gym! 💪🏋️‍♀️ Feeling energized and ready to take on the day. What's your favorite way to stay active?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
    likes: 41,
    comments: 15,
    shares: 0,
    saved: true
  },
  {
    id: "5",
    user: mockUsers[4],
    location: mockLocations[4],
    content: "Enjoying a cozy evening with a good book and a cup of tea. 📚☕️ There's nothing quite like unwinding after a long day. What are you reading right now?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString(),
    likes: 63,
    comments: 22,
    shares: 0,
    saved: false
  },
  {
    id: "6",
    user: mockUsers[0],
    location: mockLocations[5],
    content: "Exploring the local farmers market and found the freshest produce! 🥕🥦 Supporting local businesses and eating healthy. What's your favorite farmers market find?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    likes: 58,
    comments: 20,
    shares: 0,
    saved: true
  },
  {
    id: "7",
    user: mockUsers[1],
    location: mockLocations[6],
    content: "Attended an amazing live music performance at the jazz club! 🎶🎷 The energy was electric and the musicians were incredible. What's your favorite genre of music?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    likes: 71,
    comments: 25,
    shares: 0,
    saved: false
  },
  {
    id: "8",
    user: mockUsers[2],
    location: mockLocations[7],
    content: "Spent the afternoon volunteering at the local animal shelter. 🐶🐱 Giving back to the community and making a difference. How do you like to volunteer your time?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    likes: 66,
    comments: 23,
    shares: 0,
    saved: true
  },
  {
    id: "9",
    user: mockUsers[3],
    location: mockLocations[8],
    content: "Enjoying a scenic hike in the mountains and the views are stunning! ⛰️🌲 Connecting with nature and recharging my soul. What's your favorite hiking spot?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
    likes: 79,
    comments: 28,
    shares: 0,
    saved: false
  },
  {
    id: "10",
    user: mockUsers[4],
    location: mockLocations[9],
    content: "Just tried the new vegan burger at the local cafe and it was delicious! 🍔🌱 Exploring plant-based options and reducing my carbon footprint. What's your favorite vegan dish?",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=711&fit=crop&crop=center"
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 14).toISOString(),
    likes: 85,
    comments: 30,
    shares: 0,
    saved: true
  }
];
