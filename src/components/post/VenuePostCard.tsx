
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
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
    <Card className="overflow-hidden mb-4 border border-border/50">
      {/* Compact Venue Header - 1/3 smaller than before */}
      <div className="p-3 pb-2">
        <div 
          className="flex items-center justify-between cursor-pointer hover:opacity-80"
          onClick={() => onVenueClick?.(venue.id)}
        >
          <div className="flex items-center gap-2">
            {/* Venue Avatar/Image - smaller */}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              {venue.photos?.[0] ? (
                <img 
                  src={venue.photos[0]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <MapPin className="h-4 w-4 text-primary" />
              )}
            </div>
            
            {/* Venue Info - Taking user name position, more compact */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {venue.name}
                </h3>
                {venue.verified && (
                  <Badge variant="secondary" className="text-xs h-4 px-1">
                    ✓
                  </Badge>
                )}
                {venue.rating && (
                  <span className="text-xs text-muted-foreground">⭐ {venue.rating}</span>
                )}
              </div>
              
              {/* Location and activity info - more compact */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="truncate">{venue.city}, {venue.state}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {posts.length} posts from {uniqueUsers} people recently
                </span>
              </div>
            </div>
          </div>

          {/* Venue Tags - moved to upper right */}
          {venue.vibes && venue.vibes.length > 0 && (
            <div className="flex flex-wrap gap-1 flex-shrink-0 ml-2">
              {venue.vibes.slice(0, 2).map((vibe, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-primary/5 text-primary border-primary/20"
                >
                  {vibe}
                </Badge>
              ))}
              {venue.vibes.length > 2 && (
                <Badge variant="outline" className="text-xs bg-muted/50">
                  +{venue.vibes.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Posts Carousel - Full Size, Instagram-style swipable */}
      <div className="px-0">
        <UserPostCarousel 
          posts={posts}
          onUserClick={onUserClick}
          onLocationClick={onLocationClick}
          fullSize={true}
        />
      </div>

      {/* Compact Engagement Footer */}
      <div className="px-4 py-3 border-t border-border/30">
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
          
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Follow
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VenuePostCard;
