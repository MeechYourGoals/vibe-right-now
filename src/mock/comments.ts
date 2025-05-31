
import { Comment } from '@/types';
import mockUsers from '@/mock/users';

export const mockComments: Comment[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "This looks amazing! 😍",
    timestamp: "2024-01-15T11:00:00Z",
    likes: 5,
    replies: []
  },
  {
    id: "2", 
    user: mockUsers[1],
    content: "I need to check this place out!",
    timestamp: "2024-01-15T11:15:00Z",
    likes: 3,
    replies: []
  },
  {
    id: "3",
    user: mockUsers[2], 
    content: "The vibes are immaculate ✨",
    timestamp: "2024-01-15T11:30:00Z",
    likes: 8,
    replies: []
  }
];

export default mockComments;
