export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {
}

export interface SidebarNavItem extends NavItemWithOptionalChildren {
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
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

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  points?: number;
  email?: string;
  image?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  isVenuePost?: boolean;
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

export interface Place {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  lat: number;
  lng: number;
  category: string;
  tags: string[];
  hours: string;
  website: string;
  phone: string;
  email: string;
  price: number;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
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
