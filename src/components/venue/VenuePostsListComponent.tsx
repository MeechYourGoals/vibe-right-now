
import React from 'react';
import { Post, Comment } from "@/types";

export interface VenuePostsListProps {
  posts: Post[];
  getComments: (postId: string) => Comment[];
  canDelete: boolean;
  onPostDeleted: (postId: string) => void;
}

const VenuePostsListComponent: React.FC<VenuePostsListProps> = ({ 
  posts, 
  getComments, 
  canDelete, 
  onPostDeleted 
}) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-card rounded-lg p-4 border">
          <p className="text-sm mb-2">{post.content}</p>
          <div className="text-xs text-muted-foreground">
            {getComments(post.id).length} comments
          </div>
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

export default VenuePostsListComponent;
