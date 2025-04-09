
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Star, DollarSign, Award, Calendar, MapPin } from "lucide-react";
import InfluencerOffers from "./InfluencerOffers";
import InfluencerDeals from "./InfluencerDeals";
import MarketplaceTerms from "./MarketplaceTerms";

interface InfluencerMarketplaceProps {
  venueName?: string;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const InfluencerMarketplace: React.FC<InfluencerMarketplaceProps> = ({ 
  venueName = "Your Venue", 
  subscriptionTier 
}) => {
  // Only pro tier can access this feature
  if (subscriptionTier !== 'pro') {
    return (
      <Card className="border-2 border-amber-200 bg-amber-950 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-amber-100">Influencer Marketplace</CardTitle>
          <CardDescription className="text-amber-200">
            Connect with top talent and influencers to promote your venue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-900/70 p-4 rounded-lg border border-amber-700 text-center">
            <Award className="h-12 w-12 text-amber-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium mb-2 text-amber-100">Upgrade to Pro</h3>
            <p className="text-sm text-amber-200 mb-4">
              Access the VRN Influencer Marketplace to connect with celebrities and popular users.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-amber-100">
                  <Users className="h-4 w-4 mr-2 text-amber-400" />
                  Connect with top influencers
                </span>
                <Badge variant="outline" className="bg-amber-800 text-amber-100">Pro</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-amber-100">
                  <Star className="h-4 w-4 mr-2 text-amber-400" />
                  Negotiate rates directly
                </span>
                <Badge variant="outline" className="bg-amber-800 text-amber-100">Pro</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-amber-100">
                  <DollarSign className="h-4 w-4 mr-2 text-amber-400" />
                  Secure payment escrow
                </span>
                <Badge variant="outline" className="bg-amber-800 text-amber-100">Pro</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-amber-950 text-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-amber-100">Influencer Marketplace</CardTitle>
            <CardDescription className="text-amber-200">
              Connect with top talent and influencers to promote {venueName}
            </CardDescription>
          </div>
          <Badge className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-medium">Pro Feature</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="offers">
          <TabsList className="grid grid-cols-3 mb-4 bg-amber-900">
            <TabsTrigger value="offers" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">Posted Offers</TabsTrigger>
            <TabsTrigger value="deals" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">Available Talent</TabsTrigger>
            <TabsTrigger value="terms" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">Terms & Fees</TabsTrigger>
          </TabsList>
          
          <TabsContent value="offers" className="mt-0">
            <InfluencerOffers venueName={venueName} />
          </TabsContent>
          
          <TabsContent value="deals" className="mt-0">
            <InfluencerDeals />
          </TabsContent>
          
          <TabsContent value="terms" className="mt-0">
            <MarketplaceTerms />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InfluencerMarketplace;
