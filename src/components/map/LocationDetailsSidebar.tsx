
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import { Location } from "@/types";
import VenuePost from "@/components/VenuePost";
import { mockPosts } from "@/mock/data";

interface LocationDetailsSidebarProps {
  location: Location;
  onClose: () => void;
  onViewVibes: (locationId: string) => void;
}

const LocationDetailsSidebar = ({ location, onClose, onViewVibes }: LocationDetailsSidebarProps) => {
  // Helper function to get ride service URL
  const getRideServiceUrl = (place: Location) => {
    // Simulate a partnership with Uber
    const partnerService = "uber";
    
    // Create the deep link to the ride service app
    return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
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

  // Get media for the location
  const getMediaForLocation = (location: Location) => {
    // Return appropriate media based on location type and name
    const imageMap: Record<string, string> = {
      // Sports venues
      "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",  // Lakers
      "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop",  // Rams
      "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?q=80&w=1000&auto=format&fit=crop",  // Dodgers
      "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",  // LA Galaxy
      "34": "https://images.unsplash.com/photo-1530915872-13619796d013?q=80&w=1000&auto=format&fit=crop",    // Volleyball
      "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop",  // Golf
    };

    // Default media based on type if no specific image is available
    const typeDefaultMedia: Record<string, string> = {
      "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
      "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
      "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop",
      "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
      "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    };

    return {
      type: "image" as const,
      url: imageMap[location.id] || typeDefaultMedia[location.type] || `https://source.unsplash.com/random/800x600/?${location.type},${location.city}`
    };
  };

  // Find vibes for a specific location
  const getLocationVibes = (locationId: string) => {
    return mockPosts.filter(post => post.location.id === locationId).slice(0, 2);
  };

  // Get appropriate button text based on venue type
  const getActionButtonText = (type: string) => {
    if (type === "restaurant") return "Reservations";
    if (type === "sports" || type === "event") return "Tickets";
    return "Website";
  };

  return (
    <div className="absolute right-4 top-4 w-1/3 max-h-[70vh] bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{location.name}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground flex items-center mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{location.address}, {location.city}, {location.state}</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <Button className="w-full" onClick={() => onViewVibes(location.id)}>
          View All Vibes
        </Button>
        <div className="flex gap-2">
          <a 
            href={getRideServiceUrl(location)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Order a Ride
            </Button>
          </a>
          <a 
            href={getOfficialUrl(location)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              {getActionButtonText(location.type)}
            </Button>
          </a>
        </div>
      </div>
      
      <h4 className="font-medium text-sm mb-2">Recent Vibes</h4>
      <div className="space-y-4">
        {getLocationVibes(location.id).length > 0 ? (
          getLocationVibes(location.id).map(post => (
            <VenuePost
              key={post.id}
              venue={location}
              content={post.content}
              media={getMediaForLocation(location)}
              timestamp={post.timestamp}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No recent vibes for this location.</p>
        )}
      </div>
    </div>
  );
};

export default LocationDetailsSidebar;
