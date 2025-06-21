
import { User } from '@/types';

export const regularUsers: User[] = [
  {
    id: "user1",
    username: "sarah_thompson",
    name: "Sarah Thompson",
    email: "sarah.thompson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b93c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Coffee enthusiast and digital nomad. Always searching for the perfect espresso and cozy workspaces.",
    verified: false,
    posts: 45,
    followers: 287,
    following: 156,
    visitedPlaces: [
      "location1", "location3", "location5", "location7", "location9", 
      "location11", "location13", "location15"
    ],
    wantToVisitPlaces: [
      "location2", "location4", "location6", "location8", "location10", 
      "location12", "location14"
    ],
    followedVenues: [
      "location1", "location3", "location5", "location7", "location9"
    ],
    pinnedPosts: ["post1", "post5", "post9"],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-12-19T15:30:00Z"
  },
  {
    id: "user2", 
    username: "mike_rodriguez",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Food blogger exploring local gems. Weekend warrior and taco connoisseur documenting the best eats.",
    verified: false,
    posts: 67,
    followers: 432,
    following: 189,
    visitedPlaces: [
      "location2", "location4", "location6", "location8", "location10", 
      "location12", "location14", "location16", "location18"
    ],
    wantToVisitPlaces: [
      "location1", "location3", "location5", "location9", "location11", 
      "location17", "location19"
    ],
    followedVenues: [
      "location2", "location4", "location6", "location8", "location10", 
      "location12"
    ],
    pinnedPosts: ["post2", "post6", "post10", "post14"],
    createdAt: "2023-03-22T14:20:00Z",
    updatedAt: "2024-12-18T09:45:00Z"
  },
  {
    id: "user3",
    username: "jenny_park", 
    name: "Jenny Park",
    email: "jenny.park@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Photographer capturing city vibes. Love finding hidden spots for the perfect shot and aesthetic moments.",
    verified: false,
    posts: 89,
    followers: 623,
    following: 234,
    visitedPlaces: [
      "location1", "location5", "location9", "location13", "location17", 
      "location21", "location25"
    ],
    wantToVisitPlaces: [
      "location3", "location7", "location11", "location15", "location19", 
      "location23"
    ],
    followedVenues: [
      "location1", "location5", "location9", "location13", "location17"
    ],
    pinnedPosts: ["post3", "post7", "post11", "post15", "post19"],
    createdAt: "2023-02-10T11:15:00Z",
    updatedAt: "2024-12-19T18:20:00Z"
  },
  {
    id: "user4",
    username: "alex_chen",
    name: "Alex Chen", 
    email: "alex.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Tech startup founder. Always looking for great co-working spots with good wifi and innovative atmospheres.",
    verified: false,
    posts: 34,
    followers: 198,
    following: 87,
    visitedPlaces: [
      "location4", "location8", "location12", "location16", "location20"
    ],
    wantToVisitPlaces: [
      "location2", "location6", "location10", "location14", "location18", 
      "location22"
    ],
    followedVenues: [
      "location4", "location8", "location12", "location16"
    ],
    pinnedPosts: ["post4", "post8", "post12"],
    createdAt: "2023-04-05T16:30:00Z",
    updatedAt: "2024-12-17T12:10:00Z"
  },
  {
    id: "user5",
    username: "lisa_wang",
    name: "Lisa Wang",
    email: "lisa.wang@email.com", 
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Marketing professional and brunch enthusiast. Exploring the city one meal at a time, documenting every bite.",
    verified: false,
    posts: 52,
    followers: 356,
    following: 142,
    visitedPlaces: [
      "location3", "location7", "location11", "location15", "location19", 
      "location23"
    ],
    wantToVisitPlaces: [
      "location1", "location5", "location9", "location13", "location17", 
      "location21"
    ],
    followedVenues: [
      "location3", "location7", "location11", "location15", "location19"
    ],
    pinnedPosts: ["post5", "post9", "post13", "post17"],
    createdAt: "2023-05-18T13:45:00Z",
    updatedAt: "2024-12-19T08:30:00Z"
  }
];
