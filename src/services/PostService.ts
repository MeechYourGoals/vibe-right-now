
import { Post, Comment } from "@/types";
import { generateUserWithAvatar } from "@/utils/generateData";

const DEMO_POSTS: Post[] = [
  {
    id: "post1",
    content: "Great atmosphere tonight at this place! Definitely coming back.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 24,
    comments: 5,
    authorId: "user1",
    locationId: "location1",
    user: generateUserWithAvatar(),
    location: {
      id: "location1",
      name: "Skyline Bar",
      city: "Miami",
      address: "123 Ocean Drive"
    }
  },
  {
    id: "post2",
    content: "Food was amazing but service was a bit slow. Would recommend for the views alone!",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 15,
    comments: 8,
    authorId: "user2",
    locationId: "location1",
    user: generateUserWithAvatar(),
    location: {
      id: "location1",
      name: "Skyline Bar",
      city: "Miami",
      address: "123 Ocean Drive"
    }
  },
  {
    id: "post3",
    content: "DJ was on fire last night! This is definitely the spot for weekend vibes in the city.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 11,
    authorId: "user3",
    locationId: "location1",
    user: generateUserWithAvatar(),
    location: {
      id: "location1",
      name: "Skyline Bar",
      city: "Miami",
      address: "123 Ocean Drive"
    }
  }
];

const DEMO_COMMENTS: Comment[] = [
  {
    id: "comment1",
    postId: "post1",
    content: "Totally agree! The rooftop view is amazing.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    userId: "user4",
    user: generateUserWithAvatar()
  },
  {
    id: "comment2",
    postId: "post1",
    content: "What time did you go? I heard it gets packed after 10pm.",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    userId: "user5",
    user: generateUserWithAvatar()
  },
  {
    id: "comment3",
    postId: "post2",
    content: "I had the same experience with the service last weekend.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    userId: "user6",
    user: generateUserWithAvatar()
  }
];

export const PostService = {
  async getPostsForLocation(locationId: string): Promise<Post[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return DEMO_POSTS.filter(post => post.locationId === locationId);
  },

  async getCommentsForPost(postId: string): Promise<Comment[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return DEMO_COMMENTS.filter(comment => comment.postId === postId);
  },

  async addComment({ postId, content, userId }: { postId: string, content: string, userId: string }): Promise<Comment> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      postId,
      content,
      timestamp: new Date().toISOString(),
      userId,
      user: generateUserWithAvatar()
    };
    
    // In a real app, we'd save this to the database
    DEMO_COMMENTS.push(newComment);
    
    return newComment;
  }
};
