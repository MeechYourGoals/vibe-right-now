
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Car, ExternalLink, BookmarkPlus } from "lucide-react";
import { Location } from "@/types";
import { toast } from "sonner";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

type PlaceCardProps = {
  place: Location;
  visitType: "visited" | "planned";
};

// Helper function to get ride service URL
const getRideServiceUrl = (place: Location) => {
  return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
};

// Helper function to get official ticket or venue URL
const getOfficialUrl = (place: Location) => {
  // For sports venues, we would typically have specific ticket platform partnerships
  if (place.type === "sports") {
    // Use the same logic as in VenuePost to get ticket URLs
    const ticketUrls: Record<string, string> = {
      "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
      "31": "https://www.therams.com/tickets/", // Rams
      "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
      "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
      "34": "https://www.vbusa.org/tickets/", // Venice Beach Volleyball
      "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
    };
    
    return ticketUrls[place.id] || `https://seatgeek.com/${place.city.toLowerCase()}-tickets`;
  }
  
  // For events, we'd link to event ticket platforms
  if (place.type === "event") {
    return `https://www.ticketmaster.com/search?q=${encodeURIComponent(place.name)}`;
  }
  
  // For restaurants, we would link to reservation platforms
  if (place.type === "restaurant") {
    return `https://www.opentable.com/s?term=${encodeURIComponent(place.name)}&queryId=${place.id}`;
  }
  
  // For bars and attractions, default to their presumed website
  return `https://${place.name.toLowerCase().replace(/\s+/g, '')}.com`;
};

const PlaceCard = ({ place, visitType }: PlaceCardProps) => {
  const rideServiceUrl = getRideServiceUrl(place);
  const officialUrl = getOfficialUrl(place);
  const placeMedia = getMediaForLocation(place);
  
  const handleSaveToWantToVisit = () => {
    toast.success(`Added ${place.name} to your "Want to Visit" list`);
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-48 md:h-auto relative">
          <img 
            src={placeMedia.url} 
            alt={place.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              // Fallback to a specific image if loading fails
              (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=600";
            }}
          />
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>{place.name}</CardTitle>
              {visitType === "visited" ? (
                <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs font-medium px-2 py-1 rounded">
                  Visited
                </div>
              ) : (
                <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 text-xs font-medium px-2 py-1 rounded">
                  Want to Visit
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{place.address}, {place.city}, {place.state}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Star className="mr-2 h-4 w-4" />
                <span>{(Math.random() * 2 + 3).toFixed(1)} Stars</span>
              </div>
              
              {visitType === "visited" && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Visited {Math.floor(Math.random() * 12) + 1} months ago</span>
                </div>
              )}
              
              <p className="mt-2">
                {place.type === "restaurant" && "Great food and amazing atmosphere. Would definitely recommend!"}
                {place.type === "bar" && "Cool vibes, great drinks. Perfect spot for evening hangouts."}
                {place.type === "event" && "Amazing experience. The crowd was really into it."}
                {place.type === "sports" && "Great venue with perfect views of the action."}
                {place.type === "attraction" && "Worth the visit. Stunning views and unique experience."}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {visitType === "visited" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={handleSaveToWantToVisit}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                    <span>Want to Visit Again</span>
                  </Button>
                )}
                
                <a href={rideServiceUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    <span>Order a Ride</span>
                  </Button>
                </a>
                
                <a href={officialUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span>
                      {place.type === "sports" ? "Buy Tickets" : 
                       place.type === "restaurant" ? "Reserve a Table" : 
                       place.type === "event" ? "Get Tickets" : 
                       "Official Site"}
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default PlaceCard;
