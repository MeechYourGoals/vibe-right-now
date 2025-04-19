
import { User } from "@/types";

export interface MockUserProfile {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
}

export interface LocationHours {
  [day: string]: string;
}

export interface LocationDetails {
  id: string;
  name: string;
  description?: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  phone?: string;
  website?: string;
  hours?: LocationHours;
  ratings?: number;
  reviewCount?: number;
  price?: string;
  tags?: string[];
  vibes?: string[];
  verified: boolean;
  userProfile?: MockUserProfile;
}

// Mock user profiles for locations
const mockUserProfiles: MockUserProfile[] = [
  {
    userId: "loc_user_1",
    username: "localfoodie",
    displayName: "Local Foodie",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    isVerified: true
  },
  {
    userId: "loc_user_2",
    username: "adventureseeker",
    displayName: "Adventure Seeker",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    isVerified: false
  },
  {
    userId: "loc_user_3",
    username: "nightlifeexpert",
    displayName: "Nightlife Expert",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    isVerified: true
  },
  {
    userId: "loc_user_4",
    username: "cityexplorer",
    displayName: "City Explorer",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    isVerified: true
  },
  {
    userId: "loc_user_5",
    username: "hiddengems",
    displayName: "Hidden Gems",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    isVerified: false
  }
];

// Function to get a random user profile for a location
export const getRandomUserProfile = (): MockUserProfile => {
  const randomIndex = Math.floor(Math.random() * mockUserProfiles.length);
  return mockUserProfiles[randomIndex];
};

// Export CityCoordinates interface for backward compatibility
export interface CityCoordinates {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
}
