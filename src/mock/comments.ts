
import { Comment, User } from '@/types';
import { mockUsers } from './users';

export const comments: Comment[] = [
  {
    id: '1',
    postId: 'post1',
    user: mockUsers[0],
    content: 'This place is amazing! Definitely my new favorite spot.',
    timestamp: '2025-04-10T15:30:00.000Z',
    vibedHere: false,
    likes: 15
  },
  {
    id: '2',
    postId: 'post1',
    user: mockUsers[1],
    content: 'I vibed here last weekend. The music was incredible!',
    timestamp: '2025-04-10T16:45:00.000Z',
    vibedHere: true,
    likes: 24
  },
  {
    id: '3',
    postId: 'post2',
    user: mockUsers[2],
    content: 'The food was delicious, but the service was a bit slow.',
    timestamp: '2025-04-11T09:15:00.000Z',
    vibedHere: false,
    likes: 8
  },
  {
    id: '4',
    postId: 'post2',
    user: mockUsers[3],
    content: 'I recommend the cocktails! They are unique and tasty.',
    timestamp: '2025-04-11T11:22:00.000Z',
    vibedHere: false,
    likes: 12
  },
  {
    id: '5',
    postId: 'post3',
    user: mockUsers[4],
    content: 'Great atmosphere for a date night. Will definitely come back.',
    timestamp: '2025-04-12T14:50:00.000Z',
    vibedHere: true,
    likes: 30
  },
  {
    id: '6',
    postId: 'post3',
    user: mockUsers[0],
    content: 'The view from the rooftop is breathtaking!',
    timestamp: '2025-04-12T17:05:00.000Z',
    vibedHere: false,
    likes: 19
  },
  {
    id: '7',
    postId: 'post4',
    user: mockUsers[1],
    content: 'This place is overrated. Expected more from the reviews.',
    timestamp: '2025-04-13T12:00:00.000Z',
    vibedHere: false,
    likes: 5
  },
  {
    id: '8',
    postId: 'post4',
    user: mockUsers[2],
    content: 'I had a terrible experience. The staff was rude and unhelpful.',
    timestamp: '2025-04-13T14:30:00.000Z',
    vibedHere: false,
    likes: 2
  },
  {
    id: '9',
    postId: 'post5',
    user: mockUsers[3],
    content: 'Best brunch spot in town! The pancakes are a must-try.',
    timestamp: '2025-04-14T10:40:00.000Z',
    vibedHere: true,
    likes: 42
  },
  {
    id: '10',
    postId: 'post5',
    user: mockUsers[4],
    content: 'The coffee is strong and the pastries are delicious.',
    timestamp: '2025-04-14T13:10:00.000Z',
    vibedHere: false,
    likes: 28
  }
];
