
import { EventItem } from "./types";

export const sampleEvents: EventItem[] = [
  {
    id: "event1",
    title: "Summer Music Festival",
    description: "Join us for a weekend of amazing performances featuring top artists from around the world.",
    date: "2025-07-15",
    time: "12:00 PM",
    venue: "Central Park", // Added required field
    location: "New York, NY",
    type: "music",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    ticketUrl: "https://tickets.example.com/event1",
    price: "$75",
    ticketsAvailable: 5000 // Added required field
  },
  {
    id: "event2",
    title: "Stand-up Comedy Night",
    description: "Laugh until you cry with our lineup of hilarious comedians.",
    date: "2025-06-20",
    time: "8:00 PM",
    venue: "City Comedy Club", // Added required field
    location: "Chicago, IL",
    type: "comedy",
    imageUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1000&auto=format&fit=crop",
    ticketUrl: "https://tickets.example.com/event2",
    price: "$35",
    ticketsAvailable: 150 // Added required field
  },
  {
    id: "event3",
    title: "Basketball Championship",
    description: "Watch the final game of the season as two top teams battle for the championship.",
    date: "2025-06-10",
    time: "7:30 PM",
    venue: "Sports Arena", // Added required field
    location: "Miami, FL",
    type: "sports",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
    ticketUrl: "https://tickets.example.com/event3",
    price: "$50-$150",
    ticketsAvailable: 18000 // Added required field
  },
  {
    id: "event4",
    title: "Food and Wine Festival",
    description: "Sample amazing cuisine and wine from renowned chefs and wineries.",
    date: "2025-08-05",
    time: "11:00 AM",
    venue: "Downtown Plaza", // Added required field
    location: "San Francisco, CA",
    type: "festival",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
    ticketUrl: "https://tickets.example.com/event4",
    price: "$90",
    ticketsAvailable: 3000 // Added required field
  }
];

export const getMusicEvents = (): EventItem[] => {
  return sampleEvents.filter(event => event.type === "music");
};

export const getComedyEvents = (): EventItem[] => {
  return sampleEvents.filter(event => event.type === "comedy");
};

export const getSportsEvents = (): EventItem[] => {
  return sampleEvents.filter(event => event.type === "sports");
};

export const getFestivalEvents = (): EventItem[] => {
  return sampleEvents.filter(event => event.type === "festival");
};
