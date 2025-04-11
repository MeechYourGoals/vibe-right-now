
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Ticket } from "lucide-react";
import { mockRewards, Reward } from "./types";
import CreditCardPointsDialog from "./CreditCardPointsDialog";

interface RewardsListProps {
  userPoints: number;
  onRedeemReward: (reward: Reward) => void;
}

const RewardsList = ({ userPoints, onRedeemReward }: RewardsListProps) => {
  const [showCreditCardDialog, setShowCreditCardDialog] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">Available Rewards</h4>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-xs"
          onClick={() => setShowCreditCardDialog(true)}
        >
          <CreditCard className="h-3 w-3" />
          Credit Card Points
        </Button>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {mockRewards.map((reward) => (
          <Card key={reward.id} className={`border ${userPoints >= reward.points ? 'border-primary/40' : 'border-muted'}`}>
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-base">{reward.venueName}</CardTitle>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-2">
              <div className="flex items-center gap-3">
                <img 
                  src={reward.image} 
                  alt={reward.description} 
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Required Points</span>
                    <span className="font-bold">{reward.points}</span>
                  </div>
                  <Progress 
                    value={(userPoints / reward.points) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button 
                className="w-full" 
                disabled={userPoints < reward.points}
                onClick={() => onRedeemReward(reward)}
              >
                <Ticket className="h-4 w-4 mr-2" />
                Redeem Reward
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <CreditCardPointsDialog 
        open={showCreditCardDialog} 
        onOpenChange={setShowCreditCardDialog} 
      />
    </div>
  );
};

export default RewardsList;
