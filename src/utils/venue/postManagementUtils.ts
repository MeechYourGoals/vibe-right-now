
import { Post } from "@/types";
import { toast } from "sonner";
import { postsRepo } from "@/services/data";
import { getCurrentUserId } from "@/services/posts/currentUser";

// Check if a user has the necessary subscription to delete posts
export const canDeleteUserPosts = (subscriptionTier: string): boolean => {
  const paidTiers = ['plus', 'premium', 'pro'];
  return paidTiers.includes(subscriptionTier);
};

/**
 * Determine whether the current user is allowed to delete a post.
 * Only the post's author may delete it.
 */
export const canCurrentUserDeletePost = (post: Post, currentUserId: string | null): boolean => {
  if (!currentUserId) return false;
  return post.userId === currentUserId || post.user?.id === currentUserId;
};

/**
 * Delete a post via the data layer. Only succeeds when a user is signed in and is the
 * author of the post. Returns true when the post was removed.
 */
export const deletePostById = async (post: Post): Promise<boolean> => {
  const userId = await getCurrentUserId();
  if (!userId) {
    toast("Sign in to manage your posts");
    return false;
  }
  if (!canCurrentUserDeletePost(post, userId)) {
    toast.error("You can only delete your own posts.");
    return false;
  }

  try {
    await postsRepo.remove(post.id);
    toast.success("Post deleted");
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Failed to delete post. Please try again.");
    return false;
  }
};

// Legacy venue-context delete helper (kept for backwards compatibility with venue grids).
export const deletePost = (postId: string, venue: { id: string; name: string }): boolean => {
  try {
    console.log(`Deleting post ${postId} from venue ${venue.id}`);
    toast.success(`Post removed from ${venue.name}`);
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Failed to delete post. Please try again.");
    return false;
  }
};

// Handle creating a new post at a specific venue
export const createVenuePost = (venueId: string, content: string, media: File[]): void => {
  // In a real app, this would upload media and create a post with the venue location
  console.log(`Creating post at venue ${venueId} with content: ${content}`);
  console.log(`Media files:`, media);

  toast.success("Your post was added successfully!");
};
