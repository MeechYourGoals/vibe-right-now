
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Percent, Clock, MapPin, Star } from "lucide-react";
import { Location } from "@/types";

// Mock discount locations data
const discountLocations: (Location & { discount: string; expiresAt: string })[] = [
  {
    id: "discount1",
    name: "Happy Hour Lounge",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    latitude: 37.7749,
    longitude: -122.4194,
    lat: 37.7749,
    lng: -122.4194,
    category: "nightlife",
    type: "bar" as const,
    rating: 4.5,
    reviewCount: 234,
    price: "$$",
    imageUrl: "/placeholder.svg",
    isFeatured: true,
    verified: true,
    country: "US",
    formattedPhoneNumber: "(555) 123-4567",
    website: "https://happyhourlounge.com",
    reservable: true,
    discount: "25% off all drinks",
    expiresAt: "2024-01-31T23:59:59Z"
  }
];

const Discounts = () => {
  return (
    <Layout>
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 vibe-gradient-text">Special Offers & Discounts</h1>
          <p className="text-muted-foreground">
            Discover amazing deals and discounts at your favorite venues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discountLocations.map((location) => (
            <Card key={location.id} className="vibe-card-hover">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.city}, {location.state}
                    </div>
                  </div>
                  <Badge variant="destructive" className="bg-red-500">
                    <Percent className="h-3 w-3 mr-1" />
                    Deal
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-3 rounded-lg">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    {location.discount}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{location.rating}</span>
                    <span className="text-muted-foreground ml-1">
                      ({location.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Expires Jan 31</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-vibe">
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Discounts;
