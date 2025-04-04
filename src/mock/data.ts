
import { Location, Post, User, Comment } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "sarah_vibes",
    name: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    username: "jay_experiences",
    name: "Jay Johnson",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "3",
    username: "adventure_alex",
    name: "Alex Kim",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "4",
    username: "marco_travels",
    name: "Marco Williams",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "5",
    username: "local_explorer",
    name: "Jamie Chen",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "6",
    username: "sports_fan",
    name: "Michael Jones",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "7",
    username: "party_queen",
    name: "Sophie Garcia",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "8",
    username: "world_wanderer",
    name: "David Thompson",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "9",
    username: "ski_enthusiast",
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "10",
    username: "luxury_life",
    name: "James Smith",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "11",
    username: "beach_lover",
    name: "Olivia Brown",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: "12",
    username: "fitness_guru",
    name: "Ryan Davis",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "13",
    username: "rodeo_fan",
    name: "Tyler Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "14",
    username: "travel_addict",
    name: "Lisa Martinez",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: "15",
    username: "coffee_connoisseur",
    name: "Amelia Jackson",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

export const mockLocations: Location[] = [
  {
    id: "1",
    name: "Sunset Lounge",
    address: "123 Beach Drive",
    city: "Miami",
    state: "FL",
    country: "USA",
    lat: 25.761681,
    lng: -80.191788,
    type: "bar",
    verified: true,
  },
  {
    id: "2",
    name: "Artisan Coffee House",
    address: "456 Hipster Avenue",
    city: "Portland",
    state: "OR",
    country: "USA",
    lat: 45.5231,
    lng: -122.6765,
    type: "restaurant",
    verified: true,
  },
  {
    id: "3",
    name: "Summer Music Festival",
    address: "789 Park Lane",
    city: "Austin",
    state: "TX",
    country: "USA",
    lat: 30.2672,
    lng: -97.7431,
    type: "event",
    verified: true,
  },
  {
    id: "4",
    name: "Modern Art Museum",
    address: "101 Culture Street",
    city: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    type: "attraction",
    verified: true,
  },
  {
    id: "5",
    name: "Skyline Rooftop Bar",
    address: "202 High Rise Blvd",
    city: "Chicago",
    state: "IL",
    country: "USA",
    lat: 41.8781,
    lng: -87.6298,
    type: "bar",
    verified: false,
  },
  {
    id: "6",
    name: "Madison Square Garden",
    address: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7505,
    lng: -73.9934,
    type: "event",
    verified: true,
  },
  {
    id: "7",
    name: "Encore Beach Club",
    address: "3131 Las Vegas Blvd S",
    city: "Las Vegas",
    state: "NV",
    country: "USA",
    lat: 36.1285,
    lng: -115.1672,
    type: "bar",
    verified: true,
  },
  {
    id: "8",
    name: "Christ the Redeemer",
    address: "Parque Nacional da Tijuca",
    city: "Rio de Janeiro",
    state: "",
    country: "Brazil",
    lat: -22.9519,
    lng: -43.2106,
    type: "attraction",
    verified: true,
  },
  {
    id: "9",
    name: "Aspen Highlands",
    address: "Aspen Highlands Ski Area",
    city: "Aspen",
    state: "CO",
    country: "USA",
    lat: 39.1729,
    lng: -106.8556,
    type: "attraction",
    verified: true,
  },
  {
    id: "10",
    name: "Allegiant Stadium",
    address: "3333 Al Davis Way",
    city: "Las Vegas",
    state: "NV",
    country: "USA",
    lat: 36.0909,
    lng: -115.1833,
    type: "event",
    verified: true,
  },
  {
    id: "11",
    name: "Mama's Fish House",
    address: "799 Poho Pl",
    city: "Paia",
    state: "HI",
    country: "USA",
    lat: 20.9294,
    lng: -156.3674,
    type: "restaurant",
    verified: true,
  },
  {
    id: "12",
    name: "Barry's Bootcamp Miami Beach",
    address: "1835 Purdy Ave",
    city: "Miami Beach",
    state: "FL",
    country: "USA",
    lat: 25.7903,
    lng: -80.1446,
    type: "other",
    verified: true,
  },
  {
    id: "13",
    name: "Houston Livestock Show and Rodeo",
    address: "NRG Parkway",
    city: "Houston",
    state: "TX",
    country: "USA",
    lat: 29.6849,
    lng: -95.4102,
    type: "event",
    verified: true,
  },
];

