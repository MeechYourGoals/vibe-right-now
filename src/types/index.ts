
export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
  coverPhoto?: string;
  followers?: number;
  following?: number;
  isVerified?: boolean;
  joinedDate?: string;
  location?: string;
  vibeTags?: string[];
  isCelebrity?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  lat?: number;
  lng?: number;
  type?: string;
  rating?: number;
  priceLevel?: number;
  openNow?: boolean;
  images?: string[];
  logo?: string;
  description?: string;
  website?: string;
  phone?: string;
  hours?: Record<string, string>;
  tags?: string[];
  vibeTags?: string[];
  verified?: boolean;
  country?: string;
  vibes?: string[];
  url?: string;
}

export interface EventItem extends Omit<Location, 'openNow' | 'hours'> {
  date?: string;
  startTime?: string;
  endTime?: string;
  performers?: string[];
  ticketPrice?: string;
  ticketUrl?: string;
  category?: string;
  venueName?: string;
  title?: string;
  time?: string;
  venue?: string;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  userId?: string;
  postId: string;
  content: string;
  timestamp: string;
  user?: User;
  likes?: number;
  replies?: Comment[];
  text?: string;
  vibedHere?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  locationId?: string;
  content: string;
  media?: Media[] | string[];
  timestamp: string;
  likes: number;
  comments: number | Comment[];
  user?: User;
  location?: Location;
  vibeTags?: string[];
  isVenuePost?: boolean;
  isPinned?: boolean;
  expiresAt?: string;
}

export interface SavedPlace {
  id: string;
  locationId: string;
  userId: string;
  savedAt: string;
  notes?: string;
  visitedAt?: string;
  rating?: number;
  status: 'visited' | 'want_to_visit';
  location?: Location;
}

export interface VenueInsights {
  id: string;
  venueId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  date: string;
  visitorCount: number;
  visitors?: number;
  checkInsCount: number;
  checkInCount?: number;
  newFollowersCount: number;
  postEngagement: number;
  averageRating: number;
  peakHours: Record<string, number>;
  customerDemographics?: any;
  venue?: Location;
  visitorsChange?: string;
  posts?: number;
  postsChange?: string;
  shares?: number;
  sharesChange?: string;
  likes?: number;
  likesChange?: string;
  engagementRate?: string;
  followerGrowth?: string;
  clickThroughRate?: string;
  totalVisits?: number;
  revenueImpact?: string;
  totalReach?: number;
  impressions?: number;
  viewsPer?: number;
  viewsCount?: number;
  receiptUploads?: number;
  discountRedemptions?: number;
}

export interface MarinerTransaction {
  id: string;
  type: 'ticket' | 'reservation';
  userId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  venueId: string;
  eventId?: string;
  reservationDetails?: {
    date: string;
    time: string;
    partySize: number;
    specialRequests?: string;
  };
  ticketDetails?: {
    eventName: string;
    quantity: number;
    pricePerTicket: number;
    totalPrice: number;
    section?: string;
    row?: string;
    seats?: string[];
  };
  paymentMethod?: string;
  confirmationCode?: string;
}
