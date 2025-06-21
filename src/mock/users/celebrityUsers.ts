
import { User } from '@/types';

export const celebrityUsers: User[] = [
  {
    id: "celeb1",
    username: "chef_martinez",
    name: "Chef Isabella Martinez",
    email: "isabella.martinez@email.com",
    avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "James Beard Award winner. Sharing my culinary adventures and hidden gems around the world.",
    verified: true,
    isPrivate: true, // Only this profile should be private
    posts: 127,
    followers: 15420,
    following: 89,
    visitedPlaces: [
      "location1", "location2", "location3", "location4", "location5", 
      "location6", "location7", "location8", "location9", "location10",
      "location11", "location12", "location13", "location14", "location15"
    ],
    wantToVisitPlaces: [
      "location16", "location17", "location18", "location19", "location20", 
      "location21", "location22", "location23", "location24", "location25"
    ],
    followedVenues: [
      "location1", "location2", "location3", "location4", "location5", 
      "location6", "location7", "location8", "location9", "location10"
    ],
    pinnedPosts: ["post1", "post3", "post5", "post7", "post9", "post11", "post13"],
    createdAt: "2022-08-15T10:00:00Z",
    updatedAt: "2024-12-19T16:45:00Z"
  },
  {
    id: "celeb2",
    username: "travel_jackson",
    name: "Marcus Jackson",
    email: "marcus.jackson@email.com", 
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Travel influencer with 2M followers. Discovering amazing places and authentic experiences worldwide.",
    verified: true,
    isPrivate: false, // Public profile
    posts: 234,
    followers: 2000000,
    following: 156,
    visitedPlaces: [
      "location2", "location4", "location6", "location8", "location10", 
      "location12", "location14", "location16", "location18", "location20",
      "location22", "location24"
    ],
    wantToVisitPlaces: [
      "location1", "location3", "location5", "location7", "location9", 
      "location11", "location13", "location15", "location17", "location19"
    ],
    followedVenues: [
      "location2", "location4", "location6", "location8", "location10", 
      "location12", "location14", "location16"
    ],
    pinnedPosts: ["post2", "post4", "post6", "post8", "post10", "post12", "post14", "post16"],
    createdAt: "2022-06-20T09:30:00Z",
    updatedAt: "2024-12-19T19:15:00Z"
  },
  {
    id: "celeb3",
    username: "dj_soundwave",
    name: "DJ Soundwave",
    email: "dj.soundwave@email.com",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", 
    bio: "Electronic music producer and DJ. Scouting the best nightlife scenes and underground venues worldwide.",
    verified: true,
    isPrivate: false, // Public profile
    posts: 89,
    followers: 456789,
    following: 234,
    visitedPlaces: [
      "location5", "location10", "location15", "location20", "location25", 
      "location1", "location6", "location11", "location16", "location21"
    ],
    wantToVisitPlaces: [
      "location3", "location8", "location13", "location18", "location23", 
      "location2", "location7", "location12"
    ],
    followedVenues: [
      "location5", "location10", "location15", "location20", "location25", 
      "location1", "location6"
    ],
    pinnedPosts: ["post5", "post10", "post15", "post20", "post25"],
    createdAt: "2022-11-10T20:15:00Z",
    updatedAt: "2024-12-18T23:30:00Z"
  },
  {
    id: "celeb4",
    username: "fitness_guru_sam",
    name: "Sam Fitness",
    email: "sam.fitness@email.com",
    avatar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Certified personal trainer and wellness coach. Finding the best healthy spots and fitness venues in every city.",
    verified: true,
    isPrivate: false, // Public profile
    posts: 156,
    followers: 123456,
    following: 67,
    visitedPlaces: [
      "location7", "location14", "location21", "location4", "location11", 
      "location18", "location25", "location2", "location9"
    ],
    wantToVisitPlaces: [
      "location1", "location8", "location15", "location22", "location5", 
      "location12", "location19"
    ],
    followedVenues: [
      "location7", "location14", "location21", "location4", "location11", 
      "location18"
    ],
    pinnedPosts: ["post7", "post14", "post21", "post4", "post11"],
    createdAt: "2022-09-25T07:00:00Z",
    updatedAt: "2024-12-19T06:20:00Z"
  },
  {
    id: "celeb5",
    username: "artist_elena",
    name: "Elena Rodriguez",
    email: "elena.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Contemporary artist and creative director. Curating inspiring spaces and cultural experiences in galleries worldwide.",
    verified: true,
    isPrivate: false, // Public profile
    posts: 98,
    followers: 78910,
    following: 145,
    visitedPlaces: [
      "location3", "location9", "location15", "location21", "location6", 
      "location12", "location18", "location24"
    ],
    wantToVisitPlaces: [
      "location1", "location7", "location13", "location19", "location25", 
      "location4", "location10"
    ],
    followedVenues: [
      "location3", "location9", "location15", "location21", "location6", 
      "location12"
    ],
    pinnedPosts: ["post3", "post9", "post15", "post21", "post6"],
    createdAt: "2022-07-12T14:45:00Z", 
    updatedAt: "2024-12-19T11:10:00Z"
  }
];
