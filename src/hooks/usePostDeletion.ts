
import { useState } from 'react';

export const usePostDeletion = () => {
  // State to track deleted posts
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>([]);
  
  // Handle post deletion
  const handlePostDeleted = (postId: string) => {
    setDeletedPostIds(prev => [...prev, postId]);
  };
  
  return {
    deletedPostIds,
    handlePostDeleted
  };
};
