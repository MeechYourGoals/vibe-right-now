
import React, { useState } from 'react';
import { MapPin, VerifiedIcon, Map, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import BusinessHours from "@/components/BusinessHours";
import CheckInButton from "@/components/CheckInButton";
import { toast } from "@/hooks/use-toast";

interface VenueProfileHeaderProps {
  venue: Location;
  onMapExpand: () => void;
}

const getOfficialTicketUrl = (venueId: string) => {
  const ticketUrls: Record<string, string> = {
    "30": "https://www.axs.com/events/crypto-com-arena",
    "31": "https://www.therams.com/tickets/",
    "32": "https://www.mlb.com/dodgers/tickets",
    "33": "https://www.lagalaxy.com/tickets/",
    "34": "https://www.vbusa.org/tickets",
    "35": "https://wmphoenixopen.com/tickets/",
  };
  
  return ticketUrls[venueId] || "";
};

const VenueProfileHeader: React.FC<VenueProfileHeaderProps> = ({ venue, onMapExpand }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    if (isFollowing) {
      toast({
        title: "Unfollowed",
        description: `You are no longer following ${venue.name}`,
      });
    } else {
      toast({
        title: "Following!",
        description: `You are now following ${venue.name}`,
      });
    }
  };
  
  const officialTicketUrl = venue.type === "sports" ? getOfficialTicketUrl(venue.id) : "";

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary">
          <AvatarImage src={`https://source.unsplash.com/random/200x200/?${venue.type}`} alt={venue.name} />
          <AvatarFallback>{venue.name[0]}</AvatarFallback>
        </Avatar>
        
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            {venue.name}
            {venue.verified && (
              <VerifiedIcon className="h-5 w-5 ml-2 text-primary" />
            )}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{venue.address}, {venue.city}, {venue.state}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 p-0 hover:bg-transparent hover:text-primary"
              onClick={onMapExpand}
            >
              <Map className="h-4 w-4" />
              <span className="ml-1 text-xs">View Map</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-muted/30">{venue.type}</Badge>
            <Badge variant="outline" className="bg-primary/20">Open Now</Badge>
          </div>
          
          <BusinessHours venue={venue} />
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <Button 
          variant={isFollowing ? "default" : "outline"}
          onClick={handleFollowToggle}
          className={isFollowing ? "bg-primary" : ""}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
        
        <CheckInButton venue={venue} />
        
        {venue.type === "sports" && officialTicketUrl && (
          <a 
            href={officialTicketUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-2"
          >
            <Button 
              variant="outline" 
              className="bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Buy Tickets Direct
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default VenueProfileHeader;
