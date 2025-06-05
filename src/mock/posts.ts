import { Post } from "@/types";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Alex Chen",
      username: "alexc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    },
    content: "Just discovered this amazing rooftop bar in downtown! The sunset views are incredible and the cocktails are perfectly crafted. Definitely coming back here soon! 🌅🍸",
    media: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop",
        type: "image",
        alt: "Rooftop bar sunset view"
      }
    ],
    location: {
      id: "1",
      name: "Sky Lounge",
      lat: 40.7589,
      lng: -73.9851,
      city: "New York",
      state: "NY",
      type: "bar"
    },
    timestamp: "2024-01-15T18:30:00Z",
    likes: 42,
    comments: 8,
    shares: 3,
    liked: false,
    saved: false,
    tags: ["rooftop", "cocktails", "sunset"]
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Priya Sharma",
      username: "priya_s",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf02864ca?w=32&h=32&fit=crop&crop=face"
    },
    content: "Spent the afternoon exploring the new art exhibit at the museum. So many thought-provoking pieces! Highly recommend checking it out. 🎨🖼️",
    media: [
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1551721434-849ddc17c143?w=600&h=400&fit=crop",
        type: "image",
        alt: "Art exhibit"
      }
    ],
    location: {
      id: "2",
      name: "City Art Museum",
      lat: 34.0522,
      lng: -118.2437,
      city: "Los Angeles",
      state: "CA",
      type: "attraction"
    },
    timestamp: "2024-01-15T14:00:00Z",
    likes: 67,
    comments: 12,
    shares: 5,
    liked: true,
    saved: true,
    tags: ["art", "museum", "exhibit"]
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Kenji Tanaka",
      username: "kenji_t",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face"
    },
    content: "Great workout session at the new gym! Feeling energized and ready to tackle the week. 💪🏋️‍♂️",
    location: {
      id: "3",
      name: "Fitness First Gym",
      lat: 51.5074,
      lng: 0.1278,
      city: "London",
      type: "sports"
    },
    timestamp: "2024-01-15T10:15:00Z",
    likes: 53,
    comments: 10,
    shares: 2,
    liked: false,
    saved: false,
    tags: ["gym", "workout", "fitness"]
  },
  {
    id: "4",
    user: {
      id: "4",
      name: "Sophie Dubois",
      username: "sophie_d",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a delicious brunch at this cozy cafe. The avocado toast is a must-try! 🥑☕",
    media: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop",
        type: "image",
        alt: "Avocado toast"
      }
    ],
    location: {
      id: "4",
      name: "The Corner Cafe",
      lat: 48.8566,
      lng: 2.3522,
      city: "Paris",
      type: "restaurant"
    },
    timestamp: "2024-01-14T12:45:00Z",
    likes: 78,
    comments: 15,
    shares: 7,
    liked: true,
    saved: true,
    tags: ["brunch", "cafe", "avocado toast"]
  },
  {
    id: "5",
    user: {
      id: "5",
      name: "Carlos Rodriguez",
      username: "carlos_r",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=32&h=32&fit=crop&crop=face"
    },
    content: "Caught an amazing sunset at the beach today. The colors were breathtaking! 🌅🌊",
    media: [
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=600&h=400&fit=crop",
        type: "image",
        alt: "Beach sunset"
      }
    ],
    location: {
      id: "5",
      name: "Santa Monica Beach",
      lat: 34.0083,
      lng: -118.4961,
      city: "Santa Monica",
      state: "CA",
      type: "attraction"
    },
    timestamp: "2024-01-14T19:20:00Z",
    likes: 92,
    comments: 20,
    shares: 10,
    liked: false,
    saved: true,
    tags: ["sunset", "beach", "ocean"]
  },
  {
    id: "6",
    user: {
      id: "6",
      name: "Aisha Khan",
      username: "aisha_k",
      avatar: "https://images.unsplash.com/photo-1595152778345-643229633b2a?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying live music at this vibrant venue. The band is amazing! 🎶🎤",
    location: {
      id: "6",
      name: "The Music Hall",
      lat: 40.7128,
      lng: -74.0060,
      city: "New York",
      type: "event"
    },
    timestamp: "2024-01-13T21:55:00Z",
    likes: 60,
    comments: 11,
    shares: 4,
    liked: true,
    saved: false,
    tags: ["live music", "venue", "band"]
  },
  {
    id: "7",
    user: {
      id: "7",
      name: "Liam O'Connell",
      username: "liam_o",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d674x?w=32&h=32&fit=crop&crop=face"
    },
    content: "Exploring the beautiful hiking trails in the mountains. The views are stunning! ⛰️🌲",
    media: [
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8b00?w=600&h=400&fit=crop",
        type: "image",
        alt: "Mountain hiking trail"
      }
    ],
    location: {
      id: "7",
      name: "Rocky Mountain National Park",
      lat: 40.3428,
      lng: -105.6836,
      city: "Estes Park",
      state: "CO",
      type: "attraction"
    },
    timestamp: "2024-01-13T15:30:00Z",
    likes: 85,
    comments: 18,
    shares: 9,
    liked: false,
    saved: true,
    tags: ["hiking", "mountains", "nature"]
  },
  {
    id: "8",
    user: {
      id: "8",
      name: "Mei Lin",
      username: "mei_l",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0294463c1?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a peaceful evening at this serene park. Perfect for relaxation. 🌳🧘‍♀️",
    location: {
      id: "8",
      name: "Central Park",
      lat: 40.7829,
      lng: -73.9654,
      city: "New York",
      type: "attraction"
    },
    timestamp: "2024-01-12T17:00:00Z",
    likes: 70,
    comments: 13,
    shares: 6,
    liked: true,
    saved: false,
    tags: ["park", "relaxation", "nature"]
  },
  {
    id: "9",
    user: {
      id: "9",
      name: "Raj Patel",
      username: "raj_p",
      avatar: "https://images.unsplash.com/photo-1557862921-378a74b75fc5?w=32&h=32&fit=crop&crop=face"
    },
    content: "Watching a thrilling basketball game at the arena. The atmosphere is electric! 🏀🔥",
    location: {
      id: "9",
      name: "Staples Center",
      lat: 34.0430,
      lng: -118.2673,
      city: "Los Angeles",
      type: "sports"
    },
    timestamp: "2024-01-12T20:45:00Z",
    likes: 88,
    comments: 19,
    shares: 8,
    liked: false,
    saved: true,
    tags: ["basketball", "sports", "arena"]
  },
  {
    id: "10",
    user: {
      id: "10",
      name: "Elena Ramirez",
      username: "elena_r",
      avatar: "https://images.unsplash.com/photo-1618044235564-44a1c81a6a49?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a delicious dinner at this fancy restaurant. The food is exquisite! 🍽️🍷",
    media: [
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
        type: "image",
        alt: "Fine dining restaurant"
      }
    ],
    location: {
      id: "10",
      name: "Le Gourmet Restaurant",
      lat: 48.8647,
      lng: 2.3489,
      city: "Paris",
      type: "restaurant"
    },
    timestamp: "2024-01-11T22:10:00Z",
    likes: 95,
    comments: 22,
    shares: 11,
    liked: true,
    saved: true,
    tags: ["fine dining", "restaurant", "food"]
  },
  {
    id: "11",
    user: {
      id: "11",
      name: "Omar Hassan",
      username: "omar_h",
      avatar: "https://images.unsplash.com/photo-1547425260-76bcbf4f434d?w=32&h=32&fit=crop&crop=face"
    },
    content: "Exploring the historic streets of this charming city. So much to see! 🚶‍♂️🏛️",
    location: {
      id: "11",
      name: "Rome",
      lat: 41.9028,
      lng: 12.4964,
      city: "Rome",
      type: "attraction"
    },
    timestamp: "2024-01-11T14:00:00Z",
    likes: 72,
    comments: 14,
    shares: 5,
    liked: false,
    saved: false,
    tags: ["historic", "city", "travel"]
  },
  {
    id: "12",
    user: {
      id: "12",
      name: "Grace Kim",
      username: "grace_k",
      avatar: "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a relaxing spa day. Feeling refreshed and rejuvenated! 💆‍♀️🌿",
    location: {
      id: "12",
      name: "Serenity Spa",
      lat: 34.0522,
      lng: -118.2437,
      city: "Los Angeles",
      type: "other"
    },
    timestamp: "2024-01-10T16:30:00Z",
    likes: 80,
    comments: 16,
    shares: 7,
    liked: true,
    saved: true,
    tags: ["spa", "relaxation", "self-care"]
  },
  {
    id: "13",
    user: {
      id: "13",
      name: "Ben Williams",
      username: "ben_w",
      avatar: "https://images.unsplash.com/photo-1531427186534-6c19b56e80ce?w=32&h=32&fit=crop&crop=face"
    },
    content: "Watching a captivating theater performance. The actors were incredible! 🎭🎬",
    location: {
      id: "13",
      name: "The Grand Theater",
      lat: 51.5074,
      lng: 0.1278,
      city: "London",
      type: "event"
    },
    timestamp: "2024-01-10T20:00:00Z",
    likes: 85,
    comments: 17,
    shares: 8,
    liked: false,
    saved: true,
    tags: ["theater", "performance", "arts"]
  },
  {
    id: "14",
    user: {
      id: "14",
      name: "Sakura Sato",
      username: "sakura_s",
      avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a traditional tea ceremony. A truly unique experience. 🍵🌸",
    location: {
      id: "14",
      name: "Kyoto Tea House",
      lat: 35.0116,
      lng: 135.7681,
      city: "Kyoto",
      type: "restaurant"
    },
    timestamp: "2024-01-09T15:45:00Z",
    likes: 78,
    comments: 15,
    shares: 6,
    liked: true,
    saved: false,
    tags: ["tea ceremony", "traditional", "culture"]
  },
  {
    id: "15",
    user: {
      id: "15",
      name: "David Lee",
      username: "david_l",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528f3d5a?w=32&h=32&fit=crop&crop=face"
    },
    content: "Exploring the vibrant street art scene. So much creativity! 🎨🏙️",
    location: {
      id: "15",
      name: "Wynwood Walls",
      lat: 25.8014,
      lng: -80.1983,
      city: "Miami",
      type: "attraction"
    },
    timestamp: "2024-01-09T18:20:00Z",
    likes: 90,
    comments: 21,
    shares: 10,
    liked: false,
    saved: true,
    tags: ["street art", "art", "culture"]
  },
  {
    id: "16",
    user: {
      id: "16",
      name: "Isabella Rossi",
      username: "isabella_r",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dca9539?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a scenic bike ride along the coast. The ocean breeze is amazing! 🚴‍♀️🌊",
    media: [
      {
        id: "7",
        url: "https://images.unsplash.com/photo-1560762429-678c9fff3f94?w=600&h=400&fit=crop",
        type: "image",
        alt: "Coastal bike ride"
      }
    ],
    location: {
      id: "16",
      name: "Pacific Coast Highway",
      lat: 34.0083,
      lng: -118.4961,
      city: "Santa Monica",
      type: "attraction"
    },
    timestamp: "2024-01-08T14:50:00Z",
    likes: 82,
    comments: 17,
    shares: 8,
    liked: true,
    saved: true,
    tags: ["bike ride", "coast", "ocean"]
  },
  {
    id: "17",
    user: {
      id: "17",
      name: "Ethan Nguyen",
      username: "ethan_n",
      avatar: "https://images.unsplash.com/photo-1587613865763-bf3b5e651996?w=32&h=32&fit=crop&crop=face"
    },
    content: "Watching a thrilling soccer match at the stadium. The crowd is going wild! ⚽🏟️",
    location: {
      id: "17",
      name: "Allianz Arena",
      lat: 48.2188,
      lng: 11.6247,
      city: "Munich",
      type: "sports"
    },
    timestamp: "2024-01-08T19:30:00Z",
    likes: 88,
    comments: 19,
    shares: 9,
    liked: false,
    saved: false,
    tags: ["soccer", "stadium", "sports"]
  },
  {
    id: "18",
    user: {
      id: "18",
      name: "Chloe Martin",
      username: "chloe_m",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a cozy evening at this charming bookstore. Perfect for book lovers. 📚☕",
    location: {
      id: "18",
      name: "Shakespeare and Company",
      lat: 48.8534,
      lng: 2.3476,
      city: "Paris",
      type: "other"
    },
    timestamp: "2024-01-07T17:15:00Z",
    likes: 75,
    comments: 14,
    shares: 6,
    liked: true,
    saved: true,
    tags: ["bookstore", "books", "cozy"]
  },
  {
    id: "19",
    user: {
      id: "19",
      name: "Javier Garcia",
      username: "javier_g",
      avatar: "https://images.unsplash.com/photo-1534528741702-a0cfae562c9c?w=32&h=32&fit=crop&crop=face"
    },
    content: "Exploring the ancient ruins of this historic site. So much history! 🏛️🌍",
    location: {
      id: "19",
      name: "Machu Picchu",
      lat: -13.1631,
      lng: -72.5450,
      city: "Machu Picchu",
      type: "attraction"
    },
    timestamp: "2024-01-07T12:00:00Z",
    likes: 88,
    comments: 18,
    shares: 9,
    liked: false,
    saved: true,
    tags: ["ancient ruins", "history", "travel"]
  },
  {
    id: "20",
    user: {
      id: "20",
      name: "Olivia Chen",
      username: "olivia_c",
      avatar: "https://images.unsplash.com/photo-1594744803329-e58b31c54f72?w=32&h=32&fit=crop&crop=face"
    },
    content: "Enjoying a relaxing yoga session at this peaceful studio. Feeling centered and calm. 🧘‍♀️🌿",
    location: {
      id: "20",
      name: "Zenith Yoga Studio",
      lat: 34.0522,
      lng: -118.2437,
      city: "Los Angeles",
      type: "other"
    },
    timestamp: "2024-01-06T16:45:00Z",
    likes: 72,
    comments: 13,
    shares: 5,
    liked: true,
    saved: false,
    tags: ["yoga", "relaxation", "wellness"]
  }
];
