
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Post, Media, User, Location } from '@/types';

interface ProfileTabContentProps {
  posts?: Post[];
  activeTab: string;
  user?: User;
  locations?: Location[];
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({ 
  posts = [], 
  activeTab, 
  user, 
  locations = [] 
}) => {
  const renderMedia = (media: string[] | Media[] | undefined) => {
    if (!media || media.length === 0) return null;
    
    const firstMedia = media[0];
    const mediaUrl = typeof firstMedia === 'string' ? firstMedia : firstMedia.url;
    
    return (
      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
        <img 
          src={mediaUrl} 
          alt="Post media" 
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  const filteredPosts = posts.filter(post => {
    switch (activeTab) {
      case 'posts':
        return true;
      case 'photos':
        return post.media && post.media.length > 0;
      case 'videos':
        return post.media && Array.isArray(post.media) && post.media.some(m => 
          typeof m === 'object' ? m.type === 'video' : false
        );
      case 'vibes':
        return post.vibes && post.vibes.length > 0;
      default:
        return true;
    }
  });

  // Handle location-based tabs (venues, visited, wishlist)
  if (['venues', 'visited', 'wishlist'].includes(activeTab) && locations) {
    const getTabTitle = () => {
      switch (activeTab) {
        case 'venues': return 'Followed Venues';
        case 'visited': return 'Visited Places';
        case 'wishlist': return 'Wishlist';
        default: return 'Places';
      }
    };

    const getEmptyMessage = () => {
      switch (activeTab) {
        case 'venues': return 'No venues followed yet';
        case 'visited': return 'No places visited yet';
        case 'wishlist': return 'No places in wishlist yet';
        default: return 'No places found';
      }
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{getTabTitle()}</h3>
        {locations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{getEmptyMessage()}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => (
              <div key={location.id} className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-foreground">{location.name}</h4>
                <p className="text-sm text-muted-foreground">{location.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{location.type}</Badge>
                  {location.rating && (
                    <span className="text-sm">⭐ {location.rating}</span>
                  )}
                </div>
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
            ))}
          </div>
        )}
      </div>
    );
  }

  // Handle vibes tab
  if (activeTab === 'vibes') {
    return (
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm mb-3">{post.content}</p>
            
            {post.vibes && post.vibes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.vibes.map((vibe, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {vibe}
                  </Badge>
                ))}
              </div>
            )}
            
            {renderMedia(post.media)}
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span className="text-xs">{post.shares || 0}</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Handle posts tab (grid view)
  return (
    <div className="space-y-4">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {filteredPosts.map((post) => (
            <div key={post.id} className="aspect-square bg-muted rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
              {renderMedia(post.media)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileTabContent;
