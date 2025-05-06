
import { User } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Array of mock user data
const mockUsers: User[] = [
  {
    id: "user1",
    name: "Sarah Johnson",
    username: "sarah_vibes",
    email: "sarah@example.com",
    image: "https://i.pravatar.cc/150?img=1",
    bio: "Exploring the best spots in every city ✨",
    verified: true
  },
  {
    id: "user2",
    name: "Michael Chen",
    username: "michael_c",
    email: "michael@example.com",
    image: "https://i.pravatar.cc/150?img=2",
    bio: "Foodie and nightlife enthusiast",
    verified: false
  },
  {
    id: "user3",
    name: "Jessica Williams",
    username: "jess_travels",
    email: "jessica@example.com",
    image: "https://i.pravatar.cc/150?img=3",
    bio: "Taking you to the best spots in town",
    verified: true
  },
  {
    id: "user4",
    name: "David Rodriguez",
    username: "david_r",
    email: "david@example.com",
    image: "https://i.pravatar.cc/150?img=4",
    bio: "Sports fan and craft beer lover",
    verified: false
  },
  {
    id: "user5",
    name: "Emma Thompson",
    username: "emma_t",
    email: "emma@example.com",
    image: "https://i.pravatar.cc/150?img=5",
    bio: "Finding the best venues and sharing my experiences",
    verified: true
  }
];

// Function to generate a random mock user
export const generateMockUserData = (): User => {
  const randomIndex = Math.floor(Math.random() * mockUsers.length);
  return mockUsers[randomIndex];
};

// Function to generate a specific number of mock users
export const generateMockUsers = (count: number = 5): User[] => {
  if (count <= mockUsers.length) {
    return mockUsers.slice(0, count);
  }
  
  const additionalUsers: User[] = [];
  
  for (let i = 0; i < count - mockUsers.length; i++) {
    additionalUsers.push({
      id: uuidv4(),
      name: `User ${mockUsers.length + i + 1}`,
      username: `user_${mockUsers.length + i + 1}`,
      email: `user${mockUsers.length + i + 1}@example.com`,
      image: `https://i.pravatar.cc/150?img=${(mockUsers.length + i + 1) % 70}`,
      bio: "Vibe enthusiast",
      verified: Math.random() > 0.7
    });
  }
  
  return [...mockUsers, ...additionalUsers];
};

// Function to get a specific mock user by ID
export const getMockUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Function to get a specific mock user by username
export const getMockUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username);
};
