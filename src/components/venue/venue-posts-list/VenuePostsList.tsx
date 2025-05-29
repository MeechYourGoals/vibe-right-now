
import React from 'react';
import { Post, Comment, Location } from '@/types';

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  canDelete: boolean;
  onPostDeleted: (postId: string) => void;
  subscriptionTier?: string;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  canDelete,
  onPostDeleted,
  subscriptionTier = 'standard'
}) => {
  return (
    <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-4'}`}>
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center mb-2">
            <img 
              src={post.user.profileImage} 
              alt={post.user.displayName}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="font-medium text-sm">{post.user.displayName}</p>
              <p className="text-xs text-gray-500">@{post.user.username}</p>
            </div>
          </div>
          <p className="text-sm mb-2">{post.content}</p>
          {post.media && post.media.length > 0 && (
            <div className="mb-2">
              {post.media[0].type === 'image' ? (
                <img 
                  src={post.media[0].url} 
                  alt="Post media"
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <video 
                  src={post.media[0].url}
                  className="w-full h-32 object-cover rounded"
                  controls
                />
              )}
            </div>
          )}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{post.likes} likes</span>
            <span>{Array.isArray(post.comments) ? post.comments.length : post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenuePostsList;
