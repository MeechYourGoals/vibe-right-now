
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Location } from "@/types";

interface AddPlaceDialogProps {
  onClose: () => void;
  onAddPlace: (place: Location, notes: string) => void;
  onSearch: (query: string) => void;
  searchResults: Location[];
}

export const AddPlaceDialog: React.FC<AddPlaceDialogProps> = ({ 
  onClose,
  onAddPlace,
  onSearch,
  searchResults
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [notes, setNotes] = useState("");
  
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Add Place to Trip</DialogTitle>
        <DialogDescription>
          Search for a place to add to your trip itinerary.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="Search for places..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => onSearch(searchQuery)}>Search</Button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="max-h-60 overflow-y-auto border rounded-md">
            {searchResults.map((place) => (
              <div 
                key={place.id} 
                className={`p-3 flex items-center border-b cursor-pointer hover:bg-muted/50 ${selectedPlace?.id === place.id ? 'bg-muted' : ''}`}
                onClick={() => setSelectedPlace(place)}
              >
                <div>
                  <p className="font-medium">{place.name}</p>
                  <p className="text-sm text-muted-foreground">{place.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {selectedPlace && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Selected Place:</p>
            <div className="p-3 border rounded-md">
              <p className="font-medium">{selectedPlace.name}</p>
              <p className="text-sm text-muted-foreground">{selectedPlace.address}, {selectedPlace.city}</p>
            </div>
            
            <div className="space-y-2 mt-4">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (optional)
              </label>
              <Textarea 
                id="notes" 
                placeholder="Add notes about this place" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          onClick={() => {
            if (selectedPlace) {
              onAddPlace(selectedPlace, notes);
            }
          }} 
          disabled={!selectedPlace}
        >
          Add Place
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
