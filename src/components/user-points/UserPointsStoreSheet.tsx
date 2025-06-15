
import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useUserStore, useUIStore } from "@/store";
import UserPointsOverview from "./UserPointsOverview";
import PointsGuide from "./PointsGuide";
import RewardsList from "./RewardsList";
import RedemptionConfirmDialog from "./RedemptionConfirmDialog";
import { Reward } from "./types";

const UserPointsStoreSheet = () => {
  const { user, updatePoints } = useUserStore();
  const { addNotification } = useUIStore();
  const [redeemingReward, setRedeemingReward] = useState<Reward | null>(null);
  
  const userPoints = user?.points || 0;
  
  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setRedeemingReward(reward);
    }
  };
  
  const confirmRedemption = () => {
    if (redeemingReward) {
      const newPoints = userPoints - redeemingReward.points;
      updatePoints(newPoints);
      
      addNotification({
        type: 'success',
        title: 'Reward Redeemed!',
        message: `You've successfully redeemed ${redeemingReward.description} for ${redeemingReward.points} points.`
      });
      
      setRedeemingReward(null);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>{userPoints} Points</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl vibe-gradient-text">Your Vibe Points</SheetTitle>
          <SheetDescription>
            Earn points by posting vibes and get rewarded by venues
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          <UserPointsOverview points={userPoints} />
          <PointsGuide />
          <RewardsList 
            userPoints={userPoints} 
            onRedeemReward={handleRedeemReward} 
          />
        </div>
        
        {redeemingReward && (
          <RedemptionConfirmDialog
            reward={redeemingReward}
            onCancel={() => setRedeemingReward(null)}
            onConfirm={confirmRedemption}
          />
        )}
        
        <SheetFooter className="mt-6">
          <Button variant="outline" className="w-full">View All Rewards</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserPointsStoreSheet;
