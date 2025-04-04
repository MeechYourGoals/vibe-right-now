
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CameraButton = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [availableToPin, setAvailableToPin] = useState(false);

  const handleCameraClick = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    setIsDialogOpen(false);
    
    toast({
      title: "Vibe Posted",
      description: availableToPin 
        ? "Your vibe has been posted and is available for venues to pin! (5x points)" 
        : "Your vibe has been posted! (2x points)",
    });
  };

  return (
    <>
      <Button 
        onClick={handleCameraClick}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-gradient-vibe flex items-center justify-center p-0 z-10"
      >
        <Camera className="h-7 w-7" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="glass-effect max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold vibe-gradient-text">Post a Vibe</DialogTitle>
            <DialogDescription>
              Share the vibe at your current location. Your post will be visible for 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-muted/30 rounded-lg p-2 aspect-video flex items-center justify-center">
              <Camera className="h-12 w-12 opacity-50" />
              <span className="ml-2 text-sm text-muted-foreground">Camera Preview</span>
            </div>
            
            <Input 
              placeholder="Add a caption (optional)"
              className="bg-background/50"
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pinForRewards" 
                checked={availableToPin} 
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setAvailableToPin(checked);
                  }
                }}
              />
              <Label 
                htmlFor="pinForRewards" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                Pin for Rewards 
                <span className="ml-2 reward-badge">5x Points</span>
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-gradient-vibe" 
              onClick={handleSubmit}
            >
              Post Right Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraButton;
