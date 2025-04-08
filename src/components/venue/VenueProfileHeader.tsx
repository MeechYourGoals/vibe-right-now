
import { Building, MapPin, Phone, Globe, Clock, StarIcon, VerifiedIcon, DollarSign } from "lucide-react";
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

const VenueProfileHeader = ({ venue, onMapExpand }: VenueProfileHeaderProps) => {
  const priceTier = getPriceTier(venue);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          {venue.name}
          {venue.verified && (
            <VerifiedIcon className="h-5 w-5 ml-2 text-primary" />
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
      
      <BusinessHours venue={venue} />
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button variant="outline" className="flex justify-start">
          <Phone className="h-4 w-4 mr-2" /> Call Venue
        </Button>
        <Button variant="outline" className="flex justify-start">
          <Globe className="h-4 w-4 mr-2" /> Website
        </Button>
        <VenueActionButton venue={venue} variant="outline" className="flex justify-start" />
        <a 
          href={getOfficialUrl(venue)} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" className="w-full flex justify-start">
            <Clock className="h-4 w-4 mr-2" /> {getActionButtonText(venue.type)}
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
