
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Gift, Percent } from "lucide-react";
import { Location } from "@/types";
import { useNavigate } from "react-router-dom";

const Discounts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("available");

  // Mock discount locations with proper Location type
  const discountLocations: Location[] = [
    {
      id: "1",
      name: "Artisan Coffee House",
      type: "cafe",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      lat: 37.7749,
      lng: -122.4194,
      verified: true,
      rating: 4.5,
      price_level: 2,
      vibes: ["Cozy", "Trendy"],
      business_status: "OPERATIONAL",
      tags: ["Coffee", "Wi-Fi"],
      phone: "(555) 123-4567",
      website: "https://artisancoffeehouse.com",
      followers: 1200,
      checkins: 850,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "2", 
      name: "Sunset Bistro",
      type: "restaurant",
      address: "456 Ocean Ave",
      city: "San Francisco", 
      state: "CA",
      country: "USA",
      lat: 37.7849,
      lng: -122.4094,
      verified: true,
      rating: 4.3,
      price_level: 3,
      vibes: ["Romantic", "Upscale"],
      business_status: "OPERATIONAL", 
      tags: ["Fine Dining", "Seafood"],
      phone: "(555) 234-5678",
      website: "https://sunsetbistro.com",
      followers: 2100,
      checkins: 1400,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ];

  const handleViewLocation = (locationId: string) => {
    navigate(`/venue/${locationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2 vibe-gradient-text">
            Exclusive Discounts
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Save money at your favorite spots with Vibe Right Now discounts
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="flex rounded-lg bg-muted p-1">
              <Button
                variant={activeTab === "available" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("available")}
              >
                Available
              </Button>
              <Button
                variant={activeTab === "used" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("used")}
              >
                Used
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "available" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {discountLocations.map((location) => (
              <Card key={location.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location.city}, {location.state}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      <Percent className="h-3 w-3 mr-1" />
                      20% OFF
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{location.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires in 3 days
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground">
                      Get 20% off your entire order when you check in with Vibe Right Now
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewLocation(location.id)}
                    >
                      View Location
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Gift className="h-3 w-3 mr-1" />
                      Claim Discount
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "used" && (
          <div className="text-center py-12">
            <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Used Discounts Yet</h3>
            <p className="text-muted-foreground">
              Your used discounts will appear here after you redeem them
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Discounts;
