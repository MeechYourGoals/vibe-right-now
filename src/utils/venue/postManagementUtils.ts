
import { Post } from "@/types";
import { toast } from "sonner";

// Check if a user has the necessary subscription to delete posts
export const canDeleteUserPosts = (subscriptionTier: string): boolean => {
  const paidTiers = ['plus', 'premium', 'pro'];
  return paidTiers.includes(subscriptionTier);
};

// Handle post deletion (mock implementation)
export const deletePost = (postId: string, venue: { id: string; name: string }): boolean => {
  try {
    // In a real app, this would call an API endpoint to delete the post
    console.log(`Deleting post ${postId} from venue ${venue.id}`);
    
    // For demo purposes, this just shows a success toast
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
