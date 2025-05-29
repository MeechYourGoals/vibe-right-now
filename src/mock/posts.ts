
import { Post, Media } from "@/types";
import { regularUsers, celebrityUsers } from "./users";
import { mockLocations } from "./locations";
import { getRecentTime, getExpiryTime } from "./time-utils";

const allUsers = [...regularUsers, ...celebrityUsers];

export const mockPosts: Post[] = [
  {
    id: "1",
    user: allUsers[0],
    author: allUsers[0],
    location: mockLocations[0],
    content: "The sunset view here is incredible tonight! DJ is playing the best vibes 🎵",
    media: [
      {
        id: "1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format&fit=crop",
      },
      {
        id: "1-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(1),
    expiresAt: getExpiryTime(getRecentTime(1), true),
    likes: 42,
    comments: [],
    isPinned: true,
    vibedHere: true,
    vibeTags: ["Lively", "Upscale", "NightOwl"]
  },
  {
    id: "2",
    user: allUsers[1],
    author: allUsers[1],
    location: mockLocations[1],
    content: "They just put out fresh pastries! Get here quick, there's no line right now.",
    media: [
      {
        id: "2-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(2),
    expiresAt: getExpiryTime(getRecentTime(2)),
    likes: 18,
    comments: [],
    vibedHere: false
  },
  {
    id: "3",
    user: allUsers[2],
    author: allUsers[2],
    location: mockLocations[2],
    content: "The headline act is about to start! Crowd is energetic but not too packed yet.",
    media: [
      {
        id: "3-1",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "3-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(0.5),
    expiresAt: getExpiryTime(getRecentTime(0.5)),
    likes: 104,
    comments: [],
    vibedHere: true
  },
  {
    id: "4",
    user: allUsers[3],
    author: allUsers[3],
    location: mockLocations[3],
    content: "New exhibit just opened! Only a small crowd so far, perfect time to check it out.",
    media: [
      {
        id: "4-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(3),
    expiresAt: getExpiryTime(getRecentTime(3)),
    likes: 29,
    comments: [],
    vibedHere: false
  },
  {
    id: "5",
    user: allUsers[4],
    author: allUsers[4],
    location: mockLocations[4],
    content: "Line is around the block tonight! But the view is worth the wait.",
    media: [
      {
        id: "5-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1519214605650-76a613ee3245?w=600&q=80&auto=format&fit=crop",
      },
    ],
    timestamp: getRecentTime(1.5),
    expiresAt: getExpiryTime(getRecentTime(1.5)),
    likes: 56,
    comments: [],
    isPinned: true,
    vibedHere: true,
    vibeTags: ["Lively", "Upscale", "NightOwl"]
  }
];
