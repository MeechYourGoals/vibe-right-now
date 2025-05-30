
import { SocialMediaPost } from './types';

// Mock data for demonstration
export const mockInstagramPosts: SocialMediaPost[] = [
  {
    id: 'ig1',
    content: 'Amazing vibes at this place tonight! 🔥 #nightlife #goodtimes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    username: 'partygoer123',
    userAvatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 127,
    comments: 14,
    originalUrl: 'https://instagram.com/p/AB123'
  },
  {
    id: 'ig2',
    content: 'Best cocktails in the city! 🍹 #cocktails #datenight',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    username: 'cocktail_lover',
    userAvatar: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 89,
    comments: 7,
    originalUrl: 'https://instagram.com/p/CD456'
  },
  {
    id: 'ig3',
    content: 'Live music was incredible! 🎵 #livemusic #weekend',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    username: 'music_fan',
    userAvatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop&auto=format',
    venueName: 'Jazz Club',
    source: 'instagram',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 215,
    comments: 23,
    originalUrl: 'https://instagram.com/p/EF789'
  }
];

export const mockTikTokPosts: SocialMediaPost[] = [
  {
    id: 'tt1',
    content: 'Check out this amazing DJ set! 🎧 #nightlife #dj #vibes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    username: 'club_hopper',
    userAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tiktok',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-dancing-in-a-nightclub-5881-large.mp4',
    mediaType: 'video',
    likes: 1243,
    comments: 87,
    originalUrl: 'https://tiktok.com/@club_hopper/video/123456'
  },
  {
    id: 'tt2',
    content: 'This place is PACKED tonight! 🔥 #trending #hotspot',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    username: 'viral_content',
    userAvatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tiktok',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-in-a-club-with-disco-lights-4717-large.mp4',
    mediaType: 'video',
    likes: 4592,
    comments: 213,
    originalUrl: 'https://tiktok.com/@viral_content/video/654321'
  }
];

export const mockYelpReviews: SocialMediaPost[] = [
  {
    id: 'yelp1',
    content: 'Excellent service and amazing food. The atmosphere was perfect for a date night. Would definitely come back!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    username: 'foodie_explorer',
    userAvatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'yelp',
    rating: 5,
    likes: 8,
    comments: 2,
    originalUrl: 'https://yelp.com/biz/the-rooftop/review/123'
  },
  {
    id: 'yelp2',
    content: 'Great venue but a bit overpriced. The cocktails were good but not worth $18 each. Nice views though!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    username: 'value_seeker',
    userAvatar: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'yelp',
    rating: 3,
    likes: 4,
    comments: 1,
    originalUrl: 'https://yelp.com/biz/the-rooftop/review/456'
  }
];

export const mockTripAdvisorPosts: SocialMediaPost[] = [
  {
    id: 'ta1',
    content: 'We visited during our vacation and had an exceptional experience. The staff were attentive and the views were breathtaking. Highly recommend for special occasions!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    username: 'traveler2023',
    userAvatar: 'https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tripadvisor',
    rating: 5,
    mediaUrl: 'https://images.unsplash.com/photo-1466441523277-1f06163a098d?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 12,
    originalUrl: 'https://tripadvisor.com/ShowUserReviews-g123-d456-r789-The_Rooftop.html'
  },
  {
    id: 'ta2',
    content: 'Food was good but service was slow. We waited almost 30 minutes for our appetizers. Location is beautiful though and worth the visit for the ambiance.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    username: 'familytravels',
    userAvatar: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'tripadvisor',
    rating: 3,
    likes: 5,
    originalUrl: 'https://tripadvisor.com/ShowUserReviews-g123-d456-r987-The_Rooftop.html'
  }
];

export const mockFoursquarePosts: SocialMediaPost[] = [
  {
    id: 'fs1',
    content: 'Great spot for after-work drinks! The happy hour specials are a great deal.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 150).toISOString(),
    username: 'cityexplorer',
    userAvatar: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'foursquare',
    mediaUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 8,
    originalUrl: 'https://foursquare.com/v/the-rooftop/123456/tip/789'
  }
];

export const mockGoogleReviews: SocialMediaPost[] = [
  {
    id: 'gr1',
    content: 'One of the best rooftop experiences in the city. Parking can be difficult so I recommend using a ride service.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 170).toISOString(),
    username: 'LocalGuide',
    userAvatar: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'google',
    rating: 5,
    likes: 22,
    originalUrl: 'https://g.co/kgs/abcde12'
  },
  {
    id: 'gr2',
    content: 'Beautiful view but the prices are quite steep. The service was excellent though.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 220).toISOString(),
    username: 'JohnD',
    userAvatar: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'google',
    rating: 4,
    likes: 7,
    originalUrl: 'https://g.co/kgs/fghij34'
  }
];

export const mockFrankiPosts: SocialMediaPost[] = [
  {
    id: 'fr1',
    content: 'Discovered this hidden gem last weekend! Their signature cocktail is a must-try.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 130).toISOString(),
    username: 'cocktailhunter',
    userAvatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'franki',
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
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    username: 'CityBlogger',
    userAvatar: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100&h=100&fit=crop&auto=format',
    venueName: 'The Rooftop',
    source: 'other',
    mediaUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=80&auto=format&fit=crop',
    mediaType: 'image',
    likes: 67,
    originalUrl: 'https://cityblog.com/articles/top-rooftop-spots'
  }
];
