
import { Post, User, Location } from '@/types';
import { regularUsers } from './users/regularUsers';
import { mockLocations } from './locations';

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: regularUsers[0].id,
    user: regularUsers[0],
    author: regularUsers[0],
    location: mockLocations[0],
    content: "The vibes at The Rooftop are absolutely incredible tonight! 🔥",
    media: [
      {
        id: '1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop'
      }
    ],
    timestamp: '2024-01-15T20:30:00Z',
    expiresAt: '2024-01-16T02:30:00Z',
    likes: 247,
    comments: [],
    shares: 45,
    isPinned: true,
    vibedHere: true,
    vibeTags: ['🔥 Lit', '🎵 Vibes']
  },
  {
    id: '2',
    userId: regularUsers[1].id,
    user: regularUsers[1],
    author: regularUsers[1],
    location: mockLocations[1],
    content: "Best pasta in the city! Trust me on this one 🍝",
    media: [
      {
        id: '2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop'
      }
    ],
    timestamp: '2024-01-15T19:15:00Z',
    expiresAt: '2024-01-16T01:15:00Z',
    likes: 89,
    comments: [],
    shares: 23,
    vibedHere: false
  },
  {
    id: '3',
    userId: regularUsers[2].id,
    user: regularUsers[2],
    author: regularUsers[2],
    location: mockLocations[2],
    content: "Epic show tonight! The energy is off the charts! ⚡",
    media: [
      {
        id: '3',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
      },
      {
        id: '4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
      }
    ],
    timestamp: '2024-01-15T21:45:00Z',
    expiresAt: '2024-01-16T03:45:00Z',
    likes: 312,
    comments: [],
    shares: 78,
    vibedHere: true
  },
  {
    id: '4',
    userId: regularUsers[3].id,
    user: regularUsers[3],
    author: regularUsers[3],
    location: mockLocations[3],
    content: "Perfect latte art ☕ This place never disappoints!",
    media: [
      {
        id: '5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop'
      }
    ],
    timestamp: '2024-01-15T08:30:00Z',
    expiresAt: '2024-01-15T14:30:00Z',
    likes: 156,
    comments: [],
    shares: 34,
    vibedHere: false
  },
  {
    id: '5',
    userId: regularUsers[4].id,
    user: regularUsers[4],
    author: regularUsers[4],
    location: mockLocations[4],
    content: "This gallery opening is mind-blowing! 🎨✨",
    media: [
      {
        id: '6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop'
      }
    ],
    timestamp: '2024-01-15T18:00:00Z',
    expiresAt: '2024-01-16T00:00:00Z',
    likes: 203,
    comments: [],
    shares: 67,
    isPinned: true,
    vibedHere: true,
    vibeTags: ['🎭 Artsy', '📸 Aesthetic']
  }
];
