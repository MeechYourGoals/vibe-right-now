
import { Comment } from '@/types';
import { mockUsers } from './users';

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "1",
    user: mockUsers[0],
    content: "Great place! Love the atmosphere.",
    timestamp: "2024-01-15T19:00:00Z",
    vibedHere: true,
    likes: 5
  },
  {
    id: "2",
    postId: "1",
    userId: "2",
    user: mockUsers[1],
    content: "The cocktails here are amazing!",
    timestamp: "2024-01-15T19:15:00Z",
    vibedHere: false,
    likes: 3
  }
];
