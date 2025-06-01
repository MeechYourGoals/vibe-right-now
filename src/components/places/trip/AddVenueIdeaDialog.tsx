
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLocations } from '@/mock/locations';
import { Location } from '@/types';

interface AddVenueIdeaDialogProps {
  onClose: () => void;
  onAddIdea: (venue: Location, notes: string) => void;
}

export const AddVenueIdeaDialog: React.FC<AddVenueIdeaDialogProps> = ({
  onClose,
  onAddIdea
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Location | null>(null);
  const [notes, setNotes] = useState('');

  const searchResults = searchQuery 
    ? mockLocations.filter(venue => 
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleAddIdea = () => {
    if (selectedVenue) {
      onAddIdea(selectedVenue, notes);
      onClose();
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[600px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Propose a Venue</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search venues on VRN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {searchResults.map((venue) => (
              <Card 
                key={venue.id} 
                className={`cursor-pointer transition-colors ${
                  selectedVenue?.id === venue.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedVenue(venue)}
              >
                <CardContent className="p-3">
                  <h4 className="font-medium">{venue.name}</h4>
                  <p className="text-sm text-muted-foreground">{venue.address}</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="outline">{venue.type}</Badge>
                    {venue.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  {venue.rating && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ⭐ {venue.rating}/5
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Selected Venue */}
        {selectedVenue && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Selected: {selectedVenue.name}</h4>
            <p className="text-sm text-blue-700">{selectedVenue.address}</p>
          </div>
        )}
        
        {/* Notes */}
        <div>
          <label className="text-sm font-medium">Notes (optional)</label>
          <Textarea
            placeholder="Why do you think this venue would be great for the trip?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1"
          />
        </div>
        
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddIdea} 
            disabled={!selectedVenue}
          >
            Propose Venue
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
