
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { posts as mockPosts } from '@/mock/posts';
import { Badge } from '@/components/ui/badge';
import { CreditCard, MapPin, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DiscountLocations = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [userRedeemed, setUserRedeemed] = useState([]);
  
  // For demo, we're just using the mock posts data to derive venues with discounts
  const venues = mockPosts
    .map(post => post.location)
    .filter((loc, index, self) => 
      index === self.findIndex(l => l.id === loc.id) && 
      Math.random() > 0.7 // Randomly select 30% of locations
    )
    .slice(0, 3);
  
  // Add some discount metadata
  const discountVenues = venues.map(venue => ({
    ...venue,
    discount: {
      percentage: Math.floor(Math.random() * 3) * 5 + 10, // 10%, 15%, or 20%
      pointsRequired: Math.floor(Math.random() * 5) * 100 + 300, // 300-800 points
      expiresIn: Math.floor(Math.random() * 14) + 1 // 1-14 days
    }
  }));
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          <span>Discount Offers</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discountVenues.map((venue) => (
            <div 
              key={venue.id} 
              className="p-3 border rounded-lg flex flex-col space-y-2 hover:bg-accent/10 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{venue.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{venue.city}, {venue.state}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                  {venue.discount.percentage}% Off
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground flex items-center">
                <BarChart3 className="h-3 w-3 mr-1" />
                <span>{venue.discount.pointsRequired} Points • Expires in {venue.discount.expiresIn} days</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2" 
                disabled={userPoints < venue.discount.pointsRequired}
              >
                {userPoints >= venue.discount.pointsRequired ? 'Redeem' : 'Not Enough Points'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscountLocations;
