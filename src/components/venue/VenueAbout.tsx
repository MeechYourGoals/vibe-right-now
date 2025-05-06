
import React from 'react';
import { Venue } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BusinessHours from "@/components/BusinessHours";

interface VenueAboutProps {
  venue: Venue;
}

const VenueAbout: React.FC<VenueAboutProps> = ({ venue }) => {
  const { description, address, city, state, phone, website, vibes = [] } = venue;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>Information about {venue.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && (
          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}
        
        <div>
          <h3 className="font-medium mb-2">Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
              <span className="text-sm">{address}, {city}, {state}</span>
            </div>
            
            {phone && (
              <div className="flex items-start">
                <Phone className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                <span className="text-sm">{phone}</span>
              </div>
            )}
            
            {website && (
              <div className="flex items-start">
                <Globe className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  {website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            
            <div className="flex items-start">
              <Clock className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
              <div>
                <BusinessHours venue={venue} />
              </div>
            </div>
          </div>
        </div>
        
        {vibes && vibes.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Vibes</h3>
            <div className="flex flex-wrap gap-1">
              {vibes.map((vibe, index) => (
                <Badge key={index} variant="secondary">
                  {vibe}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VenueAbout;
