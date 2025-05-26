
import { Comment } from "@/types";
import { mockUsers } from "./users";

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: mockUsers[0].id,
    user: mockUsers[0],
    content: "This place has such amazing vibes! The atmosphere is perfect for a night out.",
    timestamp: "2024-01-15T18:30:00Z",
    vibedHere: false,
    likes: 12
  },
  {
    id: "2", 
    postId: "1",
    userId: mockUsers[1].id,
    user: mockUsers[1],
    content: "Just vibed here last weekend! The energy was incredible 🔥",
    timestamp: "2024-01-15T19:15:00Z",
    vibedHere: true,
    likes: 8
  },
  {
    id: "3",
    postId: "2",
    userId: mockUsers[2].id,
    user: mockUsers[2],
    content: "The cocktails here are a must-try! 🍹",
    timestamp: "2024-01-16T12:45:00Z",
    vibedHere: false,
    likes: 5
  },
  {
    id: "4",
    postId: "3",
    userId: mockUsers[3].id,
    user: mockUsers[3],
    content: "Great spot for a chill afternoon with friends. ☕",
    timestamp: "2024-01-17T09:20:00Z",
    vibedHere: false,
    likes: 3
  },
  {
    id: "5",
    postId: "4",
    userId: mockUsers[4].id,
    user: mockUsers[4],
    content: "Live music was fantastic! 🎶 Definitely coming back.",
    timestamp: "2024-01-18T21:00:00Z",
    vibedHere: true,
    likes: 15
  }
];
