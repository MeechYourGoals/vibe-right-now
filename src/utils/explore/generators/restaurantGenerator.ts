
import { Post } from '@/types';
import { mockUsers } from '@/mock/users';

export const generateRestaurantPosts = (): Post[] => {
  const user = mockUsers[0];
  
  return [
    {
      id: 'restaurant-1',
      userId: user.id,
      content: 'Just had the most incredible farm-to-table experience! Every ingredient tells a story. The chef came out to explain the sourcing. Mind = blown! 🌱👨‍🍳',
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500'],
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      likes: 156,
      comments: 42,
      shares: 28,
      user
    },
    {
      id: 'restaurant-2',
      userId: user.id,
      content: 'Brunch goals achieved! This avocado toast is next level, and don\'t get me started on their house-made everything bagels. Weekend vibes in full effect! 🥑',
      images: ['https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 203,
      comments: 67,
      shares: 45,
      user
    }
  ];
};
