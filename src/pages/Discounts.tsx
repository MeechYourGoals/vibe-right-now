import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockLocations } from "@/mock/locations";

interface DiscountProps {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  verified: boolean;
  discount: {
    type: string;
    value: number;
    description: string;
  };
}

const Discounts = () => {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const currentDate = formatDate(new Date());

  const discountLocations = mockLocations
    .filter(location => location.type === "restaurant" || location.type === "bar")
    .slice(0, 6)
    .map(location => ({
      ...location,
      discount: {
        type: "Percentage",
        value: Math.floor(Math.random() * 30) + 10,
        description: "Limited time offer"
      }
    }));

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Exclusive Discounts</h1>
      <p className="text-muted-foreground text-center mb-4">
        Explore amazing deals at top venues, updated daily.
      </p>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Today is {currentDate}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discountLocations.map((location: DiscountProps) => (
          <Card key={location.id} className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{location.name}</CardTitle>
              <CardDescription>{location.address}, {location.city}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Badge variant="secondary">
                  {location.discount.type}: {location.discount.value}% Off
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {location.discount.description}
                </p>
              </div>
              <Link to={`/venue/${location.id}`}>
                <Button className="w-full">View Deal</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
