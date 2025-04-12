
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  SendHorizonal,
  MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Location } from '@/types';
import { Separator } from '@/components/ui/separator';
import VenueActionButton from './VenueActionButton';

interface VenuePostFooterProps {
  likes: number;
  comments: number | any[];
  liked?: boolean;
  saved?: boolean;
  venue: Location;
  variant?: "default" | "minimal";
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onVisit?: () => void;
  showLocation?: boolean;
}

const VenuePostFooter = ({
  likes,
  comments,
  liked = false,
  saved = false,
  venue,
  variant = "default",
  onLike,
  onComment,
  onShare,
  onVisit,
  showLocation = true
}: VenuePostFooterProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
    
    if (onLike) {
      onLike();
    }
  };

  // Determine comments count
  let commentsCount = 0;
  if (typeof comments === 'number') {
    commentsCount = comments;
  } else if (Array.isArray(comments)) {
    commentsCount = comments.length;
  }
  
  const handleComment = () => {
    if (onComment) onComment();
  };
  
  const handleShare = () => {
    if (onShare) onShare();
  };
  
  const handleVisit = () => {
    if (onVisit) onVisit();
  };
  
  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <button 
            className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            <span>{likesCount}</span>
          </button>
          
          <button 
            className="flex items-center gap-1"
            onClick={handleComment}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{commentsCount}</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {showLocation && (
            <Badge variant="outline" className="flex items-center gap-1 px-2 py-0 h-5">
              <MapPin className="h-3 w-3" />
              <span className="text-xs truncate max-w-24">{venue.name}</span>
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleShare}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-9 w-9 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9"
            onClick={handleComment}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        
        <VenueActionButton
          variant="outline"
          className="text-xs"
          onClick={handleVisit}
          icon="MapPin"
        >
          Visit
        </VenueActionButton>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <div>
          <div className="font-medium">{likesCount} likes</div>
          <div className="text-muted-foreground">{commentsCount} comments</div>
        </div>
        
        {showLocation && (
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-24">{venue.name}</span>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default VenuePostFooter;
