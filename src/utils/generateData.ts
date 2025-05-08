
import { User, Location, Media, Comment, Post } from "@/types";

/**
 * Generate a random user
 */
export const generateUser = (id: string): User => {
  const nameOptions = ["Alex", "Jordan", "Taylor", "Casey", "Riley"];
  const name = nameOptions[Math.floor(Math.random() * nameOptions.length)];
  
  return {
    id,
    name,
    username: `${name.toLowerCase()}${Math.floor(Math.random() * 1000)}`,
    email: `${name.toLowerCase()}@example.com`,
    avatar: `https://source.unsplash.com/random/100x100/?portrait&sig=${id}`,
    verified: Math.random() > 0.7,
    bio: "App user"
  };
};

/**
 * Generate a random location
 */
export const generateLocation = (id: string): Location => {
  const cityOptions = ["San Francisco", "New York", "Los Angeles", "Chicago", "Miami"];
  const stateOptions = ["CA", "NY", "IL", "FL"];
  const typeOptions = ["restaurant", "bar", "event", "attraction"];
  
  const city = cityOptions[Math.floor(Math.random() * cityOptions.length)];
  const state = stateOptions[Math.floor(Math.random() * stateOptions.length)];
  const type = typeOptions[Math.floor(Math.random() * typeOptions.length)];
  
  return {
    id,
    name: `Venue ${id}`,
    city,
    state,
    country: "USA",
    address: `${Math.floor(Math.random() * 1000) + 100} Main St`,
    lat: 37.7749 + (Math.random() * 0.1 - 0.05),
    lng: -122.4194 + (Math.random() * 0.1 - 0.05),
    type
  };
};

/**
 * Generate a random media item
 */
export const generateMedia = (): Media => {
  const typeOptions = ["image", "video"];
  const type = typeOptions[Math.floor(Math.random() * typeOptions.length)] as "image" | "video";
  
  return {
    type,
    url: `https://source.unsplash.com/random/800x600/?${type === "image" ? "place" : "video"}&sig=${Math.random()}`,
    thumbnail: `https://source.unsplash.com/random/200x200/?${type === "image" ? "place" : "video"}&sig=${Math.random()}`
  };
};

/**
 * Generate a random comment
 */
export const generateComment = (postId: string): Comment => {
  const contentOptions = [
    "Great place!",
    "I love the vibe here.",
    "The service was excellent!",
    "Can't wait to visit again.",
    "Highly recommended!"
  ];
  
  const content = contentOptions[Math.floor(Math.random() * contentOptions.length)];
  const user = generateUser(`user-${Math.random().toString(36).substring(7)}`);
  
  return {
    id: `comment-${Math.random().toString(36).substring(7)}`,
    content,
    user,
    timestamp: "2 hours ago",
    postId,
    likes: Math.floor(Math.random() * 100)
  };
};

/**
 * Generate a random post
 */
export const generatePost = (location: Location): Post => {
  const contentOptions = [
    "Just had an amazing time here!",
    "The atmosphere was incredible!",
    "Highly recommend this place.",
    "Best experience ever!",
    "Can't wait to come back!"
  ];
  
  const content = contentOptions[Math.floor(Math.random() * contentOptions.length)];
  const user = generateUser(`user-${Math.random().toString(36).substring(7)}`);
  const mediaCount = Math.floor(Math.random() * 3);
  const media: Media[] = [];
  
  for (let i = 0; i < mediaCount; i++) {
    media.push(generateMedia());
  }
  
  return {
    id: `post-${Math.random().toString(36).substring(7)}`,
    content,
    user,
    location,
    timestamp: "3 hours ago",
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 10),
    media
  };
};
