
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { Location } from "@/types";
import { PointsDisplay } from "./PointsDisplay";
import { ReceiptUpload } from "./ReceiptUpload";

interface CheckInDialogProps {
  venue: Location;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isInRange: boolean;
  distance: string | null;
  isSubmitting?: boolean;
  onConfirm: (pointsEarned: number, photo?: File | null) => void;
}

export function CheckInDialog({
  venue,
  isOpen,
  setIsOpen,
  isInRange,
  distance,
  isSubmitting = false,
  onConfirm
}: CheckInDialogProps) {
  const [hasReceipt, setHasReceipt] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmCheckIn = () => {
    const pointsEarned = hasReceipt ? 30 : 10;
    onConfirm(pointsEarned, photo);
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

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handlePhotoSelected}
          />
          {photoPreview ? (
            <div className="rounded-md overflow-hidden">
              <img src={photoPreview} alt="Check-in" className="w-full h-40 object-cover" />
            </div>
          ) : null}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            {photo ? "Change photo" : "Add a photo (optional)"}
          </Button>

          <ReceiptUpload onUploadComplete={() => setHasReceipt(true)} />
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-vibe"
            onClick={handleConfirmCheckIn}
            disabled={!isInRange || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Checking in...
              </>
            ) : hasReceipt ? (
              "Check in (+30 points)"
            ) : (
              "Check in (+10 points)"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
