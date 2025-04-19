import { useState } from "react";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import RecommendedForYou from "@/components/RecommendedForYou";
import VernonNext from "@/components/VernonNext";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarRange } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DateRangeSelector from "@/components/DateRangeSelector";
import { Card, CardContent } from "@/components/ui/card";
import SearchVibes from "@/components/SearchVibes";

const Index = () => {
  const isMobile = useIsMobile();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const navigate = useNavigate();
  // Make sure to include all our five main featured users
  const featuredUsers = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handlePlanFutureVibes = () => {
    if (dateRange?.from) {
      const searchParams = new URLSearchParams();
      searchParams.set('from', dateRange.from.toISOString().split('T')[0]);
      if (dateRange.to) {
        searchParams.set('to', dateRange.to.toISOString().split('T')[0]);
      }
      navigate(`/explore?${searchParams.toString()}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <Layout>
      <main className="container py-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h1 className="text-3xl font-bold vibe-gradient-text mb-3 md:mb-0">
              Discover the Vibe Right Now
            </h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <CalendarRange className="h-4 w-4" />
              Plan Future Vibes
            </Button>
          </div>

          <SearchVibes onSearch={() => {}} />
          
          <div className="mt-6">
            <NearbyVibesMap />
          </div>
          
          {showDatePicker && (
            <Card className="mb-6 bg-indigo-50 border-indigo-100">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 text-indigo-800">Find Future Vibes</h3>
                <p className="text-sm text-indigo-700 mb-3">Select dates to explore events, concerts, games and more in the coming months</p>
                <DateRangeSelector 
                  dateRange={dateRange} 
                  onDateRangeChange={handleDateRangeChange} 
                />
                <div className="flex justify-end mt-4">
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={handlePlanFutureVibes}
                    disabled={!dateRange?.from}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Explore Future Vibes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <PostFeed celebrityFeatured={featuredUsers} />
          </div>
          
          {!isMobile ? (
            <div className="w-full md:w-1/4 space-y-6">
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          ) : null}
        </div>
        
        {isMobile && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
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
