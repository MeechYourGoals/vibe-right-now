import { Comment, User } from '@/types';
import { users } from './users';

// Updated comments to include both text and content fields
export const comments: Comment[] = [
  {
    id: "c1",
    postId: "p1",
    user: users[1],
    text: "This place has the best atmosphere in town!",
    content: "This place has the best atmosphere in town!",
    timestamp: "2023-05-18T14:22:00Z",
    likes: 12,
    vibedHere: false
  },
  {
    id: "c2",
    postId: "p1",
    user: users[2],
    text: "I vibed here last weekend, the DJ was amazing!",
    content: "I vibed here last weekend, the DJ was amazing!",
    timestamp: "2023-05-18T15:41:00Z",
    likes: 8,
    vibedHere: true
  },
  {
    id: "c3",
    postId: "p2",
    user: users[3],
    text: "The cocktails here are so creative, you have to try the lavender mule!",
    content: "The cocktails here are so creative, you have to try the lavender mule!",
    timestamp: "2023-05-17T19:15:00Z",
    likes: 19,
    vibedHere: true
  },
  {
    id: "c4",
    postId: "p2",
    user: users[4],
    text: "Their happy hour deals are unreal. $5 craft beers!",
    content: "Their happy hour deals are unreal. $5 craft beers!",
    timestamp: "2023-05-17T20:03:00Z",
    likes: 23,
    vibedHere: false
  },
  {
    id: "c5",
    postId: "p3",
    user: users[0],
    text: "Just saw an incredible art exhibit here, highly recommend!",
    content: "Just saw an incredible art exhibit here, highly recommend!",
    timestamp: "2023-05-16T11:52:00Z",
    likes: 31,
    vibedHere: true
  },
  {
    id: "c6",
    postId: "p3",
    user: users[5],
    text: "This museum is a hidden gem, so much history!",
    content: "This museum is a hidden gem, so much history!",
    timestamp: "2023-05-16T13:28:00Z",
    likes: 15,
    vibedHere: false
  },
  {
    id: "c7",
    postId: "p4",
    user: users[1],
    text: "The views from this park are breathtaking, especially at sunset.",
    content: "The views from this park are breathtaking, especially at sunset.",
    timestamp: "2023-05-15T16:47:00Z",
    likes: 42,
    vibedHere: true
  },
  {
    id: "c8",
    postId: "p4",
    user: users[2],
    text: "Perfect spot for a picnic and a relaxing afternoon.",
    content: "Perfect spot for a picnic and a relaxing afternoon.",
    timestamp: "2023-05-15T18:09:00Z",
    likes: 27,
    vibedHere: false
  },
  {
    id: "c9",
    postId: "p5",
    user: users[3],
    text: "Great shopping deals here, got a new outfit for half the price!",
    content: "Great shopping deals here, got a new outfit for half the price!",
    timestamp: "2023-05-14T10:36:00Z",
    likes: 9,
    vibedHere: true
  },
  {
    id: "c10",
    postId: "p5",
    user: users[4],
    text: "So many unique stores, you can find something for everyone.",
    content: "So many unique stores, you can find something for everyone.",
    timestamp: "2023-05-14T12:14:00Z",
    likes: 16,
    vibedHere: false
  }
];

export default comments;
