
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, ChevronLeft, PlusCircle, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { mockLocations } from "@/mock/locations";
import { TripPlace } from "./TripPlace";
import { Location } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getRideServiceUrl, getOfficialUrl, getActionButtonText } from "@/utils/locationUtils";

// Mock colors for users
const userColors = [
  { id: "1", color: "#3b82f6" }, // Blue
  { id: "2", color: "#ec4899" }, // Pink
  { id: "3", color: "#10b981" }, // Green
  { id: "4", color: "#f59e0b" }, // Amber
  { id: "5", color: "#8b5cf6" }, // Purple
];

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  
  const [trip, setTrip] = useState<any>(null);
  const [places, setPlaces] = useState<TripPlace[]>([]);
  const [isAddPlaceDialogOpen, setIsAddPlaceDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  const [notes, setNotes] = useState("");
  
  // Fetch trip and places data
  useEffect(() => {
    // In a real app, this would be an API call
    const storedTrips = localStorage.getItem('trips');
    let tripsData = storedTrips ? JSON.parse(storedTrips) : [];
    
    const foundTrip = tripsData.find((t: any) => t.id === tripId);
    
    if (foundTrip) {
      setTrip(foundTrip);
      
      // Generate some mock places for the trip if none exist
      const storedPlaces = localStorage.getItem(`trip_places_${tripId}`);
      if (storedPlaces) {
        setPlaces(JSON.parse(storedPlaces));
      } else {
        // Generate mock data if no stored places
        const mockPlaces: TripPlace[] = foundTrip.collaborators.flatMap((user: any, index: number) => {
          // Each user adds 1-2 random places
          const numPlaces = Math.floor(Math.random() * 2) + 1;
          return Array(numPlaces).fill(0).map((_, i) => {
            const randomLocationIndex = Math.floor(Math.random() * mockLocations.length);
            return {
              id: `place_${user.id}_${i}`,
              place: mockLocations[randomLocationIndex],
              addedBy: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                colorCode: userColors[index % userColors.length].color
              },
              notes: `Added by ${user.name}`,
              addedAt: new Date(Date.now() - Math.random() * 86400000 * 5) // Random date within last 5 days
            };
          });
        });
        
        setPlaces(mockPlaces);
        localStorage.setItem(`trip_places_${tripId}`, JSON.stringify(mockPlaces));
      }
    } else {
      toast.error("Trip not found");
      navigate("/my-places");
    }
  }, [tripId, navigate]);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Simple search from mock locations
    const results = mockLocations.filter(
      location => location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results.slice(0, 5)); // Limit to 5 results
  };
  
  const handleAddPlace = () => {
    if (!selectedPlace) {
      toast.error("Please select a place to add");
      return;
    }
    
    // Get the first user (current user) color
    const userColor = userColors[0].color;
    
    const newPlace: TripPlace = {
      id: `place_${Date.now()}`,
      place: selectedPlace,
      addedBy: {
        id: "1", // Current user ID
        name: trip.collaborators[0].name,
        avatar: trip.collaborators[0].avatar,
        colorCode: userColor
      },
      notes: notes,
      addedAt: new Date()
    };
    
    const updatedPlaces = [...places, newPlace];
    setPlaces(updatedPlaces);
    
    // Save to localStorage
    localStorage.setItem(`trip_places_${tripId}`, JSON.stringify(updatedPlaces));
    
    // Reset form
    setSelectedPlace(null);
    setNotes("");
    setSearchQuery("");
    setSearchResults([]);
    setIsAddPlaceDialogOpen(false);
    
    toast.success("Place added to trip!");
  };
  
  if (!trip) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading trip details...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
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
                  {trip.collaborators.map((user: any, index: number) => (
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
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Places to Visit</h2>
          <Dialog open={isAddPlaceDialogOpen} onOpenChange={setIsAddPlaceDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Place
              </Button>
            </DialogTrigger>
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
                  <Button onClick={handleSearch}>Search</Button>
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
                <Button variant="outline" onClick={() => setIsAddPlaceDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddPlace} disabled={!selectedPlace}>Add Place</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {places.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No places added yet</h3>
            <p className="text-muted-foreground mb-4">Start adding places to visit during your trip!</p>
            <Button 
              variant="outline" 
              onClick={() => setIsAddPlaceDialogOpen(true)}
              className="mt-2"
            >
              Add Place
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((placeItem) => {
              const colorCode = placeItem.addedBy.colorCode;
              
              return (
                <Card 
                  key={placeItem.id} 
                  className="transition-all duration-300 hover:shadow-md slide-up-animation"
                  style={{ borderLeft: `4px solid ${colorCode}` }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{placeItem.place.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{placeItem.place.city}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Open hours: 9AM-10PM</span>
                    </div>
                    
                    {placeItem.notes && (
                      <p className="text-sm text-muted-foreground mt-2 italic">"{placeItem.notes}"</p>
                    )}
                    
                    <div className="flex items-center mt-3">
                      <p className="text-xs">Added by</p>
                      <Avatar className="h-5 w-5 ml-2 mr-1">
                        <AvatarImage src={placeItem.addedBy.avatar} alt={placeItem.addedBy.name} />
                        <AvatarFallback>{placeItem.addedBy.name[0]}</AvatarFallback>
                      </Avatar>
                      <span 
                        className="text-xs font-medium" 
                        style={{ color: colorCode }}
                      >
                        {placeItem.addedBy.name}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <a 
                      href={getRideServiceUrl(placeItem.place)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">Order Ride</Button>
                    </a>
                    <a 
                      href={getOfficialUrl(placeItem.place)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                        <span className="mr-1">Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TripDetails;
