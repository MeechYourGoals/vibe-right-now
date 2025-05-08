
import { Post, User, Comment, Location, Media } from '@/types';
import { mockLocations } from '@/mock/data';
import { generateMedia } from '@/utils/generateData';
import { getRecentTime } from '@/mock/time-utils';
import { generateComments } from './CommentService';

const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'traveler_jen',
    email: 'jen@example.com',
    name: 'Jennifer Smith',
    avatar: 'https://source.unsplash.com/random/200x200/?portrait',
    verified: true,
    bio: 'Travel enthusiast and food lover'
  },
  {
    id: 'user2',
    username: 'foodie_mike',
    email: 'mike@example.com', 
    name: 'Mike Johnson',
    avatar: 'https://source.unsplash.com/random/200x200/?man',
    verified: false,
    bio: 'Always looking for the next great meal'
  },
  {
    id: 'user3',
    username: 'adventure_sam',
    email: 'sam@example.com',
    name: 'Samantha Davis',
    avatar: 'https://source.unsplash.com/random/200x200/?woman',
    verified: true,
    bio: 'Adventure seeker and photographer'
  }
];

// Mock posts data
const mockPosts: Post[] = [
  {
    id: '1',
    authorId: 'user1',
    content: 'Just had an amazing dinner at this place! The atmosphere is incredible and the food is to die for. Highly recommend the chef\'s special.',
    locationId: '1',
    timestamp: getRecentTime(2),
    likes: 24,
    comments: 5,
    user: mockUsers[0],
    location: mockLocations[0],
    media: [{ type: 'image', url: 'https://source.unsplash.com/random/600x400/?restaurant' }]
  },
  {
    id: '2',
    authorId: 'user2',
    content: 'Great happy hour deals and the live music here on weekends is fantastic! Make sure to come early to get good seats.',
    locationId: '2',
    timestamp: getRecentTime(5),
    likes: 18,
    comments: 3,
    user: mockUsers[1],
    location: mockLocations[1],
    media: [{ type: 'image', url: 'https://source.unsplash.com/random/600x400/?bar' }]
  },
  {
    id: '3',
    authorId: 'user3',
    content: 'This museum has an amazing new exhibit that just opened today. The interactive displays are great for kids too!',
    locationId: '3',
    timestamp: getRecentTime(8),
    likes: 32,
    comments: 7,
    user: mockUsers[2],
    location: mockLocations[2],
    media: [{ type: 'image', url: 'https://source.unsplash.com/random/600x400/?museum' }]
  }
];

/**
 * Get posts for a specific venue
 */
export const getPostsForVenue = (venueId: string): Post[] => {
  // Find venue posts
  const venuePosts = mockPosts.filter(post => post.locationId === venueId);
  
  // Generate more posts if we don't have enough
  if (venuePosts.length < 5) {
    const venue = mockLocations.find(loc => loc.id === venueId);
    if (!venue) return venuePosts;
    
    const additionalPosts: Post[] = [];
    const needed = 5 - venuePosts.length;
    
    for (let i = 0; i < needed; i++) {
      const userId = `user${(i % 3) + 1}`;
      const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
      
      additionalPosts.push({
        id: `${venueId}-generated-post-${i}`,
        authorId: userId,
        content: getRandomPostContent(venue),
        locationId: venueId,
        timestamp: getRecentTime(Math.floor(Math.random() * 48)),
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 10),
        user: user,
        location: venue,
        media: Math.random() > 0.3 ? generateMedia(venue.type) : []
      });
    }
    
    return [...venuePosts, ...additionalPosts];
  }
  
  return venuePosts;
};

/**
 * Get all posts
 */
export const getAllPosts = (): Post[] => {
  return mockPosts;
};

/**
 * Get random post content based on venue type
 */
const getRandomPostContent = (venue: Location): string => {
  const contents = {
    restaurant: [
      `Amazing food at ${venue.name}! The service was incredible too.`,
      `Just tried ${venue.name} for the first time. Definitely coming back!`,
      `Great atmosphere and delicious food at ${venue.name} in ${venue.city}.`,
      `The chef's special at ${venue.name} is a must-try. So flavorful!`,
      `Had a wonderful dinner at ${venue.name}. Perfect for date night.`
    ],
    bar: [
      `Great vibes at ${venue.name} tonight! The drinks are amazing.`,
      `${venue.name} has the best happy hour deals in ${venue.city}!`,
      `Love the atmosphere at ${venue.name}. Perfect spot to unwind.`,
      `The craft cocktails at ${venue.name} are next level.`,
      `DJ is killing it at ${venue.name} right now! Dance floor is packed.`
    ],
    attraction: [
      `Spending the day at ${venue.name}. Such a beautiful place in ${venue.city}.`,
      `If you're in ${venue.city}, you have to visit ${venue.name}!`,
      `Amazing views from ${venue.name}. Worth every penny.`,
      `The new exhibit at ${venue.name} is fascinating.`,
      `Family day at ${venue.name}. The kids are loving it!`
    ],
    event: [
      `Having a blast at ${venue.name}! The energy is incredible!`,
      `${venue.name} in ${venue.city} is packed tonight! Great turnout.`,
      `This year's ${venue.name} is even better than last year.`,
      `If you're not at ${venue.name} right now, you're missing out!`,
      `The lineup at ${venue.name} is amazing. Best night ever!`
    ],
    sports: [
      `Great game at ${venue.name} today! The crowd is electric.`,
      `Nothing beats the atmosphere at ${venue.name} during a big game.`,
      `Perfect day for sports at ${venue.name} in ${venue.city}.`,
      `The new facilities at ${venue.name} are impressive!`,
      `Cheering on the team at ${venue.name}. Let's go!`
    ]
  };
  
  const venueType = venue.type as keyof typeof contents;
  const contentArray = contents[venueType] || contents.attraction;
  return contentArray[Math.floor(Math.random() * contentArray.length)];
};

export default {
  getPostsForVenue,
  getAllPosts
};
