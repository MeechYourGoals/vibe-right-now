
export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  ticketUrl?: string;
  price?: string;
  type?: "venue" | "sports" | "music" | "comedy" | "nightlife";
  vibes?: string[];
}
