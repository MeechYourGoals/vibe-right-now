
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { PointsDisplay } from "./PointsDisplay";
import { ReceiptUpload } from "./ReceiptUpload";

interface CheckInDialogProps {
  venue: Location;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isInRange: boolean;
  distance: string | null;
  onConfirm: (pointsEarned: number) => void;
}

export function CheckInDialog({ 
  venue, 
  isOpen, 
  setIsOpen, 
  isInRange, 
  distance,
  onConfirm 
}: CheckInDialogProps) {
  const [hasReceipt, setHasReceipt] = useState(false);

  const handleConfirmCheckIn = () => {
    const pointsEarned = hasReceipt ? 30 : 10;
    onConfirm(pointsEarned);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Check in at {venue.name}</DialogTitle>
          <DialogDescription>
            {isInRange ? (
              <span className="text-green-500">
                You're within range! Check in to earn points.
              </span>
            ) : (
              <span className="text-yellow-500">
                You appear to be {distance} away from this venue. You need to be within 200 feet to check in.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <PointsDisplay hasReceipt={hasReceipt} />
          <ReceiptUpload onUploadComplete={() => setHasReceipt(true)} />
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-vibe"
            onClick={handleConfirmCheckIn}
            disabled={!isInRange}
          >
            {hasReceipt ? 'Check in (+30 points)' : 'Check in (+10 points)'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
