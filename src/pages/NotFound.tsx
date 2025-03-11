
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/25">
      <div className="text-center max-w-md p-6">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-vibe flex items-center justify-center">
            <MapPin className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 vibe-gradient-text">Vibe Not Found</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Looks like this place doesn't exist yet. The vibe you're looking for is elsewhere.
        </p>
        <Button asChild className="bg-gradient-vibe">
          <a href="/" className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            <span>Back to Discover</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
