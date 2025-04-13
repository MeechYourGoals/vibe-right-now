
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationCard from "@/components/LocationCard";
import { Sparkles } from "lucide-react";
import { Location } from "@/types";
import { mockLocations } from "@/mock/locations";
import { PalantirAIPService } from "@/services/PalantirAIPService";

interface RecommendedForYouProps {
  featuredLocations: string[];
}

const RecommendedForYou = ({ featuredLocations }: RecommendedForYouProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const mockUserId = "current-user"; // In a real app, get from auth

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Try to get personalized recommendations from Palantir AIP
        const palantirRecs = await PalantirAIPService.getPersonalizedRecommendations(
          mockUserId,
          5,
          {
            city: sessionStorage.getItem('selectedCity') || undefined
          }
        );
        
        if (palantirRecs.length > 0) {
          console.log('Using Palantir AIP recommendations');
          setLocations(palantirRecs);
        } else {
          // Fall back to mock recommendations if Palantir AIP fails
          console.log('Falling back to mock recommendations');
          const mockRecommendations = featuredLocations
            .map(id => mockLocations.find(loc => loc.id === id))
            .filter(Boolean) as Location[];
          setLocations(mockRecommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        // Fall back to mock data
        const mockRecommendations = featuredLocations
          .map(id => mockLocations.find(loc => loc.id === id))
          .filter(Boolean) as Location[];
        setLocations(mockRecommendations);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [featuredLocations, mockUserId]);

  const handleViewVibes = (locationId: string) => {
    window.location.href = `/venue/${locationId}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
            Loading Recommendations...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex space-x-2 overflow-x-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[150px] h-[120px] bg-muted/50 rounded-md animate-pulse"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
          Recommended For You
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-3 py-2 grid grid-cols-1 gap-2">
        {locations.slice(0, 3).map((location) => (
          <LocationCard 
            key={location.id} 
            location={location} 
            onViewVibes={handleViewVibes} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou;
