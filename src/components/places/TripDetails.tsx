
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TripHeader } from "./trip/TripHeader";
import { TripPlaceCard } from "./trip/TripPlaceCard";
import { AddPlaceDialog } from "./trip/AddPlaceDialog";
import { EmptyPlaceState } from "./trip/EmptyPlaceState";
import TripCommunicationHub from "./trip/TripCommunicationHub";
import { useTripPlaces } from "./trip/useTripPlaces";
import { tripsRepo } from "@/services/data";
import { listTripMembers } from "@/services/trips/tripCollabService";

// Mock colors for users
const userColors = [
  { id: "1", color: "#3b82f6" }, // Blue
  { id: "2", color: "#ec4899" }, // Pink
  { id: "3", color: "#10b981" }, // Green
  { id: "4", color: "#f59e0b" }, // Amber
  { id: "5", color: "#8b5cf6" }, // Purple
];

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = React.useState<any>(null);
  
  // Fetch trip data: prefer the data layer (Supabase + mock fallback), and fall
  // back to any locally-stored offline trip if the repo can't resolve it.
  React.useEffect(() => {
    let cancelled = false;

    const loadTrip = async () => {
      if (!tripId) return;

      try {
        const record = await tripsRepo.getById(tripId);
        if (record) {
          const members = await listTripMembers(tripId);
          if (cancelled) return;
          setTrip({
            id: record.id,
            name: record.name,
            destination: record.description || "Trip",
            description: record.description || "",
            startDate: record.startDate || new Date().toISOString().split("T")[0],
            endDate: record.endDate || new Date().toISOString().split("T")[0],
            collaborators:
              members.length > 0
                ? members
                : [{ id: "1", name: "You", avatar: "/placeholder.svg" }],
          });
          return;
        }
      } catch (err) {
        console.warn("[TripDetails] repo lookup failed, trying local:", err);
      }

      // Offline fallback: locally-stored trips.
      try {
        const storedTrips = localStorage.getItem("trips");
        const tripsData = storedTrips ? JSON.parse(storedTrips) : [];
        const foundTrip = tripsData.find((t: any) => t.id === tripId);
        if (foundTrip && !cancelled) {
          setTrip(foundTrip);
          return;
        }
      } catch {
        // ignore
      }

      if (!cancelled) {
        toast.error("Trip not found");
        navigate("/my-places");
      }
    };

    loadTrip();
    return () => {
      cancelled = true;
    };
  }, [tripId, navigate]);

  const {
    places,
    isAddPlaceDialogOpen,
    setIsAddPlaceDialogOpen,
    searchResults,
    handleSearch,
    handleAddPlace
  } = useTripPlaces({
    tripId,
    // Make sure we provide default values when trip is null
    collaborators: trip?.collaborators || [],
    userColors
  });
  
  if (!trip) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading trip details...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <TripHeader trip={trip} userColors={userColors} />
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Places to Visit</h2>
          <Dialog open={isAddPlaceDialogOpen} onOpenChange={setIsAddPlaceDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Place
              </Button>
            </DialogTrigger>
            <AddPlaceDialog 
              onClose={() => setIsAddPlaceDialogOpen(false)}
              onAddPlace={handleAddPlace}
              onSearch={handleSearch}
              searchResults={searchResults}
            />
          </Dialog>
        </div>
        
        {places.length === 0 ? (
          <EmptyPlaceState onAddPlace={() => setIsAddPlaceDialogOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((placeItem) => (
              <TripPlaceCard key={placeItem.id} placeItem={placeItem} />
            ))}
          </div>
        )}
        
        {/* Enhanced Trip Communication Hub */}
        <TripCommunicationHub 
          tripId={tripId} 
          collaborators={trip.collaborators}
          userColors={userColors}
        />
      </div>
    </Layout>
  );
};

export default TripDetails;
