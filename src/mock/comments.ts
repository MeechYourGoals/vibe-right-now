import { Comment } from "@/types";
import { mockUsers } from "@/mock/users";

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: mockUsers[0].id,
    content: "This place looks amazing! Can't wait to check it out 🔥",
    timestamp: "2024-01-15T10:30:00Z",
    user: {
      id: mockUsers[0].id,
      name: mockUsers[0].name,
      username: mockUsers[0].username,
      avatar: mockUsers[0].avatar
    },
    likes: 12,
    vibedHere: true
  },
  {
    id: "2",
    postId: "1",
    userId: mockUsers[1].id,
    content: "I heard their cocktails are top-notch! 🍹",
    timestamp: "2024-01-15T11:00:00Z",
    user: {
      id: mockUsers[1].id,
      name: mockUsers[1].name,
      username: mockUsers[1].username,
      avatar: mockUsers[1].avatar
    },
    likes: 8,
    vibedHere: false
  },
  {
    id: "3",
    postId: "2",
    userId: mockUsers[2].id,
    content: "Just had the best pizza ever at this spot! 🍕😋",
    timestamp: "2024-01-16T14:45:00Z",
    user: {
      id: mockUsers[2].id,
      name: mockUsers[2].name,
      username: mockUsers[2].username,
      avatar: mockUsers[2].avatar
    },
    likes: 15,
    vibedHere: true
  },
  {
    id: "4",
    postId: "2",
    userId: mockUsers[3].id,
    content: "Their outdoor seating is so cozy and romantic ✨",
    timestamp: "2024-01-16T15:20:00Z",
    user: {
      id: mockUsers[3].id,
      name: mockUsers[3].name,
      username: mockUsers[3].username,
      avatar: mockUsers[3].avatar
    },
    likes: 10,
    vibedHere: false
  },
  {
    id: "5",
    postId: "3",
    userId: mockUsers[4].id,
    content: "This event was absolutely incredible! The energy was electric ⚡️",
    timestamp: "2024-01-17T20:10:00Z",
    user: {
      id: mockUsers[4].id,
      name: mockUsers[4].name,
      username: mockUsers[4].username,
      avatar: mockUsers[4].avatar
    },
    likes: 22,
    vibedHere: true
  },
  {
    id: "6",
    postId: "3",
    userId: mockUsers[5].id,
    content: "I met so many amazing people at this event! Definitely coming back next year 🎉",
    timestamp: "2024-01-17T21:00:00Z",
    user: {
      id: mockUsers[5].id,
      name: mockUsers[5].name,
      username: mockUsers[5].username,
      avatar: mockUsers[5].avatar
    },
    likes: 18,
    vibedHere: true
  }
];
