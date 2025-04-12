import { Post } from '@/types';
import { mockUsers } from './users';
import { mockLocations } from './locations';
import { comments } from './comments';
import { v4 as uuidv4 } from 'uuid';

// Helper function to add ID to media
const createMedia = (type: 'image' | 'video', url: string) => {
  return {
    id: uuidv4(),
    type,
    url
  };
};

export const mockPosts: Post[] = [
  {
    id: "post1",
    user: mockUsers[0],
    location: mockLocations[0],
    text: "Just had an amazing night at this rooftop bar! The view is 🔥",
    content: "Just had an amazing night at this rooftop bar! The view is 🔥",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vZnRvcCUyMGJhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9vZnRvcCUyMGJhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-15T20:30:00Z",
    expiresAt: "2023-09-16T20:30:00Z",
    likes: 126,
    comments: comments.filter(c => c.postId === 'post1'),
    saved: true,
    isPinned: true,
    isVenuePost: false
  },
  {
    id: "post2",
    user: mockUsers[1],
    location: mockLocations[1],
    text: "Brunch at this cafe was absolutely divine! 🥞☕",
    content: "Brunch at this cafe was absolutely divine! 🥞☕",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1551000244-251999418695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJ1bmNofGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1517248135464-672a91ca8e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJ1bmNofGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-14T11:45:00Z",
    expiresAt: "2023-09-15T11:45:00Z",
    likes: 95,
    comments: comments.filter(c => c.postId === 'post2'),
    saved: false,
    isPinned: false,
    isVenuePost: true
  },
  {
    id: "post3",
    user: mockUsers[2],
    location: mockLocations[2],
    text: "Exploring the art scene in downtown. So many hidden gems! 🎨",
    content: "Exploring the art scene in downtown. So many hidden gems! 🎨",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1544620347-c4fd4a3d59a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0JTIwc2NlbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1541888946425-ded8038b65f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXJ0JTIwc2NlbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-13T16:20:00Z",
    expiresAt: "2023-09-14T16:20:00Z",
    likes: 78,
    comments: comments.filter(c => c.postId === 'post3'),
    saved: true,
    isPinned: false,
    isVenuePost: false
  },
  {
    id: "post4",
    user: mockUsers[3],
    location: mockLocations[3],
    text: "This new Italian restaurant is a must-try! 🍝🍷",
    content: "This new Italian restaurant is a must-try! 🍝🍷",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1600891722929-7aa36e475901?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRhbGlhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1555939594-58d7cb6cca18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXRhbGlhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-12T19:55:00Z",
    expiresAt: "2023-09-13T19:55:00Z",
    likes: 112,
    comments: comments.filter(c => c.postId === 'post4'),
    saved: false,
    isPinned: true,
    isVenuePost: true
  },
  {
    id: "post5",
    user: mockUsers[4],
    location: mockLocations[4],
    text: "Enjoying live music at this cozy bar. 🎶",
    content: "Enjoying live music at this cozy bar. 🎶",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1543791358-44d78bab1696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2ZSUyMG11c2ljJTIwYmFyfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1576673799044-ef4758809317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGl2ZSUyMG11c2ljJTIwYmFyfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-11T22:10:00Z",
    expiresAt: "2023-09-12T22:10:00Z",
    likes: 89,
    comments: comments.filter(c => c.postId === 'post5'),
    saved: true,
    isPinned: false,
    isVenuePost: false
  },
  {
    id: "post6",
    user: mockUsers[0],
    location: mockLocations[5],
    text: "Great workout session at this gym! 💪",
    content: "Great workout session at this gym! 💪",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1517836357463-dcaaa9c3c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1583454110551-4515c19f8f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3ltfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-10T09:30:00Z",
    expiresAt: "2023-09-11T09:30:00Z",
    likes: 67,
    comments: comments.filter(c => c.postId === 'post6'),
    saved: false,
    isPinned: false,
    isVenuePost: false
  },
  {
    id: "post7",
    user: mockUsers[1],
    location: mockLocations[6],
    text: "Relaxing day at the spa. 🧖‍♀️",
    content: "Relaxing day at the spa. 🧖‍♀️",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1560067174-ff49a39bb948?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BhfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-09T14:45:00Z",
    expiresAt: "2023-09-10T14:45:00Z",
    likes: 54,
    comments: comments.filter(c => c.postId === 'post7'),
    saved: true,
    isPinned: false,
    isVenuePost: false
  },
  {
    id: "post8",
    user: mockUsers[2],
    location: mockLocations[7],
    text: "Delicious sushi at this Japanese restaurant! 🍣",
    content: "Delicious sushi at this Japanese restaurant! 🍣",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1613769049917-bb434dc9f744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1579871494447-98118e26759c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-08T18:00:00Z",
    expiresAt: "2023-09-09T18:00:00Z",
    likes: 92,
    comments: comments.filter(c => c.postId === 'post8'),
    saved: false,
    isPinned: false,
    isVenuePost: true
  },
  {
    id: "post9",
    user: mockUsers[3],
    location: mockLocations[8],
    text: "Hiking in the mountains. The view is breathtaking! ⛰️",
    content: "Hiking in the mountains. The view is breathtaking! ⛰️",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlraW5nfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1476514524891-c428ca49d9a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGlraW5nfGVufDB8fDB8fHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-07T10:15:00Z",
    expiresAt: "2023-09-08T10:15:00Z",
    likes: 71,
    comments: comments.filter(c => c.postId === 'post9'),
    saved: true,
    isPinned: false,
    isVenuePost: false
  },
  {
    id: "post10",
    user: mockUsers[4],
    location: mockLocations[9],
    text: "Coffee and a good book at this cozy cafe. ☕📚",
    content: "Coffee and a good book at this cozy cafe. ☕📚",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwY2FmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"),
      createMedia("image", "https://images.unsplash.com/photo-1503435980610-a60293d28a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29mZmVlJTIwY2FmZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")
    ],
    timestamp: "2023-09-06T15:30:00Z",
    expiresAt: "2023-09-07T15:30:00Z",
    likes: 62,
    comments: comments.filter(c => c.postId === 'post10'),
    saved: false,
    isPinned: false,
    isVenuePost: false
  }
];
