
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LocationCard from "@/components/map/LocationCard";
import { Location } from "@/types";
import { CalendarCheck, Bookmark, Flame } from "lucide-react";

interface ExploreSidebarProps {
  filteredLocations: Location[];
}

const ExploreSidebar: React.FC<ExploreSidebarProps> = ({ filteredLocations }) => {
  // Get a few trending locations for the sidebar
  const trendingLocations = filteredLocations
    .filter(loc => loc.verified)
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Flame className="h-5 w-5 text-red-500 mr-2" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingLocations.length > 0 ? (
            trendingLocations.map(location => (
              <LocationCard key={location.id} location={location} />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <p>No trending venues found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CalendarCheck className="h-5 w-5 text-blue-500 mr-2" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLocations
              .filter(loc => loc.type === "event")
              .slice(0, 2)
              .map((event) => (
                <div key={event.id} className="border rounded-md p-3">
                  <div className="font-medium">{event.name}</div>
                  <div className="text-sm text-muted-foreground">{event.address}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline">Today</Badge>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                </div>
              ))}
            {filteredLocations.filter(loc => loc.type === "event").length === 0 && (
              <div className="text-center text-muted-foreground py-4">
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bookmark className="h-5 w-5 text-green-500 mr-2" />
            Saved Places
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-4">
            <p>You haven't saved any places yet</p>
            <p className="text-sm">Places you save will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreSidebar;
