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

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  username: string;
  bio: string;
  points: number;
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
