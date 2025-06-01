
import { Post } from '@/types';
import { mockUsers } from '@/mock/users';

export const generateAttractionPosts = (): Post[] => {
  const user = mockUsers[0];
  
  return [
    {
      id: 'attraction-1',
      userId: user.id,
      content: 'Amazing art installation at the downtown gallery! The interactive exhibits are mind-blowing. Perfect spot for a creative afternoon. #ArtLovers #Gallery',
      images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 45,
      comments: 8,
      shares: 12,
      user
    },
    {
      id: 'attraction-2',
      userId: user.id,
      content: 'The botanical gardens are in full bloom! Spring has definitely arrived. Taking a peaceful walk through nature in the heart of the city.',
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 67,
      comments: 15,
      shares: 8,
      user
    }
  ];
};
