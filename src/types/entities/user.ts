export interface User {
  id: string;
  username: string;
  name: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  verified?: boolean;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isPrivate?: boolean;
  settings?: UserSettings;
  subscription?: UserSubscription;
  points?: number;
  level?: number;
  badges?: Badge[];
  preferences?: UserPreferences;
  socialLinks?: SocialLinks;
  location?: string;
  website?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  interests?: string[];
  vibesPosted?: number;
  placesVisited?: number;
  checkInsCount?: number;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  darkMode: boolean;
  language: string;
  privacy: 'public' | 'private' | 'followers-only';
}

export interface UserSubscription {
  plan: 'free' | 'basic' | 'premium';
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export interface Badge {
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  interests: string[];
  locationPrivacy: 'public' | 'private';
}

export interface SocialLinks {
  website?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}
