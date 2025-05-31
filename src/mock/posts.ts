import { Post, Location, User } from "@/types";
import { MockUserProfile, mockUsers } from "./users";
import { mockVenues } from "./venues";

// Helper function to get random elements from array
const getRandomElements = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers.alex,
    location: mockVenues[0],
    content: "Amazing rooftop experience at this incredible venue! The city views are absolutely breathtaking and the atmosphere is perfect for a night out. 🌃✨",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-15T18:30:00Z",
    expiresAt: "2024-02-15T18:30:00Z",
    likes: 234,
    comments: 45,
    shares: 12,
    isPinned: true,
    vibeTags: ["rooftop", "nightlife", "cityviews", "amazing"]
  },
  {
    id: "2",
    user: mockUsers.sarah,
    location: mockVenues[1],
    content: "Best brunch spot in the city! The avocado toast here is next level and the coffee is perfectly crafted. Highly recommend! ☕🥑",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-15T11:15:00Z",
    expiresAt: "2024-02-15T11:15:00Z",
    likes: 189,
    comments: 23,
    shares: 8
  },
  {
    id: "3",
    user: mockUsers.mike,
    location: mockVenues[2],
    content: "Live music night was absolutely incredible! The acoustics in this venue are perfect and the energy was off the charts. 🎵🔥",
    media: [
      { type: "video", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
      { type: "image", url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-14T21:45:00Z",
    expiresAt: "2024-02-14T21:45:00Z",
    likes: 456,
    comments: 78,
    shares: 34
  },
  {
    id: "4",
    user: mockUsers.emma,
    location: mockVenues[3],
    content: "Stunning views and amazing cocktails! This place never disappoints. Perfect for date night or catching up with friends. 🍸💫",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-14T19:20:00Z",
    expiresAt: "2024-02-14T19:20:00Z",
    likes: 312,
    comments: 56,
    shares: 19
  },
  {
    id: "5",
    user: mockUsers.alex,
    location: mockVenues[4],
    content: "The energy here tonight is absolutely electric! Dance floor is packed and the DJ is killing it. This is what nightlife should be! 🕺💃",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-13T23:15:00Z",
    expiresAt: "2024-02-13T23:15:00Z",
    likes: 567,
    comments: 89,
    shares: 45,
    isPinned: true,
    vibeTags: ["dancing", "nightlife", "electric", "amazing"]
  },
  {
    id: "6",
    user: mockUsers.olivia,
    location: mockVenues[5],
    content: "Just tried the new menu at this restaurant and it was phenomenal! Every dish was a work of art. 🍽️🎨",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1467002618319-a7b58371c0a4?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-13T17:50:00Z",
    expiresAt: "2024-02-13T17:50:00Z",
    likes: 420,
    comments: 67,
    shares: 23
  },
  {
    id: "7",
    user: mockUsers.liam,
    location: mockVenues[6],
    content: "Spent the afternoon exploring this hidden gem. The architecture is stunning and the history is fascinating. 🏛️📜",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1507038372066-159c986268a0?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-12T14:25:00Z",
    expiresAt: "2024-02-12T14:25:00Z",
    likes: 289,
    comments: 34,
    shares: 11
  },
  {
    id: "8",
    user: mockUsers.sophia,
    location: mockVenues[7],
    content: "This sports bar is the perfect place to catch a game. Great atmosphere and even better company! 🍻🏈",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-153271293e8a1-63bb4f8b04f1?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-12T20:00:00Z",
    expiresAt: "2024-02-12T20:00:00Z",
    likes: 345,
    comments: 56,
    shares: 18
  },
  {
    id: "9",
    user: mockUsers.noah,
    location: mockVenues[8],
    content: "Had an unforgettable night at this event. The music, the crowd, everything was perfect! 🎉🎶",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-11T22:30:00Z",
    expiresAt: "2024-02-11T22:30:00Z",
    likes: 489,
    comments: 78,
    shares: 27
  },
  {
    id: "10",
    user: mockUsers.isabella,
    location: mockVenues[9],
    content: "This attraction is a must-see for anyone visiting the city. The views are incredible and the experience is unforgettable. 🏞️📸",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop" }
    ],
    timestamp: "2024-01-11T15:05:00Z",
    expiresAt: "2024-02-11T15:05:00Z",
    likes: 367,
    comments: 45,
    shares: 14
  }
];

// Generate additional posts
for (let i = 6; i <= 50; i++) {
  const randomUser = mockUsers[Object.keys(mockUsers)[Math.floor(Math.random() * Object.keys(mockUsers).length)] as keyof typeof mockUsers];
  const randomVenue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
  
  mockPosts.push({
    id: i.toString(),
    user: randomUser,
    location: randomVenue,
    content: `Having an amazing time at ${randomVenue.name}! The atmosphere is incredible and the service is top-notch. ${i % 3 === 0 ? '🔥' : i % 3 === 1 ? '✨' : '💫'}`,
    media: [
      { type: "image", url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&h=600&fit=crop` }
    ],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    shares: Math.floor(Math.random() * 50) + 5,
    ...(i % 5 === 0 && { 
      isPinned: true,
      vibeTags: getRandomElements(["amazing", "vibes", "perfect", "incredible", "love"], 2)
    })
  });
}
