
import { Comment } from "@/types";
import { mockUsers } from "./users";

export const mockComments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    user: mockUsers[0],
    content: "This place looks amazing! Can't wait to visit 🔥",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c2",
    postId: "1",
    user: mockUsers[1],
    content: "Best brunch spot in the city!",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c3",
    postId: "2",
    user: mockUsers[2],
    content: "The vibes here are unmatched ✨",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c4",
    postId: "2",
    user: mockUsers[3],
    content: "Perfect date night spot! 💕",
    timestamp: new Date(),
    likes: 0
  },
  {
    id: "c5",
    postId: "3",
    user: mockUsers[4],
    content: "Amazing performance last night! 🎸",
    timestamp: new Date(),
    likes: 3
  },
  {
    id: "c6",
    postId: "3",
    user: mockUsers[5],
    content: "The acoustics in this venue are incredible",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c7",
    postId: "4",
    user: mockUsers[6],
    content: "Great coffee and even better atmosphere ☕",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c8",
    postId: "4",
    user: mockUsers[7],
    content: "My go-to spot for remote work!",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c9",
    postId: "5",
    user: mockUsers[8],
    content: "The tacos here are life-changing 🌮",
    timestamp: new Date(),
    likes: 3
  },
  {
    id: "c10",
    postId: "5",
    user: mockUsers[9],
    content: "Authentic flavors and great service!",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c11",
    postId: "6",
    user: mockUsers[10],
    content: "Beautiful art collection and great wine selection 🍷",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c12",
    postId: "6",
    user: mockUsers[11],
    content: "Such a unique concept! Love the art vibes",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c13",
    postId: "7",
    user: mockUsers[12],
    content: "Best rooftop views in the city! 🌃",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c14",
    postId: "7",
    user: mockUsers[13],
    content: "Perfect spot for sunset drinks",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c15",
    postId: "8",
    user: mockUsers[14],
    content: "The energy here is incredible! Great crowd 🎉",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c16",
    postId: "8",
    user: mockUsers[15],
    content: "DJ killed it last night!",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c17",
    postId: "9",
    user: mockUsers[16],
    content: "Cozy atmosphere and amazing pastries 🥐",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c18",
    postId: "9",
    user: mockUsers[17],
    content: "My favorite spot for morning coffee",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c19",
    postId: "10",
    user: mockUsers[18],
    content: "Fresh seafood and beautiful waterfront views 🦞",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c20",
    postId: "10",
    user: mockUsers[19],
    content: "Worth every penny! Exceptional dining experience",
    timestamp: new Date(),
    likes: 1
  },
  {
    id: "c21",
    postId: "11",
    user: mockUsers[20],
    content: "Great selection of craft beers! 🍺",
    timestamp: new Date(),
    likes: 2
  },
  {
    id: "c22",
    postId: "11",
    user: mockUsers[21],
    content: "Love the industrial vibe of this place",
    timestamp: new Date(),
    likes: 1
  }
];
