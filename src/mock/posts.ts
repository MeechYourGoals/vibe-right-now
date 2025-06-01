import { Post } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "Amazing night at the rooftop bar! The city lights were incredible 🌃✨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-15T20:30:00Z",
    likes: 124,
    comments: 18,
    shares: 5,
    location: mockLocations[0],
    vibeTags: ["nightlife", "rooftop", "drinks"],
    saved: false
  },
  {
    id: "2",
    user: mockUsers[1],
    content: "Just tried the new vegan burger at Green Eats and it's a game changer! 🌱🍔 #vegan #foodie",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1568901342037-3dca63a041c6?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-16T14:45:00Z",
    likes: 95,
    comments: 12,
    shares: 3,
    location: mockLocations[1],
    vibeTags: ["vegan", "healthy", "casual"],
    saved: false
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "Caught an amazing jazz performance at The Blue Note last night. The sax solo was 🔥🎷 #jazz #music",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1543791582-d899551761eb?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-17T22:10:00Z",
    likes: 156,
    comments: 22,
    shares: 8,
    location: mockLocations[2],
    vibeTags: ["jazz", "livemusic", "nightlife"],
    saved: false
  },
  {
    id: "4",
    user: mockUsers[3],
    content: "Exploring the art installations at the new exhibit in the museum. So inspiring! 🎨🖼️ #art #museum",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551802585-14fb7151e59f?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-18T16:00:00Z",
    likes: 112,
    comments: 15,
    shares: 4,
    location: mockLocations[3],
    vibeTags: ["art", "culture", "museum"],
    saved: false
  },
  {
    id: "5",
    user: mockUsers[4],
    content: "Cheering on the home team at the stadium! Let's go, Lions! 🦁🏈 #sports #football",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1576766411991-3054bec33949?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-19T19:45:00Z",
    likes: 203,
    comments: 30,
    shares: 12,
    location: mockLocations[4],
    vibeTags: ["sports", "football", "stadium"],
    saved: false
  },
  {
    id: "6",
    user: mockUsers[5],
    content: "Enjoying a peaceful afternoon at the park. The autumn colors are stunning! 🍁🍂 #nature #park",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1508780413684-645e32999d4e?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-20T13:20:00Z",
    likes: 87,
    comments: 10,
    shares: 2,
    location: mockLocations[5],
    vibeTags: ["nature", "park", "autumn"],
    saved: false
  },
  {
    id: "7",
    user: mockUsers[6],
    content: "Just finished a great workout at the gym. Feeling energized! 💪🏋️ #fitness #gym",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-dcaaa73c36f2?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-21T09:55:00Z",
    likes: 135,
    comments: 19,
    shares: 6,
    location: mockLocations[6],
    vibeTags: ["fitness", "gym", "workout"],
    saved: false
  },
  {
    id: "8",
    user: mockUsers[7],
    content: "Having a blast at the comedy club tonight. Laughter is the best medicine! 😂🎤 #comedy #nightlife",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-22T21:05:00Z",
    likes: 102,
    comments: 14,
    shares: 3,
    location: mockLocations[7],
    vibeTags: ["comedy", "nightlife", "entertainment"],
    saved: false
  },
  {
    id: "9",
    user: mockUsers[8],
    content: "Enjoying a delicious brunch at the new cafe in town. The avocado toast is amazing! 🥑🍞 #brunch #foodie",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551782450-a2132b4ba212?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-23T11:30:00Z",
    likes: 148,
    comments: 21,
    shares: 7,
    location: mockLocations[8],
    vibeTags: ["brunch", "foodie", "cafe"],
    saved: false
  },
  {
    id: "10",
    user: mockUsers[9],
    content: "Exploring the vintage shops in the city. Found some real treasures! 💎🛍️ #vintage #shopping",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1547754980-c1e9c9b4cec3?w=500&h=300&fit=crop"
      }
    ],
    timestamp: "2024-01-24T15:15:00Z",
    likes: 93,
    comments: 11,
    shares: 2,
    location: mockLocations[9],
    vibeTags: ["vintage", "shopping", "city"],
    saved: false
  }
];
