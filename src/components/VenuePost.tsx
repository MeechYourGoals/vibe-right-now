
import { formatDistanceToNow } from "date-fns";
import { Location } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VerifiedIcon, Clock, MapPin, Share2, ExternalLink } from "lucide-react";

interface VenuePostProps {
  venue: Location;
  content: string;
  media: {
    type: "image" | "video";
    url: string;
  };
  timestamp: string;
}

// Helper function to get official ticket URLs for sports venues
const getOfficialTicketUrl = (venueId: string) => {
  // Map venue IDs to official ticket URLs
  const ticketUrls: Record<string, string> = {
    "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
    "31": "https://www.therams.com/tickets/", // Rams
    "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
    "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
    "34": "https://www.vbusa.org/tickets", // Venice Beach Volleyball
    "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
  };
  
  // For dynamically generated city locations (format: city-type-index)
  if (venueId.includes('sports')) {
    const city = venueId.split('-')[0];
    if (venueId.includes('basketball')) {
      return `https://tickets.nba.com/${city}`;
    } else if (venueId.includes('football')) {
      return `https://tickets.nfl.com/${city}`;
    } else if (venueId.includes('baseball')) {
      return `https://tickets.mlb.com/${city}`;
    }
    return `https://seatgeek.com/${city}-tickets`;
  }
  
  return ticketUrls[venueId] || "";
};

// Helper function to get ride service URL
const getRideServiceUrl = (place: Location) => {
  return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
};

const VenuePost = ({ venue, content, media, timestamp }: VenuePostProps) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  const officialTicketUrl = venue.type === "sports" ? getOfficialTicketUrl(venue.id) : "";
  const rideUrl = getRideServiceUrl(venue);

  // Helper function to determine the button text based on venue type
  const getActionButtonText = (venueType: string): string => {
    if (venueType === "restaurant") {
      return "Reserve a Spot";
    } else if (venueType === "sports") {
      return "Buy Tickets";
    } else {
      return "Visit Website";
    }
  };

  // Helper function to determine the external link URL based on venue type
  const getExternalLinkUrl = (venue: Location): string => {
    if (venue.type === "restaurant") {
      return `https://www.opentable.com/s?term=${encodeURIComponent(venue.name)}`;
    } else if (venue.type === "sports") {
      return officialTicketUrl;
    } else {
      return `https://${venue.name.toLowerCase().replace(/\s+/g, '')}.com`;
    }
  };

  // Only show the external action button if there's a valid URL
  const showExternalActionButton = (): boolean => {
    if (venue.type === "sports") {
      return !!officialTicketUrl;
    }
    return true;
  };

  return (
    <Card className="vibe-card overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={`https://source.unsplash.com/random/200x200/?${venue.type}`} alt={venue.name} />
              <AvatarFallback>{venue.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium flex items-center">
                {venue.name}
                <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">Official</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Posted {timeAgo}</span>
            </div>
            <div className="flex items-center text-sm mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="font-medium">{venue.city}, {venue.state}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-3">{content}</p>
        <div className="rounded-lg overflow-hidden">
          {media.type === "image" ? (
            <img
              src={media.url}
              alt={`Media by ${venue.name}`}
              className="w-full h-auto object-cover"
            />
          ) : (
            <video
              src={media.url}
              controls
              className="w-full h-auto"
              poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Badge className="bg-secondary/20">Promoted</Badge>
          <Badge variant="outline" className="bg-muted">
            {venue.type}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          
          <Button variant="default" size="sm">
            View Event
          </Button>
        </div>
        
        <div className="flex gap-2 w-full">
          <a 
            href={rideUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              Order a Ride
            </Button>
          </a>
          
          {showExternalActionButton() && (
            <a 
              href={getExternalLinkUrl(venue)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30 w-full"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {getActionButtonText(venue.type)}
              </Button>
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VenuePost;
