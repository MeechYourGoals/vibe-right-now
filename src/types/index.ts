
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  verified?: boolean; // For backward compatibility
  isCelebrity?: boolean;
  followers: number;
  following: number;
  posts: number;
  location?: string;
  website?: string;
  joinDate: string;
  isPrivate?: boolean;
  stripeCustomerId?: string;
  subscriptionStatus?: string;
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
  socialMediaLinks?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  interests?: string[];
  savedLocations?: string[];
  reviews?: Review[];
  eventsAttending?: EventItem[];
  paymentMethods?: CreditCard[];
  settings?: {
    notificationsEnabled: boolean;
    darkMode: boolean;
    language: string;
  };
  lastActive?: string;
  isOnline?: boolean;
  unreadMessages?: number;
  profileViews?: number;
  searchHistory?: string[];
  blockedUsers?: string[];
  isBusinessAccount?: boolean;
  businessDetails?: {
    businessName: string;
    businessCategory: string;
    businessDescription: string;
    businessWebsite?: string;
    businessEmail: string;
    businessPhone?: string;
    businessAddress: string;
  };
  vrnCredits?: number;
  vrnSubscriptionStatus?: string;
  vrnSubscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
  vrnSubscriptionExpiry?: string;
  vrnSubscriptionAutoRenew?: boolean;
  vrnSubscriptionPaymentMethod?: string;
  vrnSubscriptionNextPaymentDate?: string;
  vrnSubscriptionLastPaymentDate?: string;
  vrnSubscriptionLastPaymentAmount?: number;
  vrnSubscriptionLastPaymentStatus?: string;
  vrnSubscriptionLastPaymentError?: string;
  vrnSubscriptionLastPaymentErrorDescription?: string;
  vrnSubscriptionLastPaymentErrorTimestamp?: string;
  vrnSubscriptionLastPaymentErrorType?: string;
  vrnSubscriptionLastPaymentErrorSubType?: string;
  vrnSubscriptionLastPaymentErrorReason?: string;
  vrnSubscriptionLastPaymentErrorReasonDescription?: string;
  vrnSubscriptionLastPaymentErrorReasonTimestamp?: string;
}

export interface Post {
  id: string;
  userId: string;
  user?: MockUserProfile; // Add user property
  content: string;
  media?: Media[];
  timestamp: string;
  likes: number;
  comments: Comment[];
  location?: Location;
  tags?: string[];
  vibeTags?: string[]; // Add vibeTags property
  saved?: boolean;
  expiresAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: MockUserProfile;
  content: string;
  text: string;
  timestamp: string;
  vibedHere: boolean;
  likes: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip?: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  lat?: number; // Add for backward compatibility
  lng?: number; // Add for backward compatibility
  type: string;
  category?: string;
  rating: number;
  verified: boolean;
  description?: string;
  hours?: BusinessHours;
  phone?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  images?: string[];
  amenities?: string[];
  priceRange?: string;
  tags?: string[];
  vibes?: string[]; // Add vibes property
  userProfile?: any;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  price?: string;
  description?: string;
  image?: string;
  category: string;
  tags?: string[];
}

export interface MockUserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  verified?: boolean; // For backward compatibility
  isCelebrity?: boolean;
  followers: number;
  following: number;
  posts: number;
  location?: string;
  website?: string;
  joinDate: string;
  isPrivate?: boolean;
}

export interface CreditCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Media {
  id?: string;
  url: string;
  type: 'image' | 'video';
  altText?: string;
}

export interface Review {
  id: string;
  userId: string;
  locationId: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface BusinessHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadMessages?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface AnalyticsData {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  averageTimeSpent: number;
  bounceRate: number;
  conversionRate: number;
}

export interface ReferralData {
  source: string;
  visitors: number;
  conversionRate: number;
  revenue: number;
}

export interface CampaignData {
  campaignName: string;
  clicks: number;
  impressions: number;
  ctr: number;
  cost: number;
  revenue: number;
  roi: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in progress' | 'completed' | 'on hold';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignedTo: string;
  comments: Comment[];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  dateGenerated: string;
  generatedBy: string;
  sections: ReportSection[];
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  order: number;
}
