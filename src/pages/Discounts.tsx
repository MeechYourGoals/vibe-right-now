
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { DiscountLocations } from "@/components/DiscountLocations";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, MapPin, Clock } from "lucide-react";

const Discounts = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<{
    from: Date;
    to: Date;
  } | null>(null);

  // Mock discount data with proper types
  const featuredDiscounts = [
    {
      id: "1",
      venueName: "Sunset Rooftop",
      discountPercent: 25,
      description: "Happy Hour Special",
      validUntil: "2024-01-31",
      location: "Downtown LA",
      type: "bar" as const,
      image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&q=80&auto=format&fit=crop"
    },
    {
      id: "2", 
      venueName: "Marina Grill",
      discountPercent: 20,
      description: "Lunch Special",
      validUntil: "2024-02-15",
      location: "Santa Monica",
      type: "restaurant" as const,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80&auto=format&fit=crop"
    },
    {
      id: "3",
      venueName: "Art District Gallery",
      discountPercent: 15,
      description: "Student Discount",
      validUntil: "2024-03-01",
      location: "Arts District",
      type: "attraction" as const,
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&q=80&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      <main className="container py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 vibe-gradient-text">
              Special Offers & Discounts
            </h1>
            <p className="text-muted-foreground">
              Discover amazing deals at your favorite venues
            </p>
          </div>

          <div className="mb-6">
            <DateRangeSelector 
              selectedRange={selectedDateRange}
              onRangeChange={setSelectedDateRange}
            />
          </div>

          {/* Featured Discounts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Featured Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredDiscounts.map((discount) => (
                <Card key={discount.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={discount.image}
                      alt={discount.venueName}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      <Percent className="h-3 w-3 mr-1" />
                      {discount.discountPercent}% OFF
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{discount.venueName}</CardTitle>
                    <CardDescription>{discount.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {discount.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      Valid until {discount.validUntil}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <DiscountLocations selectedDateRange={selectedDateRange} />
        </div>
      </main>
    </Layout>
  );
};

export default Discounts;
