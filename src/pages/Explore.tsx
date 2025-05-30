import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExploreState } from "@/hooks/useExploreState";
import { User } from "@/types";

interface Filter {
  id: string;
  label: string;
  options: { id: string; label: string }[];
}

const filters: Filter[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { id: "restaurant", label: "Restaurants" },
      { id: "bar", label: "Bars" },
      { id: "club", label: "Clubs" },
      { id: "event", label: "Events" },
    ],
  },
  {
    id: "amenities",
    label: "Amenities",
    options: [
      { id: "wifi", label: "Free Wifi" },
      { id: "parking", label: "Parking" },
      { id: "outdoor", label: "Outdoor Seating" },
      { id: "livemusic", label: "Live Music" },
    ],
  },
  {
    id: "price",
    label: "Price Range",
    options: [
      { id: "cheap", label: "Budget-friendly" },
      { id: "moderate", label: "Moderate" },
      { id: "expensive", label: "High-end" },
    ],
  },
];

const mockUsers: User[] = [
  {
    id: "1",
    username: "johndoe",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Foodie and craft beer enthusiast",
    followersCount: 123,
    followingCount: 456,
  },
  {
    id: "2",
    username: "janedoe",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Traveler and adventure seeker",
    followersCount: 789,
    followingCount: 101,
  },
  {
    id: "3",
    username: "peterparker",
    name: "Peter Parker",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Photographer and web developer",
    followersCount: 112,
    followingCount: 131,
  },
];

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchTerm, selectedFilters, setSelectedFilters } = useExploreState();
  const [activeTab, setActiveTab] = useState("venues");
  const [users, setUsers] = useState(mockUsers);

  const handleFilterChange = (filterId: string, optionId: string) => {
    const isSelected = selectedFilters[filterId]?.includes(optionId);

    setSelectedFilters((prevFilters) => {
      const filterOptions = prevFilters[filterId] || [];

      if (isSelected) {
        const updatedOptions = filterOptions.filter((id) => id !== optionId);
        return {
          ...prevFilters,
          [filterId]: updatedOptions.length > 0 ? updatedOptions : undefined,
        };
      } else {
        return {
          ...prevFilters,
          [filterId]: [...filterOptions, optionId],
        };
      }
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    Object.keys(selectedFilters).forEach((filterId) => {
      selectedFilters[filterId]?.forEach((optionId) => {
        params.append(filterId, optionId);
      });
    });
    setSearchParams(params);
  }, [searchTerm, selectedFilters, setSearchParams]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Explore</h1>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search venues or users..."
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              defaultValue={searchTerm}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="venues" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <div key={filter.id} className="border rounded-md p-4">
                  <h2 className="text-lg font-semibold mb-2">{filter.label}</h2>
                  <div className="space-y-2">
                    {filter.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={
                            selectedFilters[filter.id]?.includes(option.id) ||
                            false
                          }
                          onChange={() => handleFilterChange(filter.id, option.id)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              {/* Mock Venue Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-neutral-900">
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">The Rooftop Lounge</h3>
                    <p className="text-sm text-gray-500">
                      Trendy rooftop bar with city views
                    </p>
                    <Badge variant="secondary">Bar</Badge>
                    <Badge variant="secondary">Cocktails</Badge>
                    <Button variant="outline">View Details</Button>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900">
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Spice Route</h3>
                    <p className="text-sm text-gray-500">
                      Authentic Indian cuisine in a vibrant setting
                    </p>
                    <Badge variant="secondary">Restaurant</Badge>
                    <Badge variant="secondary">Indian</Badge>
                    <Button variant="outline">View Details</Button>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900">
                  <CardContent className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Electric Ballroom</h3>
                    <p className="text-sm text-gray-500">
                      Live music venue with a spacious dance floor
                    </p>
                    <Badge variant="secondary">Club</Badge>
                    <Badge variant="secondary">Live Music</Badge>
                    <Button variant="outline">View Details</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Card key={user.id} className="bg-neutral-900">
                  <CardContent className="flex flex-col items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.bio}</p>
                    <div className="flex space-x-2">
                      <Badge variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        {user.followersCount} Followers
                      </Badge>
                    </div>
                    <Button variant="outline">View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Explore;
