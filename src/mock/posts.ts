import { Post } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    content: "Amazing rooftop dinner with incredible city views! The sunset was absolutely perfect 🌅",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 8,
    shares: 3,
    location: mockLocations[0],
    vibeTags: ["Upscale", "Romantic", "Trendy"]
  },
  {
    id: "2",
    user: mockUsers[1],
    content: "Live jazz tonight! The atmosphere here is absolutely electric ⚡️🎵",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 78,
    comments: 15,
    shares: 12,
    location: mockLocations[1],
    vibeTags: ["Lively", "Musical", "Trendy"]
  },
  {
    id: "3",
    user: mockUsers[2],
    content: "Just finished an intense workout session at the new gym 💪 Feeling energized!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517836357463-67f82e50ca0d?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 122,
    comments: 23,
    shares: 5,
    location: mockLocations[2],
    vibeTags: ["Energetic", "Fitness", "Active"]
  },
  {
    id: "4",
    user: mockUsers[3],
    content: "Exploring hidden gems in the city. This cozy cafe is a must-visit ☕️",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1485889398010-6439249fe586?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 95,
    comments: 18,
    shares: 7,
    location: mockLocations[3],
    vibeTags: ["Cozy", "Chill", "Relaxing"]
  },
  {
    id: "5",
    user: mockUsers[4],
    content: "Adrenaline rush at the skate park! 🛹 So many new tricks learned today.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1604185765531-4c5e762ca1d9?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    likes: 155,
    comments: 31,
    shares: 11,
    location: mockLocations[4],
    vibeTags: ["Adventurous", "Energetic", "Active"]
  },
  {
    id: "6",
    user: mockUsers[0],
    content: "Enjoying a quiet evening with a book at this beautiful library 📚",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1507842214779-8d0453ef86f2?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 68,
    comments: 12,
    shares: 4,
    location: mockLocations[5],
    vibeTags: ["Peaceful", "Relaxing", "Cultural"]
  },
  {
    id: "7",
    user: mockUsers[1],
    content: "Great concert last night! The band was on fire 🔥",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1459749411175-04bf5298ceea?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    likes: 110,
    comments: 20,
    shares: 9,
    location: mockLocations[6],
    vibeTags: ["Lively", "Musical", "Energetic"]
  },
  {
    id: "8",
    user: mockUsers[2],
    content: "Exploring the local art scene. This gallery is full of amazing pieces 🎨",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551802234-914ca5989d1a?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    likes: 82,
    comments: 14,
    shares: 6,
    location: mockLocations[7],
    vibeTags: ["Artistic", "Cultural", "Sophisticated"]
  },
  {
    id: "9",
    user: mockUsers[3],
    content: "Delicious brunch at this new spot in town 🥞 Highly recommend!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551782450-a2132b4ba212?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    likes: 135,
    comments: 26,
    shares: 10,
    location: mockLocations[8],
    vibeTags: ["Trendy", "Delicious", "Casual"]
  },
  {
    id: "10",
    user: mockUsers[4],
    content: "Hiking in the mountains. The view from the top was breathtaking ⛰️",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1501785888024-9291476ff2f4?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    likes: 102,
    comments: 19,
    shares: 8,
    location: mockLocations[9],
    vibeTags: ["Adventurous", "Active", "Scenic"]
  },
  {
    id: "11",
    user: mockUsers[0],
    content: "Attended a fascinating lecture at the university 🎓 Learned so much!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1519682337058-a94d51a91e31?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    likes: 75,
    comments: 13,
    shares: 5,
    location: mockLocations[10],
    vibeTags: ["Cultural", "Educational", "Peaceful"]
  },
  {
    id: "12",
    user: mockUsers[1],
    content: "Enjoying a night out with friends at this amazing club 💃",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1541434883093-59e7d29363e3?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 140,
    comments: 28,
    shares: 11,
    location: mockLocations[11],
    vibeTags: ["Lively", "Energetic", "NightOwl"]
  },
  {
    id: "13",
    user: mockUsers[2],
    content: "Visited the local farmers market. So many fresh and organic products 🥕",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1461350548494-37ca29c5601c?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    likes: 90,
    comments: 16,
    shares: 7,
    location: mockLocations[12],
    vibeTags: ["Casual", "Organic", "Local"]
  },
  {
    id: "14",
    user: mockUsers[3],
    content: "Relaxing at the beach. The sound of the waves is so calming 🌊",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    likes: 115,
    comments: 21,
    shares: 9,
    location: mockLocations[13],
    vibeTags: ["Peaceful", "Relaxing", "Scenic"]
  },
  {
    id: "15",
    user: mockUsers[4],
    content: "Trying out a new recipe at home. Cooking is so therapeutic 🍳",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1467002548530-92c6a7e40967?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    likes: 88,
    comments: 15,
    shares: 6,
    location: mockLocations[14],
    vibeTags: ["Cozy", "Casual", "Delicious"]
  },
  {
    id: "16",
    user: mockUsers[0],
    content: "Visited a historical landmark today. So much history and culture 🏛️",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1492691527718-9e39e95e42e4?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    likes: 98,
    comments: 17,
    shares: 8,
    location: mockLocations[15],
    vibeTags: ["Cultural", "Educational", "Scenic"]
  },
  {
    id: "17",
    user: mockUsers[1],
    content: "Enjoying a cup of coffee at this charming cafe ☕️ Perfect way to start the day!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e1a?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 34 * 60 * 60 * 1000).toISOString(),
    likes: 120,
    comments: 22,
    shares: 9,
    location: mockLocations[16],
    vibeTags: ["Cozy", "Chill", "Relaxing"]
  },
  {
    id: "18",
    user: mockUsers[2],
    content: "Attended a local theater performance. The actors were amazing 🎭",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1506919258185-6078bba55d2a?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    likes: 85,
    comments: 14,
    shares: 5,
    location: mockLocations[17],
    vibeTags: ["Cultural", "Artistic", "Lively"]
  },
  {
    id: "19",
    user: mockUsers[3],
    content: "Visited the zoo today. So many amazing animals 🦁",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1543900415-bd41ca41c5d4?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 38 * 60 * 60 * 1000).toISOString(),
    likes: 105,
    comments: 18,
    shares: 7,
    location: mockLocations[18],
    vibeTags: ["Family Friendly", "Educational", "Casual"]
  },
  {
    id: "20",
    user: mockUsers[4],
    content: "Enjoying a picnic in the park. Perfect way to spend a sunny day ☀️",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4aa3eb?w=600&q=80&auto=format&fit=crop"
      }
    ],
    timestamp: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    likes: 130,
    comments: 25,
    shares: 10,
    location: mockLocations[19],
    vibeTags: ["Peaceful", "Relaxing", "Scenic"]
  }
];
