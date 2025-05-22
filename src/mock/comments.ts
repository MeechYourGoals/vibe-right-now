import { Comment, User } from "@/types";
import { regularUsers } from "./users";

// Helper function to add userId property
const addUserIdToComment = (comment: any): Comment => {
  return {
    ...comment,
    userId: comment.user.id
  };
};

// Create properly typed comments
export const comments: Comment[] = [
  // Convert existing comment objects to include userId
  addUserIdToComment({
    id: "comment1",
    postId: "post1",
    user: regularUsers[0],
    content: "Great vibes at this place!",
    timestamp: "2023-10-10T12:30:00Z",
    vibedHere: false,
    likes: 5
  }),
  addUserIdToComment({
    id: "comment2",
    postId: "post1",
    user: regularUsers[1],
    content: "I love the atmosphere here.",
    timestamp: "2023-10-10T13:00:00Z",
    vibedHere: true,
    likes: 8
  }),
  addUserIdToComment({
    id: "comment3",
    postId: "post2",
    user: regularUsers[2],
    content: "The food was amazing!",
    timestamp: "2023-10-11T14:00:00Z",
    vibedHere: false,
    likes: 12
  }),
  addUserIdToComment({
    id: "comment4",
    postId: "post2",
    user: regularUsers[3],
    content: "I'll definitely come back.",
    timestamp: "2023-10-11T15:30:00Z",
    vibedHere: true,
    likes: 3
  }),
  addUserIdToComment({
    id: "comment5",
    postId: "post3",
    user: regularUsers[4],
    content: "The service was excellent.",
    timestamp: "2023-10-12T16:00:00Z",
    vibedHere: false,
    likes: 7
  }),
  addUserIdToComment({
    id: "comment6",
    postId: "post3",
    user: regularUsers[5],
    content: "I had a great time here.",
    timestamp: "2023-10-12T17:30:00Z",
    vibedHere: true,
    likes: 10
  }),
  addUserIdToComment({
    id: "comment7",
    postId: "post4",
    user: regularUsers[6],
    content: "The drinks were delicious.",
    timestamp: "2023-10-13T18:00:00Z",
    vibedHere: false,
    likes: 6
  }),
  addUserIdToComment({
    id: "comment8",
    postId: "post4",
    user: regularUsers[7],
    content: "I'll recommend this place to my friends.",
    timestamp: "2023-10-13T19:30:00Z",
    vibedHere: true,
    likes: 9
  }),
  addUserIdToComment({
    id: "comment9",
    postId: "post5",
    user: regularUsers[8],
    content: "The music was great!",
    timestamp: "2023-10-14T20:00:00Z",
    vibedHere: false,
    likes: 11
  }),
  addUserIdToComment({
    id: "comment10",
    postId: "post5",
    user: regularUsers[9],
    content: "I enjoyed the live performance.",
    timestamp: "2023-10-14T21:30:00Z",
    vibedHere: true,
    likes: 4
  })
];

export default comments;
