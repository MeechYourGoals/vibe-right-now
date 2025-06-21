
import React from 'react';
import { Post, Location, User, Media } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MapPin, Star } from "lucide-react";

interface ProfileTabContentProps {
  posts?: Post[];
  locations?: Location[];
  user: User;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  posts = [],
  locations = [],
  user
}) => {
  if (posts.length > 0) {
    return (
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-card rounded-lg p-4 border">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{post.user.name}</span>
                  {post.user.verified && (
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  )}
                  <span className="text-muted-foreground text-sm">@{post.user.username}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{post.location?.name || 'Unknown Location'}</span>
                  <span>•</span>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <p className="mb-3 text-foreground">{post.content}</p>
            
            {post.media && post.media.length > 0 && (
              <div className="mb-3">
                {typeof post.media[0] === 'string' ? (
                  <img 
                    src={post.media[0] as string} 
                    alt="Post content" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <img 
                    src={(post.media[0] as Media).url} 
                    alt="Post content" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </div>
            )}

            {post.vibes && post.vibes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.vibes.slice(0, 3).map((vibe, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {vibe}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-green-500 transition-colors">
                  <Share className="h-4 w-4" />
                  <span className="text-sm">{post.shares || 0}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (locations.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-card rounded-lg p-4 border">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-muted-foreground text-sm">{location.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">{location.type}</Badge>
                  {location.rating && (
                    <Badge variant="outline" className="text-xs">
                      <Star className="h-3 w-3 mr-1" fill="currentColor" />
                      {location.rating}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No content to display</p>
    </div>
  );
};

export default ProfileTabContent;
