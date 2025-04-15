
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Megaphone, Clock, Calendar, MapPin } from "lucide-react";
import { Location } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { mockLocations } from "@/mock/locations";

interface VibeWithMeProps {
  className?: string;
}

const VibeWithMe = ({ className }: VibeWithMeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<string>("evening");
  const [dayOfWeek, setDayOfWeek] = useState<string>("today");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Filter locations based on search query
  const filteredLocations = mockLocations
    .filter(location => 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (location.city && location.city.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 5); // Limit results
  
  const handleBroadcastVibe = () => {
    if (!selectedLocation) return;
    
    toast({
      title: "Vibe Broadcasted!",
      description: `Your close friends have been notified about your vibe at ${selectedLocation.name}.`,
    });
    
    setIsDialogOpen(false);
    setSelectedLocation(null);
    setTimeOfDay("evening");
    setDayOfWeek("today");
    setSearchQuery("");
  };
  
  const dayOptions = [
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
    { value: "friday", label: "Friday" },
  ];
  
  const timeOptions = [
    { value: "morning", label: "Morning" },
    { value: "afternoon", label: "Afternoon" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
  ];
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          Vibe With Me
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Broadcast your plans to your close friends and invite them to join you.
        </p>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Megaphone className="mr-2 h-4 w-4" />
              Broadcast Vibe
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Broadcast Your Vibe</DialogTitle>
              <DialogDescription>
                Let your close friends know where you'll be hanging out.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  placeholder="Search for a place"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-foreground"
                />
                
                {searchQuery && (
                  <div className="mt-1 border rounded-md overflow-hidden">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <div
                          key={location.id}
                          className={`p-2 hover:bg-accent cursor-pointer flex items-center gap-2 ${
                            selectedLocation?.id === location.id ? "bg-accent" : ""
                          }`}
                          onClick={() => {
                            setSelectedLocation(location);
                            setSearchQuery(location.name);
                          }}
                        >
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">{location.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {location.city}, {location.state}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-muted-foreground">No locations found</div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Day</label>
                  <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {dayOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select value={timeOfDay} onValueChange={setTimeOfDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleBroadcastVibe}
                disabled={!selectedLocation}
              >
                Broadcast
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="mt-4 text-sm">
          <p className="font-medium">Recent Broadcasts</p>
          <div className="text-muted-foreground text-center py-6">
            You haven't broadcasted any vibes yet.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VibeWithMe;
