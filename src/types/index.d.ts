declare module '@/types' {
  export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio?: string;
    followers?: number;
    following?: number;
    posts?: number;
    website?: string;
    verified?: boolean;
    points?: number;
    role?: 'user' | 'business' | 'admin';
    memberSince?: string;
    tier?: 'free' | 'pro' | 'enterprise';
    preferences?: UserPreferences;
  }

  export interface UserPreferences {
    categories?: string[];
    vibes?: string[];
    favorites?: string[];
    notifications?: NotificationPreferences;
    privacy?: PrivacySettings;
  }

  export interface NotificationPreferences {
    push?: boolean;
    email?: boolean;
    sms?: boolean;
    marketing?: boolean;
    comments?: boolean;
    likes?: boolean;
    mentions?: boolean;
    newFollowers?: boolean;
    venueUpdates?: boolean;
  }

  export interface PrivacySettings {
    profileVisibility?: 'public' | 'followers' | 'private';
    locationSharing?: boolean;
    activityStatus?: boolean;
    showVibes?: boolean;
  }

  export interface Location {
    id: string;
    name: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    lat?: number;
    lng?: number;
    image?: string;
    images?: string[];
    rating?: number;
    reviews?: number;
    price?: string;
    phone?: string;
    website?: string;
    hours?: BusinessHours;
    features?: string[];
    categories?: string[];
    type?: string;
    tags?: string[];
    verified?: boolean;
    trending?: boolean;
    distance?: number;
    events?: Event[];
    discount?: Discount;
    vibeScore?: number;
    vibeCounts?: VibeCounts;
    crowdLevel?: string;
    userProfile?: any;
  }

  export interface VibeCounts {
    cozy?: number;
    lively?: number;
    romantic?: number;
    energetic?: number;
    chill?: number;
    upscale?: number;
    casual?: number;
    friendly?: number;
    intimate?: number;
    crowded?: number;
  }

  export interface Event {
    id: string;
    name: string;
    description?: string;
    date?: string;
    time?: string;
    image?: string;
    price?: string;
    ticketLink?: string;
    locationId?: string;
    categories?: string[];
    tags?: string[];
  }

  export interface BusinessHours {
    monday?: DayHours;
    tuesday?: DayHours;
    wednesday?: DayHours;
    thursday?: DayHours;
    friday?: DayHours;
    saturday?: DayHours;
    sunday?: DayHours;
  }

  export interface DayHours {
    open: string;
    close: string;
    isClosed?: boolean;
  }

  export interface Discount {
    id: string;
    title: string;
    description: string;
    code?: string;
    amount: string;
    expiryDate?: string;
    terms?: string;
    redemptionCount?: number;
    maxRedemptions?: number;
  }

  export interface Post {
    id: string;
    user: User;
    location?: Location;
    content: string;
    media?: string[];
    likes: number;
    comments: Comment[];
    timestamp: string;
    vibes?: string[];
    tags?: string[];
    checkin?: boolean;
  }

  export interface Comment {
    id: string;
    user: User;
    content: string;
    timestamp: string;
    likes?: number;
    replies?: Comment[];
  }

  export interface VenueInsights {
    id: string;
    name: string;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    visitorCount: number;
    checkInCount: number;
    receiptUploads: number;
    discountRedemptions: number;
    totalViews: number;
    visitorChart: {
      labels: string[];
      data: number[];
    };
    engagementChart: {
      labels: string[];
      data: {
        comments: number[];
        likes: number[];
        shares: number[];
      };
    };
    demographics: {
      age: {
        labels: string[];
        data: number[];
      };
      gender: {
        labels: string[];
        data: number[];
      };
      location: {
        labels: string[];
        data: number[];
      };
    };
    revenueData: {
      labels: string[];
      data: number[];
    };
  }

  export interface ChatState {
    messages: Array<{
      id: string;
      role: 'user' | 'assistant' | 'system';
      content: string;
      timestamp: string;
    }>;
    loading: boolean;
  }
}
