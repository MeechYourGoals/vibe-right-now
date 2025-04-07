
export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  points?: number;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  isOpen24Hours?: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  verified: boolean;
  hours?: BusinessHours;
}

export interface Media {
  type: "image" | "video";
  url: string;
}

export interface Post {
  id: string;
  user: User;
  location: Location;
  content: string;
  media: Media[];
  timestamp: string;
  expiresAt: string;
  likes: number;
  comments: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: User;
  content: string;
  timestamp: string;
  vibedHere: boolean;
}

export interface CheckIn {
  id: string;
  userId: string;
  locationId: string;
  timestamp: string;
  receiptUploaded: boolean;
  pointsEarned: number;
}

export interface VenueInsights {
  visitorCount: number;
  checkInCount: number;
  receiptUploads: number;
  discountRedemptions: number;
  mediaUploads: {
    photos: number;
    videos: number;
  };
  impressions: number;
}
