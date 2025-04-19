import { useState, useCallback } from 'react';
import { Post } from '@/types';
import { vibeTags } from '@/constants/vibeTags';

// List of available vibe tags
// export const vibeTags = [
//   "Cozy", "Upscale", "Trendy", "Casual", "Romantic", "Lively", "Intimate", 
//   "Family Friendly", "NightOwl", "Chill", "Energetic", "Artistic", "Sophisticated",
//   "Rustic", "Modern", "Nostalgic", "Peaceful", "Vibrant", "Adventurous"
// ];

export const useVibeFilters = () => {
  const [selectedVibeTags, setSelectedVibeTags] = useState<string[]>([]);

  // Function to toggle a vibe tag selection
  const toggleVibeTag = useCallback((tag: string) => {
    setSelectedVibeTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // Function to clear all selected vibe tags
  const clearVibeTags = useCallback(() => {
    setSelectedVibeTags([]);
  }, []);

  // Function to filter posts based on selected vibe tags
  const filterPostsByVibes = useCallback((posts: Post[]) => {
    if (selectedVibeTags.length === 0) {
      return posts; // Return all posts if no tags selected
    }

    return posts.filter(post => {
      // If post has no vibeTags property or it's empty, exclude it
      if (!post.vibeTags || post.vibeTags.length === 0) {
        return false;
      }

      // Include post if it has ANY of the selected vibe tags (inclusive filtering)
      return selectedVibeTags.some(tag => 
        post.vibeTags?.includes(tag)
      );
    });
  }, [selectedVibeTags]);

  return {
    selectedVibeTags,
    toggleVibeTag,
    clearVibeTags,
    filterPostsByVibes
  };
};

export { vibeTags };
