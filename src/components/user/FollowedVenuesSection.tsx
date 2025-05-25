
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Location } from "@/types";

interface FollowedVenuesSectionProps {
  venues: Location[];
}

const FollowedVenuesSection: React.FC<FollowedVenuesSectionProps> = ({ venues }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Following ({venues.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <p>Not following any venues yet</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowedVenuesSection;
