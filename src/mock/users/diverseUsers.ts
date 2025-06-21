import { User } from '@/types';

export const diverseUsers: User[] = [
  {
    id: "diverse1",
    username: "maya_explorer",
    name: "Maya Chen",
    email: "maya.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Adventure photographer documenting hidden gems around the world. Always seeking the next perfect shot.",
    verified: false,
    isPrivate: false, // Public profile
    posts: 78,
    followers: 1250,
    following: 456,
    visitedPlaces: [
      "location1", "location8", "location15", "location22", "location5", 
      "location12", "location19", "location3", "location10"
    ],
    wantToVisitPlaces: [
      "location2", "location9", "location16", "location23", "location6", 
      "location13", "location20"
    ],
    followedVenues: [
      "location1", "location8", "location15", "location22", "location5"
    ],
    pinnedPosts: ["post1", "post8", "post15", "post22"],
    createdAt: "2023-02-15T10:30:00Z",
    updatedAt: "2024-12-19T14:45:00Z"
  },
  {
    id: "diverse2",
    username: "carlos_foodie",
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Michelin-starred chef exploring street food cultures. Every meal tells a story worth sharing.",
    verified: true,
    isPrivate: false, // Public profile
    posts: 156,
    followers: 3420,
    following: 234,
    visitedPlaces: [
      "location4", "location11", "location18", "location25", "location7", 
      "location14", "location21", "location2", "location9", "location16"
    ],
    wantToVisitPlaces: [
      "location1", "location6", "location13", "location20", "location3", 
      "location10", "location17"
    ],
    followedVenues: [
      "location4", "location11", "location18", "location25", "location7", 
      "location14"
    ],
    pinnedPosts: ["post4", "post11", "post18", "post25", "post7"],
    createdAt: "2022-11-20T08:15:00Z",
    updatedAt: "2024-12-19T16:20:00Z"
  },
  {
    id: "diverse3",
    username: "zara_nightlife",
    name: "Zara Ahmed",
    email: "zara.ahmed@email.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "DJ and nightlife curator. Finding the best beats in every city from London to Tokyo.",
    verified: true,
    isPrivate: false,
    posts: 203,
    followers: 5670,
    following: 789,
    visitedPlaces: [
      "location6", "location13", "location20", "location1", "location8", 
      "location15", "location22", "location4", "location11"
    ],
    wantToVisitPlaces: [
      "location2", "location9", "location16", "location23", "location5", 
      "location12", "location19"
    ],
    followedVenues: [
      "location6", "location13", "location20", "location1", "location8", 
      "location15", "location22"
    ],
    pinnedPosts: ["post6", "post13", "post20", "post1", "post8"],
    createdAt: "2022-09-10T19:45:00Z",
    updatedAt: "2024-12-19T22:30:00Z"
  },
  {
    id: "diverse4",
    username: "jake_athlete",
    name: "Jake Thompson",
    email: "jake.thompson@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Professional surfer and fitness coach. Chasing waves and positive vibes worldwide.",
    verified: false,
    isPrivate: false,
    posts: 89,
    followers: 2100,
    following: 345,
    visitedPlaces: [
      "location9", "location16", "location23", "location2", "location7", 
      "location14", "location21"
    ],
    wantToVisitPlaces: [
      "location1", "location8", "location15", "location22", "location5", 
      "location12"
    ],
    followedVenues: [
      "location9", "location16", "location23", "location2", "location7"
    ],
    pinnedPosts: ["post9", "post16", "post23", "post2"],
    createdAt: "2023-03-05T12:00:00Z",
    updatedAt: "2024-12-19T09:15:00Z"
  },
  {
    id: "diverse5",
    username: "luna_artist",
    name: "Luna Nakamura",
    email: "luna.nakamura@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Digital artist and gallery curator. Bridging traditional art with modern experiences.",
    verified: false,
    isPrivate: false,
    posts: 67,
    followers: 890,
    following: 567,
    visitedPlaces: [
      "location12", "location19", "location3", "location10", "location17", 
      "location24"
    ],
    wantToVisitPlaces: [
      "location1", "location8", "location15", "location22", "location6", 
      "location13"
    ],
    followedVenues: [
      "location12", "location19", "location3", "location10", "location17"
    ],
    pinnedPosts: ["post12", "post19", "post3", "post10"],
    createdAt: "2023-01-22T15:30:00Z",
    updatedAt: "2024-12-19T11:40:00Z"
  },
  {
    id: "diverse6",
    username: "omar_businessman",
    name: "Omar Hassan",
    email: "omar.hassan@email.com",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Tech entrepreneur and angel investor. Building the future one startup at a time.",
    verified: true,
    isPrivate: false,
    posts: 124,
    followers: 4560,
    following: 123,
    visitedPlaces: [
      "location5", "location11", "location18", "location25", "location8", 
      "location15", "location22"
    ],
    wantToVisitPlaces: [
      "location1", "location4", "location7", "location14", "location21", 
      "location2"
    ],
    followedVenues: [
      "location5", "location11", "location18", "location25", "location8"
    ],
    pinnedPosts: ["post5", "post11", "post18", "post25"],
    createdAt: "2022-08-30T10:20:00Z",
    updatedAt: "2024-12-19T13:55:00Z"
  },
  {
    id: "diverse7",
    username: "sofia_student",
    name: "Sofia Petrov",
    email: "sofia.petrov@email.com",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Architecture student exploring urban design. Finding beauty in city structures and spaces.",
    verified: false,
    isPrivate: false,
    posts: 45,
    followers: 320,
    following: 890,
    visitedPlaces: [
      "location14", "location21", "location6", "location13", "location20"
    ],
    wantToVisitPlaces: [
      "location1", "location8", "location15", "location22", "location3", 
      "location10"
    ],
    followedVenues: [
      "location14", "location21", "location6", "location13"
    ],
    pinnedPosts: ["post14", "post21", "post6"],
    createdAt: "2023-09-15T14:10:00Z",
    updatedAt: "2024-12-19T17:25:00Z"
  },
  {
    id: "diverse8",
    username: "david_musician",
    name: "David Kim",
    email: "david.kim@email.com",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Indie musician and sound engineer. Discovering acoustic gems in intimate venues worldwide.",
    verified: false,
    isPrivate: false,
    posts: 112,
    followers: 1780,
    following: 445,
    visitedPlaces: [
      "location17", "location24", "location7", "location14", "location21", 
      "location4"
    ],
    wantToVisitPlaces: [
      "location1", "location8", "location15", "location22", "location5", 
      "location12"
    ],
    followedVenues: [
      "location17", "location24", "location7", "location14", "location21"
    ],
    pinnedPosts: ["post17", "post24", "post7", "post14"],
    createdAt: "2023-04-12T11:45:00Z",
    updatedAt: "2024-12-19T20:10:00Z"
  }
];
