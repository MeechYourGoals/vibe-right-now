
import { mockUsers } from "./users";
import { mockVenues } from "./venues";

// Helper function to get random elements from array
const getRandomElements = (arr: any[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const mockPosts = [
  {
    id: "1",
    user: mockUsers.alex,
    location: mockVenues[0],
    content: "Amazing rooftop experience at this incredible venue! The city views are absolutely breathtaking and the atmosphere is perfect for a night out. 🌃✨",
    media: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop"
      }
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
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=600&fit=crop"
      }
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
      {
        type: "video" as const,
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
      },
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
      }
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
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop"
      }
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
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=600&fit=crop"
      }
    ],
    timestamp: "2024-01-13T23:15:00Z",
    expiresAt: "2024-02-13T23:15:00Z",
    likes: 567,
    comments: 89,
    shares: 45,
    isPinned: true,
    vibeTags: ["dancing", "nightlife", "electric", "amazing"]
  }
];

// Generate additional posts
const userKeys = Object.keys(mockUsers);
for (let i = 6; i <= 50; i++) {
  const randomUserKey = userKeys[Math.floor(Math.random() * userKeys.length)];
  const randomUser = mockUsers[randomUserKey as keyof typeof mockUsers];
  const randomVenue = mockVenues[Math.floor(Math.random() * mockVenues.length)];
  
  mockPosts.push({
    id: i.toString(),
    user: randomUser,
    location: randomVenue,
    content: `Having an amazing time at ${randomVenue.name}! The atmosphere is incredible and the service is top-notch. ${i % 3 === 0 ? '🔥' : i % 3 === 1 ? '✨' : '💫'}`,
    media: [
      {
        type: "image" as const,
        url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&h=600&fit=crop`
      }
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
