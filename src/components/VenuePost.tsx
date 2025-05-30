
import React from "react";
import { Location } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getOfficialTicketUrl } from "@/utils/venue/venuePostUtils";
import VenuePostHeader from "@/components/venue/VenuePostHeader";
import VenuePostContent from "@/components/venue/VenuePostContent";
import VenuePostFooter from "@/components/venue/VenuePostFooter";

interface VenuePostProps {
  venue: Location;
  content: string;
  media: {
    type: "image" | "video";
    url: string;
  };
  timestamp: string;
  sourceUrl?: string; // URL to the original post on external platform
  sourcePlatform?: string; // Name of the source platform
  timeAgo?: string; // Time elapsed since posting
}

const VenuePost = ({ 
  venue, 
  content, 
  media, 
  timestamp, 
  sourceUrl, 
  sourcePlatform,
  timeAgo
}: VenuePostProps) => {
  const officialTicketUrl = venue.type === "sports" ? getOfficialTicketUrl(venue.id) : "";
  const isExternalContent = !!sourceUrl;

  return (
    <Card className={`vibe-card overflow-hidden ${isExternalContent ? 'border-blue-500/50' : ''}`}>
      <CardHeader className="p-4 pb-0">
        <VenuePostHeader 
          venue={venue} 
          timestamp={timestamp} 
          isExternalContent={isExternalContent}
          sourcePlatform={sourcePlatform}
          timeAgo={timeAgo}
        />
      </CardHeader>
      <CardContent className="p-4">
        <VenuePostContent 
          content={content}
          media={media}
          timestamp={timestamp}
          venueType={venue.type}
        />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <VenuePostFooter 
          venue={venue} 
          officialTicketUrl={officialTicketUrl}
          sourceUrl={sourceUrl}
          sourcePlatform={sourcePlatform}
        />
      </CardFooter>
    </Card>
  );
};

export default VenuePost;
