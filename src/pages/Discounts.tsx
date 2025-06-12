import React from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Percent, Gift } from "lucide-react";
import { VenueWithDiscount } from "@/components/venue/events/types";
import { mockLocations } from "@/mock/locations";

// Transform mock locations to venues with discounts
const venuesWithDiscounts: VenueWithDiscount[] = mockLocations.slice(0, 8).map((location, index) => ({
  ...location,
  type: location.type as "restaurant" | "bar" | "event" | "attraction" | "sports" | "other",
  discount: {
    id: `discount-${index}`,
    type: index % 4 === 0 ? "freeItem" : index % 4 === 1 ? "percentOff" : index % 4 === 2 ? "freeEntry" : "vipAccess",
    description: index % 4 === 0 ? "Free appetizer with any entree" : 
                index % 4 === 1 ? "25% off your entire bill" :
                index % 4 === 2 ? "Free entry before 10 PM" : "Skip the line + VIP seating",
    expiresAt: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString(),
    conditions: index % 4 === 0 ? "Valid Monday-Thursday only" :
               index % 4 === 1 ? "Cannot be combined with other offers" :
               index % 4 === 2 ? "Valid until 10 PM only" : "Must mention 'VRN' at door",
    code: `VRN${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    value: index % 4 === 1 ? 25 : undefined,
    originalPrice: index % 4 === 2 ? "$15 cover charge" : undefined
  },
  distance: `${(Math.random() * 5).toFixed(1)} mi`
}));

const Discounts = () => {
  const getDiscountIcon = (type: string) => {
    switch (type) {
      case "percentOff":
        return <Percent className="h-5 w-5" />;
      case "freeItem":
      case "freeEntry":
        return <Gift className="h-5 w-5" />;
      case "vipAccess":
        return <Clock className="h-5 w-5" />;
      default:
        return <Gift className="h-5 w-5" />;
    }
  };

  const getDiscountColor = (type: string) => {
    switch (type) {
      case "percentOff":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "freeItem":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "freeEntry":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "vipAccess":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return `${hours}h remaining`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d remaining`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2 vibe-gradient-text">
            Exclusive Deals & Discounts
          </h1>
          <p className="text-center text-muted-foreground">
            Limited-time offers from your favorite venues
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venuesWithDiscounts.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">{venue.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {venue.city} • {venue.distance}
                    </CardDescription>
                  </div>
                  <Badge className={getDiscountColor(venue.discount.type)}>
                    {getDiscountIcon(venue.discount.type)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-primary">{venue.discount.description}</h4>
                    {venue.discount.value && (
                      <Badge variant="secondary">{venue.discount.value}% OFF</Badge>
                    )}
                  </div>
                  
                  {venue.discount.code && (
                    <div className="flex items-center justify-between bg-background rounded px-3 py-2 mt-3">
                      <span className="font-mono text-sm">{venue.discount.code}</span>
                      <Button variant="outline" size="sm">Copy</Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  {venue.discount.conditions && (
                    <p className="text-muted-foreground">{venue.discount.conditions}</p>
                  )}
                  
                  {venue.discount.expiresAt && (
                    <div className="flex items-center text-orange-600 dark:text-orange-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTimeRemaining(venue.discount.expiresAt)}
                    </div>
                  )}
                </div>
                
                <Button className="w-full">
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Discounts;
