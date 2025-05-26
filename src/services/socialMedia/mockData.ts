
import { SocialMediaPost } from './types';

// Mock data for demonstration with reliable image URLs
export const mockInstagramPosts: SocialMediaPost[] = [
  {
    id: 'ig1',
    content: 'Amazing vibes at this place tonight! 🔥 #nightlife #goodtimes',
    author: 'partygoer123',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    username: 'partygoer123',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'instagram',
    platform: 'instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 127,
    comments: 14,
    originalUrl: 'https://instagram.com/p/AB123'
  },
  {
    id: 'ig2',
    content: 'Best cocktails in the city! 🍹 #cocktails #datenight',
    author: 'cocktail_lover',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    username: 'cocktail_lover',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'instagram',
    platform: 'instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 89,
    comments: 7,
    originalUrl: 'https://instagram.com/p/CD456'
  },
  {
    id: 'ig3',
    content: 'Live music was incredible! 🎵 #livemusic #weekend',
    author: 'music_fan',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    username: 'music_fan',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&auto=format',
    venueName: 'Jazz Club',
    source: 'instagram',
    platform: 'instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 215,
    comments: 23,
    originalUrl: 'https://instagram.com/p/EF789'
  }
];

// Updated mock TikTok posts with reliable video URLs
export const mockTikTokPosts: SocialMediaPost[] = [
  {
    id: 'tt1',
    content: 'Check out this amazing DJ set! 🎧 #nightlife #dj #vibes',
    author: 'club_hopper',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    username: 'club_hopper',
    userAvatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tiktok',
    platform: 'tiktok',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    mediaType: 'video',
    likes: 1243,
    comments: 87,
    originalUrl: 'https://tiktok.com/@club_hopper/video/123456'
  },
  {
    id: 'tt2',
    content: 'This place is PACKED tonight! 🔥 #trending #hotspot',
    author: 'viral_content',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    username: 'viral_content',
    userAvatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tiktok',
    platform: 'tiktok',
    mediaUrl: 'https://www.w3schools.com/html/movie.mp4',
    mediaType: 'video',
    likes: 4592,
    comments: 213,
    originalUrl: 'https://tiktok.com/@viral_content/video/654321'
  }
];

// Updated Yelp reviews with reliable avatar URLs
export const mockYelpReviews: SocialMediaPost[] = [
  {
    id: 'yelp1',
    content: 'Excellent service and amazing food. The atmosphere was perfect for a date night. Would definitely come back!',
    author: 'foodie_explorer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    username: 'foodie_explorer',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'yelp',
    platform: 'yelp',
    rating: 5,
    likes: 8,
    comments: 2,
    originalUrl: 'https://yelp.com/biz/the-rooftop/review/123'
  },
  {
    id: 'yelp2',
    content: 'Great venue but a bit overpriced. The cocktails were good but not worth $18 each. Nice views though!',
    author: 'value_seeker',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    username: 'value_seeker',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'yelp',
    platform: 'yelp',
    rating: 3,
    likes: 4,
    comments: 1,
    originalUrl: 'https://yelp.com/biz/the-rooftop/review/456'
  }
];

// Updated TripAdvisor posts with reliable images
export const mockTripAdvisorPosts: SocialMediaPost[] = [
  {
    id: 'ta1',
    content: 'We visited during our vacation and had an exceptional experience. The staff were attentive and the views were breathtaking. Highly recommend for special occasions!',
    author: 'traveler2023',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    username: 'traveler2023',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tripadvisor',
    platform: 'tripadvisor',
    rating: 5,
    mediaUrl: 'https://images.unsplash.com/photo-1466441523277-1f06163a098d?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 12,
    originalUrl: 'https://tripadvisor.com/ShowUserReviews-g123-d456-r789-The_Rooftop.html'
  },
  {
    id: 'ta2',
    content: 'Food was good but service was slow. We waited almost 30 minutes for our appetizers. Location is beautiful though and worth the visit for the ambiance.',
    author: 'familytravels',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    username: 'familytravels',
    userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tripadvisor',
    platform: 'tripadvisor',
    rating: 3,
    likes: 5,
    originalUrl: 'https://tripadvisor.com/ShowUserReviews-g123-d456-r987-The_Rooftop.html'
  }
];

// Updated Foursquare posts
export const mockFoursquarePosts: SocialMediaPost[] = [
  {
    id: 'fs1',
    content: 'Great spot for after-work drinks! The happy hour specials are a great deal.',
    author: 'cityexplorer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 150).toISOString(),
    username: 'cityexplorer',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'foursquare',
    platform: 'foursquare',
    mediaUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 8,
    originalUrl: 'https://foursquare.com/v/the-rooftop/123456/tip/789'
  }
];

// Updated Google reviews with reliable avatar images
export const mockGoogleReviews: SocialMediaPost[] = [
  {
    id: 'gr1',
    content: 'One of the best rooftop experiences in the city. Parking can be difficult so I recommend using a ride service.',
    author: 'LocalGuide',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 170).toISOString(),
    username: 'LocalGuide',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'google',
    platform: 'google',
    rating: 5,
    likes: 22,
    originalUrl: 'https://g.co/kgs/abcde12'
  },
  {
    id: 'gr2',
    content: 'Beautiful view but the prices are quite steep. The service was excellent though.',
    author: 'JohnD',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 220).toISOString(),
    username: 'JohnD',
    userAvatar: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'google',
    platform: 'google',
    rating: 4,
    likes: 7,
    originalUrl: 'https://g.co/kgs/fghij34'
  }
];

// Other mock posts
export const mockFrankiPosts: SocialMediaPost[] = [
  {
    id: 'fr1',
    content: 'Discovered this hidden gem last weekend! Their signature cocktail is a must-try.',
    author: 'cocktailhunter',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 130).toISOString(),
    username: 'cocktailhunter',
    userAvatar: 'https://images.unsplash.com/photo-1546456073-6712f79251bb?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'franki',
    platform: 'franki',
    mediaUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 45,
    comments: 5,
    originalUrl: 'https://franki.app/venue/the-rooftop/posts/12345'
  }
];

export const mockOtherPosts: SocialMediaPost[] = [
  {
    id: 'ot1',
    content: 'Featured this venue in our "Top 10 Rooftop Spots" article. The sunset views are unmatched!',
    author: 'CityBlogger',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    username: 'CityBlogger',
    userAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'other',
    platform: 'other',
    mediaUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 67,
    originalUrl: 'https://cityblog.com/articles/top-rooftop-spots'
  }
];
