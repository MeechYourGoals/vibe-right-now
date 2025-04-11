
import React from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Clock, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventItem } from "./types";

interface EventListItemProps {
  event: EventItem;
}

const EventListItem = ({ event }: EventListItemProps) => {
  const eventDate = parseISO(event.date);
  const isUpcoming = eventDate > new Date();
  
  const getEventImageUrl = () => {
    if (event.imageUrl) return event.imageUrl;
    
    return event.type === "comedy"
      ? "https://images.unsplash.com/photo-1543584756-31b1d21cecf2?auto=format&fit=crop&w=200&h=200"
      : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&h=200";
  };
  
  const getEventTypeBadgeColor = () => {
    switch (event.type) {
      case "music":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "comedy":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "sports":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
            <img 
              src={getEventImageUrl()} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-primary/70 p-1">
              <p className="text-xs text-white text-center font-medium">{event.price || "Ticket Price"}</p>
            </div>
          </div>
          <div className="flex-1 p-3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="font-medium text-foreground">{format(parseISO(event.date), "EEE, MMM d, yyyy")}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
              <Badge className={`h-fit ${getEventTypeBadgeColor()}`}>
                {event.type === "music" ? "Music" : 
                 event.type === "comedy" ? "Comedy" :
                 event.type === "sports" ? "Sports" : "Event"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.description}</p>
            <div className="flex justify-between items-center mt-3">
              <Badge 
                variant={isUpcoming ? "outline" : "secondary"} 
                className="text-xs"
              >
                {isUpcoming ? "Upcoming" : "Event Date"}
              </Badge>
              <Button size="sm" asChild>
                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                  <Ticket className="h-3.5 w-3.5 mr-1" />
                  Get Tickets
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventListItem;
