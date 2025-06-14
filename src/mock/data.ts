
import { Post, Comment, Location, User } from "@/types";

// Import existing data
import { mockUsers } from "./users";
import { mockLocations } from "./locations";
import { mockPosts } from "./posts";
import { mockComments } from "./comments";

// Ensure Coachella Valley and other key venues exist
const additionalVenues: Location[] = [
  {
    id: "20",
    name: "Coachella Valley",
    type: "festival",
    address: "81-800 51st Ave, Indio, CA 92201",
    city: "Indio",
    state: "California",
    latitude: 33.6803,
    longitude: -116.2156,
    rating: 4.8,
    priceRange: "$$$",
    description: "World-famous music and arts festival featuring top artists across multiple genres",
    tags: ["music", "festival", "outdoor", "camping", "art"],
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    hours: {
      monday: { open: "12:00", close: "23:00", isOpen: true },
      tuesday: { open: "12:00", close: "23:00", isOpen: true },
      wednesday: { open: "12:00", close: "23:00", isOpen: true },
      thursday: { open: "12:00", close: "23:00", isOpen: true },
      friday: { open: "12:00", close: "02:00", isOpen: true },
      saturday: { open: "12:00", close: "02:00", isOpen: true },
      sunday: { open: "12:00", close: "23:00", isOpen: true }
    },
    phone: "(760) 863-8990",
    website: "https://coachella.com",
    socialMedia: {
      instagram: "@coachella",
      twitter: "@coachella",
      facebook: "coachella"
    }
  }
];

// Merge additional venues with existing locations
const allLocations = [...mockLocations, ...additionalVenues.filter(venue => 
  !mockLocations.some(existing => existing.id === venue.id)
)];

// Export all mock data
export { mockUsers, mockComments, mockPosts };
export { allLocations as mockLocations };
