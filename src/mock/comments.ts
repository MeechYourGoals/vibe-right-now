
import { Comment } from '@/types';
import { mockUsers } from './users';

export const comments: Comment[] = [
  {
    id: '1',
    postId: '1',
    user: mockUsers[2],
    text: "This place has the best vibes in town! Will definitely be back next week.",
    content: "This place has the best vibes in town! Will definitely be back next week.",
    timestamp: '2023-05-15T14:30:00Z',
    vibedHere: false,
    likes: 5
  },
  {
    id: '2',
    postId: '1',
    user: mockUsers[3],
    text: "I was there too! Didn't see you though. The drinks were amazing.",
    content: "I was there too! Didn't see you though. The drinks were amazing.",
    timestamp: '2023-05-15T15:20:00Z',
    vibedHere: true,
    likes: 3
  },
  {
    id: '3',
    postId: '2',
    user: mockUsers[4],
    text: "That's my favorite spot. Their new menu is incredible.",
    content: "That's my favorite spot. Their new menu is incredible.",
    timestamp: '2023-05-16T09:15:00Z',
    vibedHere: false,
    likes: 7
  },
  {
    id: '4',
    postId: '2',
    user: mockUsers[5],
    text: "Did you try the special? I heard it's fantastic but haven't been there in a while.",
    content: "Did you try the special? I heard it's fantastic but haven't been there in a while.",
    timestamp: '2023-05-16T10:05:00Z',
    vibedHere: false,
    likes: 2
  },
  {
    id: '5',
    postId: '3',
    user: mockUsers[6],
    text: "I'm going there tonight! Any recommendations?",
    content: "I'm going there tonight! Any recommendations?",
    timestamp: '2023-05-17T16:45:00Z',
    vibedHere: true,
    likes: 1
  },
  {
    id: '6',
    postId: '3',
    user: mockUsers[7],
    text: "Get the signature cocktail! It's worth it.",
    content: "Get the signature cocktail! It's worth it.",
    timestamp: '2023-05-17T17:20:00Z',
    vibedHere: false,
    likes: 4
  },
  {
    id: '7',
    postId: '4',
    user: mockUsers[8],
    text: "This place has such great energy. Perfect for weekend nights.",
    content: "This place has such great energy. Perfect for weekend nights.",
    timestamp: '2023-05-18T20:10:00Z',
    vibedHere: false,
    likes: 8
  },
  {
    id: '8',
    postId: '4',
    user: mockUsers[9],
    text: "The DJ last weekend was fantastic. Hope they bring them back!",
    content: "The DJ last weekend was fantastic. Hope they bring them back!",
    timestamp: '2023-05-18T21:30:00Z',
    vibedHere: false,
    likes: 6
  },
  {
    id: '9',
    postId: '5',
    user: mockUsers[10],
    text: "This is going on my must-visit list for sure!",
    content: "This is going on my must-visit list for sure!",
    timestamp: '2023-05-19T11:15:00Z',
    vibedHere: true,
    likes: 9
  },
  {
    id: '10',
    postId: '5',
    user: mockUsers[11],
    text: "Let me know if you end up going! I've been wanting to check it out too.",
    content: "Let me know if you end up going! I've been wanting to check it out too.",
    timestamp: '2023-05-19T12:40:00Z',
    vibedHere: false,
    likes: 3
  }
];
