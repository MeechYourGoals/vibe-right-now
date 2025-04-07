
import { HeartHandshake, Users, Building, Briefcase, Moon } from "lucide-react";

export const PREFERENCE_TAGS = [
  "Cozy", "High Energy", "Locally Owned", "Clubs", "Lounges", 
  "Early Morning Risers", "Night Owls", "Fitness", "Outdoors", 
  "Chains", "Women Owned", "Black Owned", "Franchises", 
  "Family Friendly", "Date Night", "Physical Adventure", 
  "Differently Abled Accessible", "Fine Dining", "Casual", 
  "Budget Friendly", "Luxury", "Pet Friendly", "Live Music",
  "Art", "Theater", "Shopping", "Sightseeing", "Historic",
  "LGBTQ+ Friendly", "Good for Groups", "Tourist Attraction", 
  "Business Appropriate", "After Hours"
];

export const TICKETING_PLATFORMS = [
  { name: "Ticketmaster", id: "ticketmaster" },
  { name: "StubHub", id: "stubhub" },
  { name: "AXS", id: "axs" },
  { name: "EventBrite", id: "eventbrite" },
  { name: "OpenTable", id: "opentable" },
  { name: "Partiful", id: "partiful" },
  { name: "Other", id: "other" }
];

export const PREFERENCE_CATEGORIES = [
  { name: "LGBTQ+ Friendly", icon: HeartHandshake, id: "lgbtq" },
  { name: "Good for Groups", icon: Users, id: "groups" },
  { name: "Tourist Attraction", icon: Building, id: "tourist" },
  { name: "Business Appropriate", icon: Briefcase, id: "business" },
  { name: "After Hours", icon: Moon, id: "after-hours" },
];
