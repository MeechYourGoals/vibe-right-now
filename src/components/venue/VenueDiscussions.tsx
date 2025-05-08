
import React from "react";
import { Location } from "@/types";

interface VenueDiscussionsProps {
  venue: Location;
}

const VenueDiscussions: React.FC<VenueDiscussionsProps> = ({ venue }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Discussions</h2>
        
        <div className="mt-4">
          <p className="text-center text-muted-foreground py-8">
            No reviews or discussions yet. Be the first to start a conversation about {venue.name}!
          </p>
          
          <div className="mt-6">
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Start a Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDiscussions;
