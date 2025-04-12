
import { useState } from "react";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import LocationsNearby from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import RecommendedForYou from "@/components/RecommendedForYou";
import VernonNext from "@/components/VernonNext";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFeaturedUsers } from "@/mock/users";
import { DateRange } from "react-day-picker";
import { format, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarRange, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DateRangeSelector from "@/components/DateRangeSelector";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";

const Index = () => {
  const isMobile = useIsMobile();
  const featuredUsers = getFeaturedUsers();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [city, setCity] = useState<string>("");
  const navigate = useNavigate();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handlePlanFutureVibes = () => {
    if (!city.trim()) {
      toast.error("Please enter a city");
      return;
    }
    
    const searchParams = new URLSearchParams();
    searchParams.set('city', city.trim());
    
    if (dateRange?.from) {
      searchParams.set('from', dateRange.from.toISOString().split('T')[0]);
      if (dateRange.to) {
        searchParams.set('to', dateRange.to.toISOString().split('T')[0]);
      }
    }
    
    navigate(`/explore?${searchParams.toString()}`);
  };

  return (
    <Layout>
      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h1 className="text-3xl font-bold vibe-gradient-text mb-3 md:mb-0">
                Discover the Vibe Right Now
              </h1>
              <Button 
                variant="default" 
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium shadow-md"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <CalendarRange className="h-4 w-4" />
                Plan Future Vibes
              </Button>
            </div>

            {showDatePicker && (
              <Card className="mb-6 bg-card border-2 border-primary/20 shadow-md">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Find Future Vibes</h3>
                  <p className="text-sm text-muted-foreground mb-3">Select dates to explore events, concerts, games and more in the coming months</p>
                  
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="city-input" className="text-sm font-medium block mb-1 text-foreground">
                        City
                      </label>
                      <div className="relative">
                        <Input
                          id="city-input"
                          placeholder="Enter a city name"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="pl-9 bg-background/80"
                        />
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <DateRangeSelector 
                      dateRange={dateRange} 
                      onDateRangeChange={handleDateRangeChange} 
                    />
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white font-medium shadow-sm"
                      onClick={handlePlanFutureVibes}
                      disabled={!city.trim()}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Explore Future Vibes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <PostFeed celebrityFeatured={featuredUsers} />
          </div>
          
          {!isMobile ? (
            <div className="w-full md:w-1/4 space-y-6">
              <NearbyVibesMap />
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          ) : null}
        </div>
        
        {isMobile && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
            <NearbyVibesMap />
            <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
            <TrendingLocations />
            <DiscountLocations />
          </div>
        )}
      </main>
      
      <CameraButton />
      <VernonNext />
    </Layout>
  );
};

export default Index;
