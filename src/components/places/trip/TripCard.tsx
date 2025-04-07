
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, UserPlus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Dialog } from "@/components/ui/dialog";
import { InviteUserDialog } from "./InviteUserDialog";

interface TripCardProps {
  trip: {
    id: string;
    name: string;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    collaborators: {
      id: string;
      name: string;
      avatar: string;
    }[];
    savedPlaces: number;
  };
  onDeleteTrip: (tripId: string) => void;
  onInviteUser: (tripId: string, email: string) => void;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onDeleteTrip, onInviteUser }) => {
  const navigate = useNavigate();
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const handleViewTrip = () => {
    navigate(`/trip/${trip.id}`);
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md slide-up-animation">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{trip.name}</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => onDeleteTrip(trip.id)}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>{trip.destination}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d, yyyy")}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">{trip.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {trip.collaborators.map((user, i) => (
                <Avatar key={i} className="h-7 w-7 border-2 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <Button 
                  className="h-7 w-7 rounded-full p-0 bg-muted hover:bg-muted/80" 
                  variant="ghost"
                  onClick={() => setIsInviteDialogOpen(true)}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
                <InviteUserDialog 
                  tripName={trip.name} 
                  onClose={() => setIsInviteDialogOpen(false)}
                  onInvite={(email) => {
                    onInviteUser(trip.id, email);
                    setIsInviteDialogOpen(false);
                  }}
                />
              </Dialog>
            </div>
            <div className="text-sm">
              <span className="font-medium">{trip.savedPlaces}</span> places saved
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant="outline"
          onClick={handleViewTrip}
        >
          View Trip
        </Button>
      </CardFooter>
    </Card>
  );
};
