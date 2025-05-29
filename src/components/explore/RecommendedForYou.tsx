
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users } from "lucide-react";
import { Location } from '@/types';

interface RecommendedForYouProps {
  featuredLocations: Location[];
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({ featuredLocations }) => {
  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">Recommended For You</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {featuredLocations.slice(0, 3).map((location) => (
          <div key={location.id} className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-lg">
            {location.photos && location.photos.length > 0 && (
              <img 
                src={location.photos[0]} 
                alt={location.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-white">{location.name}</h4>
              <div className="flex items-center space-x-2 text-sm text-neutral-400">
                <MapPin className="h-3 w-3" />
                <span>{location.city}</span>
                {location.rating && (
                  <>
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{location.rating}</span>
                  </>
                )}
              </div>
              {location.category && (
                <Badge variant="outline" className="text-xs mt-1">
                  {location.category}
                </Badge>
              )}
            </div>
            <Button variant="outline" size="sm" className="text-white border-neutral-600">
              <Users className="h-3 w-3 mr-1" />
              Follow
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
