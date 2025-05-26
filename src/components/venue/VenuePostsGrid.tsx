
import React from 'react';
import { Post } from "@/types";

export interface VenuePostsGridProps {
  posts: Post[];
  canDelete: boolean;
  onPostDeleted: (postId: string) => void;
}

const VenuePostsGrid: React.FC<VenuePostsGridProps> = ({ posts, canDelete, onPostDeleted }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-card rounded-lg p-4 border">
          <p className="text-sm">{post.content}</p>
          {canDelete && (
            <button 
              onClick={() => onPostDeleted(post.id)}
              className="mt-2 text-red-500 text-xs"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default VenuePostsGrid;
