
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Plus, User } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

interface TripCardProps {
  trip: {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    collaborators: Array<{
      id: string;
      name: string;
      avatar: string;
    }>;
  };
  onInvite: (tripId: string) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onInvite }) => {
  return (
    <Card key={trip.id} className="slide-up-animation">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{trip.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{trip.destination}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-sm mb-3">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>
            {format(parseISO(trip.startDate), "MMM d")} - {format(parseISO(trip.endDate), "MMM d, yyyy")}
          </span>
        </div>
        
        <div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">People on this trip:</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={() => onInvite(trip.id)}
            >
              <Plus className="h-3 w-3 mr-1" /> 
              <User className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex -space-x-2 mt-2">
            {trip.collaborators.map((user) => (
              <Avatar key={user.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/trip/${trip.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Trip</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
