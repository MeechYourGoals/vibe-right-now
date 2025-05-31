
import { useState } from "react";
import { Layout } from "@/components/Layout";
import MapContainer from "@/components/map/MapContainer";
import { Card, CardContent } from "@/components/ui/card";
import { discountOffers } from "@/mock/discountOffers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VenueWithDiscount } from "@/components/venue/events/types";
import { Location } from "@/types";

// Convert VenueWithDiscount to Location for MapContainer compatibility
const convertToLocation = (venue: VenueWithDiscount): Location => {
  return {
    id: venue.id,
    name: venue.name,
    type: venue.type,
    address: venue.address,
    city: venue.city,
    state: venue.state,
    country: venue.country,
    zip: venue.zip,
    lat: venue.lat,
    lng: venue.lng,
    verified: venue.verified,
    description: venue.discount.description
  };
};

const Discounts = () => {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState<VenueWithDiscount | null>(null);
  const [mapExpanded, setMapExpanded] = useState(false);

  const handleVenueSelect = (location: Location) => {
    // Find the corresponding venue from discountOffers
    const venue = discountOffers.find(v => v.id === location.id);
    if (venue) {
      setSelectedVenue(venue);
    }
  };

  const handleCloseLocation = () => {
    setSelectedVenue(null);
  };

  // Convert discount venues to Location type for map compatibility
  const locationsForMap = discountOffers.map(convertToLocation);

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold vibe-gradient-text">
              Nearby Discounts & Deals
            </h1>
            <p className="text-muted-foreground mt-2">
              Exclusive offers at venues near you
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <MapContainer
            loading={false}
            isExpanded={mapExpanded}
            userLocation={null}
            locations={locationsForMap}
            searchedCity=""
            mapStyle="default"
            selectedLocation={selectedVenue ? convertToLocation(selectedVenue) : null}
            showDistances={true}
            userAddressLocation={null}
            onLocationSelect={handleVenueSelect}
            onCloseLocation={handleCloseLocation}
            nearbyCount={discountOffers.length}
            onToggleDistances={() => {}}
          />
        </div>

        {/* Discount List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discountOffers.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{venue.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {venue.city}, {venue.state}
                    </p>
                  </div>
                  <Badge variant={venue.discount.type === "percentOff" ? "secondary" : "default"}>
                    <Ticket className="h-3 w-3 mr-1" />
                    {venue.discount.type === "percentOff" 
                      ? `${venue.discount.value}% OFF`
                      : venue.discount.type.replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                </div>
                
                <p className="mt-3 text-sm">{venue.discount.description}</p>
                
                {venue.discount.conditions && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {venue.discount.conditions}
                  </p>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  {venue.discount.code && (
                    <Badge variant="outline" className="text-xs">
                      Code: {venue.discount.code}
                    </Badge>
                  )}
                  <Button 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => navigate(`/venue/${venue.id}`)}
                  >
                    View Venue
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Discounts;
