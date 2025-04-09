
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, Star, DollarSign, MapPin, MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: number;
  baseRate: number;
  categories: string[];
  bio: string;
}

const InfluencerDeals: React.FC = () => {
  const { toast } = useToast();
  
  const [influencers] = useState<Influencer[]>([
    {
      id: "1",
      name: "Olivia Johnson",
      username: "olivia_styles",
      avatar: "/placeholder.svg",
      verified: true,
      followers: 2500000,
      baseRate: 50000,
      categories: ["Nightlife", "Fashion", "Lifestyle"],
      bio: "Lifestyle influencer specializing in nightlife and entertainment."
    },
    {
      id: "2",
      name: "Marcus Chen",
      username: "foodie_marcus",
      avatar: "/placeholder.svg",
      verified: true,
      followers: 1200000,
      baseRate: 25000,
      categories: ["Food", "Restaurants", "Travel"],
      bio: "Food critic and restaurant expert with a dedicated foodie following."
    },
    {
      id: "3",
      name: "Alex Rivera",
      username: "dj_alexr",
      avatar: "/placeholder.svg",
      verified: true,
      followers: 850000,
      baseRate: 15000,
      categories: ["Music", "Nightlife", "Events"],
      bio: "DJ and music producer who showcases venues and events."
    },
    {
      id: "4",
      name: "Sophia Williams",
      username: "sophia_travels",
      avatar: "/placeholder.svg",
      verified: false,
      followers: 500000,
      baseRate: 8000,
      categories: ["Travel", "Dining", "Lifestyle"],
      bio: "Travel content creator focused on unique dining experiences."
    }
  ]);
  
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      offer: "",
      date: "",
      time: "",
      customRate: ""
    }
  });
  
  const handleMakeOffer = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setOfferDialogOpen(true);
  };
  
  const onSubmit = (data: any) => {
    const rate = data.customRate ? parseInt(data.customRate) : selectedInfluencer?.baseRate;
    
    toast({
      title: "Offer Sent",
      description: `Your offer has been sent to ${selectedInfluencer?.name} for review.`
    });
    
    setOfferDialogOpen(false);
    form.reset();
  };
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Available Talent</h3>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{influencers.length}</span> influencers available
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {influencers.map((influencer) => (
          <Card key={influencer.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={influencer.avatar} alt={influencer.name} />
                  <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-medium">{influencer.name}</h4>
                        {influencer.verified && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">@{influencer.username}</div>
                    </div>
                    <div className="text-xl font-semibold text-amber-600">${influencer.baseRate.toLocaleString()}</div>
                  </div>
                  
                  <p className="text-sm my-2">{influencer.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-2 mb-3">
                    {influencer.categories.map((category) => (
                      <Badge key={category} variant="outline">{category}</Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-500" />
                      {formatNumber(influencer.followers)} followers
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-amber-500" />
                      Top Creator
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 px-4 py-2 flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                className="text-sm"
                onClick={() => toast({
                  title: "Message Request Sent",
                  description: `A request to message ${influencer.name} has been sent.`
                })}
              >
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                Message
              </Button>
              <Button 
                className="bg-amber-500 hover:bg-amber-600"
                size="sm"
                onClick={() => handleMakeOffer(influencer)}
              >
                <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                Make Offer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedInfluencer && (
        <Dialog open={offerDialogOpen} onOpenChange={setOfferDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make an Offer to {selectedInfluencer.name}</DialogTitle>
              <DialogDescription>
                Standard rate: ${selectedInfluencer.baseRate.toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormItem>
                  <FormLabel>Your Offer Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Hi ${selectedInfluencer.name}, we'd love to have you visit our venue for a promotional post...`}
                      className="min-h-[100px]"
                      {...form.register("offer")}
                      required
                    />
                  </FormControl>
                </FormItem>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Proposed Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...form.register("date")}
                        required
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Proposed Time</FormLabel>
                    <FormControl>
                      <Input 
                        type="time" 
                        {...form.register("time")}
                        required
                      />
                    </FormControl>
                  </FormItem>
                </div>
                
                <FormItem>
                  <FormLabel>Custom Rate (USD)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder={selectedInfluencer.baseRate.toString()}
                      {...form.register("customRate")}
                    />
                  </FormControl>
                </FormItem>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-xs">
                  <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">VRN Fee Information:</p>
                  <p>A 3% platform fee will be applied to the final negotiated rate. All payments are held in escrow until the content is posted.</p>
                </div>
                
                <DialogFooter>
                  <Button 
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Send Offer
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InfluencerDeals;