// Helper to generate random time in the last few hours
const getRecentTime = (hoursAgo = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Helper to generate expiry time (24 hours after creation)
const getExpiryTime = (creationTime: string) => {
  const date = new Date(creationTime);
  date.setHours(date.getHours() + 24);
  return date.toISOString();
};

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: mockLocations[0],
    content: "The sunset view here is incredible tonight! DJ is playing the best vibes 🎵",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(1),
    expiresAt: getExpiryTime(getRecentTime(1)),
    likes: 42,
    comments: 7,
  },
  {
    id: "2",
    user: mockUsers[1],
    location: mockLocations[1],
    content: "They just put out fresh pastries! Get here quick, there's no line right now.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(2),
    expiresAt: getExpiryTime(getRecentTime(2)),
    likes: 18,
    comments: 3,
  },
  {
    id: "3",
    user: mockUsers[2],
    location: mockLocations[2],
    content: "The headline act is about to start! Crowd is energetic but not too packed yet.",
    media: [
      {
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.5),
    expiresAt: getExpiryTime(getRecentTime(0.5)),
    likes: 104,
    comments: 22,
  },
  {
    id: "4",
    user: mockUsers[3],
    location: mockLocations[3],
    content: "New exhibit just opened! Only a small crowd so far, perfect time to check it out.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(3),
    expiresAt: getExpiryTime(getRecentTime(3)),
    likes: 29,
    comments: 5,
  },
  {
    id: "5",
    user: mockUsers[4],
    location: mockLocations[4],
    content: "Line is around the block tonight! But the view is worth the wait.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519214605650-76a613ee3245?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(1.5),
    expiresAt: getExpiryTime(getRecentTime(1.5)),
    likes: 56,
    comments: 11,
  },
  // New posts with different locations
  {
    id: "6",
    user: mockUsers[5],
    location: mockLocations[5],
    content: "Knicks vs Lakers game is 🔥! Court side seats are insane, can see all the action up close.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 87,
    comments: 14,
  },
  {
    id: "7",
    user: mockUsers[6],
    location: mockLocations[6],
    content: "Pool party is going crazy right now! DJs just switched and the energy is insane 🎉",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 112,
    comments: 19,
  },
  {
    id: "8",
    user: mockUsers[7],
    location: mockLocations[7],
    content: "The view from Christ the Redeemer is breathtaking! Clear skies today, you can see all of Rio!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(1.1),
    expiresAt: getExpiryTime(getRecentTime(1.1)),
    likes: 203,
    comments: 31,
  },
  {
    id: "9",
    user: mockUsers[8],
    location: mockLocations[8],
    content: "Top of the mountain at Aspen Highlands! Fresh powder and no lines for the lift right now.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.4),
    expiresAt: getExpiryTime(getRecentTime(0.4)),
    likes: 91,
    comments: 12,
  },
  {
    id: "10",
    user: mockUsers[9],
    location: mockLocations[9],
    content: "Super Bowl from a field suite! The energy is electric and halftime show setup looks epic.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.1),
    expiresAt: getExpiryTime(getRecentTime(0.1)),
    likes: 256,
    comments: 42,
  },
  {
    id: "11",
    user: mockUsers[10],
    location: mockLocations[10],
    content: "Dinner at Mama's Fish House with the sunset view is perfection. Got the last oceanfront table!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.6),
    expiresAt: getExpiryTime(getRecentTime(0.6)),
    likes: 78,
    comments: 9,
  },
  {
    id: "12",
    user: mockUsers[11],
    location: mockLocations[11],
    content: "Outdoor workout at Barry's today! Special beach class is killing it - spots still open for the 10am.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 64,
    comments: 8,
  },
  {
    id: "13",
    user: mockUsers[12],
    location: mockLocations[12],
    content: "Houston Rodeo is wild tonight! Bull riding competition just started and the crowd is going crazy!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1581568703424-3c83ea1872a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 118,
    comments: 21,
  },
  // Additional posts for the same locations to show multiple people vibing
  {
    id: "14",
    user: mockUsers[13],
    location: mockLocations[1], // Artisan Coffee House
    content: "New seasonal latte just dropped and it's incredible! Lavender honey flavor is perfect.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.4),
    expiresAt: getExpiryTime(getRecentTime(0.4)),
    likes: 42,
    comments: 7,
  },
  {
    id: "15",
    user: mockUsers[14],
    location: mockLocations[1], // Artisan Coffee House
    content: "The back corner by the bookshelf is empty and it's the best spot to work from! Great wifi today.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.7),
    expiresAt: getExpiryTime(getRecentTime(0.7)),
    likes: 35,
    comments: 5,
  },
  {
    id: "16",
    user: mockUsers[0],
    location: mockLocations[7], // Christ the Redeemer
    content: "Made it to the top! The climb was worth it - barely any crowds this early in the morning.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1593411867335-3a098c381d5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.9),
    expiresAt: getExpiryTime(getRecentTime(0.9)),
    likes: 89,
    comments: 12,
  },
  {
    id: "17",
    user: mockUsers[1],
    location: mockLocations[9], // Allegiant Stadium (Super Bowl)
    content: "Pre-game is electric! Teams warming up and the stadium is filling fast. Food lines still short!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1577213331500-c0d706b636a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.15),
    expiresAt: getExpiryTime(getRecentTime(0.15)),
    likes: 125,
    comments: 18,
  },
  {
    id: "18",
    user: mockUsers[2],
    location: mockLocations[9], // Allegiant Stadium (Super Bowl)
    content: "Snack stands on west side have no lines! Get your food now before halftime rush.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1603091888332-b85292bc35bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.2),
    expiresAt: getExpiryTime(getRecentTime(0.2)),
    likes: 72,
    comments: 10,
  },
  {
    id: "19",
    user: mockUsers[3],
    location: mockLocations[9], // Allegiant Stadium (Super Bowl)
    content: "VIP entrance on south side has no wait right now! Regular entrances are packed.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1612214195022-64f68592f674?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.3),
    expiresAt: getExpiryTime(getRecentTime(0.3)),
    likes: 54,
    comments: 8,
  },
  {
    id: "20",
    user: mockUsers[4],
    location: mockLocations[9], // Allegiant Stadium (Super Bowl)
    content: "Celebrity row is filling up! Spotted at least 10 A-listers already in section 112.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ],
    timestamp: getRecentTime(0.25),
    expiresAt: getExpiryTime(getRecentTime(0.25)),
    likes: 198,
    comments: 34,
  },
];

