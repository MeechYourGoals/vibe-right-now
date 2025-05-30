
import { HeartHandshake, Users, Building, Briefcase, Moon } from "lucide-react";

export const PREFERENCE_TAGS = [
  "After Hours", "Art", "Black Owned", "Brunch", "Budget Friendly", 
  "Business Appropriate", "Cannabis Friendly", "Casual", "Chains", 
  "Church", "Clubs", "Comedy", "Cozy", "Date Night", "Differently Abled Accessible", 
  "Early Morning Risers", "EV Charging Nearby", "Family Friendly", "Farmer's Markets", 
  "Fine Dining", "Fitness", "Franchises", "Good for Groups", "Healthy Eats", 
  "High Energy", "Historic", "LGBTQ+ Friendly", "Live Music", "Locally Owned", 
  "Lounges", "Luxury", "Night Owls", "Outdoors", "Pet Friendly", 
  "Physical Adventure", "Red Light District", "Shopping", "Sightseeing", 
  "Sports", "Theater", "Tourist Attraction", "Volunteering", "Women Owned"
];

export const TICKETING_PLATFORMS = [
  { name: "Ticketmaster", id: "ticketmaster" },
  { name: "StubHub", id: "stubhub" },
  { name: "AXS", id: "axs" },
  { name: "EventBrite", id: "eventbrite" },
  { name: "OpenTable", id: "opentable" },
  { name: "Partiful", id: "partiful" },
  { name: "Gametime", id: "gametime" },
  { name: "SeatGeek", id: "seatgeek" },
  { name: "Other", id: "other" }
];

export const PREFERENCE_CATEGORIES = [
  { name: "LGBTQ+ Friendly", icon: HeartHandshake, id: "lgbtq" },
  { name: "Good for Groups", icon: Users, id: "groups" },
  { name: "Tourist Attraction", icon: Building, id: "tourist" },
  { name: "Business Appropriate", icon: Briefcase, id: "business" },
  { name: "After Hours", icon: Moon, id: "after-hours" },
];
