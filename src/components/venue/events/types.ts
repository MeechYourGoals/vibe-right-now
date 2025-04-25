
// If this file doesn't exist, create it

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  venueId?: string; 
  location: string;
  type: string;
  price: string;
  ticketsAvailable: number;
  imageUrl: string;
  ticketUrl: string;
  tags?: string[];
  ownerId?: string;
  featured?: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
