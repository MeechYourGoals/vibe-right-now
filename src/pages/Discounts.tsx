import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Store, Percent, CheckCircle, XCircle } from "lucide-react";

type OfferCategory = "restaurant" | "bar" | "event" | "other";

interface Offer {
  id: string;
  venueId: string;
  venueName: string;
  description: string;
  discountPercentage: number;
  validUntil: string;
  category: OfferCategory;
  termsAndConditions: string;
  isRedeemed: boolean;
}

const Discounts = () => {
  const [selectedCategory, setSelectedCategory] = useState<OfferCategory | "all">("all");

  const mockOffers: Offer[] = [
    {
      id: "1",
      venueId: "venue-1",
      venueName: "The Rooftop Lounge",
      description: "25% off all cocktails during happy hour",
      discountPercentage: 25,
      validUntil: "2024-12-31",
      category: "bar",
      termsAndConditions: "Valid from 5 PM to 7 PM, Monday to Friday.",
      isRedeemed: false,
    },
    {
      id: "2",
      venueId: "venue-2",
      venueName: "Bella Italia",
      description: "15% off any pasta dish",
      discountPercentage: 15,
      validUntil: "2024-11-15",
      category: "restaurant",
      termsAndConditions: "Not valid with other offers.",
      isRedeemed: true,
    },
    {
      id: "3",
      venueId: "venue-3",
      venueName: "City Cinema",
      description: "10% off movie tickets on Tuesdays",
      discountPercentage: 10,
      validUntil: "2024-12-20",
      category: "event",
      termsAndConditions: "Online bookings only.",
      isRedeemed: false,
    },
    {
      id: "4",
      venueId: "venue-4",
      venueName: "The Daily Grind",
      description: "Buy one get one free on all coffees",
      discountPercentage: 50,
      validUntil: "2024-11-10",
      category: "other",
      termsAndConditions: "Valid until 11 AM.",
      isRedeemed: false,
    },
    {
      id: "5",
      venueId: "venue-5",
      venueName: "Spice Route",
      description: "20% off on dinner buffet",
      discountPercentage: 20,
      validUntil: "2024-12-31",
      category: "restaurant",
      termsAndConditions: "Valid on weekends only.",
      isRedeemed: false,
    },
    {
      id: "6",
      venueId: "venue-6",
      venueName: "Club Retro",
      description: "$5 off entry fee",
      discountPercentage: 50,
      validUntil: "2024-11-30",
      category: "event",
      termsAndConditions: "Must be 21+.",
      isRedeemed: true,
    },
  ];

  const filteredOffers =
    selectedCategory === "all"
      ? mockOffers
      : mockOffers.filter((offer) => offer.category === selectedCategory);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Exclusive Discounts</h1>
          <div className="space-x-2">
            <Badge
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="cursor-pointer"
            >
              All
            </Badge>
            <Badge
              variant={selectedCategory === "restaurant" ? "default" : "outline"}
              onClick={() => setSelectedCategory("restaurant")}
              className="cursor-pointer"
            >
              Restaurants
            </Badge>
            <Badge
              variant={selectedCategory === "bar" ? "default" : "outline"}
              onClick={() => setSelectedCategory("bar")}
              className="cursor-pointer"
            >
              Bars
            </Badge>
            <Badge
              variant={selectedCategory === "event" ? "default" : "outline"}
              onClick={() => setSelectedCategory("event")}
              className="cursor-pointer"
            >
              Events
            </Badge>
            <Badge
              variant={selectedCategory === "other" ? "default" : "outline"}
              onClick={() => setSelectedCategory("other")}
              className="cursor-pointer"
            >
              Other
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <Card key={offer.id}>
              <CardHeader>
                <CardTitle>{offer.venueName}</CardTitle>
                <CardDescription>
                  <Store className="mr-2 inline-block h-4 w-4" />
                  {offer.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <Percent className="mr-2 inline-block h-4 w-4" />
                  Discount: {offer.discountPercentage}%
                </p>
                <p>
                  <Calendar className="mr-2 inline-block h-4 w-4" />
                  Valid Until: {offer.validUntil}
                </p>
                <p className="text-sm text-muted-foreground">
                  Terms: {offer.termsAndConditions}
                </p>
                {offer.isRedeemed ? (
                  <Badge variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" />
                    Redeemed
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Active
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Discounts;
