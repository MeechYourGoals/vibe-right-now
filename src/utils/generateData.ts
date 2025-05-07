
import { v4 as uuidv4 } from 'uuid';
import { User, Post, Comment, Media } from '@/types';

// Mock users
export const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      id: uuidv4(),
      username: `user${i}`,
      displayName: `User ${i}`,
      avatar: `https://i.pravatar.cc/150?u=${i}`,
      verified: i % 3 === 0,
      following: Math.floor(Math.random() * 1000),
      followers: Math.floor(Math.random() * 5000),
      bio: `This is the bio for user ${i}`,
    });
  }
  
  return users;
};

// Generate mock posts for a location
export const generateMockPosts = (locationId: string, count: number): Post[] => {
  const posts: Post[] = [];
  const users = generateMockUsers(5);
  
  for (let i = 0; i < count; i++) {
    const user = users[i % users.length];
    const likesCount = Math.floor(Math.random() * 1000);
    const commentsCount = Math.floor(Math.random() * 50);
    
    posts.push({
      id: uuidv4(),
      content: `Post ${i + 1} about location ${locationId}. The vibe here is amazing!`,
      user: user,
      location: {
        id: locationId,
        name: `Location ${locationId}`,
        city: 'New York',
        address: '123 Main St'
      },
      media: generateMedia(),
      likesCount,
      commentsCount,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      vibeScore: Math.floor(Math.random() * 100),
    });
  }
  
  return posts;
};

// Generate mock comments for a post
export const generateMockComments = (postId: string, count: number): Comment[] => {
  const comments: Comment[] = [];
  const users = generateMockUsers(10);
  
  for (let i = 0; i < count; i++) {
    const user = users[i % users.length];
    
    comments.push({
      id: uuidv4(),
      content: `This is comment ${i + 1} on post ${postId}`,
      user: user,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      likes: Math.floor(Math.random() * 50),
    });
  }
  
  return comments;
};

// Generate mock media
export const generateMedia = (): Media => {
  const types = ['image', 'video'];
  const type = types[Math.floor(Math.random() * types.length)] as 'image' | 'video';
  
  if (type === 'image') {
    return {
      type: 'image',
      url: `https://source.unsplash.com/random/800x600?sig=${Math.floor(Math.random() * 1000)}`
    };
  } else {
    return {
      type: 'video',
      url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      thumbnailUrl: `https://source.unsplash.com/random/800x600?sig=${Math.floor(Math.random() * 1000)}`
    };
  }
};
