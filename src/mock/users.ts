
// Mock user data for the application
export interface MockUserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  type?: 'regular' | 'celebrity' | 'venue';
  verified?: boolean;
  followers?: number;
  following?: number;
  posts?: number;
  isCelebrity?: boolean;
  isPrivate?: boolean;
}

// Utility function to hash strings for consistent user selection
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Generate user bio based on type
export const generateUserBio = (type?: string): string => {
  const bios = {
    celebrity: [
      "Living my best life ✨",
      "Blessed and grateful 🙏",
      "Always on the move 🌟",
      "Creating memories everywhere I go",
      "Life is a beautiful journey"
    ],
    venue: [
      "The hottest spot in town 🔥",
      "Where good vibes meet great times",
      "Your new favorite hangout",
      "Creating unforgettable experiences",
      "Where the party never stops"
    ],
    regular: [
      "Just vibing through life",
      "Exploring the city one spot at a time",
      "Living for the weekend",
      "Always down for good food and vibes",
      "Making memories with friends"
    ]
  };
  
  const categoryBios = bios[type as keyof typeof bios] || bios.regular;
  return categoryBios[Math.floor(Math.random() * categoryBios.length)];
};

// Mock user profiles
const mockUsers: MockUserProfile[] = [
  {
    id: "1",
    username: "sarah_vibes",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Food blogger & vibe curator ✨",
    type: "regular",
    verified: false,
    followers: 1250,
    following: 890,
    posts: 156
  },
  {
    id: "2", 
    username: "marcus_nights",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Nightlife enthusiast | DJ | Event planner",
    type: "regular",
    verified: false,
    followers: 2100,
    following: 450,
    posts: 89
  },
  {
    id: "3",
    username: "bella_eats",
    name: "Bella Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Always hungry for new experiences 🍴",
    type: "regular",
    verified: false,
    followers: 890,
    following: 1200,
    posts: 203
  },
  {
    id: "4",
    username: "alex_adventures",
    name: "Alex Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Adventure seeker | Photographer | Coffee addict",
    type: "regular",
    verified: false,
    followers: 1560,
    following: 780,
    posts: 127
  },
  {
    id: "5",
    username: "miami_heat_official",
    name: "Miami Heat",
    avatar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=150&h=150&fit=crop&crop=center",
    bio: "Official Miami Heat account 🏀🔥",
    type: "celebrity",
    verified: true,
    followers: 2500000,
    following: 100,
    posts: 1250,
    isCelebrity: true
  },
  {
    id: "6",
    username: "ocean_drive_miami",
    name: "Ocean Drive Restaurant",
    avatar: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&h=150&fit=crop&crop=center",
    bio: "Fresh seafood with ocean views 🌊",
    type: "venue",
    verified: true,
    followers: 15600,
    following: 50,
    posts: 340
  },
  {
    id: "7",
    username: "the_rooftop_bar",
    name: "The Rooftop",
    avatar: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=150&h=150&fit=crop&crop=center",
    bio: "Sky-high cocktails & city views ✨",
    type: "venue",
    verified: true,
    followers: 8900,
    following: 25,
    posts: 178
  },
  {
    id: "8",
    username: "dj_carlos_miami",
    name: "DJ Carlos",
    avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
    bio: "Spinning beats across Miami 🎧",
    type: "celebrity",
    verified: true,
    followers: 125000,
    following: 200,
    posts: 567,
    isCelebrity: true
  }
];

// Function to get a user by ID
export const getUserById = (id: string): MockUserProfile | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Function to get a random user
export const getRandomUser = (): MockUserProfile => {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)];
};

// Function to get multiple random users
export const getRandomUsers = (count: number): MockUserProfile[] => {
  const shuffled = [...mockUsers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, mockUsers.length));
};

// Function to get a user based on a string hash (for consistent user assignment)
export const getUserByHash = (str: string): MockUserProfile => {
  const hash = hashString(str);
  const index = hash % mockUsers.length;
  return mockUsers[index];
};

export default mockUsers;
