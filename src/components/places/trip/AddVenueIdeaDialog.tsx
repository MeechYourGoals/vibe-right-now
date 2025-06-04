
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Star } from "lucide-react";
import { mockLocations } from "@/mock/locations";

interface AddVenueIdeaDialogProps {
  onAddVenue: (venueData: any) => void;
  onClose: () => void;
}

interface VenueSearchResult {
  id: string;
  name: string;
  address: string;
  city: string;
  rating?: number;
  image_url?: string;
  type: string;
}

const AddVenueIdeaDialog: React.FC<AddVenueIdeaDialogProps> = ({
  onAddVenue,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<VenueSearchResult[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<VenueSearchResult | null>(null);
  const [notes, setNotes] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchVenues = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API search using mock data
    setTimeout(() => {
      const results = mockLocations
        .filter(location => 
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.type.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6)
        .map(location => ({
          id: location.id,
          name: location.name,
          address: location.address,
          city: location.city,
          rating: location.rating,
          image_url: '/placeholder.svg',
          type: location.type
        }));
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleSubmit = () => {
    if (!selectedVenue) return;
    
    onAddVenue({
      ...selectedVenue,
      notes
    });
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Propose a Venue</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for venues, restaurants, attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchVenues()}
              className="flex-1"
            />
            <Button onClick={searchVenues} disabled={isSearching}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {isSearching && (
            <p className="text-center text-muted-foreground">Searching venues...</p>
          )}
          
          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
              {searchResults.map((venue) => (
                <Card
                  key={venue.id}
                  className={`cursor-pointer transition-colors ${
                    selectedVenue?.id === venue.id ? 'ring-2 ring-blue-500' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedVenue(venue)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{venue.name}</h4>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{venue.address}, {venue.city}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {venue.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{venue.rating.toFixed(1)}</span>
                            </div>
                          )}
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {venue.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Selected Venue */}
        {selectedVenue && (
          <div className="space-y-4">
            <h3 className="font-medium">Selected Venue</h3>
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium">{selectedVenue.name}</h4>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{selectedVenue.address}, {selectedVenue.city}</span>
                </div>
                {selectedVenue.rating && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{selectedVenue.rating.toFixed(1)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea
                placeholder="Why do you think this venue would be great for the trip?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedVenue}
          >
            Propose Venue
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AddVenueIdeaDialog;
