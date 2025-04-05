
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { locations } from "@/mock/locations";
import { Location } from "@/types";
import { MapPin, Star, Clock } from "lucide-react";

const MyPlaces = () => {
  // Filter locations to get a subset for "Visited" and "Want to Visit"
  const visitedPlaces = locations.slice(0, 5);
  const wantToVisitPlaces = locations.slice(5, 10);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">My Places</h1>
        
        <Tabs defaultValue="visited" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="visited">Visited</TabsTrigger>
            <TabsTrigger value="want-to-visit">Want to Visit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visited" className="space-y-4">
            <p className="text-muted-foreground mb-4">Places you've checked in at or marked as visited.</p>
            {visitedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} visitType="visited" />
            ))}
          </TabsContent>
          
          <TabsContent value="want-to-visit" className="space-y-4">
            <p className="text-muted-foreground mb-4">Places you've saved to visit in the future.</p>
            {wantToVisitPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} visitType="planned" />
            ))}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
          <p className="font-medium">Community Guidelines</p>
          <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
        </div>
      </div>
    </Layout>
  );
};

type PlaceCardProps = {
  place: Location;
  visitType: "visited" | "planned";
};

const PlaceCard = ({ place, visitType }: PlaceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 h-48 md:h-auto">
          <img 
            src={`https://source.unsplash.com/random/300x200/?${place.type}`} 
            alt={place.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>{place.name}</CardTitle>
              {visitType === "visited" ? (
                <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs font-medium px-2 py-1 rounded">
                  Visited
                </div>
              ) : (
                <div className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 text-xs font-medium px-2 py-1 rounded">
                  Want to Visit
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{place.address}, {place.city}, {place.state}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground">
                <Star className="mr-2 h-4 w-4" />
                <span>{(Math.random() * 2 + 3).toFixed(1)} Stars</span>
              </div>
              
              {visitType === "visited" && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Visited {Math.floor(Math.random() * 12) + 1} months ago</span>
                </div>
              )}
              
              <p className="mt-2">
                {place.type === "restaurant" && "Great food and amazing atmosphere. Would definitely recommend!"}
                {place.type === "bar" && "Cool vibes, great drinks. Perfect spot for evening hangouts."}
                {place.type === "event" && "Amazing experience. The crowd was really into it."}
                {place.type === "sports" && "Great venue with perfect views of the action."}
                {place.type === "attraction" && "Worth the visit. Stunning views and unique experience."}
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default MyPlaces;
