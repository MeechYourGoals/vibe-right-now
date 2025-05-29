
export interface MockUser {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  joinedDate: string;
  location?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}

export const mockUsers: MockUser[] = [
  {
    id: "user1",
    username: "john_doe",
    displayName: "John Doe",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Food enthusiast and adventure seeker",
    followersCount: 1250,
    followingCount: 380,
    isVerified: true,
    isPrivate: false,
    joinedDate: "2023-01-15",
    location: "Los Angeles, CA"
  },
  {
    id: "user2", 
    username: "jane_smith",
    displayName: "Jane Smith",
    profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Travel blogger and photographer",
    followersCount: 850,
    followingCount: 290,
    isVerified: false,
    isPrivate: false,
    joinedDate: "2023-02-20",
    location: "New York, NY"
  }
];

export const getMockUserProfile = (userId: string): MockUser | null => {
  return mockUsers.find(user => user.id === userId) || null;
};
