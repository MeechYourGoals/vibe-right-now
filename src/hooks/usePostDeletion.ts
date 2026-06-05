
import { useState } from 'react';
import { Post } from '@/types';
import { deletePostById } from '@/utils/venue/postManagementUtils';

export const usePostDeletion = () => {
  // State to track deleted posts (used to optimistically hide them in lists/feeds)
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>([]);

  // Mark a post as deleted locally (after a successful remove, or to hide optimistically)
  const handlePostDeleted = (postId: string) => {
    setDeletedPostIds(prev => (prev.includes(postId) ? prev : [...prev, postId]));
  };

  /**
   * Persist a delete via the data layer (author-only) and, on success, hide the post.
   * Returns whether the deletion succeeded.
   */
  const deletePost = async (post: Post): Promise<boolean> => {
    const ok = await deletePostById(post);
    if (ok) {
      handlePostDeleted(post.id);
    }
    return ok;
  };

  return {
    deletedPostIds,
    handlePostDeleted,
    deletePost,
  };
};
