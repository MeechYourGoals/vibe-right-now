
import React from "react";

interface PointsDisplayProps {
  hasReceipt: boolean;
}

export function PointsDisplay({ hasReceipt }: PointsDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Base points:</h4>
          <p className="text-sm text-muted-foreground">Check in at this location</p>
        </div>
        <span className="font-bold">10 points</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Bonus points:</h4>
          <p className="text-sm text-muted-foreground">Upload today's receipt</p>
        </div>
        <span className="font-bold text-primary">+20 points</span>
      </div>
    </div>
  );
}
