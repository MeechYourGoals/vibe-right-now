import { Post } from "@/types";
import { mockUsers } from "./users";
import { mockLocations } from "./locations";

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: mockLocations[0],
    content: "Just had the most amazing burger at this place! The atmosphere is incredible and the staff is so friendly. Definitely coming back! 🍔✨",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?burger,food"
      }
    ],
    timestamp: "2024-01-15T18:30:00Z",
    expiresAt: "2024-01-16T06:00:00Z",
    likes: 42,
    comments: 8,
    shares: 5,
    isPinned: true,
    saved: false,
    vibeTags: ["foodie", "burger", "amazing"]
  },
  {
    id: "2",
    user: mockUsers[1],
    location: mockLocations[1],
    content: "Coffee art game is strong here! ☕️ Perfect spot for a morning pick-me-up before work. The baristas really know their craft.",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?coffee,latte"
      }
    ],
    timestamp: "2024-01-15T09:15:00Z",
    expiresAt: "2024-01-15T21:00:00Z",
    likes: 28,
    comments: 4,
    shares: 2,
    saved: false
  },
  {
    id: "3",
    user: mockUsers[2],
    location: mockLocations[2],
    content: "Live music night was absolutely phenomenal! The energy in this place is unmatched. Check out this amazing performance! 🎵🔥",
    media: [
      {
        type: "video",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?concert,music"
      }
    ],
    timestamp: "2024-01-14T22:45:00Z",
    expiresAt: "2024-01-15T10:00:00Z",
    likes: 156,
    comments: 23,
    shares: 18,
    saved: false
  },
  {
    id: "4",
    user: mockUsers[3],
    location: mockLocations[3],
    content: "Sunset views from the rooftop are breathtaking! Perfect date night spot. The cocktails are as beautiful as the view 🌅🍸",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?sunset,rooftop"
      }
    ],
    timestamp: "2024-01-14T19:20:00Z",
    expiresAt: "2024-01-15T07:00:00Z",
    likes: 89,
    comments: 15,
    shares: 12,
    saved: false
  },
  {
    id: "5",
    user: mockUsers[4],
    location: mockLocations[4],
    content: "This hidden speakeasy is absolutely incredible! The craft cocktails here are works of art. Password today is 'moonlight' 🌙🍸",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?cocktail,speakeasy"
      }
    ],
    timestamp: "2024-01-14T20:30:00Z",
    expiresAt: "2024-01-15T04:00:00Z",
    likes: 67,
    comments: 11,
    shares: 8,
    isPinned: true,
    saved: false,
    vibeTags: ["speakeasy", "cocktails", "hidden"]
  },
  {
    id: "6",
    user: mockUsers[5],
    location: mockLocations[5],
    content: "Fresh sushi and an amazing atmosphere! The chef's special roll is to die for. Highly recommend for any sushi lovers! 🍣",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?sushi,japanese"
      }
    ],
    timestamp: "2024-01-14T18:45:00Z",
    expiresAt: "2024-01-15T08:00:00Z",
    likes: 93,
    comments: 19,
    shares: 7,
    saved: false
  },
  {
    id: "7",
    user: mockUsers[6],
    location: mockLocations[6],
    content: "Brunch goals achieved! The avocado toast here is legendary and the mimosas are flowing. Perfect weekend vibes! 🥑🥂",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?brunch,avocado"
      }
    ],
    timestamp: "2024-01-14T11:30:00Z",
    expiresAt: "2024-01-14T23:00:00Z",
    likes: 74,
    comments: 12,
    shares: 6,
    saved: false
  },
  {
    id: "8",
    user: mockUsers[7],
    location: mockLocations[7],
    content: "Pizza night done right! The wood-fired oven makes all the difference. Margherita is perfection on a plate! 🍕",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?pizza,woodfired"
      }
    ],
    timestamp: "2024-01-13T19:15:00Z",
    expiresAt: "2024-01-14T07:00:00Z",
    likes: 118,
    comments: 21,
    shares: 15,
    saved: false
  },
  {
    id: "9",
    user: mockUsers[8],
    location: mockLocations[8],
    content: "Workout complete! This gym has everything you need and the energy is incredible. New PR on deadlifts today! 💪",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?gym,fitness"
      }
    ],
    timestamp: "2024-01-13T17:00:00Z",
    expiresAt: "2024-01-14T05:00:00Z",
    likes: 45,
    comments: 7,
    shares: 3,
    saved: false
  },
  {
    id: "10",
    user: mockUsers[9],
    location: mockLocations[9],
    content: "Bookstore cafe vibes are unmatched! Found some amazing reads and the coffee is perfect for a long reading session ☕📚",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?bookstore,coffee"
      }
    ],
    timestamp: "2024-01-13T14:20:00Z",
    expiresAt: "2024-01-14T02:00:00Z",
    likes: 56,
    comments: 9,
    shares: 4,
    isPinned: true,
    saved: false,
    vibeTags: ["books", "coffee", "reading"]
  },
  {
    id: "11",
    user: mockUsers[0],
    location: mockLocations[0],
    content: "Late night dessert run! The chocolate lava cake here is absolutely divine. Perfect way to end the evening! 🍫",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?dessert,chocolate"
      }
    ],
    timestamp: "2024-01-12T21:30:00Z",
    expiresAt: "2024-01-13T09:00:00Z",
    likes: 82,
    comments: 14,
    shares: 6,
    saved: false
  },
  {
    id: "12",
    user: mockUsers[1],
    location: mockLocations[1],
    content: "Morning yoga session complete! This studio has the most peaceful atmosphere and amazing instructors. Namaste! 🧘‍♀️",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?yoga,meditation"
      }
    ],
    timestamp: "2024-01-12T08:45:00Z",
    expiresAt: "2024-01-12T20:00:00Z",
    likes: 39,
    comments: 6,
    shares: 2,
    saved: false
  },
  {
    id: "13",
    user: mockUsers[2],
    location: mockLocations[2],
    content: "Trivia night champions! Our team dominated tonight. The atmosphere here is always fun and competitive! 🏆",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?trivia,celebration"
      }
    ],
    timestamp: "2024-01-11T22:15:00Z",
    expiresAt: "2024-01-12T10:00:00Z",
    likes: 97,
    comments: 18,
    shares: 9,
    saved: false
  },
  {
    id: "14",
    user: mockUsers[3],
    location: mockLocations[3],
    content: "Wine tasting experience was incredible! Learned so much about different varieties. The sommelier here is fantastic! 🍷",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?wine,tasting"
      }
    ],
    timestamp: "2024-01-11T18:00:00Z",
    expiresAt: "2024-01-12T06:00:00Z",
    likes: 64,
    comments: 11,
    shares: 5,
    saved: false
  },
  {
    id: "15",
    user: mockUsers[4],
    location: mockLocations[4],
    content: "Art gallery opening was mind-blowing! The local artists showcased here are incredibly talented. So inspiring! 🎨",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?art,gallery"
      }
    ],
    timestamp: "2024-01-11T19:30:00Z",
    expiresAt: "2024-01-12T07:00:00Z",
    likes: 76,
    comments: 13,
    shares: 8,
    saved: false
  },
  {
    id: "16",
    user: mockUsers[5],
    location: mockLocations[5],
    content: "Farmers market haul! Fresh produce and artisanal goods. Supporting local businesses feels so good! 🥕🍅",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?farmers,market"
      }
    ],
    timestamp: "2024-01-11T10:15:00Z",
    expiresAt: "2024-01-11T22:00:00Z",
    likes: 52,
    comments: 8,
    shares: 4,
    saved: false
  },
  {
    id: "17",
    user: mockUsers[6],
    location: mockLocations[6],
    content: "Beach volleyball tournament was epic! The competition was fierce but the vibes were amazing. Can't wait for next week! 🏐",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?beach,volleyball"
      }
    ],
    timestamp: "2024-01-10T16:45:00Z",
    expiresAt: "2024-01-11T04:00:00Z",
    likes: 89,
    comments: 16,
    shares: 11,
    saved: false
  },
  {
    id: "18",
    user: mockUsers[7],
    location: mockLocations[7],
    content: "Craft beer flight was amazing! Each brew had such unique flavors. The brewmaster really knows their craft! 🍺",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?craft,beer"
      }
    ],
    timestamp: "2024-01-10T20:00:00Z",
    expiresAt: "2024-01-11T08:00:00Z",
    likes: 71,
    comments: 12,
    shares: 7,
    saved: false
  },
  {
    id: "19",
    user: mockUsers[8],
    location: {
      id: "19",
      name: "Downtown Music Festival",
      address: "Main Street Plaza",
      city: "Los Angeles",
      state: "California",
      country: "United States",
      zip: "90012",
      lat: 34.0549,
      lng: -118.2426,
      type: "event",
      verified: true
    },
    content: "Music festival vibes are unreal! Three stages, incredible lineup, and the energy is off the charts! 🎵🎉",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?music,festival"
      }
    ],
    timestamp: "2024-01-10T15:30:00Z",
    expiresAt: "2024-01-11T03:00:00Z",
    likes: 234,
    comments: 45,
    shares: 32,
    saved: false,
    vibeTags: ["festival", "music", "live"]
  },
  {
    id: "20",
    user: mockUsers[9],
    location: mockLocations[9],
    content: "Cooking class was so much fun! Learned to make authentic pasta from scratch. The chef was incredibly patient and knowledgeable! 🍝",
    media: [
      {
        type: "image",
        url: "https://source.unsplash.com/800x600/?cooking,pasta"
      }
    ],
    timestamp: "2024-01-09T17:15:00Z",
    expiresAt: "2024-01-10T05:00:00Z",
    likes: 58,
    comments: 10,
    shares: 5,
    saved: false
  }
];