// Generate mock comments
export const mockComments: Comment[] = [
  // Comments for post 1
  {
    id: "c1",
    postId: "1",
    user: mockUsers[5],
    content: "This looks amazing! Is it still busy?",
    timestamp: getRecentTime(0.5),
    vibedHere: false,
  },
  {
    id: "c2",
    postId: "1",
    user: mockUsers[6],
    content: "I'm here right now! DJ just switched and the new set is even better!",
    timestamp: getRecentTime(0.3),
    vibedHere: true,
  },
  {
    id: "c3",
    postId: "1",
    user: mockUsers[7],
    content: "Is there a cover charge?",
    timestamp: getRecentTime(0.7),
    vibedHere: false,
  },
  
  // Comments for post 2
  {
    id: "c4",
    postId: "2",
    user: mockUsers[8],
    content: "I love their pastries! Heading there now, thanks for the tip!",
    timestamp: getRecentTime(1.5),
    vibedHere: false,
  },
  {
    id: "c5",
    postId: "2",
    user: mockUsers[9],
    content: "Just got here - line is now out the door! You started a rush!",
    timestamp: getRecentTime(1.1),
    vibedHere: true,
  },
  
  // Comments for post 6 (Basketball game)
  {
    id: "c6",
    postId: "6",
    user: mockUsers[10],
    content: "What's the score right now? TV broadcast is behind!",
    timestamp: getRecentTime(0.2),
    vibedHere: false,
  },
  {
    id: "c7",
    postId: "6",
    user: mockUsers[11],
    content: "I'm in section 120! The energy is unreal tonight!",
    timestamp: getRecentTime(0.15),
    vibedHere: true,
  },
  {
    id: "c8",
    postId: "6",
    user: mockUsers[12],
    content: "Any food stands with short lines? I'm starving!",
    timestamp: getRecentTime(0.1),
    vibedHere: true,
  },
  
  // Comments for post 10 (Super Bowl)
  {
    id: "c9",
    postId: "10",
    user: mockUsers[13],
    content: "So jealous! Those seats must have cost a fortune!",
    timestamp: getRecentTime(0.05),
    vibedHere: false,
  },
  {
    id: "c10",
    postId: "10",
    user: mockUsers[14],
    content: "I'm in section 230! The atmosphere is electric!",
    timestamp: getRecentTime(0.03),
    vibedHere: true,
  },
  {
    id: "c11",
    postId: "10",
    user: mockUsers[0],
    content: "Can you see any celebrities from where you are?",
    timestamp: getRecentTime(0.02),
    vibedHere: false,
  },
  {
    id: "c12",
    postId: "10",
    user: mockUsers[1],
    content: "South entrance has no security line if anyone's still coming in!",
    timestamp: getRecentTime(0.01),
    vibedHere: true,
  },
];
