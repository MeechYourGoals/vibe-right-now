
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockLocations } from "@/mock/data";
import { Link } from "react-router-dom";
import { Star, ExternalLink } from "lucide-react";

interface Location {
  id: string;
  name: string;
  description: string;
  type: string[];
  imageUrl: string;
  address: string;
  rating: number;
  priceRange: string;
  tags: string[];
}

const RecommendedForYou = () => {
  const [recommendations, setRecommendations] = useState<Location[]>([]);
  
  useEffect(() => {
    // In a real app, this would filter based on user preferences from settings
    // For now, we're just picking a few random locations
    const randomLocations = [...mockLocations]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setRecommendations(randomLocations);
  }, []);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-2" />
          Recommended For You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((location) => (
          <div key={location.id} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={location.imageUrl} 
                alt={location.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">
                {location.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {location.type.join(", ")}
              </p>
            </div>
            <Button size="sm" variant="ghost" asChild className="flex-shrink-0">
              <Link to={`/venue/${location.id}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
