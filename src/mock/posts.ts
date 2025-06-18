
import { Post, Media } from "@/types";
import { mockUsers } from "./users";
import { findLocationById } from "@/data/mockCities";

// Helper function to create media with required id
const createMedia = (type: "image" | "video" | "audio", url: string, thumbnail?: string): Media => ({
  id: Math.random().toString(36).substr(2, 9),
  type,
  url,
  thumbnail
});

// Helper function to create location with fallback
const getLocationWithFallback = (locationId: string) => {
  const location = findLocationById(locationId);
  if (!location) {
    // Return a fallback location if not found
    return {
      id: locationId,
      name: "Unknown Location",
      address: "Unknown Address",
      city: "Unknown City",
      country: "USA",
      lat: 40.7128,
      lng: -74.0060,
      type: "other" as const,
      verified: false
    };
  }
  return location;
};

export const mockPosts: Post[] = [
  {
    id: "1",
    user: mockUsers[0],
    location: getLocationWithFallback("nyc-1"),
    content: "Just discovered this amazing brunch spot! The avocado toast here is next level 🥑✨",
    media: [createMedia("image", "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[1], mockUsers[2], mockUsers[3]],
    comments: 2,
    saved: false
  },
  {
    id: "2",
    user: mockUsers[1],
    location: getLocationWithFallback("la-1"),
    content: "Date night vibes at this incredible Italian place 🍝💕 The ambiance is perfect!",
    media: [
      createMedia("image", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500"),
      createMedia("image", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500")
    ],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[0], mockUsers[4]],
    comments: 2,
    saved: true
  },
  {
    id: "3",
    user: mockUsers[2],
    location: getLocationWithFallback("london-1"),
    content: "Live music night was absolutely incredible! This band knows how to get the crowd going 🎸🔥",
    media: [createMedia("video", "https://example.com/concert-video.mp4")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[5], mockUsers[6]],
    comments: 2,
    saved: false
  },
  {
    id: "4",
    user: mockUsers[3],
    location: getLocationWithFallback("chicago-1"),
    content: "Perfect coffee shop for getting work done. Great WiFi and even better lattes! ☕💻",
    media: [createMedia("image", "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[7], mockUsers[8]],
    comments: 2,
    saved: true
  },
  {
    id: "5",
    user: mockUsers[4],
    location: getLocationWithFallback("miami-1"),
    content: "Taco Tuesday never disappoints here! The flavors are absolutely authentic 🌮🌶️",
    media: [createMedia("image", "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[9], mockUsers[10]],
    comments: 2,
    saved: false
  },
  {
    id: "6",
    user: mockUsers[5],
    location: getLocationWithFallback("sanfrancisco-1"),
    content: "Art gallery meets wine bar - what's not to love? Such a unique concept! 🎨🍷",
    media: [createMedia("image", "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[11], mockUsers[12]],
    comments: 2,
    saved: true
  },
  {
    id: "7",
    user: mockUsers[6],
    location: getLocationWithFallback("paris-1"),
    content: "Rooftop drinks with this view? Absolutely unbeatable! Paris never disappoints 🌅🥂",
    media: [createMedia("image", "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[13], mockUsers[14]],
    comments: 2,
    saved: false
  },
  {
    id: "8",
    user: mockUsers[7],
    location: getLocationWithFallback("tokyo-1"),
    content: "The energy at this club is insane! DJ had everyone dancing until sunrise 💃🎵",
    media: [createMedia("image", "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[15], mockUsers[16]],
    comments: 2,
    saved: true
  },
  {
    id: "9",
    user: mockUsers[8],
    location: getLocationWithFallback("sydney-1"),
    content: "Cozy corner cafe with the best pastries in town. Perfect for a quiet morning ☕🥐",
    media: [createMedia("image", "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[17], mockUsers[18]],
    comments: 2,
    saved: false
  },
  {
    id: "10",
    user: mockUsers[9],
    location: getLocationWithFallback("barcelona-1"),
    content: "Seafood paella by the harbor - doesn't get more authentic than this! 🥘🌊",
    media: [createMedia("image", "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[19], mockUsers[20]],
    comments: 2,
    saved: true
  },
  {
    id: "11",
    user: mockUsers[10],
    location: getLocationWithFallback("nyc-2"),
    content: "Craft beer heaven! So many unique brews to try, I'll be back for sure 🍺🍻",
    media: [createMedia("image", "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[21], mockUsers[0]],
    comments: 2,
    saved: false
  },
  {
    id: "12",
    user: mockUsers[11],
    location: getLocationWithFallback("la-2"),
    content: "Game night at this sports bar was epic! Great atmosphere and even better wings 🏀🍗",
    media: [createMedia("image", "https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=500")],
    timestamp: new Date().toISOString(),
    likes: [mockUsers[1], mockUsers[2]],
    comments: 2,
    saved: true
  }
];
