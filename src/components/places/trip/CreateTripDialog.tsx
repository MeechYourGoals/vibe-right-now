
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface CreateTripDialogProps {
  onClose: () => void;
  onCreateTrip: (tripData: {
    name: string;
    destination: string;
    description: string;
    dateRange: DateRange;
  }) => void;
}

export const CreateTripDialog: React.FC<CreateTripDialogProps> = ({ onClose, onCreateTrip }) => {
  const [tripName, setTripName] = useState("");
  const [tripDestination, setTripDestination] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleCreateTrip = () => {
    if (!tripName || !tripDestination || !dateRange?.from || !dateRange?.to) {
      return;
    }

    onCreateTrip({
      name: tripName,
      destination: tripDestination,
      description: tripDescription,
      dateRange
    });
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Create a New Trip</DialogTitle>
        <DialogDescription>
          Plan your next adventure and save places you want to visit
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="tripName" className="text-sm font-medium">
            Trip Name*
          </label>
          <Input 
            id="tripName" 
            placeholder="Summer Vacation 2025" 
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="destination" className="text-sm font-medium">
            Destination*
          </label>
          <Input 
            id="destination" 
            placeholder="Paris, France" 
            value={tripDestination}
            onChange={(e) => setTripDestination(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Textarea 
            id="description" 
            placeholder="Share details about your trip" 
            value={tripDescription}
            onChange={(e) => setTripDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range*</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleCreateTrip} 
          disabled={!tripName || !tripDestination || !dateRange?.from || !dateRange?.to}
        >
          Create Trip
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
