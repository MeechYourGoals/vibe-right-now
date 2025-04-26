
export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  description: string;
  price: string;
  ticketsAvailable: number;
  type: "music" | "comedy" | "sports" | "festival" | "theater" | "other";
  image?: string;
  imageUrl?: string;
  ticketUrl?: string;
}

export interface EventSectionProps {
  title: string;
  events: EventItem[];
  viewAll?: boolean;
}

export interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export interface DiscountOffer {
  id: string;
  type: "freeItem" | "percentOff" | "freeEntry" | "vipAccess" | "bogo";
  description: string;
  expiresAt?: string;
  conditions?: string;
  code?: string;
  value?: number; // For percentage or fixed amount discounts
  originalPrice?: string;
}

// Modified to properly extend Location type without directly implementing it
export interface VenueWithDiscount {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  verified: boolean;
  discount: DiscountOffer;
  distance?: string;
}
