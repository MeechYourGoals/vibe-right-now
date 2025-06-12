
export interface CityCoordinates {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}

export interface MockUserProfile {
  id: string;
  username: string;
  name: string; // Add name property to match the main MockUserProfile
  avatar: string;
  bio?: string;
  verified: boolean;
}

export const defaultUserProfiles: MockUserProfile[] = [
  {
    id: "user1",
    username: "vibemaster",
    name: "Vibe Master",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Always looking for the next vibe ✨",
    verified: true
  },
  {
    id: "user2",
    username: "cityhopper",
    name: "City Hopper", 
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Exploring one city at a time 🌃",
    verified: false
  },
  {
    id: "user3",
    username: "nightowl",
    name: "Night Owl",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "The night is when the real fun begins 🦉",
    verified: true
  },
  {
    id: "user4",
    username: "foodiefinder",
    name: "Foodie Finder",
    avatar: "https://i.pravatar.cc/150?img=4",
    bio: "Following my stomach to all the best spots 🍽️",
    verified: false
  },
  {
    id: "user5",
    username: "adventuretime",
    name: "Adventure Time",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Life is an adventure, and I'm here for it 🏄‍♂️",
    verified: true
  }
];

// Helper function to get a random user profile
export const getRandomUserProfile = (): MockUserProfile => {
  return defaultUserProfiles[Math.floor(Math.random() * defaultUserProfiles.length)];
};
