
export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string format
  time: string;
  location: string;
  imageUrl: string;
  ticketUrl: string;
  price: string;
  type: "music" | "comedy" | "sports" | "festival" | "theater" | string;
}

export interface EventLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
