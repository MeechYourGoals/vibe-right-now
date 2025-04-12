import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";

const RecommendedForYou = ({ featuredLocations }: { featuredLocations: string[] }) => {
  // Filter locations based on the featuredLocations prop
  const recommendedLocations = mockLocations.filter(location =>
    featuredLocations.includes(location.id)
  );
  
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Recommended For You</h3>
        <p className="text-sm text-muted-foreground">Based on your recent activity</p>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {recommendedLocations.map((location) => (
            <li key={location.id} className="p-3 hover:bg-secondary transition-colors">
              <Link to={`/venue/${location.id}`} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={location.photos?.[0]?.url || "/placeholder.svg"} alt={location.name} />
                  <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{location.name}</span>
                  <span className="text-xs text-muted-foreground">{location.city}, {location.state}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
