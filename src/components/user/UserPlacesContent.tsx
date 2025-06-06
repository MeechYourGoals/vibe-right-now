
import React from "react";
import { Location } from "@/types";

interface UserPlacesContentProps {
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserPlacesContent = ({ 
  visitedPlaces, 
  wantToVisitPlaces, 
  activeTab, 
  setActiveTab 
}: UserPlacesContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("visited")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "visited" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Visited ({visitedPlaces.length})
        </button>
        <button
          onClick={() => setActiveTab("want-to-visit")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === "want-to-visit" 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          Want to Visit ({wantToVisitPlaces.length})
        </button>
      </div>

      {activeTab === "visited" ? (
        <div className="grid gap-4">
          {visitedPlaces.length > 0 ? (
            visitedPlaces.map(place => (
              <div key={place.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{place.name}</h3>
                <p className="text-sm text-muted-foreground">{place.address}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No visited places yet</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {wantToVisitPlaces.length > 0 ? (
            wantToVisitPlaces.map(place => (
              <div key={place.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{place.name}</h3>
                <p className="text-sm text-muted-foreground">{place.address}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No places on wishlist yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPlacesContent;
