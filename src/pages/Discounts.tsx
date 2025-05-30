
import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, Percent } from "lucide-react";

interface Discount {
  id: number;
  title: string;
  venue: string;
  discount: string;
  category: 'restaurant' | 'bar' | 'nightclub' | 'lounge' | 'music_venue' | 'comedy_club' | 'attraction' | 'sports' | 'event' | 'other';
  validUntil: string;
  rating: number;
  distance: string;
  image: string;
  description: string;
  terms: string;
}

const mockDiscounts: Discount[] = [
  {
    id: 1,
    title: "Happy Hour Special",
    venue: "The Rooftop Bar",
    discount: "50% off drinks",
    category: "bar",
    validUntil: "2024-02-15",
    rating: 4.8,
    distance: "0.3 miles",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    description: "Join us for happy hour with stunning city views",
    terms: "Valid 5-7 PM weekdays only"
  },
  {
    id: 2,
    title: "Student Night",
    venue: "Club Electric",
    discount: "Free entry + 1 drink",
    category: "nightclub",
    validUntil: "2024-02-20",
    rating: 4.5,
    distance: "0.8 miles",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    description: "Show your student ID for free entry and a welcome drink",
    terms: "Valid student ID required. Thursday nights only."
  },
  {
    id: 3,
    title: "Dinner Special",
    venue: "Bella Vista",
    discount: "25% off all entrees",
    category: "restaurant",
    validUntil: "2024-02-10",
    rating: 4.7,
    distance: "1.2 miles",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
    description: "Authentic Italian cuisine with fresh ingredients",
    terms: "Cannot be combined with other offers"
  }
];

interface DiscountGridProps {
  discounts: Discount[];
}

const DiscountGrid: React.FC<DiscountGridProps> = ({ discounts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {discounts.map((discount) => (
        <Card key={discount.id} className="bg-neutral-900 border-neutral-700 overflow-hidden">
          <div className="relative">
            <img 
              src={discount.image} 
              alt={discount.venue}
              className="w-full h-48 object-cover"
            />
            <Badge 
              className="absolute top-3 right-3 bg-green-600 hover:bg-green-700"
            >
              <Percent className="h-3 w-3 mr-1" />
              {discount.discount}
            </Badge>
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg text-white">{discount.title}</CardTitle>
                <CardDescription className="text-neutral-300">{discount.venue}</CardDescription>
              </div>
              <Badge variant="outline" className="text-neutral-400 border-neutral-600">
                {discount.category}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-neutral-300">{discount.description}</p>
            
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span>{discount.rating}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{discount.distance}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-neutral-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>Valid until {new Date(discount.validUntil).toLocaleDateString()}</span>
            </div>
            
            <div className="p-3 bg-neutral-800 rounded-lg">
              <p className="text-xs text-neutral-400">{discount.terms}</p>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Claim Offer
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const Discounts = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Exclusive Discounts</h1>
          <p className="text-neutral-400">Discover amazing deals at your favorite venues</p>
        </div>
        
        <DiscountGrid discounts={mockDiscounts} />
      </div>
    </Layout>
  );
};

export default Discounts;
