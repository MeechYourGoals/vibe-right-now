
import React from "react";
import { Button } from "@/components/ui/button";
import { MapIcon, Layers, Navigation, X } from "lucide-react";

interface MapControlsProps {
  isExpanded: boolean;
  mapStyle: "default" | "terrain" | "satellite";
  onStyleChange: (style: "default" | "terrain" | "satellite") => void;
  onToggleExpand: () => void;
}

const MapControls = ({
  isExpanded,
  mapStyle,
  onStyleChange,
  onToggleExpand
}: MapControlsProps) => {
  if (isExpanded) {
    return (
      <>
        <div className="flex items-center bg-muted/30 rounded-md p-1">
          <Button 
            variant={mapStyle === "default" ? "secondary" : "ghost"} 
            size="sm" 
            className="gap-1" 
            onClick={() => onStyleChange("default")}
          >
            <MapIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant={mapStyle === "terrain" ? "secondary" : "ghost"} 
            size="sm" 
            className="gap-1" 
            onClick={() => onStyleChange("terrain")}
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button 
            variant={mapStyle === "satellite" ? "secondary" : "ghost"} 
            size="sm" 
            className="gap-1" 
            onClick={() => onStyleChange("satellite")}
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="gap-1" onClick={onToggleExpand}>
          <X className="h-4 w-4" />
          Close Map
        </Button>
      </>
    );
  }
  
  return (
    <Button variant="ghost" size="sm" className="gap-1" onClick={onToggleExpand}>
      <Navigation className="h-4 w-4" />
      Expand Map
    </Button>
  );
};

export default MapControls;
