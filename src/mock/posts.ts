
import { Post, User } from "@/types";
import { mockLocations } from "./locations";

// Define users inline to avoid circular imports
const users: User[] = [
  {
    id: "1",
    username: "alexvibes",
    name: "Alex Chen",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    verified: true,
    followers: 12500,
    following: 890,
    posts: 234
  },
  {
    id: "2", 
    username: "sarahnightlife",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: false,
    followers: 8900,
    following: 456,
    posts: 187
  },
  {
    id: "3",
    username: "mikefoodie",
    name: "Mike Rodriguez", 
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: true,
    followers: 15600,
    following: 1200,
    posts: 298
  }
];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: users[0],
    location: mockLocations[0],
    content: "This rooftop has the most incredible sunset views! Perfect spot for evening vibes 🌅✨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-15T18:30:00Z",
    expiresAt: "2024-01-22T18:30:00Z",
    likes: 234,
    comments: 28,
    shares: 45,
    isPinned: true,
    saved: false,
    vibeTags: ["Romantic", "Views", "Sunset"]
  },
  {
    id: "2",
    user: users[1],
    location: mockLocations[1],
    content: "Energy here is absolutely unmatched! The crowd knows how to vibe 🔥💃",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-15T22:45:00Z",
    expiresAt: "2024-01-22T22:45:00Z",
    likes: 189,
    comments: 67,
    shares: 23,
    saved: false
  },
  {
    id: "3",
    user: users[2],
    location: mockLocations[2],
    content: "Found the perfect brunch spot! Their avocado toast is next level 🥑☕",
    media: [
      {
        type: "video",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        type: "image", 
        url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-14T11:20:00Z",
    expiresAt: "2024-01-21T11:20:00Z",
    likes: 156,
    comments: 34,
    shares: 12,
    saved: false
  },
  {
    id: "4",
    user: users[0],
    location: mockLocations[3],
    content: "Late night study session at this cozy café. They're open 24/7 and the atmosphere is perfect! 📚☕",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-13T23:15:00Z", 
    expiresAt: "2024-01-20T23:15:00Z",
    likes: 98,
    comments: 19,
    shares: 8,
    saved: false
  },
  {
    id: "5",
    user: users[1],
    location: mockLocations[4],
    content: "This hidden speakeasy is absolutely incredible! The cocktails are works of art 🍸✨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-12T21:30:00Z",
    expiresAt: "2024-01-19T21:30:00Z", 
    likes: 278,
    comments: 42,
    shares: 56,
    isPinned: true,
    saved: false,
    vibeTags: ["Intimate", "Crafted", "Hidden"]
  },
  {
    id: "6",
    user: users[2],
    location: mockLocations[5],
    content: "Beach volleyball tournament was epic! Nothing beats playing on actual sand in the city 🏐🏖️",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-11T16:45:00Z",
    expiresAt: "2024-01-18T16:45:00Z",
    likes: 167,
    comments: 23,
    shares: 15,
    saved: false
  },
  {
    id: "7", 
    user: users[0],
    location: mockLocations[6],
    content: "Art exhibition opening night was mind-blowing! The interactive installations are incredible 🎨🖼️",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-10T19:00:00Z",
    expiresAt: "2024-01-17T19:00:00Z",
    likes: 203,
    comments: 38,
    shares: 29,
    saved: false
  }
];
