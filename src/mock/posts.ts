
import { Post } from '@/types';
import { mockUsers } from './users';
import { mockLocations } from './locations';

export const mockPosts: Post[] = [
  {
    id: "1",
    content: "Amazing rooftop views and craft cocktails!",
    author: mockUsers[0],
    user: mockUsers[0],
    location: mockLocations[0],
    timestamp: "2024-01-15T18:30:00Z",
    media: [],
    likes: 127,
    comments: [],
    vibedHere: true,
    isLiked: false
  }
];
