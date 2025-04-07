
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { useCheckIn } from "@/hooks/useCheckIn";
import { CheckInDialog } from "./check-in/CheckInDialog";

interface CheckInButtonProps {
  venue: Location;
}

const CheckInButton = ({ venue }: CheckInButtonProps) => {
  const { 
    isOpen, 
    setIsOpen, 
    isCheckedIn, 
    isCheckingLocation, 
    isInRange, 
    distance,
    handleCheckInClick, 
    confirmCheckIn 
  } = useCheckIn(venue);

  return (
    <>
      <Button 
        variant="default" 
        className={`${isCheckingLocation ? "" : "bg-gradient-vibe"}`}
        onClick={handleCheckInClick}
        disabled={isCheckingLocation || isCheckedIn}
      >
        {isCheckingLocation ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Locating...
          </>
        ) : isCheckedIn ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Checked In
          </>
        ) : (
          "Check In"
        )}
      </Button>

      <CheckInDialog 
        venue={venue}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isInRange={isInRange}
        distance={distance}
        onConfirm={confirmCheckIn}
      />
    </>
  );
};

export default CheckInButton;
