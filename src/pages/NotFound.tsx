
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Search } from "lucide-react";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [suggestedLocations, setSuggestedLocations] = useState<Location[]>([]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Get some random locations as suggestions
    const randomLocations = [...mockLocations]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      
    setSuggestedLocations(randomLocations);
    
    // If this is a venue page that wasn't found, let's try to extract the ID
    if (location.pathname.startsWith('/venue/')) {
      const venueId = location.pathname.split('/venue/')[1];
      if (venueId) {
        // In a real app, we would try to fetch the venue by ID
        // For now, just redirect to a random venue if none found
        const randomVenue = mockLocations[Math.floor(Math.random() * mockLocations.length)];
        setTimeout(() => {
          navigate(`/venue/${randomVenue.id}`);
        }, 2000);
      }
    }
  }, [location.pathname, navigate]);

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/25">
      <div className="text-center max-w-md p-6">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-vibe flex items-center justify-center">
            <MapPin className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 vibe-gradient-text">Redirecting You</h1>
        <p className="text-xl text-muted-foreground mb-6">
          We're finding the best vibes for you. One moment please...
        </p>
        
        {suggestedLocations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-3">Or check out these popular spots:</h2>
            <div className="space-y-2">
              {suggestedLocations.map(spot => (
                <Button 
                  key={spot.id}
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                  onClick={() => navigate(`/venue/${spot.id}`)}
                >
                  <span>{spot.name}</span>
                  <span className="text-xs text-muted-foreground">{spot.city}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-col space-y-2">
          <Button asChild className="bg-gradient-vibe">
            <a href="/" className="flex items-center">
              <Home className="h-4 w-4 mr-2" />
              <span>Back to Discover</span>
            </a>
          </Button>
          
          <Button variant="outline" className="flex items-center" onClick={handleExploreClick}>
            <Search className="h-4 w-4 mr-2" />
            <span>Explore Vibes</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
