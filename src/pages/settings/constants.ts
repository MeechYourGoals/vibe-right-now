
export const PREFERENCE_CATEGORIES = [
  {
    id: "food",
    name: "Food & Dining",
    icon: "Utensils",
    options: ["Fine Dining", "Casual Dining", "Fast Food", "Cafes", "Bakeries", "Desserts"]
  },
  {
    id: "music",
    name: "Music",
    icon: "Music",
    options: ["Rock", "Pop", "Hip Hop", "Jazz", "Classical", "Electronic", "Country"]
  },
  {
    id: "nightlife",
    name: "Nightlife",
    icon: "Moon",
    options: ["Bars", "Clubs", "Lounges", "Live Music Venues", "Breweries", "Wine Bars"]
  },
  {
    id: "outdoor",
    name: "Outdoor Activities",
    icon: "Mountain",
    options: ["Parks", "Hiking", "Beaches", "Camping", "Biking", "Skiing", "Water Sports"]
  },
  {
    id: "arts",
    name: "Arts & Culture",
    icon: "Palette",
    options: ["Museums", "Galleries", "Theaters", "Concert Halls", "Historic Sites", "Festivals"]
  },
  {
    id: "sports",
    name: "Sports",
    icon: "Trophy",
    options: ["Football", "Basketball", "Baseball", "Soccer", "Tennis", "Golf", "Fitness"]
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    options: ["Malls", "Boutiques", "Markets", "Vintage Shops", "Outlets", "Department Stores"]
  }
];

export const TICKETING_PLATFORMS = [
  { id: "ticketmaster", name: "Ticketmaster" },
  { id: "eventbrite", name: "Eventbrite" },
  { id: "stubhub", name: "StubHub" },
  { id: "seatgeek", name: "SeatGeek" },
  { id: "axs", name: "AXS" },
  { id: "opentable", name: "OpenTable" },
  { id: "resy", name: "Resy" },
  { id: "other", name: "Other Platform" }
];

// Add the PREFERENCE_TAGS export
export const PREFERENCE_TAGS = {
  "Vibe": ["Cozy", "Trendy", "Upscale", "Casual", "Intimate", "Lively", "Romantic", "NightOwl", "Hidden Gem"],
  "Interests": ["Live Music", "Art", "Comedy", "Sports", "Gaming", "Dancing", "Theatre", "Food"],
  "Crowd": ["Family Friendly", "LGBTQ+ Friendly", "Pet Friendly", "Student", "Business", "Young Crowd", "Mature Crowd", "Diverse"],
  "Values": ["Locally Owned", "Sustainable", "Minority-Owned", "Accessible", "Budget Friendly", "Luxury", "Historic"],
  "Experience": ["Good for Groups", "Date Night", "Solo Adventure", "Physical Adventure", "Mentally Stimulating", "Unique Experience"]
};
