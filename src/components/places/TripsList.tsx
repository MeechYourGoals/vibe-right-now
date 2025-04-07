
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, MapPin, UserPlus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/mock/data";
import { DateRange } from "react-day-picker";

interface Trip {
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
}

const TripsList: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  
  useEffect(() => {
    // Check localStorage for trips data
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      try {
        // Parse dates correctly
        const parsedTrips = JSON.parse(storedTrips, (key, value) => {
          if (key === 'startDate' || key === 'endDate') {
            return new Date(value);
          }
          return value;
        });
        setTrips(parsedTrips);
      } catch (err) {
        console.error('Error parsing stored trips:', err);
        // Fallback to default trips
        setTrips(getDefaultTrips());
      }
    } else {
      // Use default trips
      const defaultTrips = getDefaultTrips();
      setTrips(defaultTrips);
      // Save to localStorage
      localStorage.setItem('trips', JSON.stringify(defaultTrips));
    }
  }, []);
  
  const getDefaultTrips = (): Trip[] => {
    return [
      {
        id: "1",
        name: "Summer in Paris",
        destination: "Paris, France",
        description: "Family vacation exploring the City of Light",
        startDate: new Date(2025, 6, 15),
        endDate: new Date(2025, 6, 22),
        collaborators: [
          { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
          { id: "2", name: mockUsers[1].name, avatar: mockUsers[1].avatar },
        ],
        savedPlaces: 8
      },
      {
        id: "2",
        name: "Tokyo Adventure",
        destination: "Tokyo, Japan",
        description: "Exploring Japanese culture and cuisine",
        startDate: new Date(2025, 9, 5),
        endDate: new Date(2025, 9, 15),
        collaborators: [
          { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
        ],
        savedPlaces: 5
      }
    ];
  };
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  
  // New trip form state
  const [newTripName, setNewTripName] = useState("");
  const [newTripDestination, setNewTripDestination] = useState("");
  const [newTripDescription, setNewTripDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  
  // Invite form state
  const [inviteEmail, setInviteEmail] = useState("");
  
  const handleCreateTrip = () => {
    if (!newTripName || !newTripDestination || !dateRange?.from || !dateRange?.to) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newTrip: Trip = {
      id: Date.now().toString(),
      name: newTripName,
      destination: newTripDestination,
      description: newTripDescription,
      startDate: dateRange.from,
      endDate: dateRange.to,
      collaborators: [
        { id: "1", name: mockUsers[0].name, avatar: mockUsers[0].avatar },
      ],
      savedPlaces: 0
    };
    
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    
    // Save to localStorage
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    
    // Reset form
    setNewTripName("");
    setNewTripDestination("");
    setNewTripDescription("");
    setDateRange({ from: undefined, to: undefined });
    
    toast.success("Trip created successfully!");
    setIsCreateDialogOpen(false);
  };
  
  const handleInviteUser = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    
    // Find the trip
    const trip = trips.find(t => t.id === selectedTripId);
    if (trip) {
      // In a real app, this would send an email invitation
      // For now, we'll just simulate adding a user
      const updatedTrips = trips.map(t => {
        if (t.id === selectedTripId) {
          // Add a mock user
          const newCollaborator = {
            id: (t.collaborators.length + 1).toString(),
            name: `Invited User ${t.collaborators.length + 1}`,
            avatar: mockUsers[Math.floor(Math.random() * mockUsers.length)].avatar
          };
          
          return {
            ...t,
            collaborators: [...t.collaborators, newCollaborator]
          };
        }
        return t;
      });
      
      setTrips(updatedTrips);
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    }
    
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setIsInviteDialogOpen(false);
  };
  
  const handleDeleteTrip = (tripId: string) => {
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    setTrips(updatedTrips);
    
    // Save to localStorage
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    
    toast.success("Trip deleted successfully");
  };
  
  const handleViewTrip = (tripId: string) => {
    navigate(`/trip/${tripId}`);
  };
  
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
                  value={newTripName}
                  onChange={(e) => setNewTripName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="destination" className="text-sm font-medium">
                  Destination*
                </label>
                <Input 
                  id="destination" 
                  placeholder="Paris, France" 
                  value={newTripDestination}
                  onChange={(e) => setNewTripDestination(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea 
                  id="description" 
                  placeholder="Share details about your trip" 
                  value={newTripDescription}
                  onChange={(e) => setNewTripDescription(e.target.value)}
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
                      <Calendar className="mr-2 h-4 w-4" />
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
                    <CalendarComponent
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
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTrip}>Create Trip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {trips.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No trips planned yet</h3>
          <p className="text-muted-foreground mb-4">Create your first trip and start saving places to visit!</p>
          <Button 
            variant="outline" 
            onClick={() => setIsCreateDialogOpen(true)}
            className="mt-2"
          >
            Create Trip
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card key={trip.id} className="transition-all duration-300 hover:shadow-md slide-up-animation">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{trip.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => handleDeleteTrip(trip.id)}
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
                      <Dialog 
                        open={isInviteDialogOpen && selectedTripId === trip.id} 
                        onOpenChange={(open) => {
                          setIsInviteDialogOpen(open);
                          if (open) setSelectedTripId(trip.id);
                          else setSelectedTripId(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button 
                            className="h-7 w-7 rounded-full p-0 bg-muted hover:bg-muted/80" 
                            variant="ghost"
                            onClick={() => setSelectedTripId(trip.id)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invite to Trip</DialogTitle>
                            <DialogDescription>
                              Invite friends to collaborate on {trip.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium">
                                Email Address
                              </label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="friend@example.com" 
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                They'll receive an invite to join this trip and Vibe Right Now
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleInviteUser}>Send Invite</Button>
                          </DialogFooter>
                        </DialogContent>
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
                  onClick={() => handleViewTrip(trip.id)}
                >
                  View Trip
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsList;
