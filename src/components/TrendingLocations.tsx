
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Users } from "lucide-react";
import { mockLocations } from "@/mock/locations";

const TrendingLocations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Places
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLocations.slice(0, 5).map((location) => (
            <div key={location.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {location.city}, {location.country}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {location.type}
                </Badge>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {Math.floor(Math.random() * 100) + 20} vibes
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
