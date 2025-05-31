import { Post } from '@/types';
import { mockUsers } from './users';
import { mockLocations } from './locations';

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    location: mockLocations[0],
    content: "Just discovered this amazing rooftop bar! The sunset views are absolutely incredible. Perfect spot for date night 🌅✨",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 47,
    vibes: 23,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '2',
    user: mockUsers[1],
    location: mockLocations[1],
    content: "Can't get enough of this cozy cafe! Their latte art is on point, and the vibes are immaculate. ☕🎨",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551024709-64363a86490b?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1551024709-64363a86490b?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 123,
    vibes: 89,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '3',
    user: mockUsers[2],
    location: mockLocations[2],
    content: "Caught an amazing jazz performance at this hidden gem last night. The music, the ambiance—everything was perfect! 🎶🎷",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1543791187-dfcb190138c8?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1543791187-dfcb190138c8?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 67,
    vibes: 42,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '4',
    user: mockUsers[3],
    location: mockLocations[3],
    content: "This new art gallery is a must-visit! So many thought-provoking pieces and a great atmosphere. 🖼️🎨",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555863252-99775849259b?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1555863252-99775849259b?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 95,
    vibes: 58,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '5',
    user: mockUsers[4],
    location: mockLocations[4],
    content: "Had an amazing time hiking this trail! The views were breathtaking, and the company was even better. 🏞️🥾",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504196638698-441876468e2c?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1504196638698-441876468e2c?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    likes: 142,
    vibes: 112,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '6',
    user: mockUsers[5],
    location: mockLocations[5],
    content: "This new brunch spot is a game-changer! The avocado toast is a must-try, and the mimosas are endless. 🥑🥂",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba212?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba212?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    likes: 88,
    vibes: 63,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '7',
    user: mockUsers[6],
    location: mockLocations[6],
    content: "Spent the day exploring this beautiful park. The flowers were in full bloom, and the scenery was breathtaking. 🌸🌳",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1440778204384-7ca74e37ff1b?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1440778204384-7ca74e37ff1b?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 112,
    vibes: 79,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '8',
    user: mockUsers[7],
    location: mockLocations[7],
    content: "This new speakeasy is a hidden gem! The cocktails are creative, and the atmosphere is mysterious. 🍸🤫",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1543007318-407bb5487554?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1543007318-407bb5487554?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    likes: 76,
    vibes: 51,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '9',
    user: mockUsers[8],
    location: mockLocations[8],
    content: "Had a blast at this outdoor concert! The music was great, and the crowd was even better. 🎶🎤",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1494791018817-9f83e9455b52?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1494791018817-9f83e9455b52?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    likes: 132,
    vibes: 98,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '10',
    user: mockUsers[9],
    location: mockLocations[9],
    content: "This new rooftop pool is the perfect place to cool off on a hot day! The views are amazing, and the drinks are even better. ☀️🍹",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519046904884-53e3c7069327?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1519046904884-53e3c7069327?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    likes: 101,
    vibes: 72,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '11',
    user: mockUsers[0],
    location: mockLocations[10],
    content: "Just tried the new tasting menu at this restaurant and it was an incredible experience! Each course was a work of art. 🍽️🍷",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    likes: 155,
    vibes: 120,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '12',
    user: mockUsers[1],
    location: mockLocations[11],
    content: "This vintage clothing store is a treasure trove! Found so many unique pieces that I can't wait to wear. 👗💎",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1547966254-856630d35375?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1547966254-856630d35375?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(),
    likes: 92,
    vibes: 68,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '13',
    user: mockUsers[2],
    location: mockLocations[12],
    content: "Spent the afternoon at this beautiful botanical garden. The flowers were stunning, and the air was so fresh. 🌸🌿",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563019794-9987927ca697?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1563019794-9987927ca697?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    likes: 128,
    vibes: 94,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '14',
    user: mockUsers[3],
    location: mockLocations[13],
    content: "This new coffee shop is a must-visit for all coffee lovers! The beans are roasted in-house, and the baristas are experts. ☕👨‍🍳",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1495474472285-6d0f0419f8ee?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1495474472285-6d0f0419f8ee?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(),
    likes: 79,
    vibes: 55,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '15',
    user: mockUsers[4],
    location: mockLocations[14],
    content: "Had an amazing time at this comedy show! The comedians were hilarious, and the crowd was great. 😂🎤",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 56 * 60 * 60 * 1000).toISOString(),
    likes: 148,
    vibes: 115,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '16',
    user: mockUsers[5],
    location: mockLocations[15],
    content: "This new spa is the perfect place to relax and rejuvenate! The massages are amazing, and the atmosphere is so peaceful. 💆‍♀️🌿",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544161520-0609498705e7?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1544161520-0609498705e7?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
    likes: 85,
    vibes: 60,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '17',
    user: mockUsers[6],
    location: mockLocations[16],
    content: "Spent the day at this beautiful beach. The sand was soft, and the water was crystal clear. 🏖️🌊",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1493558103817-58b292439c47?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1493558103817-58b292439c47?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 64 * 60 * 60 * 1000).toISOString(),
    likes: 118,
    vibes: 85,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '18',
    user: mockUsers[7],
    location: mockLocations[17],
    content: "This new brewery is a must-visit for all beer lovers! The brews are unique, and the atmosphere is lively. 🍺🍻",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1560786121-0ba649296349?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1560786121-0ba649296349?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 68 * 60 * 60 * 1000).toISOString(),
    likes: 73,
    vibes: 48,
    vibedHere: false,
    comments: [],
    saved: false
  },
  {
    id: '19',
    user: mockUsers[8],
    location: mockLocations[18],
    content: "Had a great time at this music festival! The bands were amazing, and the energy was electric. 🎶🎸",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1464295444759-5a394d9753ca?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1464295444759-5a394d9753ca?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    likes: 138,
    vibes: 105,
    vibedHere: true,
    comments: [],
    saved: false
  },
  {
    id: '20',
    user: mockUsers[9],
    location: mockLocations[19],
    content: "This new ice cream shop is a must-visit for all dessert lovers! The flavors are unique, and the ice cream is creamy. 🍦🍨",
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555008742-6f4dffca5a97?w=800&h=600&fit=crop&crop=entropy&auto=format',
        thumbnail: 'https://images.unsplash.com/photo-1555008742-6f4dffca5a97?w=400&h=300&fit=crop&crop=entropy&auto=format'
      }
    ],
    timestamp: new Date(Date.now() - 76 * 60 * 60 * 1000).toISOString(),
    likes: 98,
    vibes: 70,
    vibedHere: false,
    comments: [],
    saved: false
  }
];
