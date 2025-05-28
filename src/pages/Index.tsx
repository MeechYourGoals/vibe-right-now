
import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Users, TrendingUp } from "lucide-react";
import { regularUsers } from '@/mock/users/regularUsers';
import { mockLocations } from '@/mock/locations';

const Index = () => {
  const featuredUsers = regularUsers.slice(0, 3);
  const featuredVenues = mockLocations.slice(0, 4);

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-950 text-white">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Welcome to VIIBES
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto">
              Discover the hottest venues, connect with amazing people, and experience 
              the best nightlife your city has to offer.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Venues
              </Button>
              <Button size="lg" variant="outline" className="border-neutral-600 text-white">
                Join Community
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Venues */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Trending Venues</h2>
              <Button variant="outline" className="border-neutral-600 text-white">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVenues.map((venue) => (
                <Card key={venue.id} className="bg-neutral-900 border-neutral-700 overflow-hidden">
                  {venue.photos && venue.photos.length > 0 && (
                    <img 
                      src={venue.photos[0]} 
                      alt={venue.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-white">{venue.name}</CardTitle>
                      {venue.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-neutral-400 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{venue.city}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      {venue.rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-white">{venue.rating}</span>
                        </div>
                      )}
                      {venue.priceRange && (
                        <Badge variant="outline" className="text-neutral-400 border-neutral-600">
                          {venue.priceRange}
                        </Badge>
                      )}
                    </div>
                    
                    <Badge variant="outline" className="text-neutral-400 border-neutral-600">
                      {venue.category}
                    </Badge>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Users */}
        <section className="py-16 px-6 bg-neutral-900/50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Top Creators</h2>
              <Button variant="outline" className="border-neutral-600 text-white">
                See More
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredUsers.map((user) => (
                <Card key={user.id} className="bg-neutral-900 border-neutral-700">
                  <CardHeader className="text-center">
                    <img 
                      src={user.profileImage} 
                      alt={user.displayName}
                      className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <CardTitle className="text-lg text-white">{user.displayName}</CardTitle>
                      {user.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-neutral-400">@{user.username}</p>
                    {user.bio && (
                      <CardDescription className="text-neutral-300">{user.bio}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="flex justify-around text-sm">
                      <div>
                        <div className="font-bold text-white">{user.followersCount}</div>
                        <div className="text-neutral-400">Followers</div>
                      </div>
                      <div>
                        <div className="font-bold text-white">{user.postsCount || 0}</div>
                        <div className="text-neutral-400">Posts</div>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Users className="h-4 w-4 mr-2" />
                      Follow
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
              <p className="text-neutral-300 max-w-2xl mx-auto">
                Thousands of venues and millions of users are already part of the VIIBES community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-neutral-900 border-neutral-700 text-center">
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-neutral-400">Active Venues</div>
                </CardContent>
              </Card>
              
              <Card className="bg-neutral-900 border-neutral-700 text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">500K+</div>
                  <div className="text-neutral-400">Users</div>
                </CardContent>
              </Card>
              
              <Card className="bg-neutral-900 border-neutral-700 text-center">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2M+</div>
                  <div className="text-neutral-400">Reviews</div>
                </CardContent>
              </Card>
              
              <Card className="bg-neutral-900 border-neutral-700 text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-neutral-400">Live Updates</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
