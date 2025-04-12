
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchVibes from '@/components/SearchVibes';
import RecommendedForYou from '@/components/RecommendedForYou';
import TrendingLocations from '@/components/TrendingLocations';
import NearbyVibesMap from '@/components/NearbyVibesMap';
import PostFeed from '@/components/PostFeed';
import { mockPosts, mockUsers } from '@/mock/data';
import { Button } from '@/components/ui/button';
import { useSpeechSynthesis } from '@/components/VernonChat/hooks/useSpeechSynthesis';
import VernonChat from '@/components/VernonChat';
import { Container } from '@/components/ui/container';
import LocationsNearby from '@/components/LocationsNearby';
import DiscountLocations from '@/components/DiscountLocations';

const Index = () => {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [viewingMap, setViewingMap] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { speak } = useSpeechSynthesis();
  
  useEffect(() => {
    // Simulate API call to fetch posts
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoadingPosts(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts
    : mockPosts.filter(post => post.categories?.includes(selectedCategory));
  
  // Get celebrity users for featured content
  const celebrityUsers = mockUsers.filter(user => user.isCelebrity);
  
  return (
    <>
      <Container className="py-4">
        <div className="space-y-6">
          {/* Search Bar */}
          <SearchVibes />
          
          {/* Recommendations Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
            <RecommendedForYou />
          </section>
          
          {/* Trending Locations Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Trending Locations</h2>
            <TrendingLocations />
          </section>
          
          {/* Map Toggle Section */}
          <section className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Nearby Vibes</h2>
            <Button
              variant={viewingMap ? "default" : "outline"}
              onClick={() => setViewingMap(!viewingMap)}
            >
              {viewingMap ? "List View" : "Map View"}
            </Button>
          </section>
          
          {viewingMap ? (
            <div className="h-[400px] rounded-lg overflow-hidden mb-8">
              <NearbyVibesMap />
            </div>
          ) : (
            <div className="mb-8">
              <LocationsNearby />
            </div>
          )}
          
          {/* Discount Locations */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Places with Discounts</h2>
            <DiscountLocations />
          </section>
          
          {/* Feed Category Filter */}
          <div className="flex overflow-x-auto space-x-2 pb-2 mb-4">
            <Button 
              variant={selectedCategory === 'all' ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect('all')}
              className="rounded-full"
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === 'food' ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect('food')}
              className="rounded-full"
            >
              Food
            </Button>
            <Button 
              variant={selectedCategory === 'entertainment' ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect('entertainment')}
              className="rounded-full"
            >
              Entertainment
            </Button>
            <Button 
              variant={selectedCategory === 'nightlife' ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect('nightlife')}
              className="rounded-full"
            >
              Nightlife
            </Button>
            <Button 
              variant={selectedCategory === 'outdoors' ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect('outdoors')}
              className="rounded-full"
            >
              Outdoors
            </Button>
          </div>
          
          {/* Post Feed */}
          <section>
            <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
            <PostFeed 
              posts={filteredPosts} 
              loading={loadingPosts} 
            />
          </section>
        </div>
      </Container>
      
      {/* Vernon Chat */}
      <VernonChat />
    </>
  );
};

export default Index;
