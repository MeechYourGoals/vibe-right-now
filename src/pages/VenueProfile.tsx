
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockLocations, mockPosts } from '@/mock/data';
import VenueProfileHeader from '@/components/venue/VenueProfileHeader';
import VenueActionButton from '@/components/venue/VenueActionButton';
import VenuePostsTabs from '@/components/venue/VenuePostsTabs';
import VenueMap from '@/components/venue/VenueMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Post, Location } from '@/types';
import { Button } from '@/components/ui/button';
import { LayoutGrid, ListIcon, Map } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/ui/container';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const VenueProfile = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [showMapModal, setShowMapModal] = useState(false);

  // Find venue from mock data
  const venue = mockLocations.find((venue) => venue.id === venueId);
  
  // Get posts for this venue
  const venuePosts = mockPosts.filter((post) => post.location.id === venueId);

  // Function to format business hours
  const formatBusinessHours = (hours: any) => {
    if (!hours) return "Hours not available";
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    return (
      <div className="text-sm">
        {days.map(day => (
          <div key={day} className="flex justify-between py-1">
            <span className="capitalize">{day}:</span>
            <span>
              {formatHours(hours[day])}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  // Helper function to format hours
  const formatHours = (hours: any) => {
    if (!hours) return "Closed";
    if (typeof hours === 'string') return hours;
    return `${hours.open} - ${hours.close}`;
  };

  if (!venue) {
    return <div className="flex justify-center items-center h-screen">Venue not found</div>;
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Venue Header */}
        <VenueProfileHeader venue={venue} />
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 my-5">
          <VenueActionButton 
            variant="outline" 
            className="border-blue-300" 
            onClick={() => {}} 
            icon="CheckIn"
          >
            Check In
          </VenueActionButton>
          
          <VenueActionButton 
            variant="outline" 
            className="border-purple-300" 
            onClick={() => {}} 
            icon="Camera"
          >
            Post
          </VenueActionButton>
          
          <VenueActionButton 
            variant="outline" 
            className="border-green-300" 
            onClick={() => {}} 
            icon="Star"
          >
            Rate
          </VenueActionButton>
          
          <VenueActionButton 
            variant="outline" 
            className="border-amber-300" 
            onClick={() => setShowMapModal(true)} 
            icon="Map"
          >
            Map
          </VenueActionButton>
        </div>
        
        <Separator className="my-5" />
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-2.5"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-2.5"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="posts" className="mt-4">
            <VenuePostsTabs 
              venuePosts={venuePosts} 
              viewMode={viewMode} 
            />
          </TabsContent>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">About {venue.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {venue.description || "No description available."}
                </p>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Contact</h4>
                  <p className="text-sm">{venue.phone || "No phone available"}</p>
                  <p className="text-sm">{venue.email || "No email available"}</p>
                  <p className="text-sm">{venue.website ? <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{venue.website}</a> : "No website available"}</p>
                </div>
              </div>
              
              <div>
                <VenueMap location={venue} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">Insights Coming Soon</h3>
              <p className="text-muted-foreground">
                We're working on gathering insights for this venue. Check back later!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Map Modal */}
      <Dialog open={showMapModal} onOpenChange={setShowMapModal}>
        <DialogContent className="max-w-3xl">
          <VenueMap location={venue} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default VenueProfile;
