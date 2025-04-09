
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Building2 } from "lucide-react";

interface ModeToggleProps {
  isVenueMode: boolean;
  onToggle: () => void;
}

const ModeToggle = ({ isVenueMode, onToggle }: ModeToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="mode-toggle" className="flex items-center gap-2">
        <User className={`h-4 w-4 ${!isVenueMode ? "text-primary" : "text-muted-foreground"}`} />
        <span className={!isVenueMode ? "font-medium" : "text-muted-foreground"}>User</span>
      </Label>
      <Switch 
        id="mode-toggle" 
        checked={isVenueMode} 
        onCheckedChange={onToggle} 
      />
      <Label htmlFor="mode-toggle" className="flex items-center gap-2">
        <Building2 className={`h-4 w-4 ${isVenueMode ? "text-primary" : "text-muted-foreground"}`} />
        <span className={isVenueMode ? "font-medium" : "text-muted-foreground"}>Venue</span>
      </Label>
    </div>
  );
};

export default ModeToggle;
