
import React from 'react';
import { Location } from '@/types';
import { Button } from '@/components/ui/button';
import { ExternalLink, Share, ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';

export interface VenuePostFooterProps {
  venue: Location;
  sourceUrl?: string;
  sourcePlatform?: string;
  officialTicketUrl?: string;
}

const VenuePostFooter: React.FC<VenuePostFooterProps> = ({ 
  venue, 
  sourceUrl, 
  sourcePlatform,
  officialTicketUrl 
}) => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      {(sourceUrl || officialTicketUrl) && (
        <div className="flex flex-wrap gap-2 mb-2">
          {sourceUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => window.open(sourceUrl, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {sourcePlatform || 'View on web'}
            </Button>
          )}
          
          {officialTicketUrl && (
            <Button 
              variant="default" 
              size="sm" 
              className="text-xs h-8 bg-green-600 hover:bg-green-700"
              onClick={() => window.open(officialTicketUrl, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Get Tickets
            </Button>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-xs h-8">
            <ThumbsUp className="h-3 w-3 mr-1" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            <MessageSquare className="h-3 w-3 mr-1" />
            Comment
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-xs h-8">
            <Share className="h-3 w-3 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            <Bookmark className="h-3 w-3 mr-1" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenuePostFooter;
