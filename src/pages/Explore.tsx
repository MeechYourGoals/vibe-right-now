import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Location, Post } from '@/types';
import mockPosts from '@/mock/posts';

// Mock locations data for exploration
const mockLocations: Location[] = [
  {
    id: "1",
    name: "Ocean Drive Restaurant",
    address: "123 Ocean Drive",
    city: "Miami",
    country: "USA",
    lat: 25.7617,
    lng: -80.1918,
    type: "restaurant",
    verified: true,
    rating: 4.5,
    vibes: ["oceanview", "romantic", "upscale"]
  },
  {
    id: "2", 
    name: "Rooftop Lounge",
    address: "456 Collins Ave",
    city: "Miami",
    country: "USA",
    lat: 25.7907,
    lng: -80.1300,
    type: "bar",
    verified: true,
    rating: 4.8,
    vibes: ["skyline", "cocktails", "nightlife"]
  },
  {
    id: "3",
    name: "Art Deco Museum",
    address: "789 Washington Ave",
    city: "Miami",
    country: "USA", 
    lat: 25.7753,
    lng: -80.1889,
    type: "attraction",
    verified: true,
    rating: 4.2,
    vibes: ["culture", "historic", "educational"]
  }
];

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'locations' | 'posts'>('all');
  const [locationFilter, setLocationFilter] = useState('');

  // Combine and filter data
  const filteredResults = useMemo(() => {
    const results: (Location | Post)[] = [];
    
    if (selectedCategory === 'all' || selectedCategory === 'locations') {
      const filteredLocations = mockLocations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.vibes?.some(vibe => vibe.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      results.push(...filteredLocations);
    }
    
    if (selectedCategory === 'all' || selectedCategory === 'posts') {
      const filteredPosts = mockPosts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.vibeTags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      results.push(...filteredPosts);
    }
    
    return results.sort((a, b) => {
      // Sort posts by timestamp if they have one
      if ('timestamp' in a && 'timestamp' in b) {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      // Keep locations at the top
      if ('type' in a && !('timestamp' in b)) return -1;
      if ('type' in b && !('timestamp' in a)) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory]);

  const renderLocationCard = (location: Location) => (
    <Card key={location.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
          {location.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{location.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {location.address}, {location.city}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
              {location.type}
            </span>
            {location.verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  const renderPostCard = (post: Post) => (
    <Card key={post.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <img 
          src={post.user.avatar} 
          alt={post.user.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{post.user.name}</h3>
            <span className="text-sm text-gray-500">@{post.user.username}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-1">{post.content}</p>
          {post.location && (
            <p className="text-sm text-gray-500 mt-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {post.location.name}
            </p>
          )}
          <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Explore
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search venues, posts, or vibes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-4">
            <Button
              variant="outline"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-blue-100 border-blue-300' : ''}
            >
              All
            </Button>
            <Button
              variant="outline" 
              onClick={() => setSelectedCategory('locations')}
              className={selectedCategory === 'locations' ? 'bg-blue-100 border-blue-300' : ''}
            >
              Locations
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory('posts')}
              className={selectedCategory === 'posts' ? 'bg-blue-100 border-blue-300' : ''}
            >
              Posts
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No results found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredResults.map((item) => {
              if ('type' in item) {
                return renderLocationCard(item);
              } else {
                return renderPostCard(item);
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
