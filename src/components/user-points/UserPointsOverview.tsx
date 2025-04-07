
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UserPointsOverviewProps {
  points: number;
}

const UserPointsOverview = ({ points }: UserPointsOverviewProps) => {
  return (
    <div className="glass-effect p-4 rounded-lg">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-14 w-14 border-2 border-primary">
          <AvatarImage src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Jane Doe</h3>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Vibe Explorer</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Current Points</span>
          <span className="font-bold">{points}</span>
        </div>
        <Progress value={points / 10} className="h-2" />
        
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="glass-effect p-2 rounded-md">
            <div className="font-bold">15</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </div>
          <div className="glass-effect p-2 rounded-md">
            <div className="font-bold">8</div>
            <div className="text-xs text-muted-foreground">Pinned</div>
          </div>
          <div className="glass-effect p-2 rounded-md">
            <div className="font-bold">3</div>
            <div className="text-xs text-muted-foreground">Redeemed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPointsOverview;
