
import { useState } from "react";
import Header from "@/components/Header";
import DiscountLocations from "@/components/DiscountLocations";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Tag } from "lucide-react";

const Discounts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const promoExamples = [
    {
      id: "1",
      name: "Skyline Rooftop",
      address: "123 Main St, Downtown",
      city: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7589,
      lng: -73.9851,
      type: "bar" as const,
      verified: true,
      discount: "Free cover before 10pm",
      validUntil: "Tonight only",
      vibes: ["Rooftop", "City Views", "Cocktails"]
    },
    {
      id: "2", 
      name: "The Comedy Cellar",
      address: "117 MacDougal St",
      city: "New York", 
      state: "NY",
      country: "USA",
      lat: 40.7282,
      lng: -74.0023,
      type: "event" as const,
      verified: true,
      discount: "50% off tickets",
      validUntil: "Next 2 hours",
      vibes: ["Comedy", "Underground", "Intimate"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Live Deals & Discounts
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Real-time offers from venues in your area
            </p>
          </div>

          {/* Live Promos Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Tag className="mr-2 h-6 w-6 text-green-500" />
              Live Promos
            </h2>
            <div className="grid gap-4">
              {promoExamples.map((promo) => (
                <div key={promo.id} className="bg-card border border-green-200 rounded-lg p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm font-medium">
                    LIVE
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{promo.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {promo.address}, {promo.city}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {promo.type.charAt(0).toUpperCase() + promo.type.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                    <div className="text-lg font-semibold text-green-800">{promo.discount}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <Clock className="mr-1 h-3 w-3" />
                      {promo.validUntil}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {promo.vibes.map((vibe, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {vibe}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DiscountLocations />
        </div>
      </main>
    </div>
  );
};

export default Discounts;
