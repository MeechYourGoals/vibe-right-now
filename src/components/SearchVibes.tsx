
import React, { useState } from 'react';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUserByHash } from '@/mock/users';

interface SearchVibesProps {
  onLocationSelect?: (location: any) => void;
}

const SearchVibes: React.FC<SearchVibesProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock search results
  const searchResults = [
    {
      id: '1',
      name: 'Ocean Drive Restaurant',
      address: '123 Ocean Drive, Miami Beach',
      category: 'restaurant',
      rating: 4.5,
      distance: '0.3 miles',
      isOpen: true,
      user: getUserByHash('ocean_drive_user')
    },
    {
      id: '2', 
      name: 'Rooftop Lounge',
      address: '456 Collins Ave, Miami Beach',
      category: 'bar',
      rating: 4.8,
      distance: '0.5 miles',
      isOpen: true,
      user: getUserByHash('rooftop_user')
    }
  ];

  const filteredResults = searchResults.filter(result => 
    result.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || result.category === selectedCategory)
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for places, vibes, or experiences..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 overflow-x-auto">
        {['all', 'restaurant', 'bar', 'cafe', 'attraction'].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {filteredResults.map((result) => (
          <Card 
            key={result.id} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onLocationSelect?.(result)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                {result.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {result.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{result.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate">{result.address}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {result.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className={result.isOpen ? 'text-green-600' : 'text-red-600'}>
                      {result.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredResults.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">
          <p>No results found for "{searchTerm}"</p>
          <p className="text-sm mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default SearchVibes;
