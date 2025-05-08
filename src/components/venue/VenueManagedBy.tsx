
import React from "react";
import { Location } from "@/types";

interface VenueManagedByProps {
  venue: Location;
}

const VenueManagedBy: React.FC<VenueManagedByProps> = ({ venue }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-6">
      <h3 className="font-semibold text-lg mb-2">Venue Management</h3>
      <p className="text-sm text-muted-foreground">
        This venue profile is automatically generated from public data. 
        Are you the owner or manager of {venue.name}? 
        Claim this listing to manage your venue profile.
      </p>
      <button className="mt-3 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
        Claim This Venue
      </button>
    </div>
  );
};

export default VenueManagedBy;
