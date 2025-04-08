
import { useState } from "react";
import { Building, MapPin, Phone, Globe, Clock, Video, Star, DollarSign } from "lucide-react";
import { Location } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import BusinessHours from "@/components/BusinessHours";
import VenueActionButton from "./VenueActionButton";
import { getOfficialUrl, getActionButtonText } from "@/utils/locationUtils";

interface VenueProfileHeaderProps {
  venue: Location;
  onMapExpand: () => void;
}

// Function to determine price tier (1-4) based on venue properties
const getPriceTier = (venue: Location): number => {
  // In a real app, this would be part of the venue data
  // For now, let's create a simple algorithm based on the venue type and other properties
  const basePrice = {
    restaurant: 2,
    bar: 2,
    event: 3,
    attraction: 2,
    sports: 3,
    other: 2
  }[venue.type] || 2;
  
  // Randomize slightly based on venue id to make it look more natural
  const idSum = venue.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  let adjustment = (idSum % 3) - 1; // -1, 0, or 1
  
  // Ensure price is between 1 and 4
  return Math.max(1, Math.min(4, basePrice + adjustment));
};

// Function to render dollar signs based on price tier
const renderPriceTier = (tier: number) => {
  const dollars = Array(tier).fill('$').join('');
  return (
    <span className="flex items-center">
      <span className={`font-semibold ${tier > 2 ? 'text-amber-500' : 'text-green-600'}`}>{dollars}</span>
      <span className="text-muted-foreground ml-1">
        {Array(4 - tier).fill('$').join('')}
      </span>
    </span>
  );
};

// Function to get the appropriate RSVP button text based on venue type
const getRSVPButtonText = (venue: Location): string => {
  switch (venue.type) {
    case 'restaurant':
      return 'Make Reservation';
    case 'bar':
      return 'Book Table';
    case 'event':
      return 'Buy Tickets';
    case 'sports':
      return 'Get Tickets';
    case 'attraction':
      return 'Get Passes';
    default:
      return 'RSVP';
  }
};

const VenueProfileHeader = ({ venue, onMapExpand }: VenueProfileHeaderProps) => {
  const priceTier = getPriceTier(venue);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showLivestream, setShowLivestream] = useState(false);
  
  // Simulate livestreaming capability for Pro users (random venues would have it)
  const hasLivestream = venue.id.charCodeAt(0) % 3 === 0;
  
  const toggleLivestream = () => {
    setShowLivestream(!showLivestream);
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          {venue.name}
          {venue.verified && (
            <div className="ml-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>
            </div>
          )}
          {hasLivestream && (
            <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-500 border-red-300 cursor-pointer" onClick={toggleLivestream}>
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              LIVE
            </Badge>
          )}
        </h1>
        
        <div className="flex flex-col items-end">
          <div className="flex gap-2 mb-1">
            <Badge variant="outline" className="capitalize">{venue.type}</Badge>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="cursor-help">{renderPriceTier(priceTier)}</div>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2">
                <p className="text-sm">Price level: {priceTier}/4</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {venue.address}, {venue.city}, {venue.state}
            </span>
          </div>
        </div>
      </div>
      
      {showLivestream && hasLivestream && (
        <div className="mt-4 bg-black aspect-video rounded-md flex items-center justify-center relative">
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="outline" className="bg-red-500 text-white border-red-700">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </Badge>
          </div>
          <div className="text-center text-white">
            <Video className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm opacity-70">Live stream from {venue.name}</p>
            <p className="text-xs mt-1 opacity-50">Viewers: {Math.floor(Math.random() * 100) + 10}</p>
          </div>
        </div>
      )}
      
      <BusinessHours venue={venue} />
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button variant="outline" className="flex justify-start">
          <Phone className="h-4 w-4 mr-2" /> Call Venue
        </Button>
        <Button variant="outline" className="flex justify-start">
          <Globe className="h-4 w-4 mr-2" /> Website
        </Button>
        <Button variant="outline" className="flex justify-start">
          <Clock className="h-4 w-4 mr-2" /> Want to Visit
        </Button>
        <a 
          href={getOfficialUrl(venue)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" className="w-full flex justify-start">
            <Clock className="h-4 w-4 mr-2" /> {getRSVPButtonText(venue)}
          </Button>
        </a>
      </div>

      {venue.hours && venue.hours.isOpen24Hours && (
        <Badge className="mt-2 bg-green-500 hover:bg-green-600">Open 24 Hours</Badge>
      )}
    </div>
  );
};

export default VenueProfileHeader;
