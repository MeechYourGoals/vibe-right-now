
import { Post } from "@/types";

export const mockPosts: Post[] = [
  {
    id: "1",
    content: "Amazing rooftop views and craft cocktails! The sunset here is absolutely breathtaking. Perfect spot for a date night or catching up with friends. 🌅🍸",
    author: {
      id: "1",
      username: "foodie_sarah",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      isVerified: true,
      followersCount: 2500,
      followingCount: 180,
      postsCount: 245,
      isCelebrity: false
    },
    user: {
      id: "1",
      username: "foodie_sarah",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      isVerified: true,
      followersCount: 2500,
      followingCount: 180,
      postsCount: 245,
      isCelebrity: false
    },
    location: {
      id: "1",
      name: "Sky Lounge",
      address: "123 High Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      latitude: 40.7128,
      longitude: -74.0060,
      lat: 40.7128,
      lng: -74.0060,
      category: "nightlife",
      type: "lounge",
      rating: 4.8,
      reviewCount: 324,
      price: "$$$",
      imageUrl: "/placeholder.svg",
      isFeatured: true,
      verified: true,
      country: "US",
      formattedPhoneNumber: "(555) 123-4567",
      website: "https://skylounge.com",
      reservable: true
    },
    timestamp: "2024-01-15T18:30:00Z",
    media: [
      {
        id: "1",
        type: "image",
        url: "/placeholder.svg"
      }
    ],
    likes: 127,
    comments: [],
    vibedHere: true,
    isLiked: false
  },
  {
    id: "2",
    content: "Best tacos in the city! The al pastor is incredible and the atmosphere is so lively. Definitely coming back here soon! 🌮🔥",
    author: {
      id: "2",
      username: "taco_lover_mike",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg",
      isVerified: false,
      followersCount: 890,
      followingCount: 420,
      postsCount: 156,
      isCelebrity: false
    },
    user: {
      id: "2",
      username: "taco_lover_mike",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg",
      isVerified: false,
      followersCount: 890,
      followingCount: 420,
      postsCount: 156,
      isCelebrity: false
    },
    location: {
      id: "2",
      name: "Taco Libre",
      address: "456 Food Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      latitude: 34.0522,
      longitude: -118.2437,
      lat: 34.0522,
      lng: -118.2437,
      category: "food",
      type: "restaurant",
      rating: 4.6,
      reviewCount: 892,
      price: "$$",
      imageUrl: "/placeholder.svg",
      isFeatured: false,
      verified: true,
      country: "US",
      formattedPhoneNumber: "(555) 987-6543",
      website: "https://tacolibre.com",
      reservable: false
    },
    timestamp: "2024-01-15T19:45:00Z",
    media: [
      {
        id: "2",
        type: "image",
        url: "/placeholder.svg"
      }
    ],
    likes: 89,
    comments: [],
    vibedHere: true,
    isLiked: true
  }
];
