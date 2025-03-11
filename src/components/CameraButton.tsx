
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CameraButton = () => {
  const { toast } = useToast();

  const handleCameraClick = () => {
    toast({
      title: "Camera Feature",
      description: "In the real app, this would open the camera to post a new vibe.",
    });
  };

  return (
    <Button 
      onClick={handleCameraClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-gradient-vibe flex items-center justify-center p-0"
    >
      <Camera className="h-7 w-7" />
    </Button>
  );
};

export default CameraButton;
