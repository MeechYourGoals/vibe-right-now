
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';

interface TripHeaderProps {
  trip: {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    description?: string;
    collaborators: Array<{
      id: string;
      name: string;
      avatar: string;
    }>;
  };
  userColors: Array<{ id: string; color: string }>;
}

export const TripHeader: React.FC<TripHeaderProps> = ({ trip, userColors }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={() => navigate("/my-places")}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to My Places
        </Button>
        <h1 className="text-2xl font-bold">{trip.name}</h1>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center text-sm mb-2">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center text-sm mb-2">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {format(new Date(trip.startDate), "MMM d")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
              </span>
            </div>
            {trip.description && (
              <p className="text-sm text-muted-foreground mt-2">{trip.description}</p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex flex-col items-start md:items-end">
              <p className="text-sm font-medium mb-2">Trip Collaborators:</p>
              <div className="flex -space-x-2">
                {trip.collaborators.map((user, index) => (
                  <Avatar key={user.id} className="h-8 w-8 border-2 border-background" style={{ borderColor: userColors[index % userColors.length].color }}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
