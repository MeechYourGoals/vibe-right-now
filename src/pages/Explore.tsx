import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Search, Filter, Map, List, Zap, TrendingUp, Clock, Star } from "lucide-react";
import { useExploreState } from "@/hooks/useExploreState";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import TrendingLocations from "@/components/TrendingLocations";
import RecommendedForYou from "@/components/RecommendedForYou";
import SearchVibes from "@/components/SearchVibes";
import LocationsNearby from "@/components/LocationsNearby";
import { User } from "@/types";

const Explore = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode
  } = useExploreState();

  const [activeTab, setActiveTab] = useState("discover");

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'bar', name: 'Bars', icon: '🍻' },
    { id: 'nightclub', name: 'Nightlife', icon: '🌙' },
    { id: 'music_venue', name: 'Music', icon: '🎵' },
    { id: 'attraction', name: 'Attractions', icon: '🎢' },
    { id: 'event', name: 'Events', icon: '🎉' }
  ];

  const trendingVibes = [
    { tag: 'Late Night Eats', count: 234, trend: '+12%' },
    { tag: 'Rooftop Vibes', count: 189, trend: '+8%' },
    { tag: 'Live Music', count: 156, trend: '+15%' },
    { tag: 'Date Night', count: 142, trend: '+5%' },
    { tag: 'Happy Hour', count: 198, trend: '+20%' },
    { tag: 'Brunch Spots', count: 167, trend: '+3%' }
  ];

  const featuredUsers: User[] = [
    {
      id: '1',
      username: 'foodie_sarah',
      displayName: 'Sarah Chen',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Food enthusiast & city explorer',
      followersCount: 12400,
      followingCount: 892,
      isVerified: true,
      isPrivate: false,
      joinedDate: '2023-03-15',
      location: 'Brooklyn, NY'
    },
    {
      id: '2',
      username: 'nightlife_mike',
      displayName: 'Mike Rodriguez',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Living for the weekend vibes',
      followersCount: 8920,
      followingCount: 634,
      isVerified: false,
      isPrivate: false,
      joinedDate: '2023-02-20',
      location: 'Manhattan, NY'
    },
    {
      id: '3',
      username: 'event_lisa',
      displayName: 'Lisa Wang',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      bio: 'Event planner & social butterfly',
      followersCount: 18760,
      followingCount: 923,
      isVerified: true,
      isPrivate: false,
      joinedDate: '2022-09-14'
    }
  ];

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search venues, events, or vibes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          {category.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className="rounded-r-none"
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
              </TabsList>

              <TabsContent value="discover" className="space-y-6">
                <RecommendedForYou />
                <TrendingLocations />
                <SearchVibes searchQuery={searchQuery} selectedCategory={selectedCategory} />
              </TabsContent>

              <TabsContent value="map">
                <div className="h-[600px] rounded-lg overflow-hidden">
                  <NearbyVibesMap />
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingVibes.map((vibe, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{vibe.tag}</h4>
                            <p className="text-sm text-muted-foreground">{vibe.count} vibes</p>
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-medium">{vibe.trend}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nearby">
                <LocationsNearby />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Trending Vibes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingVibes.slice(0, 4).map((vibe, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{vibe.tag}</p>
                      <p className="text-xs text-muted-foreground">{vibe.count} active</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {vibe.trend}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Featured Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Featured Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredUsers.slice(0, 3).map((user: User) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profileImage} alt={user.displayName} />
                      <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground">{user.followersCount.toLocaleString()} followers</p>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Venues</span>
                  <span className="font-medium">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Live Events</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Peak Hours</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    8-11 PM
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
