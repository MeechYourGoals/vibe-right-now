
export const deletePost = (postId: string, venue: { id: string; name: string }): boolean => {
  console.log(`Deleting post ${postId} from venue ${venue.name}`);
  // In a real app, this would make an API call
  return true;
};

export const canDeleteUserPosts = (subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro'): boolean => {
  // Standard tier cannot delete user posts, higher tiers can
  return subscriptionTier !== 'standard';
};

export const createVenuePost = (postData: {
  content: string;
  media?: any[];
  venue: { id: string; name: string };
}): boolean => {
  console.log(`Creating venue post for ${postData.venue.name}:`, postData.content);
  // In a real app, this would make an API call
  return true;
};
