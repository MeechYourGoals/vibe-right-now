import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Percent, Gift } from 'lucide-react';

interface Discount {
  id: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  discount: string;
  validUntil: string;
  type: "restaurant" | "bar" | "event" | "attraction" | "sports" | "other";
  category: string;
  minSpend?: string;
  isLimited?: boolean;
  usedCount?: number;
  maxUses?: number;
}

const mockDiscounts: Discount[] = [
  {
    id: "1",
    title: "Happy Hour Special",
    description: "50% off all cocktails and appetizers during happy hour",
    venue: "Skyline Rooftop Bar",
    address: "123 Ocean Drive, Miami Beach",
    discount: "50% OFF",
    validUntil: "2024-02-15",
    type: "bar",
    category: "Food & Drink",
    minSpend: "$25",
    isLimited: true,
    usedCount: 45,
    maxUses: 100
  },
  {
    id: "2",
    title: "Weekend Brunch Deal",
    description: "$20 bottomless mimosas with any brunch entree",
    venue: "Sunrise Cafe",
    address: "456 Collins Ave, Miami Beach",
    discount: "$20 Mimosas",
    validUntil: "2024-02-28",
    type: "restaurant",
    category: "Food & Drink",
    minSpend: "$30",
    isLimited: false,
    usedCount: 0,
    maxUses: 0
  },
  {
    id: "3",
    title: "Movie Night Discount",
    description: "2-for-1 tickets on Tuesdays",
    venue: "Sunset Cinema",
    address: "789 Washington Ave, Miami Beach",
    discount: "2-for-1",
    validUntil: "2024-03-10",
    type: "attraction",
    category: "Entertainment",
    minSpend: undefined,
    isLimited: true,
    usedCount: 120,
    maxUses: 200
  },
  {
    id: "4",
    title: "Spa Day Package",
    description: "20% off any spa package",
    venue: "Ocean Spa",
    address: "101 1st St, Miami Beach",
    discount: "20% OFF",
    validUntil: "2024-03-31",
    type: "other",
    category: "Health & Beauty",
    minSpend: "$100",
    isLimited: false,
    usedCount: 0,
    maxUses: 0
  },
  {
    id: "5",
    title: "Sports Game Special",
    description: "10% off tickets for any Miami Heat game",
    venue: "FTX Arena",
    address: "601 Biscayne Blvd, Miami",
    discount: "10% OFF",
    validUntil: "2024-04-15",
    type: "sports",
    category: "Entertainment",
    minSpend: undefined,
    isLimited: true,
    usedCount: 75,
    maxUses: 150
  },
  {
    id: "6",
    title: "Shopping Spree Discount",
    description: "15% off any purchase over $50",
    venue: "Luxury Boutique",
    address: "123 Main St, Aventura",
    discount: "15% OFF",
    validUntil: "2024-05-01",
    type: "other",
    category: "Shopping",
    minSpend: "$50",
    isLimited: false,
    usedCount: 0,
    maxUses: 0
  }
];

const Discounts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Food & Drink', 'Entertainment', 'Shopping', 'Health & Beauty'];

  const filteredDiscounts = selectedCategory === 'all' 
    ? mockDiscounts 
    : mockDiscounts.filter(discount => discount.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Exclusive Discounts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing deals and offers from your favorite venues
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Discounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiscounts.map((discount) => (
            <Card key={discount.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {discount.title}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 ml-2">
                    <Percent className="w-3 h-3 mr-1" />
                    {discount.discount}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {discount.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{discount.venue}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Valid until {formatDate(discount.validUntil)}</span>
                  </div>
                </div>

                {discount.minSpend && (
                  <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    Minimum spend: {discount.minSpend}
                  </div>
                )}

                {discount.isLimited && discount.usedCount && discount.maxUses && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Limited offer</span>
                      <span>{discount.usedCount}/{discount.maxUses} claimed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(discount.usedCount / discount.maxUses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <Button className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Claim Discount
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDiscounts.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No discounts available
            </h3>
            <p className="text-gray-500">
              Check back later for new deals in the {selectedCategory} category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discounts;
