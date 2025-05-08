
import { Comment } from "@/types";

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "c1",
    postId: "p1",
    authorId: "user1",
    content: "Great place! Loved the atmosphere.",
    timestamp: "2023-04-01T15:00:00Z",
    likes: 5,
    user: {
      id: "user1",
      username: "vibeexplorer",
      email: "vibeexplorer@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true
    }
  },
  {
    id: "c2",
    postId: "p1",
    authorId: "user2",
    content: "I agree! Such a cool spot.",
    timestamp: "2023-04-01T16:30:00Z",
    likes: 3,
    user: {
      id: "user2",
      username: "cityviber",
      email: "cityviber@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      verified: false
    }
  },
  {
    id: "c3",
    postId: "p2",
    authorId: "user1",
    content: "I'm definitely coming back here.",
    timestamp: "2023-04-02T12:15:00Z",
    likes: 2,
    user: {
      id: "user1",
      username: "vibeexplorer",
      email: "vibeexplorer@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true
    }
  }
];

// Get comments for a specific post
export const getCommentsForPost = (postId: string): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId);
};

// Add a new comment to a post
export const addComment = (postId: string, authorId: string, content: string): Comment => {
  const newComment: Comment = {
    id: `c${mockComments.length + 1}`,
    postId,
    authorId,
    content,
    timestamp: new Date().toISOString(),
    likes: 0,
    user: {
      id: authorId,
      username: "currentuser",
      email: "currentuser@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: false
    }
  };
  
  mockComments.push(newComment);
  return newComment;
};

// Like a comment
export const likeComment = (commentId: string): Comment | null => {
  const commentIndex = mockComments.findIndex(comment => comment.id === commentId);
  if (commentIndex === -1) return null;
  
  mockComments[commentIndex].likes += 1;
  return mockComments[commentIndex];
};

// Delete a comment
export const deleteComment = (commentId: string): boolean => {
  const commentIndex = mockComments.findIndex(comment => comment.id === commentId);
  if (commentIndex === -1) return false;
  
  mockComments.splice(commentIndex, 1);
  return true;
};
