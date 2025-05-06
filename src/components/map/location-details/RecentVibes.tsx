
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VenuePost from "@/components/VenuePost";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";
import { getLocationVibes } from "@/utils/locationUtils";
import { 
  isWithinThreeMonths, 
  isPopularRightNow,
  calculateCrowdLevel
} from "@/utils/timeUtils";

interface RecentVibesProps {
  locationId: string;
}

const RecentVibes: React.FC<RecentVibesProps> = ({ locationId }) => {
  // Get vibes for this location
  const vibes = getLocationVibes(locationId);
  
  // Get crowdedness level (1-3)
  const crowdLevel = calculateCrowdLevel();
  
  // Determine if it's popular right now
  const isPopularNow = isPopularRightNow();
  
  // Determine if it's trending (has recent activity)
  const isTrending = isWithinThreeMonths(new Date().toISOString());
  
  return (
    <Card>
      <CardHeader className="py-3">
        <h3 className="text-lg font-semibold">Current Vibes</h3>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {vibes.map((vibe, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/20">
              {vibe}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center">
            <span className="mr-1">Crowd Level:</span>
            <div className="flex">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-6 mx-0.5 rounded-sm ${
                    i < crowdLevel ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isPopularNow && (
              <Badge className="bg-red-500 hover:bg-red-600">Popular Now</Badge>
            )}
            {isTrending && (
              <Badge className="bg-blue-500 hover:bg-blue-600">Trending</Badge>
            )}
          </div>
        </div>
        
        {/* Content preview (if any media available) */}
        <div className="space-y-4 mt-4">
          {getMediaForLocation(locationId).map(media => (
            <div key={media.id} className="border rounded-md overflow-hidden">
              {media.type === 'image' ? (
                <img 
                  src={media.url} 
                  alt="Recent content" 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 p-3 text-sm">
                  {media.caption}
                </div>
              )}
              <div className="p-2 text-xs text-gray-500">
                {new Date(media.timestamp).toLocaleDateString()} · {media.source}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentVibes;
