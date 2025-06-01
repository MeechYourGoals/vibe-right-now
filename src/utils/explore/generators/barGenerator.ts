
import { Post } from '@/types';
import { mockUsers } from '@/mock/users';

export const generateBarPosts = (): Post[] => {
  const user = mockUsers[0];
  
  return [
    {
      id: 'bar-1',
      userId: user.id,
      content: 'Found the perfect speakeasy! Hidden behind a bookshelf, craft cocktails that are pure art. The bartender is a magician! 🍸✨',
      images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500'],
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      likes: 89,
      comments: 23,
      shares: 15,
      user
    },
    {
      id: 'bar-2',
      userId: user.id,
      content: 'Rooftop bar with the best city views! Happy hour until 7pm. The sunset here is absolutely stunning. Perfect for after-work drinks.',
      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'],
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      likes: 134,
      comments: 31,
      shares: 22,
      user
    }
  ];
};
