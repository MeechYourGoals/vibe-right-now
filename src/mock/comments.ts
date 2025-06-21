
import { Comment } from "@/types";
import { mockUsers } from "./users";

export const mockComments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    user: mockUsers[0],
    author: mockUsers[0]?.username || "anonymous",
    content: "This place looks amazing! Can't wait to visit 🔥",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c2",
    postId: "1",
    user: mockUsers[1],
    author: mockUsers[1]?.username || "anonymous",
    content: "Best brunch spot in the city!",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: true
  },
  {
    id: "c3",
    postId: "2",
    user: mockUsers[2],
    author: mockUsers[2]?.username || "anonymous",
    content: "The vibes here are unmatched ✨",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c4",
    postId: "2",
    user: mockUsers[3],
    author: mockUsers[3]?.username || "anonymous",
    content: "Perfect date night spot! 💕",
    timestamp: new Date().toISOString(),
    likes: 0,
    vibedHere: false
  },
  {
    id: "c5",
    postId: "3",
    user: mockUsers[4],
    author: mockUsers[4]?.username || "anonymous",
    content: "Amazing performance last night! 🎸",
    timestamp: new Date().toISOString(),
    likes: 3,
    vibedHere: true
  },
  {
    id: "c6",
    postId: "3",
    user: mockUsers[5],
    author: mockUsers[5]?.username || "anonymous",
    content: "The acoustics in this venue are incredible",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: false
  },
  {
    id: "c7",
    postId: "4",
    user: mockUsers[6],
    author: mockUsers[6]?.username || "anonymous",
    content: "Great coffee and even better atmosphere ☕",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c8",
    postId: "4",
    user: mockUsers[7],
    author: mockUsers[7]?.username || "anonymous",
    content: "My go-to spot for remote work!",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: true
  },
  {
    id: "c9",
    postId: "5",
    user: mockUsers[8],
    author: mockUsers[8]?.username || "anonymous",
    content: "The tacos here are life-changing 🌮",
    timestamp: new Date().toISOString(),
    likes: 3,
    vibedHere: false
  },
  {
    id: "c10",
    postId: "5",
    user: mockUsers[9],
    author: mockUsers[9]?.username || "anonymous",
    content: "Authentic flavors and great service!",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: true
  },
  {
    id: "c11",
    postId: "6",
    user: mockUsers[10],
    author: mockUsers[10]?.username || "anonymous",
    content: "Beautiful art collection and great wine selection 🍷",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c12",
    postId: "6",
    user: mockUsers[11],
    author: mockUsers[11]?.username || "anonymous",
    content: "Such a unique concept! Love the art vibes",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: false
  },
  {
    id: "c13",
    postId: "7",
    user: mockUsers[12],
    author: mockUsers[12]?.username || "anonymous",
    content: "Best rooftop views in the city! 🌃",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: true
  },
  {
    id: "c14",
    postId: "7",
    user: mockUsers[13],
    author: mockUsers[13]?.username || "anonymous",
    content: "Perfect spot for sunset drinks",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: false
  },
  {
    id: "c15",
    postId: "8",
    user: mockUsers[14],
    author: mockUsers[14]?.username || "anonymous",
    content: "The energy here is incredible! Great crowd 🎉",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c16",
    postId: "8",
    user: mockUsers[15],
    author: mockUsers[15]?.username || "anonymous",
    content: "DJ killed it last night!",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: true
  },
  {
    id: "c17",
    postId: "9",
    user: mockUsers[16],
    author: mockUsers[16]?.username || "anonymous",
    content: "Cozy atmosphere and amazing pastries 🥐",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c18",
    postId: "9",
    user: mockUsers[17],
    author: mockUsers[17]?.username || "anonymous",
    content: "My favorite spot for morning coffee",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: false
  },
  {
    id: "c19",
    postId: "10",
    user: mockUsers[18],
    author: mockUsers[18]?.username || "anonymous",
    content: "Fresh seafood and beautiful waterfront views 🦞",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: true
  },
  {
    id: "c20",
    postId: "10",
    user: mockUsers[19],
    author: mockUsers[19]?.username || "anonymous",
    content: "Worth every penny! Exceptional dining experience",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: false
  },
  {
    id: "c21",
    postId: "11",
    user: mockUsers[20],
    author: mockUsers[20]?.username || "anonymous",
    content: "Great selection of craft beers! 🍺",
    timestamp: new Date().toISOString(),
    likes: 2,
    vibedHere: false
  },
  {
    id: "c22",
    postId: "11",
    user: mockUsers[21],
    author: mockUsers[21]?.username || "anonymous",
    content: "Love the industrial vibe of this place",
    timestamp: new Date().toISOString(),
    likes: 1,
    vibedHere: true
  }
];
