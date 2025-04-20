
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Moon, Sparkles, VerifiedIcon } from "lucide-react";
import { Location } from "@/types";

interface NightlifeSectionProps {
  nightlifeVenues: Location[];
  searchedCity: string;
  dateRange: DateRange | undefined;
}

const NightlifeSection = ({ nightlifeVenues, searchedCity, dateRange }: NightlifeSectionProps) => {
  // Always ensure we have at least a few venues to display
  const displayVenues = nightlifeVenues.length > 0 ? nightlifeVenues : [
    {
      id: "nl-default-1",
      name: `${searchedCity} Rooftop Lounge`,
      address: "123 Party Ave",
      city: searchedCity,
      state: "CA",
      country: "USA",
      zip: "10001",
      lat: 40.7128,
      lng: -74.0060,
      type: "nightlife",
      verified: true,
      vibes: ["Nightlife", "Rooftop", "Cocktails"],
      venueType: "Rooftop Bar"
    },
    {
      id: "nl-default-2",
      name: `Club ${searchedCity}`,
      address: "456 Dance Blvd",
      city: searchedCity,
      state: "CA",
      country: "USA",
      zip: "10001",
      lat: 40.7228,
      lng: -74.0160,
      type: "nightlife",
      verified: true,
      vibes: ["Nightlife", "Dancing", "DJ"],
      venueType: "Nightclub"
    },
    {
      id: "nl-default-3",
      name: `${searchedCity} Speakeasy`,
      address: "789 Hidden Lane",
      city: searchedCity,
      state: "CA",
      country: "USA",
      zip: "10001",
      lat: 40.7328,
      lng: -74.0260,
      type: "nightlife",
      verified: true,
      vibes: ["Cocktails", "Intimate", "Vintage"],
      venueType: "Cocktail Bar"
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Nightlife in {searchedCity}
        {dateRange?.from && (
          <Badge className="ml-2 bg-indigo-100 text-indigo-800">
            {format(dateRange.from, "MMM yyyy")}
            {dateRange.to && ` - ${format(dateRange.to, "MMM yyyy")}`}
          </Badge>
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayVenues.map((venue) => (
          <Card key={venue.id} className="vibe-card-hover bg-indigo-50 border-indigo-200 hover:bg-indigo-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold flex items-center">
                  {venue.name}
                  {venue.verified && (
                    <VerifiedIcon className="h-4 w-4 ml-1 text-indigo-500" />
                  )}
                </h3>
                <Badge variant="outline" className="bg-indigo-100 border-indigo-300 text-indigo-700">
                  Nightlife
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {venue.address}, {venue.city}, {venue.state}
                </span>
              </div>
              
              {venue.vibes && venue.vibes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {venue.vibes.map((vibe, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-indigo-50 text-indigo-700 border-indigo-200"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-indigo-500" />
                      {vibe}
                    </Badge>
                  ))}
                </div>
              )}
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <Link to={`/venue/${venue.id}`}>View Vibes</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NightlifeSection;
