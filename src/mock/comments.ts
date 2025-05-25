
import { Comment } from "@/types";
import { regularUsers, celebrityUsers } from "./users";

const allUsers = [...regularUsers, ...celebrityUsers];

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "1",
    user: allUsers[0],
    content: "Amazing vibes here tonight!",
    timestamp: "2 hours ago",
    vibedHere: true,
    likes: 12
  },
  {
    id: "2",
    postId: "1",
    userId: "2",
    user: allUsers[1],
    content: "Love this place, great atmosphere!",
    timestamp: "1 hour ago",
    vibedHere: false,
    likes: 8
  },
  {
    id: "3",
    postId: "2",
    userId: "3",
    user: allUsers[2],
    content: "Best coffee in town!",
    timestamp: "30 minutes ago",
    vibedHere: true,
    likes: 5
  }
];
