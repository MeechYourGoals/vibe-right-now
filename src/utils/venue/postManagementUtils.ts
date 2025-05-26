
export const deletePost = (postId: string, venue: { id: string; name: string }): boolean => {
  console.log(`Deleting post ${postId} from venue ${venue.name}`);
  // In a real app, this would make an API call
  return true;
};
