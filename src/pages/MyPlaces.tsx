
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { Button } from "@/components/ui/button";
import PlaceCard from "@/components/places/PlaceCard";
import TripsList from "@/components/places/TripsList";
import VibeWithMe from "@/components/places/VibeWithMe";
import { useState, useEffect, useCallback } from "react";
import {
  listUserPlaces,
  getCurrentUserId,
  UserPlaceRecord,
} from "@/services/trips/tripCollabService";

/**
 * Maps a user_places row onto a full Location for rendering. We only persist the
 * id/name/city, so we hydrate the rest from the mock catalog when available and
 * otherwise synthesize a minimal Location.
 */
const recordToLocation = (record: UserPlaceRecord): Location => {
  const match = mockLocations.find((l) => l.id === record.location_id);
  if (match) return match;
  return {
    id: record.location_id,
    name: record.location_name || "Saved place",
    address: "",
    city: record.location_city || "",
    lat: 0,
    lng: 0,
    type: "attraction",
  } as Location;
};

const MyPlaces = () => {
  const [activeSection, setActiveSection] = useState<"places" | "trips">("places");

  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState<string | null>(null);

  const loadPlaces = useCallback(async () => {
    setLoadingPlaces(true);
    setPlacesError(null);
    try {
      const uid = await getCurrentUserId();
      if (!uid) {
        setVisitedPlaces([]);
        setWantToVisitPlaces([]);
        setPlacesError("Sign in again to load your saved places.");
        return;
      }

      const [visited, wanted] = await Promise.all([
        listUserPlaces(uid, "visited"),
        listUserPlaces(uid, "want_to_visit"),
      ]);

      setVisitedPlaces(visited.map(recordToLocation));
      setWantToVisitPlaces(wanted.map(recordToLocation));
    } catch (err) {
      console.error("[MyPlaces] failed to load places", err);
      setPlacesError("We couldn't load your places. Please retry.");
      setVisitedPlaces([]);
      setWantToVisitPlaces([]);
    } finally {
      setLoadingPlaces(false);
    }
  }, []);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">My Places</h1>

        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant={activeSection === "places" ? "default" : "outline"}
            onClick={() => setActiveSection("places")}
            className="transition-all duration-300"
          >
            Places
          </Button>
          <Button
            variant={activeSection === "trips" ? "default" : "outline"}
            onClick={() => setActiveSection("trips")}
            className="transition-all duration-300"
          >
            Trips
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            {activeSection === "places" ? (
              <Tabs defaultValue="visited" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="visited">Visited</TabsTrigger>
                  <TabsTrigger value="want-to-visit">Want to Visit</TabsTrigger>
                </TabsList>

                <TabsContent value="visited" className="space-y-4">
                  <p className="text-muted-foreground mb-4">Places you've checked in at or marked as visited.</p>
                  {loadingPlaces && <p className="text-muted-foreground">Loading visited places...</p>}
                  {placesError && (
                    <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
                      <p className="text-destructive">{placesError}</p>
                      <Button className="mt-3" size="sm" variant="outline" onClick={loadPlaces}>Retry</Button>
                    </div>
                  )}
                  {!loadingPlaces && !placesError && visitedPlaces.length === 0 && (
                    <p className="rounded-md border p-4 text-sm text-muted-foreground">No visited places yet. Check in at a venue to start building your history.</p>
                  )}
                  {visitedPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} visitType="visited" />
                  ))}
                </TabsContent>

                <TabsContent value="want-to-visit" className="space-y-4">
                  <p className="text-muted-foreground mb-4">Places you've saved to visit in the future.</p>
                  {loadingPlaces && <p className="text-muted-foreground">Loading saved places...</p>}
                  {placesError && (
                    <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm">
                      <p className="text-destructive">{placesError}</p>
                      <Button className="mt-3" size="sm" variant="outline" onClick={loadPlaces}>Retry</Button>
                    </div>
                  )}
                  {!loadingPlaces && !placesError && wantToVisitPlaces.length === 0 && (
                    <p className="rounded-md border p-4 text-sm text-muted-foreground">No saved future visits yet. Save a venue to plan where to go next.</p>
                  )}
                  {wantToVisitPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} visitType="planned" />
                  ))}
                </TabsContent>
              </Tabs>
            ) : (
              <TripsList />
            )}
          </div>

          <div>
            <VibeWithMe className="mb-6" />
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
          <p className="font-medium">Community Guidelines</p>
          <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
        </div>
      </div>
    </Layout>
  );
};

export default MyPlaces;
