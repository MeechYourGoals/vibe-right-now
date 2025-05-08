
import { Post, Comment, User, Media } from "@/types";
import { mockLocations } from '@/mock/data';

/**
 * Service for handling posts and comments
 */
class PostService {
  /**
   * Get posts for a specific location
   */
  async getPostsByLocation(locationId: string): Promise<Post[]> {
    // In a real app, this would be an API call
    // For now, we'll generate mock posts
    const location = mockLocations.find(loc => loc.id === locationId);
    
    if (!location) {
      return [];
    }
    
    // Mock users
    const users: User[] = [
      {
        id: "user1",
        name: "Alex Johnson",
        username: "alexj",
        email: "alex@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?portrait",
        verified: true,
        bio: "Food lover and travel enthusiast"
      },
      {
        id: "user2",
        name: "Sophia Lee",
        username: "sophialee",
        email: "sophia@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?woman",
        verified: false,
        bio: "Coffee addict | Photography buff"
      },
      {
        id: "user3",
        name: "Marcus Rivera",
        username: "marcusrivs",
        email: "marcus@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?man",
        verified: true,
        bio: "Music producer and foodie"
      }
    ];
    
    // Mock posts with correct type
    const posts: Post[] = [
      {
        id: "post1",
        content: "Just had an amazing time at this venue! The atmosphere was electric, and the service was top-notch. Will definitely be coming back soon!",
        timestamp: "2 hours ago",
        likes: 42,
        comments: 8,
        user: users[0],
        location: location,
        media: [{ type: "image", url: "https://source.unsplash.com/random/800x600/?restaurant" }]
      },
      {
        id: "post2",
        content: "Great happy hour deals and the best nachos in town! Met some cool people and had a blast.",
        timestamp: "Yesterday",
        likes: 29,
        comments: 5,
        user: users[1],
        location: location,
        media: [{ type: "image", url: "https://source.unsplash.com/random/800x600/?drinks" }]
      },
      {
        id: "post3",
        content: "This venue has the most incredible live music! The acoustics are perfect, and the crowd was so into it. Can't wait for the next show!",
        timestamp: "3 days ago",
        likes: 67,
        comments: 12,
        user: users[2],
        location: location,
        media: [{ type: "image", url: "https://source.unsplash.com/random/800x600/?concert" }]
      }
    ];
    
    return posts;
  }

  /**
   * Create a new post
   */
  async createPost(data: {
    content: string;
    locationId: string;
    authorId: string;
    media?: Media[];
  }): Promise<Post | null> {
    const location = mockLocations.find(loc => loc.id === data.locationId);
    
    if (!location) {
      return null;
    }
    
    // Mock user
    const user: User = {
      id: data.authorId,
      name: "Current User",
      username: "currentuser",
      email: "user@example.com",
      avatar: "https://source.unsplash.com/random/100x100/?person",
      verified: false,
      bio: "App user"
    };
    
    // Create a new post
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content: data.content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      user: user,
      location: location,
      media: data.media || []
    };
    
    return newPost;
  }

  /**
   * Get comments for a post
   */
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    // Mock users
    const users: User[] = [
      {
        id: "user1",
        name: "Alex Johnson",
        username: "alexj",
        email: "alex@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?portrait",
        verified: true,
        bio: "Food lover and travel enthusiast"
      },
      {
        id: "user2",
        name: "Sophia Lee",
        username: "sophialee",
        email: "sophia@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?woman",
        verified: false,
        bio: "Coffee addict | Photography buff"
      },
      {
        id: "user3",
        name: "Marcus Rivera",
        username: "marcusrivs",
        email: "marcus@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?man",
        verified: true,
        bio: "Music producer and foodie"
      }
    ];
    
    // Mock comments with correct type
    const comments: Comment[] = [
      {
        id: "comment1",
        content: "I totally agree! The atmosphere was amazing.",
        timestamp: "1 hour ago",
        user: users[0],
        postId: postId,
        likes: 3
      },
      {
        id: "comment2",
        content: "Did you try their signature cocktail? It was delicious!",
        timestamp: "3 hours ago",
        user: users[1],
        postId: postId,
        likes: 5
      },
      {
        id: "comment3",
        content: "I'm going there this weekend. Any recommendations?",
        timestamp: "5 hours ago",
        user: users[2],
        postId: postId,
        likes: 2
      }
    ];
    
    return comments;
  }

  /**
   * Add a comment to a post
   */
  async addComment(data: {
    postId: string;
    content: string;
    authorId: string;
  }): Promise<Comment> {
    // Create a new comment
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content: data.content,
      timestamp: "Just now",
      user: {
        id: data.authorId,
        name: "Current User",
        username: "currentuser",
        email: "user@example.com",
        avatar: "https://source.unsplash.com/random/100x100/?person",
        verified: false,
        bio: "App user"
      },
      postId: data.postId,
      likes: 0
    };
    
    return newComment;
  }

  /**
   * Like or unlike a post
   */
  async toggleLike(postId: string): Promise<number> {
    // In a real app, this would toggle a like on the backend
    // For now, just return a random number of likes
    return Math.floor(Math.random() * 100);
  }

  /**
   * Like or unlike a comment
   */
  async toggleCommentLike(commentId: string): Promise<number> {
    // In a real app, this would toggle a like on the backend
    // For now, just return a random number of likes
    return Math.floor(Math.random() * 20);
  }
}

export default new PostService();
