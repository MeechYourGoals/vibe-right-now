
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { Post } from '@/types';
import PostFooter from './PostFooter';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  isDetailView?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, isDetailView = false }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Add safety checks for undefined data
  if (!post || !post.user || !post.location) {
    console.error('PostCard received invalid post data:', post);
    return null;
  }

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${isDetailView ? 'max-w-none' : ''}`}>
      <div onClick={onClick}>
        {/* User Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>{post.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">{post.user.name}</span>
                {post.user.verified && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              </div>
              <div className="flex items-center text-xs text-gray-500 space-x-2">
                <MapPin className="h-3 w-3" />
                <span>{post.location.name}</span>
                <span>•</span>
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          {post.isPinned && (
            <Badge variant="secondary" className="text-xs">
              Pinned
            </Badge>
          )}
        </div>

        {/* Post Content */}
        <div className="px-4 pb-2">
          <p className="text-sm leading-relaxed">{post.content}</p>
        </div>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="px-4 pb-2">
            <div className={`grid gap-2 ${post.media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {post.media.map((item, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                  {item.type === 'image' && !imageError ? (
                    <img
                      src={item.url}
                      alt="Post media"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      controls={isDetailView}
                      muted
                      loop
                      poster={item.thumbnail}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <span className="text-sm">Image unavailable</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Badge */}
        <div className="px-4 pb-2">
          <Badge variant="outline" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {post.location.city}{post.location.state ? `, ${post.location.state}` : ''}
          </Badge>
        </div>
      </div>

      {/* Footer */}
      <PostFooter 
        post={post} 
        isDetailView={isDetailView}
      />
    </Card>
  );
};

export default PostCard;
