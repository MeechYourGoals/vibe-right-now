
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TripCard } from './trip/TripCard';
import { CreateTripDialog } from './trip/CreateTripDialog';
import { EmptyTripState } from './trip/EmptyTripState';
import { useTripManager } from './trip/useTripManager';

const TripsList: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { trips, createTrip, deleteTrip, inviteUserToTrip } = useTripManager();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Trips</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 slide-up-animation">
              <PlusCircle className="h-4 w-4" />
              Create New Trip
            </Button>
          </DialogTrigger>
          <CreateTripDialog 
            onClose={() => setIsCreateDialogOpen(false)}
            onCreateTrip={(tripData) => {
              createTrip(tripData);
              setIsCreateDialogOpen(false);
            }}
          />
        </Dialog>
      </div>
      
      {trips.length === 0 ? (
        <EmptyTripState onCreateTrip={() => setIsCreateDialogOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard 
              key={trip.id} 
              trip={trip} 
              onDeleteTrip={deleteTrip}
              onInviteUser={inviteUserToTrip}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsList;
