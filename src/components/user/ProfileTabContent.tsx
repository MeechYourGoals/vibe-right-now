
import React from 'react';
import { Post, Location, User } from '@/types';
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
                <img 
                  src={post.media[0]} 
                  alt="Post content" 
                  className="w-full h-64 object-cover rounded-lg"
                />
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
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                {post.vibes?.join(', ')}
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
          <div key={location.id} className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {location.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{location.name}</h3>
                  {location.verified && (
                    <Badge variant="secondary" className="text-xs">✓</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <span>{location.city}, {location.state}</span>
                </div>
                {location.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{location.rating}</span>
                  </div>
                )}
                {location.vibes && location.vibes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {location.vibes.slice(0, 3).map((vibe, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {vibe}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">No content available</p>
    </div>
  );
};

export default ProfileTabContent;
