
import { User } from '@/types';

export const regularUsers: User[] = [
  {
    id: "user1",
    username: "sarah_thompson",
    name: "Sarah Thompson",
    email: "sarah.thompson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b93c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Coffee enthusiast and digital nomad. Always searching for the perfect espresso.",
    verified: false,
    posts: 45,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-12-19T15:30:00Z"
  },
  {
    id: "user2", 
    username: "mike_rodriguez",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Food blogger exploring local gems. Weekend warrior and taco lover.",
    verified: false,
    posts: 23,
    createdAt: "2023-03-22T14:20:00Z",
    updatedAt: "2024-12-18T09:45:00Z"
  },
  {
    id: "user3",
    username: "jenny_park", 
    name: "Jenny Park",
    email: "jenny.park@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Photographer capturing city vibes. Love finding hidden spots for the perfect shot.",
    verified: false,
    posts: 67,
    createdAt: "2023-02-10T11:15:00Z",
    updatedAt: "2024-12-19T18:20:00Z"
  },
  {
    id: "user4",
    username: "alex_chen",
    name: "Alex Chen", 
    email: "alex.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Tech startup founder. Always looking for great co-working spots with good wifi.",
    verified: false,
    posts: 34,
    createdAt: "2023-04-05T16:30:00Z",
    updatedAt: "2024-12-17T12:10:00Z"
  },
  {
    id: "user5",
    username: "lisa_wang",
    name: "Lisa Wang",
    email: "lisa.wang@email.com", 
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    bio: "Marketing professional and brunch enthusiast. Exploring the city one meal at a time.",
    verified: false,
    posts: 52,
    createdAt: "2023-05-18T13:45:00Z",
    updatedAt: "2024-12-19T08:30:00Z"
  }
];
