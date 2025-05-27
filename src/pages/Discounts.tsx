import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Percent, Star, Search, Filter } from "lucide-react";
import DiscountLocations from "@/components/DiscountLocations";

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const discounts = [
    {
      id: 1,
      title: "Happy Hour Special",
      venue: "The Rooftop Bar",
      discount: "50% off cocktails",
      category: "bar" as const,
      validUntil: "10:00 PM",
      rating: 4.8,
      distance: "0.3 miles",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
      description: "Premium cocktails at half price during happy hour",
      terms: "Valid 5-7 PM weekdays only"
    },
    {
      id: 2,
      title: "Burger Tuesday",
      venue: "Burger Joint",
      discount: "$5 off any burger",
      category: "restaurant" as const,
      validUntil: "All Day",
      rating: 4.5,
      distance: "0.5 miles",
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
      description: "Enjoy any burger on our menu for $5 off every Tuesday",
      terms: "Valid all day Tuesdays only"
    },
    {
      id: 3,
      title: "Live Music Night",
      venue: "The Music Hall",
      discount: "20% off tickets",
      category: "music_venue" as const,
      validUntil: "11:00 PM",
      rating: 4.2,
      distance: "1.2 miles",
      image: "https://images.unsplash.com/photo-1494976388535-893e9ea5c3bf?w=400&h=300&fit=crop",
      description: "Get 20% off tickets for live music performances",
      terms: "Valid on select nights only"
    },
    {
      id: 4,
      title: "Comedy Show Discount",
      venue: "Comedy Club",
      discount: "15% off admission",
      category: "comedy_club" as const,
      validUntil: "10:30 PM",
      rating: 4.6,
      distance: "0.8 miles",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop",
      description: "Enjoy a night of laughter with 15% off admission",
      terms: "Valid on all shows"
    },
    {
      id: 5,
      title: "Weekend Brunch",
      venue: "Brunch Cafe",
      discount: "10% off total bill",
      category: "restaurant" as const,
      validUntil: "3:00 PM",
      rating: 4.7,
      distance: "0.7 miles",
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba212?w=400&h=300&fit=crop",
      description: "Enjoy a leisurely brunch with 10% off your entire bill",
      terms: "Valid weekends only"
    }
  ];

  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || discount.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Discounts & Deals</h1>
            <p className="text-muted-foreground">Save money at your favorite spots</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {filteredDiscounts.length} active deals
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search discounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="bar">Bars</SelectItem>
              <SelectItem value="music_venue">Music Venues</SelectItem>
              <SelectItem value="comedy_club">Comedy Clubs</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="space-y-4">
            {filteredDiscounts.map(discount => (
              <Card key={discount.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {discount.title}
                    <Badge variant="secondary">{discount.category}</Badge>
                  </CardTitle>
                  <CardDescription>{discount.venue}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    <span>{discount.discount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Valid until {discount.validUntil}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{discount.rating} ({discount.distance})</span>
                  </div>
                  <p className="text-sm">{discount.description}</p>
                  <p className="text-xs text-muted-foreground">{discount.terms}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="map">
            <div className="h-[600px] rounded-lg overflow-hidden">
              <DiscountLocations discounts={filteredDiscounts} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Discounts;
