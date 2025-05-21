
// Preference categories used in settings
export const PREFERENCE_CATEGORIES = [
  { name: "Vibe", description: "The overall feeling of a place" },
  { name: "Interests", description: "Activities and experiences you enjoy" },
  { name: "Crowd", description: "The type of people you like to be around" },
  { name: "Values", description: "What matters most to you in a venue" },
  { name: "Experience", description: "The level of service or amenities" }
];

// All available preference tags organized by category
export const PREFERENCE_TAGS = {
  "Vibe": [
    "Chill", "Energetic", "Romantic", "Social", "Quiet",
    "Lively", "Cozy", "Upscale", "Casual", "Trendy",
    "Creative", "Relaxed"
  ],
  "Interests": [
    "Live Music", "Sports", "Dancing", "Art", "Games",
    "Comedy", "Theater", "Food", "Drinks", "Shopping",
    "Outdoors", "Wellness"
  ],
  "Crowd": [
    "Family-friendly", "Pet-friendly", "LGBTQ+-friendly", "Student",
    "Professional", "Diverse", "Local", "Tourist", "All Ages"
  ],
  "Values": [
    "Sustainable", "Locally Owned", "Charity", "Inclusive",
    "Fair Trade", "Ethical", "Community", "Historic"
  ],
  "Experience": [
    "Budget Friendly", "Luxury", "Quick Service", "Full Service",
    "Self-Guided", "Guided", "Interactive", "Physical Adventure"
  ]
};

// Ticketing platforms supported by the app
export const TICKETING_PLATFORMS = [
  { id: "ticketmaster", name: "Ticketmaster" },
  { id: "eventbrite", name: "Eventbrite" },
  { id: "stubhub", name: "StubHub" },
  { id: "seatgeek", name: "SeatGeek" },
  { id: "axs", name: "AXS" },
  { id: "livenation", name: "Live Nation" },
  { id: "other", name: "Other Platform" }
];
