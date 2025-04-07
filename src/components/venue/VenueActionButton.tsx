
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Check } from "lucide-react";
import { Location } from "@/types";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface VenueActionButtonProps {
  venue: Location;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const VenueActionButton: React.FC<VenueActionButtonProps> = ({ 
  venue, 
  variant = "outline", 
  size = "sm",
  className = "" 
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<string | undefined>(undefined);
  
  // Mock trips data - in a real app, this would come from a global state or API
  const trips = [
    { id: "trip1", name: "Summer in Paris" },
    { id: "trip2", name: "Tokyo Adventure" },
    { id: "trip3", name: "Barcelona Weekend" }
  ];
  
  const handleSaveToWantToVisit = () => {
    // In a real app, this would save to a database or state
    setIsAdded(true);
    toast.success(`Added ${venue.name} to your "Want to Visit" list`);
  };
  
  const handleSaveToTrip = () => {
    if (!selectedTrip) {
      toast.error("Please select a trip");
      return;
    }
    
    // In a real app, this would save to the selected trip
    const tripName = trips.find(t => t.id === selectedTrip)?.name;
    toast.success(`Added ${venue.name} to "${tripName}"`);
    setIsDialogOpen(false);
    setSelectedTrip(undefined);
    setIsAdded(true);
  };
  
  return (
    <>
      {isAdded ? (
        <Button 
          variant="default" 
          size={size} 
          className={`flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white ${className}`}
          disabled
        >
          <Check className="h-4 w-4" />
          <span>Saved</span>
        </Button>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant={variant} 
              size={size} 
              className={`flex items-center gap-1 ${className}`}
            >
              <BookmarkPlus className="h-4 w-4" />
              <span>Want to Visit</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save {venue.name}</DialogTitle>
              <DialogDescription>
                Add this place to your "Want to Visit" list or to a specific trip
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tripSelect">Add to Trip (Optional)</Label>
                <Select value={selectedTrip} onValueChange={setSelectedTrip}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trip" />
                  </SelectTrigger>
                  <SelectContent>
                    {trips.map((trip) => (
                      <SelectItem key={trip.id} value={trip.id}>
                        {trip.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  You can add this place to a specific trip or just save it to your general list
                </p>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={handleSaveToWantToVisit}
                className="flex-1"
              >
                Save to General List
              </Button>
              <Button 
                onClick={handleSaveToTrip}
                className="flex-1"
                disabled={!selectedTrip}
              >
                Save to Trip
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default VenueActionButton;
