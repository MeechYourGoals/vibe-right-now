
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Clock, Heart, MessageCircle, Share } from 'lucide-react';
import { Location, Post } from "@/types";
import UserPostCarousel from './UserPostCarousel';

interface VenuePostCardProps {
  venue: Location;
  posts: Post[];
  onVenueClick?: (venueId: string) => void;
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
}

const VenuePostCard = ({ 
  venue, 
  posts, 
  onVenueClick,
  onUserClick,
  onLocationClick 
}: VenuePostCardProps) => {
  const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
  const totalComments = posts.reduce((sum, post) => sum + (post.comments || 0), 0);
  const uniqueUsers = new Set(posts.map(post => post.user.id)).size;

  return (
    <Card className="overflow-hidden mb-6">
      {/* Venue Header */}
      <div 
        className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b cursor-pointer hover:bg-primary/15 transition-colors"
        onClick={() => onVenueClick?.(venue.id)}
      >
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center overflow-hidden">
            {venue.photos?.[0] ? (
              <img 
                src={venue.photos[0]} 
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <MapPin className="h-8 w-8 text-primary" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground truncate">
                {venue.name}
              </h3>
              {venue.verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{venue.city}, {venue.state}</span>
              </div>
              {venue.rating && (
                <div className="flex items-center gap-1">
                  <span>⭐ {venue.rating}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{posts.length} posts from {uniqueUsers} users</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{posts[0]?.timestamp ? new Date(posts[0].timestamp).toLocaleDateString() : 'Recently'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Tags */}
        {venue.vibes && venue.vibes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {venue.vibes.slice(0, 3).map((vibe, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-background/50"
              >
                {vibe}
              </Badge>
            ))}
            {venue.vibes.length > 3 && (
              <Badge variant="outline" className="text-xs bg-background/50">
                +{venue.vibes.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* User Posts Carousel */}
      <div className="p-0">
        <UserPostCarousel 
          posts={posts}
          onUserClick={onUserClick}
          onLocationClick={onLocationClick}
        />
      </div>

      {/* Venue Engagement Summary */}
      <div className="px-4 py-3 border-t bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{totalLikes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{totalComments}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Follow
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VenuePostCard;
