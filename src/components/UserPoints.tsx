
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Gift, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockLocations } from "@/mock/data";

interface Reward {
  id: string;
  venueName: string;
  venueId: string;
  points: number;
  description: string;
  image: string;
}

const mockRewards: Reward[] = [
  {
    id: "reward1",
    venueName: "Skyline Lounge",
    venueId: mockLocations[0].id,
    points: 100,
    description: "Free Cocktail",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward2",
    venueName: "Cosmic Cafe",
    venueId: mockLocations[1].id,
    points: 250,
    description: "50% Off Brunch",
    image: "https://images.unsplash.com/photo-1484659619207-9165d119dafe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
  {
    id: "reward3",
    venueName: "Neon Nightclub",
    venueId: mockLocations[2].id,
    points: 500,
    description: "VIP Entry (Skip the Line)",
    image: "https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60"
  },
];

const UserPoints = () => {
  const [userPoints, setUserPoints] = useState(320);
  const [redeemingReward, setRedeemingReward] = useState<Reward | null>(null);
  
  const handleRedeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setRedeemingReward(reward);
    }
  };
  
  const confirmRedemption = () => {
    if (redeemingReward) {
      setUserPoints(userPoints - redeemingReward.points);
      setRedeemingReward(null);
      // Here you would typically call an API to process the redemption
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
          {/* User Points Overview */}
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
                <span className="font-bold">{userPoints}</span>
              </div>
              <Progress value={userPoints / 10} className="h-2" />
              
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
          
          {/* Points Guide */}
          <div className="glass-effect p-4 rounded-lg">
            <h4 className="font-medium mb-2">How to Earn Points</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Upload from Camera Roll</span>
                <span className="font-semibold">1x Points</span>
              </li>
              <li className="flex justify-between">
                <span>Post Right Now (in app)</span>
                <span className="font-semibold">2x Points</span>
              </li>
              <li className="flex justify-between">
                <span>Make Available to Pin</span>
                <span className="font-semibold">3x Points</span>
              </li>
              <li className="flex justify-between">
                <span>Post Gets Pinned by Venue</span>
                <span className="font-semibold">5x Points</span>
              </li>
            </ul>
          </div>
          
          {/* Available Rewards */}
          <div>
            <h4 className="font-medium mb-3">Available Rewards</h4>
            <div className="space-y-3">
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
                      onClick={() => handleRedeemReward(reward)}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Redeem Reward
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
        
        {redeemingReward && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-card p-6 rounded-lg max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Confirm Redemption</h3>
              <p>
                You are about to redeem <span className="font-semibold">{redeemingReward.description}</span> at{" "}
                <span className="font-semibold">{redeemingReward.venueName}</span> for{" "}
                <span className="font-semibold">{redeemingReward.points} points</span>.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                This action cannot be undone. Your points will be deducted immediately.
              </p>
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setRedeemingReward(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-vibe"
                  onClick={confirmRedemption}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <SheetFooter className="mt-6">
          <Button variant="outline" className="w-full">View All Rewards</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default UserPoints;
