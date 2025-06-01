
import { Post } from '@/types';
import { mockUsers } from '@/mock/users';

export const generateSportsPosts = (): Post[] => {
  const user = mockUsers[0];
  
  return [
    {
      id: 'sports-1',
      userId: user.id,
      content: 'Game night at the sports bar! The energy here is electric. Big screens everywhere, cold beers, and the crowd is going wild! ⚽🍺',
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500'],
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      likes: 98,
      comments: 27,
      shares: 19,
      user
    },
    {
      id: 'sports-2',
      userId: user.id,
      content: 'Bowling night with the crew! Nothing beats the classic fun of strikes, spares, and lots of laughter. Old school entertainment at its finest! 🎳',
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500'],
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      likes: 76,
      comments: 18,
      shares: 11,
      user
    }
  ];
};
