
import React from "react";
import { Location } from "@/types";

interface VenueAssistantProps {
  venue: Location;
}

const VenueAssistant: React.FC<VenueAssistantProps> = ({ venue }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">AI Powered Assistant</h2>
      <p className="text-muted-foreground mb-4">
        Our AI assistant can answer questions about this venue and help you plan your visit.
      </p>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="font-medium">Some things you can ask:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>What are the busiest times at {venue.name}?</li>
          <li>What's the dress code at {venue.name}?</li>
          <li>Are reservations required at {venue.name}?</li>
          <li>What's the parking situation at {venue.name}?</li>
        </ul>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          Coming soon! This feature is currently under development.
        </p>
      </div>
    </div>
  );
};

export default VenueAssistant;
