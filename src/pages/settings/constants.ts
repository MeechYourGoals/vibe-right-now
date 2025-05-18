
// Only write this file if it doesn't already exist or doesn't have PREFERENCE_TAGS
export const PREFERENCE_CATEGORIES = [
  {
    name: "Vibe",
    description: "What atmosphere do you enjoy?",
    tags: ["High Energy", "Relaxed", "Cozy", "Luxury", "Professional", "Creative", "Romantic", "Family Friendly"]
  },
  {
    name: "Interests",
    description: "What activities interest you?",
    tags: ["Live Music", "Sports", "Arts", "Dance", "Gaming", "Education", "Tech", "Food", "Wine & Spirits", "Fitness"]
  },
  {
    name: "Crowd",
    description: "Who do you like to be around?",
    tags: ["Young Professionals", "Students", "Night Owls", "Early Birds", "Industry", "Celebrities", "Artists", "Business"]
  },
  {
    name: "Values",
    description: "What matters to you?",
    tags: ["Sustainable", "Locally Owned", "Minority Owned", "LGBTQ+ Friendly", "Health Conscious", "Budget Friendly", "Female Owned", "Accessible"]
  },
  {
    name: "Experience",
    description: "What kind of experience do you seek?",
    tags: ["Trending", "Hidden Gem", "Historical", "Tourist Attraction", "Modern", "Traditional", "Interactive", "Physical Adventure"]
  }
];

// Flatten all tags into a single array for easy access
export const PREFERENCE_TAGS = PREFERENCE_CATEGORIES.flatMap(category => category.tags).sort();

// Types of venues
export const VENUE_TYPES = [
  "restaurant",
  "bar",
  "event",
  "attraction",
  "sports",
  "nightlife",
  "concert",
  "comedy",
  "museum",
  "theater",
  "park",
  "shopping"
];
