
import React from 'react';
import { Post } from "@/types";

interface PostCardGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  className?: string;
  columns?: 2 | 3 | 4;
}

const PostCardGrid = ({ posts, onPostClick, className = "", columns = 3 }: PostCardGridProps) => {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-4 ${className}`}>
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square overflow-hidden rounded-md bg-muted relative group cursor-pointer"
          onClick={() => onPostClick(post)}
        >
          {post.media && post.media.length > 0 ? (
            post.media[0].type === "image" ? (
              <img
                src={post.media[0].url}
                alt="Post content"
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <video
                src={post.media[0].url}
                className="h-full w-full object-cover"
                poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              />
            )
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <p className="p-2 text-center text-sm">
                {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}
              </p>
            </div>
          )}
          
          {post.isPinned && (
            <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs py-1 px-2 rounded-full">
              Pinned
            </div>
          )}
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-3">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white mr-2">
                <img 
                  src={post.user?.avatar} 
                  alt={post.user?.username} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-white text-sm font-medium truncate">
                {post.user?.username}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCardGrid;
