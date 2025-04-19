
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { cn } from "@/lib/utils";
import { getActionButtonText } from "@/utils/locationUtils";
import VibeTags from "./VibeTags";

export interface LocationCardProps {
  location: Location;
  featured?: boolean;
  discount?: number;
  customButton?: React.ReactNode;
  vibes?: string[];
}

const LocationCard = ({ 
  location, 
  featured = false, 
  discount,
  customButton,
  vibes 
}: LocationCardProps) => {
  // Default image if the location doesn't have one
  const locationImage = 
    location.photos && location.photos.length > 0 
      ? location.photos[0] 
      : `https://source.unsplash.com/featured/?${location.type || 'venue'}`;
  
  const isOpen = Math.random() > 0.2; // 80% chance of being open for demo purposes
  
  const getRating = () => {
    // Generate a deterministic rating based on the location id
    const seed = parseInt(location.id) || location.id.charCodeAt(0);
    return (3.5 + (seed % 20) / 10).toFixed(1); // Rating between 3.5 and 5.0
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md relative", 
      featured && "border-primary"
    )}>
      {discount && (
        <Badge className="absolute top-2 right-2 z-10 bg-red-500">
          {discount}% OFF
        </Badge>
      )}
      
      {featured && (
        <Badge variant="outline" className="absolute top-2 left-2 z-10 bg-primary/20 text-primary border-primary/30">
          Featured
        </Badge>
      )}
      
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={locationImage} 
          alt={location.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardContent className="p-3">
        <Link to={`/venue/${location.id}`}>
          <h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
            {location.name}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{location.city}, {location.state}</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-amber-500 mr-1" />
            <span className="text-sm font-medium">{getRating()}</span>
          </div>
          
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span className={cn(
              isOpen ? "text-emerald-600" : "text-red-500"
            )}>
              {isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>
        
        {vibes && vibes.length > 0 && (
          <div className="mt-2">
            <VibeTags tags={vibes} size="sm" />
          </div>
        )}
        
        <div className="mt-3">
          {customButton || (
            <Button 
              size="sm" 
              className="w-full text-xs" 
              variant="outline"
              asChild
            >
              <a href={`https://maps.google.com/?q=${location.address}, ${location.city}, ${location.state}`} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                {getActionButtonText(location.type || 'venue')}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
