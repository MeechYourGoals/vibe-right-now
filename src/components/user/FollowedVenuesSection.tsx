
import React from "react";
import { Location } from "@/types";

interface FollowedVenuesSectionProps {
  venues: Location[];
}

const FollowedVenuesSection = ({ venues }: FollowedVenuesSectionProps) => {
  return (
    <div className="space-y-4">
      {venues.length > 0 ? (
        venues.map(venue => (
          <div key={venue.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{venue.name}</h3>
            <p className="text-sm text-muted-foreground">{venue.address}</p>
            <p className="text-sm text-muted-foreground">{venue.city}</p>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No followed venues yet</p>
        </div>
      )}
    </div>
  );
};

export default FollowedVenuesSection;
