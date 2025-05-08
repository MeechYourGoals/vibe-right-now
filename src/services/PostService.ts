
import { Post, Media, Location } from "@/types";
import { getCommentsForPost } from "@/services/CommentService";

// Mock posts data
const mockPosts: Post[] = [
  {
    id: "p1",
    content: "Having an amazing time at this place! The vibes are perfect for a Friday night.",
    authorId: "user1",
    locationId: "1",
    timestamp: "2023-04-01T14:30:00Z",
    likes: 25,
    comments: 2,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=60"
      }
    ]
  },
  {
    id: "p2",
    content: "This is my favorite spot in town. Great food, amazing drinks, and the best atmosphere!",
    authorId: "user2",
    locationId: "2",
    timestamp: "2023-04-02T10:15:00Z",
    likes: 18,
    comments: 1,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=60"
      }
    ]
  },
  {
    id: "p3",
    content: "Just discovered this hidden gem. Can't believe I haven't been here before!",
    authorId: "user3",
    locationId: "3",
    timestamp: "2023-04-03T16:45:00Z",
    likes: 32,
    comments: 0,
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?auto=format&fit=crop&w=600&q=60"
      }
    ]
  }
];

// Function to get mock user for a post
const getMockUserForPost = (authorId: string) => {
  return {
    id: authorId,
    username: authorId === "user1" ? "vibeexplorer" : authorId === "user2" ? "cityviber" : "nightowl",
    email: `${authorId}@example.com`,
    avatar: `https://i.pravatar.cc/150?img=${authorId === "user1" ? 1 : authorId === "user2" ? 2 : 3}`,
    verified: authorId === "user1"
  };
};

// Function to get mock location for a post
const getMockLocationForPost = (locationId: string) => {
  return {
    id: locationId,
    name: `Location ${locationId}`,
    address: `${parseInt(locationId) * 100} Main St`,
    city: "San Francisco",
    state: "CA",
    country: "USA",
    zip: "94105",
    lat: 37.7749 + (parseInt(locationId) * 0.01),
    lng: -122.4194 + (parseInt(locationId) * 0.01),
    type: parseInt(locationId) % 2 === 0 ? "restaurant" : "bar",
    verified: true
  } as Location;
};

// Get all posts
export const getAllPosts = (): Post[] => {
  return mockPosts.map(post => ({
    ...post,
    user: getMockUserForPost(post.authorId),
    location: getMockLocationForPost(post.locationId)
  }));
};

// Get posts for a specific venue/location
export const getPostsForVenue = (venueId: string): Post[] => {
  return mockPosts
    .filter(post => post.locationId === venueId)
    .map(post => ({
      ...post,
      user: getMockUserForPost(post.authorId),
      location: getMockLocationForPost(post.locationId)
    }));
};

// Get a single post by ID
export const getPostById = (postId: string): Post | null => {
  const post = mockPosts.find(p => p.id === postId);
  if (!post) return null;
  
  return {
    ...post,
    user: getMockUserForPost(post.authorId),
    location: getMockLocationForPost(post.locationId),
    comments: getCommentsForPost(post.id).length
  };
};

// Create a new post
export const createPost = (content: string, authorId: string, locationId: string, media: Media[] = []): Post => {
  const newPost: Post = {
    id: `p${mockPosts.length + 1}`,
    content,
    authorId,
    locationId,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    media,
    user: getMockUserForPost(authorId),
    location: getMockLocationForPost(locationId)
  };
  
  mockPosts.push(newPost);
  return newPost;
};

// Like a post
export const likePost = (postId: string): Post | null => {
  const postIndex = mockPosts.findIndex(post => post.id === postId);
  if (postIndex === -1) return null;
  
  mockPosts[postIndex].likes += 1;
  
  return {
    ...mockPosts[postIndex],
    user: getMockUserForPost(mockPosts[postIndex].authorId),
    location: getMockLocationForPost(mockPosts[postIndex].locationId)
  };
};

// Delete a post
export const deletePost = (postId: string): boolean => {
  const postIndex = mockPosts.findIndex(post => post.id === postId);
  if (postIndex === -1) return false;
  
  mockPosts.splice(postIndex, 1);
  return true;
};
