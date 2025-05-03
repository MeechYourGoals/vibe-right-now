
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Location } from "@/types";

interface FollowedVenuesSectionProps {
  venues: Location[];
}

const FollowedVenuesSection = ({ venues }: FollowedVenuesSectionProps) => {
  const navigate = useNavigate();
  
  if (venues.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">This user isn't following any venues yet.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h3 className="font-medium text-xl mb-4">Followed Venues</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {venues.map((venue) => (
          <Card 
            key={venue.id} 
            className="hover:bg-accent/10 transition-colors cursor-pointer"
            onClick={() => navigate(`/venue/${venue.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://source.unsplash.com/random/200x200/?${venue.type}`} alt={venue.name} />
                  <AvatarFallback>{venue.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{venue.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{venue.city}, {venue.state || venue.country || "USA"}</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs bg-muted">
                    {venue.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FollowedVenuesSection;
