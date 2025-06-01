
import { Comment } from '@/types';

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: 'user1',
    content: 'Great vibes at this place! Love the atmosphere.',
    timestamp: '2024-01-15T10:30:00Z',
    likes: 5,
    user: {
      id: 'user1',
      username: 'vibeseeker',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  },
  {
    id: '2',
    postId: '1',
    userId: 'user2',
    content: 'The drinks were amazing! Definitely coming back.',
    timestamp: '2024-01-15T11:15:00Z',
    likes: 8,
    user: {
      id: 'user2',
      username: 'cocktaillover',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    }
  },
  {
    id: '3',
    postId: '2',
    userId: 'user3',
    content: 'Perfect spot for a date night!',
    timestamp: '2024-01-15T14:20:00Z',
    likes: 12,
    user: {
      id: 'user3',
      username: 'romanticvibes',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    }
  }
];

export const getCommentsForPost = (postId: string): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId);
};
