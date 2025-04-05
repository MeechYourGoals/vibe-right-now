
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Compass, X } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const NearbyVibesMap = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          setLoading(false);
          
          // Filter locations within 10 miles of user
          // In a real app, this would be a backend query
          const nearbyVenues = mockLocations.filter((location) => {
            // Simple distance calculation for demo purposes
            const distance = Math.sqrt(
              Math.pow(location.lat - position.coords.latitude, 2) +
              Math.pow(location.lng - position.coords.longitude, 2)
            );
            // Convert to roughly miles (this is very approximate)
            const milesAway = distance * 69;
            return milesAway <= 10;
          });
          
          setNearbyLocations(nearbyVenues);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          // Use all locations as fallback
          setNearbyLocations(mockLocations);
        }
      );
    } else {
      setLoading(false);
      setNearbyLocations(mockLocations);
    }
  }, []);

  const handleViewMap = () => {
    navigate("/explore");
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
  };

  const handleLocationClick = (locationId: string) => {
    navigate(`/venue/${locationId}`);
  };

  // Helper function to get ride service URL
  const getRideServiceUrl = (place: Location) => {
    // Simulate a partnership with Uber
    const partnerService: string = "uber";
    
    // Create the deep link to the ride service app
    switch (partnerService) {
      case "uber":
        return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
      case "lyft":
        return `https://lyft.com/ride?id=lyft&destination[address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
      case "waymo":
        return "https://waymo.com/";
      default:
        return `https://maps.google.com/?q=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
    }
  };

  // Helper function to get official ticket or venue URL
  const getOfficialUrl = (place: Location) => {
    // For sports venues, we would typically have specific ticket platform partnerships
    if (place.type === "sports") {
      // Use the same logic as in VenuePost to get ticket URLs
      const ticketUrls: Record<string, string> = {
        "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
        "31": "https://www.therams.com/tickets/", // Rams
        "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
        "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
        "34": "https://www.vbusa.org/tickets", // Venice Beach Volleyball
        "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
      };
      
      return ticketUrls[place.id] || `https://seatgeek.com/${place.city.toLowerCase()}-tickets`;
    }
    
    // For events, we'd link to event ticket platforms
    if (place.type === "event") {
      return `https://www.ticketmaster.com/search?q=${encodeURIComponent(place.name)}`;
    }
    
    // For restaurants, we would link to reservation platforms
    if (place.type === "restaurant") {
      return `https://www.opentable.com/s?term=${encodeURIComponent(place.name)}&queryId=${place.id}`;
    }
    
    // For bars and attractions, default to their presumed website
    return `https://${place.name.toLowerCase().replace(/\s+/g, '')}.com`;
  };
  
  return (
    <div className={`space-y-4 ${isMapExpanded ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Nearby Vibes</h2>
        <div className="flex gap-2">
          {isMapExpanded ? (
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <X className="h-4 w-4" />
              Close Map
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <Navigation className="h-4 w-4" />
              Expand Map
            </Button>
          )}
          {!isMapExpanded && (
            <Button variant="ghost" size="sm" className="gap-1" onClick={handleViewMap}>
              <Navigation className="h-4 w-4" />
              View Map
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className={`bg-muted/20 rounded-lg flex items-center justify-center ${isMapExpanded ? "h-[85vh]" : "h-60"}`}>
          <div className="animate-spin">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      ) : (
        <div 
          ref={mapContainerRef}
          className={`relative bg-muted/20 rounded-lg overflow-hidden transition-all ${isMapExpanded ? "h-[85vh]" : "h-60"}`}
        >
          {/* Placeholder for actual map integration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
            {/* Placeholder map dots */}
            {nearbyLocations.map((location, index) => (
              <HoverCard key={location.id} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div 
                    className="absolute animate-pulse h-3 w-3 rounded-full bg-primary cursor-pointer"
                    style={{ 
                      left: `${30 + Math.random() * 40}%`, 
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                    onClick={() => handleLocationClick(location.id)}
                  >
                    <div className="absolute -inset-1 rounded-full bg-primary/30 animate-ping"></div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 p-3">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{location.address}, {location.city}</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => handleLocationClick(location.id)}
                    >
                      View Vibes
                    </Button>
                    <div className="flex gap-2">
                      <a 
                        href={getRideServiceUrl(location)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          Order a Ride
                        </Button>
                      </a>
                      <a 
                        href={getOfficialUrl(location)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          {location.type === "restaurant" ? "Reservations" : 
                           location.type === "sports" || location.type === "event" ? "Tickets" : 
                           "Website"}
                        </Button>
                      </a>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
            
            {/* User location */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-5 w-5 rounded-full bg-accent animate-pulse">
                <div className="absolute -inset-1 rounded-full bg-accent/30 animate-ping"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 glass-effect">
            <p className="text-sm">
              {nearbyLocations.length} Vibes within 10 miles of you
            </p>
          </div>
        </div>
      )}
      
      {!isMapExpanded && (
        <div className="grid grid-cols-2 gap-3">
          {nearbyLocations.slice(0, 4).map((location) => (
            <Card key={location.id} className="hover:bg-muted/20 transition-colors">
              <CardContent className="p-3">
                <div className="font-medium text-sm truncate">{location.name}</div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{location.city}</span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-7 text-xs"
                    onClick={() => handleLocationClick(location.id)}
                  >
                    View Vibes
                  </Button>
                  <div className="flex gap-1">
                    <a 
                      href={getRideServiceUrl(location)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                        Ride
                      </Button>
                    </a>
                    <a 
                      href={getOfficialUrl(location)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                        {location.type === "restaurant" ? "Book" : 
                         location.type === "sports" || location.type === "event" ? "Tickets" : 
                         "Site"}
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!isMapExpanded && nearbyLocations.length > 4 && (
        <Button variant="ghost" size="sm" className="w-full" onClick={handleViewMap}>
          See All {nearbyLocations.length} Nearby Locations
        </Button>
      )}
    </div>
  );
};

export default NearbyVibesMap;
