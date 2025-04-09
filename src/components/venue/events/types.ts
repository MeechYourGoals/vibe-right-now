
export interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  attendees: number;
  status: 'upcoming' | 'past' | 'canceled';
}
